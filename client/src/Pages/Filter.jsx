import React, { useState } from 'react'
import { Box, Container, Flex, Heading } from '@theme-ui/components'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAxios } from '../components/Axios'
import EmbedGraph from '../components/EmbedGraph'
import Insight from '../components/Insight'
import CollapsibleWell from '../components/CollapsibleWell'

const Filter = props => {
  const [queryString, setQueryString] = useState('')
  const [activeQuery, setActiveQuery] = useState('')
  const [subGraphs, setSubGraphs] = useState(null)
  const [loading, setLoading] = useState(false)
  const axios = useAxios()
  const handleSearch = () => {
    const query = ((queryString+' ').match(/'(.+?)'|"(.+?)"|(\w.*?) /gm) || ['']).map(str => str.replace(/( $)|("$)|('$)|(^")|(^')/g, ''))
    axios.post('/api/subgraphs', { query }).then(({ data }) => {
      // setRows(data)
      setSubGraphs(data)
      setActiveQuery(queryString)
      setLoading(true)
    })
  }
  return (
    <Container>
      <Heading>Filter</Heading>
      <Flex sx={{ alignItems: 'flex-end' }}>
        <Input fullwidth label='Filter' value={queryString} onChange={({ target }) => setQueryString(target.value)}/>
        <Box>
          <Button variant='primary' onClick={handleSearch}>Search</Button>
        </Box>
      </Flex>
      {loading && 'loading'}
      {subGraphs && <Insight activeQuery={activeQuery} subgraphs={subGraphs}/>}
    </Container>
  )
}

export default Filter
