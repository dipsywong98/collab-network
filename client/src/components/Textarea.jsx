/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Box, Label, Text } from '@theme-ui/components'
import PropTypes from 'prop-types'
import BasicTextarea from './BasicTextarea'

const Textarea = props => (
  <Box mt={3} sx={{ width: props.fullwidth ?? false ? '100%' : undefined, ...props.sx }}>
    <Label
      sx={{
        position: 'relative'
      }}>
      <BasicTextarea
        {...props}
        placeholder={props.label}
        variant='inputMagic'
        sx={{ width: props.fullwidth ?? false ? '100%' : undefined, ...props.sx }}
      />
      <Text>{props.label}</Text>
    </Label>
    <Text variant='helperText'>
      {props.helperText}
    </Text>
  </Box>
)

Textarea.propTypes = {
  fullwidth: PropTypes.bool,
  label: PropTypes.string.isRequired,
  sx: PropTypes.object,
  helperText: PropTypes.string
}

export default Textarea
