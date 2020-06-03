import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@theme-ui/components'
import ButtonGroup from './ButtonGroup'
import Button from './Button'
import { mdiChevronLeft, mdiChevronRight, mdiDotsHorizontal } from '@mdi/js'
import IconButton from './IconButton'
import Icon from './Icon'

const Paginate = ({ page, onChange, numPages, showPages = 5, ...props }) => {
  const handlePageChange = page => {
    onChange && onChange(page)
  }
  const range = new Array(Math.min(showPages, numPages)).fill('').map((_, k) => k).map(k => {
    if (page < Math.floor(showPages / 2)) {
      return k
    }
    if (page >= numPages - Math.floor(showPages / 2)) {
      return numPages - showPages + k
    }
    return page + k - Math.floor(showPages / 2)
  })
  if (range.length === 0) return ''
  return <ButtonGroup {...props}>
    <IconButton type='button' variant='normal-md' path={mdiChevronLeft} disabled={page === 1}/>
    {!range.includes(0) && <>
      <Button
        type='button'
        variant='normal-md'
        onClick={() => handlePageChange(0)}>
        1
      </Button>
      <Box>
        <Icon path={mdiDotsHorizontal}/>
      </Box>
    </>}
    {range.map(k => <Button
      type='button'
      key={k}
      variant={k === page ? 'primary-md' : 'normal-md'}
      onClick={() => handlePageChange(k)}>{k + 1}</Button>)}
    {!range.includes(numPages - 1) && <>
      <Box>
        <Icon path={mdiDotsHorizontal}/>
      </Box>
      <Button
        type='button'
        variant='normal-md'
        onClick={() => handlePageChange(numPages - 1)}>
        {numPages}
      </Button>
    </>}
    <IconButton type='button' variant='normal-md' path={mdiChevronRight} disabled={page === numPages}/>
  </ButtonGroup>
}

Paginate.propTypes = {
  page: PropTypes.number,
  numPages: PropTypes.number.isRequired,
  showPages: PropTypes.number,
  onChange: PropTypes.func
}

export default Paginate
