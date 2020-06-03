import React, { useState } from 'react'
import { Box, Container, Flex, Heading } from '@theme-ui/components'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAxios } from '../components/Axios'
import Paginate from '../components/Paginate'
import AuthorTable from '../components/AuthorTable'

const Authors = () => {
  const length = 20
  const [queryString, setQueryString] = useState('')
  const [loading, setLoading] = useState(false)
  const [authors, setAuthors] = useState([])
  const [counts, setCounts] = useState(0)
  const [page, setPage] = useState(0)
  const axios = useAxios()
  const handleSearch = (event, _page = page) => {
    event && event.preventDefault()
    if (loading) return
    setLoading(true)
    const paginate = {
      offset: _page * length, length
    }
    const query = ((queryString + ' ').match(/'(.+?)'|"(.+?)"|(\w.*?) /gm) || ['']).map(str => str.replace(/( $)|("$)|('$)|(^")|(^')/g, ''))
    axios.post('/api/filter', { query, paginate }).then(({ data }) => {
      setAuthors(data.rows)
      setCounts(data.counts)
      setLoading(false)
    })
  }
  const handlePaginate = (newPage) => {
    if (loading) return
    setPage(newPage)
    handleSearch(null, newPage)
  }
  return (
    <Container>
      <Heading>Authors</Heading>
      <Flex as='form' onSubmit={handleSearch} sx={{ alignItems: 'flex-end' }}>
        <Box sx={{ flex: 1 }}>
          <Input fullwidth label='Filter' value={queryString} onChange={({ target }) => setQueryString(target.value)}/>
        </Box>
        <Box ml={3}>
          <Button variant='primary'>Search</Button>
        </Box>
        <Box>
          <Paginate ml={3} numPages={Math.ceil(counts / length)} page={page} onChange={handlePaginate}/>
        </Box>
      </Flex>
      {loading && 'loading'}
      <AuthorTable items={authors}/>
    </Container>
  )
}

export default Authors
