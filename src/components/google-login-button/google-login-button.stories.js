import withMock from 'storybook-addon-mock'
import GoogleLoginButton from './google-login-button.js'

export default {
  title: 'GoogleLoginButton',
  component: GoogleLoginButton,
  decorators: [withMock],
}

export const LightWithIcon = () => <GoogleLoginButton icon={true} />
LightWithIcon.parameters = {
  mockData: [
    {
      url: 'accounts.google.com/gsi/client',
      method: 'GET',
      status: 200,
      response: {
        data: 'window.gapi = {}',
      },
    },
  ],
}

export const LightWithoutIcon = () => <GoogleLoginButton icon={false} />
LightWithoutIcon.parameters = {
  mockData: [
    {
      url: 'accounts.google.com/gsi/client',
      method: 'GET',
      status: 200,
      response: {
        data: 'javascript string',
      },
    },
  ],
}

export const DarkWithIcon = () => <GoogleLoginButton icon={true} theme='dark' />
DarkWithIcon.parameters = {
  mockData: [
    {
      url: 'accounts.google.com/gsi/client',
      method: 'GET',
      status: 200,
      response: {
        data: 'javascript string',
      },
    },
  ],
}

export const DarkWithoutIcon = () => (
  <GoogleLoginButton icon={false} theme='dark' />
)
DarkWithoutIcon.parameters = {
  mockData: [
    {
      url: 'accounts.google.com/gsi/client',
      method: 'GET',
      status: 200,
      response: {
        data: 'javascript string',
      },
    },
  ],
}

export const LightDisabled = () => <GoogleLoginButton icon={true} disabled />

export const DarkDisabled = () => (
  <GoogleLoginButton icon={true} theme='dark' disabled />
)
