import React, { forwardRef, useEffect, useState } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import Well from './Well'
import { Box, Flex } from '@theme-ui/components'
import Icon from './Icon'
import { mdiChevronDown } from '@mdi/js'
import { transition } from '../theme/transitions'
import Collapsible from './Collapsible'

const collapsibleWellProps = {
  defaultOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
  header: PropTypes.node,
  setController: PropTypes.func,
  noPad: PropTypes.bool,
  reverseHeader: PropTypes.bool,
  headerSx: PropTypes.object,
  hideOnly: PropTypes.bool,
  onOpen: PropTypes.func
}


const CollapsibleWell = forwardRef(
  (
    { defaultOpen, children, header, noPad, setController, hideOnly, reverseHeader, headerSx, onOpen, ...boxProps },
    ref
  ) => {
    const [isOpen, setOpen] = useState(defaultOpen)

    useEffect(() => {
      if (setController !== undefined) {
        setController({
          show: () => setOpen(true),
          hide: () => setOpen(false),
          toggle: () => setOpen(!isOpen)
        })
      }
    }, [])

    useEffect(() => {
      if (isOpen) {
        onOpen && onOpen()
      }
    }, [isOpen])

    return (
      <Well
        ref={ref}
        {...boxProps}
        sx={{ p: 0, ...(boxProps.sx) }}>
        <Flex
          onClick={() => setOpen(!isOpen)}
          sx={{
            p: 3,
            ':hover': {
              backgroundColor: 'highlight'
            },
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: reverseHeader ?? false ? 'row-reverse' : 'row',
            ...headerSx
          }}>
          {header}
          <Icon
            path={mdiChevronDown}
            sx={{
              ...transition(0.3, ['transform']),
              transform: isOpen ? 'rotate(180deg)' : undefined
            }}
          />
        </Flex>
        <Collapsible isOpen={isOpen} hideOnly={hideOnly}>
          <Box
            className='collapsible-content'
            p={noPad ?? false ? undefined : 3}
            sx={{
              borderTopColor: 'border',
              borderTopWidth: '1px',
              borderTopStyle: 'solid'
            }}>
            {children}
          </Box>
        </Collapsible>
      </Well>
    )
  }
)

CollapsibleWell.propTypes = collapsibleWellProps

CollapsibleWell.displayName = 'CollapsibleWell'

export default CollapsibleWell
