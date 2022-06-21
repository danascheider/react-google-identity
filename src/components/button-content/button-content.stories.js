import ButtonContent from './button-content'

export default {
  title: 'ButtonContent',
  component: ButtonContent,
}

export const WithIcon = () => (
  <ButtonContent icon={true}>Sign in with Google</ButtonContent>
)

export const WithoutIcon = () => (
  <ButtonContent icon={false}>Sign in with Google</ButtonContent>
)
