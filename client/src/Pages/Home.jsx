import React from 'react'
import logo from '../logo.svg'
import './Home.css'
import { Text } from '@theme-ui/components'

const Home = () => (
  <div className='content'>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <Text variant='heading'>MATH4999 - Independent Capstone Project on Collaborator Relation Graph Studies</Text>
      <Text variant='subheading'>Cheung Tsz Yan and Wong Yuk Chun</Text>
      <Text variant='subheading'>Advised by Prof Chen Beifang</Text>
    </header>
  </div>
)

export default Home
