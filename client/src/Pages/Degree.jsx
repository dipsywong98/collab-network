import React, { useState } from 'react'
import { Box, Container, Flex, Heading, Text } from '@theme-ui/components'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAxios } from '../components/Axios'
import EmbedGraph from '../components/EmbedGraph'
import * as R from 'ramda'
import { AuthorTableByIds } from '../components/AuthorTable'
import CollapsibleWell from '../components/CollapsibleWell'

const Path = () => {
  const [source, setSource] = useState('')
  const [degree, setDegree] = useState(2)
  const [loading, setLoading] = useState(false)
  const [lengthNodes, setLengthNodes] = useState([])
  const [name, setName] = useState(null)
  const [error, setError] = useState(null)
  const axios = useAxios()
  const handleSearch = (event) => {
    event.preventDefault()
    setLoading(true)
    axios.post('/api/degree', { source, degree }).then(({ data }) => {
      setLengthNodes(Object.entries(R.invert(data.dict)).sort(([a], [b]) => a - b))
      if (data.error) {
        setError(data.error)
      } else {
        setName(data.name)
      }
      setLoading(false)
    })
  }
  return (
    <Container>
      <Heading>Degree of connection</Heading>
      <Text>Given a source author id and maximum path length (connection degree), visualize the graph</Text>
      <Flex as='form' onSubmit={handleSearch} sx={{ alignItems: 'flex-end' }}>
        <Box>
          <Input fullwidth label='Source Id' value={source} onChange={({ target }) => setSource(target.value)}/>
        </Box>
        <Box ml={3}>
          <Input type='number'
            fullwidth
            label='Degree'
            value={degree}
            onChange={({ target }) => setDegree(Number.parseInt(target.value))}/>
        </Box>
        <Box ml={3}>
          <Button variant='primary'>Search</Button>
        </Box>
      </Flex>
      {loading && <Text>loading</Text>}
      {error && <Text>{error}</Text>}
      {name && <EmbedGraph graph={name}/>}
      {lengthNodes.map(([length, nodes]) => (
        <CollapsibleWell key={length} defaultOpen={false} header={`Degree ${length}`}>
          <AuthorTableByIds ids={nodes}/>
        </CollapsibleWell>
      ))}
    </Container>
  )
}

export default Path
