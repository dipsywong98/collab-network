import React, { forwardRef, FunctionComponent } from 'react'
import { Box } from '@theme-ui/components'

const Well = forwardRef((props, ref) => (
  <Box
    ref={ref}
    __themeKey='wells'
    variant='normal'
    {...props}
  />
))

Well.displayName = 'Well'

export default Well
