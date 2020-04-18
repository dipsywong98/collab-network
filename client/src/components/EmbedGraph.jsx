import React from 'react'
import { useParams } from 'react-router-dom'

const EmbedGraph = () => {
  const { graph } = useParams()
  return (
    <iframe
      style={{
        height: '100%',
        width: '100%',
        borderStyle: 'none'
      }}
      src={`/graphFiles/${graph}.html`}
    />
  )
}

export default EmbedGraph
