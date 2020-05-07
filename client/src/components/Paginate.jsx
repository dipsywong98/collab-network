import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@theme-ui/components'
import ButtonGroup from './ButtonGroup'
import Button from './Button'
import { mdiChevronLeft, mdiChevronRight, mdiDotsHorizontal } from '@mdi/js'
import IconButton from './IconButton'
import Icon from './Icon'

const Paginate = props => {
  const [currPage, setCurrPage] = useState(props.page || 0)
  useEffect(() => {
    props.onChange && props.onChange(currPage)
  }, [currPage])
  const numPages = props.numPages
  const showPages = props.showPages || 5
  const range = new Array(Math.min(showPages, numPages)).fill('').map((_, k) => k).map(k => {
    if (currPage < Math.floor(showPages / 2)) {
      return k
    }
    if (currPage >= numPages - Math.floor(showPages / 2)) {
      return numPages - showPages + k
    }
    return currPage + k - Math.floor(showPages / 2)
  })
  if (range.length === 0) return ''
  return <ButtonGroup>
    <IconButton variant='normal-md' path={mdiChevronLeft} disabled={currPage === 1}/>
    {!range.includes(0) && <>
      <Button
        variant='normal-md'
        onClick={() => setCurrPage(0)}>
        1
      </Button>
      <Box>
        <Icon path={mdiDotsHorizontal}/>
      </Box>
    </>}
    {range.map(k => <Button
      key={k}
      variant={k === currPage ? 'primary-md' : 'normal-md'}
      onClick={() => setCurrPage(k)}>{k + 1}</Button>)}
    {!range.includes(numPages - 1) && <>
      <Box>
        <Icon path={mdiDotsHorizontal}/>
      </Box>
      <Button
        variant='normal-md'
        onClick={() => setCurrPage(numPages - 1)}>
        {numPages}
      </Button>
    </>}
    <IconButton variant='normal-md' path={mdiChevronRight} disabled={currPage === numPages}/>
  </ButtonGroup>
}

Paginate.propTypes = {
  page: PropTypes.number,
  numPages: PropTypes.number.isRequired,
  showPages: PropTypes.number,
  onChange: PropTypes.func
}

export default Paginate
