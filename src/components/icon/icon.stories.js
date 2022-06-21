import Icon from './icon'

export default {
  title: 'Icon',
  component: Icon,
}

// width is 10 wider than height to account for margin-right of 10px on component
const styles = { width: 50, height: 40, margin: 0, padding: 0 }

export const Active = () => (
  <div style={styles}>
    <Icon style={styles} active={true} />
  </div>
)

export const Inactive = () => (
  <div style={styles}>
    <Icon style={styles} active={false} />
  </div>
)
