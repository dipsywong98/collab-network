import React from 'react'
import { useParams } from 'react-router-dom'

const EmbedGraph = ({ graph }) => {
  return (
    <iframe
      style={{
        height: '830px',
        width: '830px',
        borderStyle: 'none'
      }}
      src={`/graphFiles/${graph.replace(/\.html$/,'')}.html`}
    />
  )
}

export default EmbedGraph
