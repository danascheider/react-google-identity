import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import GoogleLoginButton from '../src/components/google-login-button/google-login-button'

describe('Google Login Button', () => {
  describe('with default props', () => {
    const props = {
      onSuccess: () => {},
      onError: () => {},
      clientId:
        '891031345873-ir73kc1ru0ncv564iesac94kjaap5nf4.apps.googleusercontent.com',
    }

    test('has correct text', () => {
      render(<GoogleLoginButton {...props} />)
      expect(screen.getByRole('button')).toHaveTextContent(
        'Sign in with Google'
      )
    })

    test('matches snapshot', () => {
      const button = render(<GoogleLoginButton {...props} />)
      expect(button).toMatchSnapshot()
    })
  })
})
