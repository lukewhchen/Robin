import React from 'react';
import Card from './Card'

export default function Cubes(props) {
  let cards = props.nodes.map( (node,idx) => <Card key={idx} node={node}/>);
  return (
    <div className="card-container">
      {cards}
    </div>
  )
}
