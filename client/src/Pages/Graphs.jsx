import React from 'react'
import { useParams } from 'react-router-dom'
import EmbedGraph from '../components/EmbedGraph'
import { Container, Heading } from '@theme-ui/components'

const Graph = () => {
  const { graph } = useParams()
  return (
    <Container sx={{height: '100%'}}>
      <Heading>Graph: {graph}</Heading>
      <EmbedGraph graph={graph}/>
    </Container>
  )
}

export default Graph
