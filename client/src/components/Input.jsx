/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Box, Label, Text } from '@theme-ui/components'
import PropTypes from 'prop-types'
import BasicInput from './BasicInput'
import IconButton from './IconButton'
import { mdiClose } from '@mdi/js'

const propTypes = {
  fullwidth: PropTypes.bool,
  label: PropTypes.string.isRequired,
  sx: PropTypes.object,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  onClearClick: PropTypes.func
}

const Input = ({ onClearClick, ...props }) => (
  <Box mt={3} sx={{ width: props.fullwidth ?? false ? '100%' : undefined, ...props.sx }}>
    <Label
      sx={{
        position: 'relative'
      }}>
      <BasicInput
        {...props}
        placeholder={props.label}
        variant='inputMagic'
        sx={{ width: props.fullwidth ?? false ? '100%' : undefined, ...props.sx }}
      />
      <Text sx={(props.value ? {
        backgroundColor: 'background',
        fontSize: 0,
        top: '-10px'} : null)}>{props.label}</Text>
      {!(props.disabled ?? false) && onClearClick !== undefined
        ? <Box sx={{ position: 'absolute', right: 1, top: '50%', transform: 'translateY(-50%)' }}>
          <IconButton variant='transparent-borderless-sm' path={mdiClose} onClick={onClearClick}/>
        </Box> : null}
    </Label>
    <Text variant='helperText'>
      {props.helperText}
    </Text>
  </Box>
)

Input.propTypes = propTypes

export default Input
