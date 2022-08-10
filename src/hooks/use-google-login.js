import { useState, useRef, useEffect } from 'react'
import loadScript from '../functions/load-script.js'
import removeScript from '../functions/remove-script.js'

const DEFAULT_SCRIPT_SRC = 'accounts.google.com/gsi/client'

const useGoogleLogin = ({
  // This will be the value of the `callback` param when calling
  // `google.accounts.id.initialize`
  onSuccess = () => {},
  onError = () => {},
  onAutoloadFinished = () => {},
  onRequest = () => {},
  // The value of the `onGoogleLibraryLoad` callback, called
  // after the Sign In With Google JS library is loaded.
  onScriptLoad = () => {},
  onScriptLoadError = () => {},
  // In intermediate iframe mode, override the default iframe
  // behaviour when users manually close One Tap by tapping on
  // the X button in the One Tap UI. The default behaviour is
  // to remove the intermediate iframe from the DOM immediately.
  // JavaScript function that handles the `password` credential
  // returned from the browser's native credential management.
  // This value should generally not be needed as the whole
  // point of third-party identity is that you don't need to
  // manage user passwords on your site. If I'm honest I don't
  // even know how this would be used in a third-party login flow,
  // but the param will be passed through to Google if provided
  // here. Caveat emptor!
  nativeCallback,
  // Force One Tap to run in intermediate iframe mode, setting
  // the origin(s) that are allowed to embed the intermediate
  // iframe. The value may be a string or an array of strings.
  //
  // Wildcard prefixes are supported, however, they are not
  // allowed to be composed of only a wild-card and a top-level
  // domain. Additionally, wildcard domains must use a secure
  // (HTTPS) scheme.
  //
  // If the value of this field is invalid, the One Tap
  // initialization of the intermediate iframe will fail and
  // stop.
  allowedParentOrigin,
  // Set the locale of the button text. If not set, defaults
  // to the browser's default location or the Google session
  // user's preference. Therefore, different users might see
  // different versions of localised buttons, and possibly with
  // different sizes.
  buttonLocale,
  // Indicate where to align the Google logo in the button.
  // Possible values are 'left' (default) and 'center'.
  // Apparently right-aligned logos are no longer supported.
  buttonLogoAlignment,
  // Set the shape of the button. Possible values are:
  //   - 'rectangular' (default)
  //   - 'pill': equivalent to 'circle' if used with button
  //             type 'icon'
  //   - 'circle': equivalent to 'pill' if used with button
  //               type 'icon'
  //   - 'square': equivalent to 'rectangular' if used with
  //               button type 'standard'
  buttonShape,
  // Set the size of the button. Possibe values are 'large'
  // (default), 'medium', and 'small'. 'large' is the
  // recommended button size due to accessibility concerns for
  // people with limited vision.
  buttonSize,
  // The text on the login button. Valid values are:
  //   - 'signin_with' (default): 'Sign in with Google'
  //   - 'signup_with': 'Sign up with Google'
  //   - 'continue_with': 'Continue with Google'
  //   - 'signin': 'Sign in'
  buttonText,
  // Set the styles of the button. Possible values are
  // 'outline' (default), 'filled_blue', and 'filled_black'.
  buttonTheme,
  // Set the type of the rendered button. Possible values are
  // 'standard' (default) and 'icon'.
  buttonType,
  // Set the minimum width of the button. The maximum value is
  // 400.
  buttonWidth,
  // The Google client ID for your application, obtained from
  // the Google Cloud Developer Platform.
  clientId,
  // Change the text of the title and messages in the One Tap
  // prompt. The values are as follows:
  //   - 'signin': 'Sign in with Google'
  //   - 'signup': 'Sign up with Google'
  //   - 'use': 'Use with Google'
  context,
  // Specify whether the upgraded One Tap UX should be enabled
  // in browsers that support Intelligent Tracking Prevention
  // (ITP). The default value is `false`.
  itpSupport,
  // The full URI of the current page, or the value you specify.
  // Only used when `ux_mode='redirect'` is set.
  loginUri,
  // The nonce is a random string used by the ID token to prevent
  // replay attacks. Nonce length is limited to the maximum JWT
  // size supported by your environment, and individual browser
  // and server HTTP size constraints. This param is optional but
  // highly recommended. General information about nonces is
  // available here: https://www.hypr.com/nonce/
  nonce,
  // The DOM ID of the element to contain the One Tap prompt. If
  // not specified, displays in the top right-hand corner of the
  // window.
  promptParentId,
  // Your second-level domain (SLD) name, used if you need One Tap
  // in both the SLD (parent domain) and its subdomains. Enables a
  // single shared-state cookie to be used for all subdomains.
  stateCookieDomain,
  // Sign in automatically if exactly 1 Google account authorised
  autoSelect = false,
  // Cancels the prompt if the user clicks/taps outside it. Google's
  // default value is `false` but I think `true` is better UX in just
  // about any case I can think of so the default value for useGoogleLogin
  // is `true`.
  cancelOnTapOutside = true,
  // Sign-in flow can be 'popup' or 'redirect'. Has no impact on
  // One Tap UX.
  uxMode = 'popup',
  scriptSrc = DEFAULT_SCRIPT_SRC,
}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const mountedRef = useRef(true)

  const handleScriptLoadSuccess = () => {
    setScriptLoaded(true)

    const params = {
      client_id: clientId,
      cookie_policy: cookiePolicy,
      scope,
      fetch_basic_profile: fetchBasicProfile,
      hosted_domain: hostedDomain,
      ux_mode: uxMode,
      redirect_uri: redirectUri,
      plugin_name: pluginName,
    }

    if (responseType === 'code') params.access_type = 'offline'

    window.gapi.load('auth2', () => {
      const GoogleAuth = gapi.auth2.getAuthInstance()

      if (GoogleAuth) {
        GoogleAuth.then(
          _resp => {
            if (mountedRef.current === false) return

            if (staySignedIn && GoogleAuth.isSignedIn.get()) {
              onAutoloadFinished(true)
              onSuccess(GoogleAuth.currentUser.get())
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
            if (mountedRef.current === false) return

            const isSignedIn = autoSelect && resp.isSignedIn.get()

            onAutoloadFinished(isSignedIn)

            if (isSignedIn) {
              onSuccess(resp.currentUser.get())
            }
          },
          err => {
            onAutoloadFinished(false)
            (onScriptLoadError && onScriptLoadError(err)) || onError(err)
          }
        )
      }
    })
  }

  const signInWithGoogle = e => {
    e && e.preventDefault()

    if (scriptLoaded) {
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
          resp => onSuccess(resp),
          err => onError(err)
        )
      }
    }
  }

  useEffect(() => {
    mountedRef.current = true

    loadScript(document, scriptSrc, handleScriptLoadSuccess, err => {
      (onScriptLoadError && onScriptLoadError(err)) || onError(err)
    })

    return () => {
      removeScript(document)
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (autoload) {
      signInWithGoogle()
    }
  }, [scriptLoaded])

  return { scriptLoaded, signInWithGoogle }
}

export default useGoogleLogin
