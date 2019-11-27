import React from 'react';
import Square from './Square'

export default function Summary(props) {
  // var jsonStr = JSON.stringify(props.nodes)

  let computeNodes = 0;
  let storageNodes = 0;
  let hybridNodes = 0;
  let resourcePools = 1;
  let cpuCores = 0;
  let memory = 0;
  let hddTotal = 0;
  let hddCapacity = 0;
  let ssdTotal = 0;
  let ssdCapacity = 0;

  props.nodes.forEach( node => {
    if (node["role"] === "COMPUTE") computeNodes++;
    if (node["role"] === "STORAGE") storageNodes++;
    if (node["role"] === "HYBRID") hybridNodes++;
    if (node["cores"]) cpuCores+=node["cores"];
    if (node["memory"]) memory+=Math.round(node["memory"]/1000000000)
    if (node["storage"]) {
        hddTotal+=Math.round(node["storage"]["HDD"]["total"]/1000000000)
        hddCapacity+=Math.round(node["storage"]["HDD"]["used"]/1000000000)
        ssdTotal+=Math.round(node["storage"]["SSD"]["total"]/1000000000)
        ssdCapacity+=Math.round(node["storage"]["SSD"]["used"]/1000000000)
      }
  })

  return (
    <div className="summary-container">
      <div className="nodes-summary">
        <Square number={computeNodes} description="Compute Nodes"/>
        <Square number={storageNodes} description="Storage Nodes"/>
        <Square number={hybridNodes} description="Hybrid Nodes"/>
        <Square number={resourcePools} description="Resource Pools"/>
      </div>
      <div className="resouces-summary">
        <Square number={cpuCores} description="CPU Cores"/>
        <Square number={memory} description="Memory"/>
        <Square number={hddCapacity} description="HDD Capacity"/>
        <Square number={ssdCapacity} description="SSD Capacity"/>
      </div>
    </div>
  )
}
