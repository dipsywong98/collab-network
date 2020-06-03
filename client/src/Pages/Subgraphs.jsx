import React, { useState } from 'react'
import { Box, Container, Flex, Heading } from '@theme-ui/components'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAxios } from '../components/Axios'
import Insight from '../components/Insight'

const Subgraphs = () => {
  const [queryString, setQueryString] = useState('')
  const [activeQuery, setActiveQuery] = useState('')
  const [subGraphs, setSubGraphs] = useState(null)
  const [loading, setLoading] = useState(false)
  const axios = useAxios()
  const handleSearch = (event) => {
    event.preventDefault()
    setLoading(true)
    const query = ((queryString + ' ').match(/'(.+?)'|"(.+?)"|(\w.*?) /gm) || ['']).map(str => str.replace(/( $)|("$)|('$)|(^")|(^')/g, ''))
    axios.post('/api/subgraphs', { query }).then(({ data }) => {
      // setRows(data)
      setSubGraphs(data)
      setActiveQuery(queryString)
      setLoading(false)
    })
  }
  return (
    <Container>
      <Heading>Subgraphs</Heading>
      <Flex as='form' onSubmit={handleSearch} sx={{ alignItems: 'flex-end' }}>
        <Input fullwidth label='Filter' value={queryString} onChange={({ target }) => setQueryString(target.value)}/>
        <Box ml={3}>
          <Button variant='primary'>Search</Button>
        </Box>
      </Flex>
      {loading && 'loading'}
      {subGraphs && <Insight activeQuery={activeQuery} subgraphs={subGraphs}/>}
    </Container>
  )
}

export default Subgraphs
