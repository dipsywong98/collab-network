import React, { forwardRef } from 'react'
import { Box, Grid, Text } from '@theme-ui/components'
import * as PropTypes from 'prop-types'
import { baseWell } from '../theme/wells'

const Span = props => <Text as='span' {...props}/>

export const SmallLabel = ({ children }) => (
  <Span color='gray.1' sx={{ display: [null, null, null, 'none'] }}>
    {children}
  </Span>
)

SmallLabel.propTypes = {
  children: PropTypes.node.isRequired
}


function tableBuilder (
  columns,
  ItemComponent,
  gridTemplateColumns,
  WrapperComponent = ({ Content, i }) => (<Box key={i}><Content/></Box>)
) {
  const ResponsiveTable = (props) => {
    const tableProperty = {
      gridTemplateColumns,
      py: [3, 2],
      px: baseWell.px,
      gap: 1,
      mx: -baseWell.px
    }

    const body = props.items.map((it, i) => {
      const Content = forwardRef((props, ref) => {
        const { ref: _, ...otherProps } = props
        return (
          <Grid
            sx={{
              ...tableProperty,
              backgroundColor: i % 2 === 0 ? 'bgs.1' : 'transparent',
              color: 'text'
            }}
            ref={ref}
            {...otherProps}>
            <ItemComponent it={it}/>
          </Grid>
        )
      })

      Content.propTypes = {
        as: PropTypes.string,
        ref: PropTypes.object
      }

      Content.displayName = 'TableRowContent'

      return WrapperComponent({ Content, it, i })
    })

    return <Box>
      <Grid
        sx={{
          ...tableProperty,
          display: ['none', null, null, 'grid']
        }}>
        {columns.map((it, i) => <Text key={i} color='muted' sx={{ fontWeight: 'bold' }}>{it}</Text>)}
      </Grid>
      {body}
    </Box>
  }

  ResponsiveTable.propTypes = {
    items: PropTypes.array.isRequired
  }

  return ResponsiveTable
}

export default tableBuilder
