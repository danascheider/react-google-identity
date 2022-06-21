import React, { useState } from 'react'
import classNames from 'classnames'
import useGoogleLogin from '../../hooks/use-google-login'
import ButtonContent from '../button-content/button-content'
import Icon from '../icon/icon'
import lightStyles from './light-styles.module.css'
import darkStyles from './dark-styles.module.css'

const GoogleLoginButton = ({
  // useGoogleLogin params
  accessType,
  autoload,
  clientId,
  cookiePolicy,
  discoveryDocs,
  fetchBasicProfile,
  hostedDomain,
  loginHint,
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
  // HTML params
  buttonText = 'Sign in with Google',
  children,
  className,
  disabled,
  icon,
  theme,
  type,
}) => {
  const [active, setActive] = useState(false)
  const { gapiScriptLoaded, signInWithGoogle } = useGoogleLogin({
    accessType,
    autoload,
    clientId,
    cookiePolicy,
    discoveryDocs,
    fetchBasicProfile,
    hostedDomain,
    loginHint,
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
  })

  const styles = theme == 'dark' ? darkStyles : lightStyles

  return (
    <button
      className={classNames(styles.root, className)}
      type='button'
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

export default GoogleLoginButton
