import React from 'react'
import PropTypes from 'prop-types'
import styles from './button-content.module.css'

const ButtonContent = ({ icon, children }) => (
  <span
    style={{ '--padding-left': icon ? '0px' : '10px' }}
    className={styles.root}
  >
    {children}
  </span>
)

ButtonContent.propTypes = {
  icon: PropTypes.bool,
  children: PropTypes.node,
}

export default ButtonContent
