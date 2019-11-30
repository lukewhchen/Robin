import React from 'react';

export default function Card(props) {
  let node = props.node;
  let role = node.role[0];
  let name = node.name;
  let pool = node.rpool;
  let containers = node.containers || 0;
  let apps = node.apps || 0;
  let cpus = node.cores || "N/A"
  let memory = Math.round(node["memory"]/1000000000) || "N/A";
  let hdd;
  let ssd;
  let memUnit;
  if ( memory !== "N/A") memUnit = "GB";
  let hhdUnit = "N/A";
  let ssdUnit = "N/A";
  if (node["storage"]) {
    hdd = Math.round(node["storage"]["HDD"]["used"]/1000000000);
    ssd = Math.round(node["storage"]["SSD"]["used"]/1000000000);
    if (hdd >= 1000) {
      hdd = Math.round(hdd/1000*10)/10;
      hhdUnit = "TB";
    } else {
      hhdUnit = "GB"
    }
    if (ssd >= 1000) {
      ssd = Math.round(ssd/1000*10)/10;
      ssdUnit = "TB";
    } else {
      ssdUnit = "GB"
    }
  }

  let status = <div className="status"></div>

  if ( node.status === "FAULTED") {
    status = <div className="faulted"></div>
  }

  if ( node.status === "OFFLINE") {
    status = <div className="offline"></div>
  }

  let state = <div className="state-on"></div>
  if ( node.state === "OFF") {
    state = <div className="state-off"></div>
  }


  return (
    <div className="card">

    <div className="card-header">
      <div className="upper-header">
        <div className="role-box">{role}</div>
        <div className="name">{name}</div>
        {state}
      </div>
      <div className="pool">{pool}</div>
    </div>
    {status}
    <div className="card-body">
      <div className="body-item">
        <h2>{containers}</h2>
        <p>Containers</p>
      </div>
      <div className="body-item">
        <h2>{apps}</h2>
        <p>Applications</p>
      </div>
    </div>

    <div className="card-footer">
      <div className="bar">CPUs <span className="val">{cpus}</span></div>
      <div className="bar">Memony <span className="val">{memory} {memUnit}</span></div>
      <div className="bar">Storage (HDD) <span className="val">{hdd} {hhdUnit}</span></div>
      <div className="bar">Storage (SSD) <span className="val">{ssd} {ssdUnit}</span></div>
    </div>


    </div>
  )
}
