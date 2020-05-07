import React, { useMemo, useState } from 'react'
import { Box, Container, Flex, Heading, Text } from '@theme-ui/components'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAxios } from './Axios'
import EmbedGraph from '../components/EmbedGraph'
import * as R from 'ramda'
import CollapsibleWell from './CollapsibleWell'
import Paginate from './Paginate'

const SubgraphCollapsible = ({ id, name, graph }) => {
  const axios = useAxios()
  const [loaded, setLoaded] = useState(false)
  const viewGraph = ids => {
    return new Promise(resolve => axios.post('/api/graph', { ids, name }).then(({ data }) => {
      // setGraphName(data.name)
      resolve(name)
    }))
  }
  const handleOpen = async () => {
    setLoaded(await viewGraph(graph))
  }
  return (
    <CollapsibleWell key={id} header={`#${id}`} onOpen={handleOpen} defaultOpen={false}>
      {loaded ? <EmbedGraph graph={loaded}/> : 'loading'}
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
  const axios = useAxios()
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
            {
              <GraphsOfSize activeQuery={activeQuery} size={size} graphs={graphs}/>
            }
          </CollapsibleWell>
        ))
      }
    </Box>
  )
}

export default Insight
