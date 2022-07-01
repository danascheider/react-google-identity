import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useGoogleLogin from '../../hooks/use-google-login.js'
import ButtonContent from '../button-content/button-content.js'
import Icon from '../icon/icon.js'
import lightStyles from './light-styles.module.css'
import darkStyles from './dark-styles.module.css'

const GoogleLoginButton = ({
  // useGoogleLogin params
  autoload,
  clientId,
  cookiePolicy,
  fetchBasicProfile,
  hostedDomain,
  onAutoloadFinished,
  onError,
  onRequest,
  onScriptLoadError,
  onSuccess,
  prompt,
  redirectUri,
  scope,
  scriptSrc,
  staySignedIn,
  uxMode,
  pluginName,
  // JSX params
  buttonText = 'Sign in with Google',
  children,
  className,
  disabled,
  icon,
  theme,
  type = 'button',
}) => {
  const [active, setActive] = useState(false)
  const { gapiScriptLoaded, signInWithGoogle } = useGoogleLogin({
    autoload,
    clientId,
    cookiePolicy,
    fetchBasicProfile,
    hostedDomain,
    onAutoloadFinished,
    onError,
    onRequest,
    onScriptLoadError,
    onSuccess,
    prompt,
    redirectUri,
    scope,
    scriptSrc,
    staySignedIn,
    uxMode,
    pluginName
  })

  const styles = theme == 'dark' ? darkStyles : lightStyles

  return (
    <button
      className={classNames(styles.root, className)}
      type={type}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
      disabled={disabled == true ? true : !gapiScriptLoaded}
    >
      {icon && (
        <Icon
          className={theme === 'dark' ? null : styles.icon}
          active={active || disabled}
          key={1}
        />
      )}
      <ButtonContent icon={icon} key={2}>
        {children || buttonText}
      </ButtonContent>
    </button>
  )
}

GoogleLoginButton.propTypes = {
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
