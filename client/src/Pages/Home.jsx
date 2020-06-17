import React from 'react'
import logo from '../logo.svg'
import './Home.css'
import { Box, Text } from '@theme-ui/components'
import Button from '../components/Button'

const Home = () => (
  <div className='content'>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <Text variant='heading'
        sx={{ textAlign: 'center' }}>MATH4999 - Independent Capstone Project on Collaborator Relation Graph Studies</Text>
      <Text variant='subheading'>Cheung Tsz Yan and Wong Yuk Chun</Text>
      <Text variant='subheading'>Advised by Prof Chen Beifang</Text>
      <Box>
        <Button>
          <a href="https://hkustconnect-my.sharepoint.com/:u:/g/personal/ycwongal_connect_ust_hk/EYHoYibXDy9PgSSSgCLutw4B4ABsm7KPFmeaxPPkVpvlKQ?e=IuGeMW">Download</a>
        </Button>
      </Box>
    </header>
  </div>
)

export default Home
