import React, { useMemo, useState } from 'react'
import { Box, Text } from '@theme-ui/components'
import { useAxios } from './Axios'
import EmbedGraph from '../components/EmbedGraph'
import CollapsibleWell from './CollapsibleWell'
import Paginate from './Paginate'
import { AuthorTableByIds } from './AuthorTable'

const SubgraphCollapsible = ({ id, name, graph }) => {
  const axios = useAxios()
  const [loaded, setLoaded] = useState(false)
  const [response, setResponse] = useState({})
  const viewGraph = ids => {
    return new Promise(resolve => axios.post('/api/graph', { ids, name }).then(({ data }) => {
      resolve(true)
      setResponse(data)
    }))
  }
  const handleOpen = async () => {
    setLoaded(await viewGraph(graph))
  }
  return (
    <CollapsibleWell key={id} header={`#${id}`} onOpen={handleOpen} defaultOpen={false}>
      {loaded ? <Box>
        {response.max_degree && response.argmax_degree &&
        <Text>max degree is {response.max_degree} and id {response.argmax_degree.join(',')}</Text>}
        {response.name && <EmbedGraph graph={response.name}/>}
        {response.error && <Text>error: {response.error}</Text>}
        {response.message && <Text>{response.message}</Text>}
      </Box> : 'loading'}
      <AuthorTableByIds ids={graph}/>
    </CollapsibleWell>
  )

}

const GraphsOfSize = ({ activeQuery, size, graphs }) => {
  const pageSize = 20
  const numPages = useMemo(() => Math.ceil(graphs.length / pageSize), [graphs])
  const [page, setPage] = useState(0)
  return <Box>
    {numPages > 1 && <Paginate numPages={numPages} page={page} onChange={setPage}/>}
    {graphs.slice(page * pageSize, page * pageSize + pageSize).map((graph, k) => {
      const id = page * pageSize + k
      return <SubgraphCollapsible
        id={id}
        name={'filter_' + encodeURIComponent(activeQuery) + '_' + size + '_' + id + '.html'}
        graph={graph}
      />
    })}
  </Box>
}

const Insight = ({ activeQuery, subgraphs }) => {
  const groups = useMemo(() => {
    const g = {}
    subgraphs.forEach((graph) => {
      if (!g[graph.length]) {
        g[graph.length] = []
      }
      g[graph.length].push(graph)
    })
    return Object.entries(g).sort(([l1], [l2]) => l2 - l1)
  }, [subgraphs])
  return (
    <Box>
      <Text>
        {subgraphs.reduce((p, c) => p + c.length, 0)} Authors, {subgraphs.length} Connected Subgraphs
      </Text>
      {
        groups.map(([size, graphs]) => (
          <CollapsibleWell key={size}
            header={`${graphs.length} subgraph${graphs.length && 's'} of size ${size} `}
            defaultOpen={false}>
            <GraphsOfSize activeQuery={activeQuery} size={size} graphs={graphs}/>
          </CollapsibleWell>
        ))
      }
    </Box>
  )
}

export default Insight
