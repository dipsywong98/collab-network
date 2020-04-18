import React from 'react'
import { Flex, Text } from '@theme-ui/components'
import PropTypes from 'prop-types'
import Icon from './Icon'

const iconTextProps = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.any
}

const IconText = ({ children, color, path, ...otherProps }) => {
  return (
    <Flex sx={{ alignItems: 'center' }} {...otherProps}>
      <Icon
        path={path}
        color={color}
        sx={{
          fillOpacity: color === 'transparent' ? 0 : 1
        }}
      />
      {' '}
      <Text ml={2} sx={{ flex: 1 }}>{children}</Text>
    </Flex>
  )
}

IconText.propTypes = iconTextProps

export default IconText
