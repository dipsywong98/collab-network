/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Button as ThemeUIButton } from '@theme-ui/components'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'


const Button = forwardRef((props, ref) => (
  <ThemeUIButton
    ref={ref}
    variant='normal'
    sx={{
      position: 'relative'
    }}
    {...props}
  />
))

Button.propTypes = {
  block: PropTypes.bool
}

Button.defaultProps = {
  block: false
}

Button.displayName = 'Button'

export default Button
