import React, { useEffect, useState } from 'react'
import tableBuilder, { SmallLabel } from '../components/ResponsiveTable'
import { Box } from '@theme-ui/components'
import { useAxios } from './Axios'
import Paginate from './Paginate'

const AuthorTable = tableBuilder(['ID', 'Name', 'Affiliation', 'Tags'], ({ it: author }) => {
  return (
    <>
      <Box>{author.id}</Box>
      <Box><SmallLabel>Name</SmallLabel> {author.n}</Box>
      <Box><SmallLabel>Institute</SmallLabel> {author.a}</Box>
      <Box><SmallLabel>Tags</SmallLabel> {author.t}</Box>
    </>
  )
}, ['1fr', null, null, '100px 1fr 2fr 3fr'])

export const AuthorTableByIds = ({ ids }) => {
  const axios = useAxios()
  const [page, setPage] = useState(0)
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(false)
  const length = 10
  useEffect(() => {
    handlePaginate(0)
    setPage(0)
  }, [ids])
  const handlePaginate = (page) => {
    if (loading) return
    if (ids.length <= 0) return
    setLoading(true)
    axios.post('/api/filter/byid', { ids: ids.slice(page * length, page * length + length) }).then(({ data }) => {
      setAuthors(data)
      setLoading(false)
    })
    setPage(page)
  }
  return (
    <Box>
      <Paginate numPages={Math.ceil(ids.length / length)} page={page} onChange={handlePaginate}/>
      <AuthorTable items={authors}/>
    </Box>
  )
}

export default AuthorTable
