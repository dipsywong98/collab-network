import React from 'react'
import { ColorMode, Styled, ThemeProvider } from 'theme-ui'
import { Global } from '@emotion/core'
import theme from './theme'
import SideBar from './components/SideBar'
import { Box } from '@theme-ui/components'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'
import Home from './components/Home'
import EmbedGraph from './components/EmbedGraph'

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

function App() {
  return (
    <Router>
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
        <Box sx={{ gridArea: 'content' }}>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path='/graphs/:graph'>
              <EmbedGraph/>
            </Route>
          </Switch>
        </Box>
      </Box>

    </Router>
  )
}

export default withApp(App)
