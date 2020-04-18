/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Box, Flex } from '@theme-ui/components'
import { jsx } from 'theme-ui'
import { mdiHamburger, } from '@mdi/js'
import Button from './Button'
import Icon from './Icon'
import SideBarContent from './SideBarContent'

const SideBar = (props) => {
  const [showSideBar, setShowSideBar] = useState(false)
  const toggleSideBar = () => setShowSideBar(!showSideBar)
  const clickBack = e => {
    if (showSideBar) {
      e.stopPropagation()
      toggleSideBar()
    }
  }
  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: 'muted',
          opacity: [showSideBar ? 1 : 0, null, 0],
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          zIndex: 2,
          pointerEvents: [showSideBar ? null : 'none', null, 'none'],
          transition: '0.3s opacity ease'
        }}
        onClick={clickBack}
      />
      <Box
        {...props}
        sx={{
          height: '100vh',
          width: (theme) => theme.layout.sidebar.width,
          backgroundColor: 'bgs.1',
          transform: [`translateX(${showSideBar ? '0%' : '-100%'})`, null, 'unset'],
          zIndex: 3,
          position: ['absolute', null, 'relative'],
          transition: '0.3s transform ease',
          boxShadow: [1, null, 0],
          gridArea: 'sidebar'
        }}>
        {/* Toggle Sidebar button */}
        <Button
          onClick={toggleSideBar}
          sx={{
            position: 'absolute',
            left: ['100%', null, '-100%'],
            mt: 2,
            pl: 3,
            backgroundColor: 'bgs.1',
            transition: '0.3s left ease',
            cursor: 'pointer',
            boxShadow: [1, null, 0],
            zIndex: 3,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          }}>
          <Icon path={mdiHamburger}/>
        </Button>
        {/* Sidebar body */}
        <Flex sx={{ flexDirection: 'column', height: '100vh' }}>
          <SideBarContent/>
        </Flex>
      </Box>
    </React.Fragment>
  )
}

export default SideBar
