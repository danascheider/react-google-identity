import { useState, useRef, useEffect } from 'react'
import loadGapiScript from '../functions/load-gapi-script'
import removeGapiScript from '../functions/remove-gapi-script'

const useGoogleLogin = ({
  onSuccess = () => {},
  onError = () => {},
  onAutoloadFinished = () => {},
  onRequest = () => {},
  onScriptLoadError,
  clientId,
  loginHint,
  hostedDomain,
  fetchBasicProfile,
  discoveryDocs,
  uxMode,
  redirectUri,
  accessType,
  staySignedIn,
  prompt,
  responseType,
  autoload = false,
  cookiePolicy = 'single_host_origin',
  scope = 'profile email',
  scriptSrc = 'https://apis.google.com/js/platform.js',
}) => {
  const [gapiScriptLoaded, setGapiScriptLoaded] = useState(false)
  const mountedRef = useRef(true)

  const handleSuccess = resp => {
    onSuccess(resp)
  }

  const handleScriptLoadSuccess = () => {
    setGapiScriptLoaded(true)

    const params = {
      client_id: clientId,
      cookiepolicy: cookiePolicy,
      login_hint: loginHint,
      hosted_domain: hostedDomain,
      fetch_basic_profile: fetchBasicProfile,
      discoveryDocs,
      ux_mode: uxMode,
      redirect_uri: redirectUri,
      scope,
      access_type: accessType,
    }

    if (responseType === 'code') params.access_type = 'offline'

    window.gapi.load('auth2', () => {
      const GoogleAuth = gapi.auth2.GoogleAuth

      if (GoogleAuth) {
        GoogleAuth.then(
          resp => {
            if (mountedRef.current === false) return

            if (staySignedIn && GoogleAuth.isSignedIn.get()) {
              onAutoloadFinished(true)
              handleSuccess(GoogleAuth.currentUser.get())
            } else {
              onAutoloadFinished(false)
            }
          },
          err => {
            onError(err)
          }
        )
      } else {
        window.auth2 = window.gapi.auth2.init(params).then(
          resp => {
            if (mountedRef.current === true) {
              const isSignedIn = staySignedIn && resp.isSignedIn.get()

              onAutoloadFinished(isSignedIn)

              if (isSignedIn) {
                handleSuccess(resp.currentUser.get())
              }
            }
          },
          err => {
            onAutoloadFinished(false)(
              onScriptLoadError && onScriptLoadError(err)
            ) || onError(err)
          }
        )
      }
    })
  }

  const signInWithGoogle = e => {
    e && e.preventDefault()

    if (gapiScriptLoaded) {
      const GoogleAuth = window.gapi.auth2.getAuthInstance()
      const options = { prompt }

      onRequest()

      if (responseType === 'code') {
        GoogleAuth.grantOfflineAccess(options).then(
          resp => onSuccess(resp),
          err => onError(err)
        )
      } else {
        GoogleAuth.signIn(options).then(
          resp => handleSuccess(resp),
          err => onError(err)
        )
      }
    }
  }

  useEffect(() => {
    mountedRef.current = true

    loadGapiScript(document, scriptSrc, handleScriptLoadSuccess, err => {
      ;(onScriptLoadError && onScriptLoadError(err)) || onError(err)
    })

    return () => {
      removeGapiScript(document)
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (autoload) {
      signIn()
    }
  }, [gapiScriptLoaded])

  return { gapiScriptLoaded, signInWithGoogle }
}

export default useGoogleLogin
