import { Box, Flex, Heading } from '@theme-ui/components'
import { Link, useLocation } from 'react-router-dom'
import MenuItem from './MenuItem'
import IconText from './IconText'
import PropTypes from 'prop-types'
import { useColorMode } from 'theme-ui'
import {
  mdiAccountSearch,
  mdiCircleSlice4,
  mdiGraphOutline,
  mdiGraphql,
  mdiMapMarkerPath,
  mdiVectorLine
} from '@mdi/js'
import Button from './Button'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SideBarItem = (props) => {
  let { pathname } = useLocation()
  const active = props.active || pathname.includes(props.href)
  return (
    <Box
      sx={{
        cursor: 'pointer',
        borderRightColor: 'yellow.1',
        borderRightStyle: 'solid',
        borderRightWidth: active ? 3 : 0
      }}>
      <Link to={props.href}>
        <MenuItem>
          <IconText
            sx={{ overflowX: 'hidden' }}
            path={props.path}
            color={active ? 'yellow.1' : 'fgs.0'}>
            {props.children}
          </IconText>
        </MenuItem>
      </Link>
    </Box>
  )
}

SideBarItem.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  path: PropTypes.string.isRequired
}

const SideBarContent = () => {
  const [colorMode, setColorMode] = useColorMode()
  const toggleDarkMode = () => setColorMode(colorMode === 'default' ? 'dark' : 'default')
  const [graphUrls, setGraphUrls] = useState([])
  useEffect(() => {
    axios.get('/api/graphs').then(({ data }) => {
      console.log(data)
      setGraphUrls(data.files)
    })
  }, [])
  return (
    <React.Fragment>
      <Box>
        {/* Sidebar nav */}
        <Flex
          sx={{
            backgroundColor: 'bgs.2',
            px: 3,
            py: 2,
            // py: [3, 2].map(x => theme => (theme.space[x] + theme.space[x + 1]) / 2),
            position: 'relative',
            zIndex: 4,
            justifyContent: 'space-between',
            alignItems: 'baseline'
          }}>
          <Box>
            <Link to={'/'}>
              <Heading m={0}>
                collab-network
              </Heading>
            </Link>
          </Box>
          <Box pl={2}>
          </Box>
        </Flex>
      </Box>
      <Box sx={{ overflowY: 'auto', flex: 1 }}>
        <Box mb={4}>
          <Box pt={3} px={3}>
            <Heading variant={'subheading'} color={'blue.1'}>Functions</Heading>
          </Box>
          <SideBarItem href={`/authors`} path={mdiAccountSearch}>Authors</SideBarItem>
          <SideBarItem href={`/subgraphs`} path={mdiGraphOutline}>Subgraphs</SideBarItem>
          <SideBarItem href={`/path`} path={mdiVectorLine}>Path</SideBarItem>
          <SideBarItem href={`/degree`} path={mdiMapMarkerPath}>Degree</SideBarItem>
        </Box>

        <Box mb={4}>
          <Box pt={3} px={3}>
            <Heading variant={'subheading'} color={'blue.1'}>Graphs</Heading>
          </Box>
          {
            graphUrls.map(url => (
              <SideBarItem key={url} href={`/graphs/${url.replace('.html', '')}`} path={mdiGraphql}>{url}</SideBarItem>
            ))
          }
        </Box>

      </Box>
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Button
          onClick={toggleDarkMode}
          mr={2}
          mb={2}
          title='Toggle Dark Mode'
          block>
          <IconText path={mdiCircleSlice4}>Dark Mode</IconText>
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default SideBarContent
