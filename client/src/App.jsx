import React from 'react'
import { ColorMode, Styled, ThemeProvider } from 'theme-ui'
import { Global } from '@emotion/core'
import theme from './theme'
import SideBar from './components/SideBar'
import { Box, Flex, Heading } from '@theme-ui/components'
import { HashRouter, Link, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home'
import Graphs from './Pages/Graphs'
import Subgraphs from './Pages/Subgraphs'
import Authors from './Pages/Authors'
import Path from './Pages/Path'
import Degree from './Pages/Degree'
import Icon from './components/Icon'
import { mdiHamburger } from '@mdi/js'
import Button from './components/Button'

const MyGlobal = () => (
  <Global
    styles={theme => ({
      body: theme.styles.body,
      '*': theme.styles['*'],
      a: theme.styles.a
    })}
  />
)

const withApp = WrappedComponent => {
  return props => (
    <ThemeProvider theme={theme}>
      <ColorMode/>
      <MyGlobal/>
      <Styled.root>
        <WrappedComponent {...props}/>
      </Styled.root>
    </ThemeProvider>
  )
}

function App () {
  return (
    <HashRouter>
      <Box sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        display: 'grid',
        gridTemplateColumns: ['0 1fr', null, theme => `${theme.layout.sidebar.width} 1fr`],
        gridTemplateRows: '0fr 1fr',
        gridTemplateAreas: `
              "sidebar navbar"
              "sidebar content"
              `,
        transition: '0.3s grid-template-columns ease'
      }}>
        <SideBar/>
        <Box sx={{ gridArea: 'navbar', display: ['block', null, 'none'] }}>
          <Flex
            sx={{
              backgroundColor: 'bgs.2',
              px: 3,
              py: 2,
              // py: [3, 2].map(x => theme => (theme.space[x] + theme.space[x + 1]) / 2),
              position: 'relative',
              justifyContent: 'space-between',
              alignItems: 'baseline'
            }}>
            <Box>
              <Button
                sx={{
                  visibility: 'hidden'
                }}>
                <Icon path={mdiHamburger}/>
              </Button>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Link to={'/'}>
                <Heading m={0}>
                  collab-network
                </Heading>
              </Link>
            </Box>
          </Flex>
        </Box>
        <Box sx={{ gridArea: 'content', overflow: 'auto' }}>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path='/graphs/:graph'>
              <Graphs/>
            </Route>
            <Route path='/subgraphs'>
              <Subgraphs/>
            </Route>
            <Route path='/authors'>
              <Authors/>
            </Route>
            <Route path='/path'>
              <Path/>
            </Route>
            <Route path='/degree'>
              <Degree/>
            </Route>
          </Switch>
        </Box>
      </Box>

    </HashRouter>
  )
}

export default withApp(App)
