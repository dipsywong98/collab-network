import React, { useState } from 'react'
import { Box, Container, Flex, Heading, Text } from '@theme-ui/components'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAxios } from '../components/Axios'
import EmbedGraph from '../components/EmbedGraph'
import { AuthorTableByIds } from '../components/AuthorTable'

const Path = () => {
  const [source, setSource] = useState('')
  const [target, setTarget] = useState('')
  const [loading, setLoading] = useState(false)
  const [path, setPath] = useState([])
  const [name, setName] = useState(null)
  const [error, setError] = useState(null)
  const axios = useAxios()
  const handleSearch = (event) => {
    event.preventDefault()
    setLoading(true)
    axios.post('/api/path', { source, target }).then(({ data }) => {
      if (data.error) {
        setError(data.error)
      } else {
        setPath(data.path)
        setName(data.name)
      }
      setLoading(false)
    })
  }
  return (
    <Container>
      <Heading>Shortest Path</Heading>
      <Text>Given the source and target author id, find and visualize the shortest path between them</Text>
      <Flex as='form' onSubmit={handleSearch} sx={{ alignItems: 'flex-end' }}>
        <Box>
          <Input fullwidth label='Source Id' value={source} onChange={({ target }) => setSource(target.value)}/>
        </Box>
        <Box ml={3}>
          <Input fullwidth label='Target Id' value={target} onChange={({ target }) => setTarget(target.value)}/>
        </Box>
        <Box ml={3}>
          <Button variant='primary'>Search</Button>
        </Box>
      </Flex>
      {loading && <Text>loading</Text>}
      {error && <Text>{error}</Text>}
      {name && <EmbedGraph graph={name}/>}
      {<AuthorTableByIds ids={path}/>}
    </Container>
  )
}

export default Path
