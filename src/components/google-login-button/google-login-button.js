import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useGoogleLogin from '../../hooks/use-google-login.js'
import ButtonContent from '../button-content/button-content.js'
import Icon from '../icon/icon.js'
import lightStyles from './light-styles.module.css'
import darkStyles from './dark-styles.module.css'

const GoogleLoginButton = ({
  // useGoogleLogin params - see useGoogleLogin function for
  // docs on what each param does
  onSuccess,
  onError,
  onScriptLoad,
  onScriptLoadError,
  nativeCallback,
  allowedParentOrigin,
  autoSelect,
  clientId,
  context,
  intermediateIframeCloseCallback,
  itpSupport,
  loginUri,
  nonce,
  promptParentId,
  stateCookieDomain,
  cancelOnTapOutside,
  uxMode,
  scriptSrc,
  // Button options
  buttonLocale,
  buttonLogoAligment,
  buttonShape,
  buttonSize,
  buttonText,
  buttonTheme,
  buttonType,
  buttonWidth,
  // JSX params
  // The button ID and optional class name can be set to any values, however, you
  // should not set either value to 'g_id_onload' or 'g_id_signin', which will cause
  // the button to be rendered in HTML as well as JavaScript and could have some
  // interesting side effects.
  buttonParentId,
  className,
  type = 'oneTap'
}) => {
  const [active, setActive] = useState(false)
  const {
    scriptLoaded,
    displayOneTapButton,
    displaySignInButton,
    signInWithGoogle
  } = useGoogleLogin({
    onSuccess,
    onError,
    onScriptLoad,
    onScriptLoadError,
    nativeCallback,
    allowedParentOrigin,
    buttonLocale,
    buttonLogoAligment,
    buttonShape,
    buttonSize,
    buttonText,
    buttonTheme,
    buttonType,
    buttonWidth,
    clientId,
    context,
    intermediateIframeCloseCallback,
    itpSupport,
    loginUri,
    nonce,
    promptParentId,
    stateCookieDomain,
    autoSelect,
    cancelOnTapOutside,
    uxMode,
    scriptSrc
  })

  useEffect(() => {
    if (autoSelect) signInWithGoogle()
  }, [autoSelect, signInWithGoogle])

  return (
    <div
      id={buttonParentId}
      className={className}
    >
    </div>
  )
}

GoogleLoginButton.propTypes = {
  onSuccess: PropTypes.func,
  autoload: PropTypes.bool,
  clientId: PropTypes.string.isRequired,
  cookiePolicy: PropTypes.string,
  fetchBasicProfile: PropTypes.bool,
  hostedDomain: PropTypes.string,
  onAutoloadFinished: PropTypes.func,
  onError: PropTypes.func,
  onRequest: PropTypes.func,
  onScriptLoadError: PropTypes.func,
  onSuccess: PropTypes.func,
  prompt: PropTypes.oneOf(['consent', 'select_account']),
  scriptSrc: PropTypes.string,
  staySignedIn: PropTypes.bool,
  uxMode: PropTypes.oneOf(['popup', 'redirect']),
  pluginName: PropTypes.string,
  buttonText: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.bool,
  theme: PropTypes.oneOf(['light', 'dark']),
}

export default GoogleLoginButton
