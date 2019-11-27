import React from 'react';
import Header from './Header';
import Summary from './Summary';
import Cubes from './Cubes';

import './App.css';

const STATUSES = ['ONLINE', 'OFFLINE', 'FAULTED'];
const STATES = ['ON', 'OFF'];
const ROLES = ['STORAGE', 'COMPUTE', 'HYBRID'];
const STORAGE_TYPES = ['HDD', 'SSD'];

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {nodes:[]};
    this.getNodes = this.getNodes.bind(this);
  }

  componentDidMount() {
    let nodes = this.getNodes();
    this.setState({ nodes: nodes })
  }

  getNodes(){
    var nodes = [];
    var count = 1 + Math.floor(Math.random() * 10); // 1-10
    for (var i = 0; i < count; i++){
        var node = {};
        node['name'] = 'Node' + (i+1);
        node['rpool'] = 'default'; // Resource pool

        var roleIdx =  Math.floor(Math.random() * 3); // 0-2
        node['role'] = ROLES[roleIdx];

        var stateIdx =  Math.floor(Math.random() * 2); // 0-1
        node['state'] = STATES[stateIdx];

        var statusIdx =  Math.floor(Math.random() * 3); // 0-2
        node['status'] = STATUSES[roleIdx];

        if (node['role'] !== 'COMPUTE'){ // STORAGE / HYBRID
            // Generate storage resouces
            node['storage'] = {};
            for (var j = 0; j < STORAGE_TYPES.length; j++){
                var total = 1 + Math.floor(Math.random() * 10 * 1024); // 1GB-10TB (10 * 1024 GB)
                var used = Math.floor(Math.random() * total); // 0GB-(total-1)
                node['storage'][STORAGE_TYPES[j]] = {
                    'total': total * 1024 * 1024 * 1024, // (bytes)
                    'used': used * 1024 * 1024 * 1024 // (bytes)
                };
            }
        }

        if (node['role'] !== 'STORAGE'){ // COMPUTE / HYBRID
            // Generate compute resouces
            var memory = 1 + Math.floor(Math.random() * 300); // 1-300GB
            node['memory'] = memory * 1024 * 1024 * 1024; // (bytes)
            var cores = 1 + Math.floor(Math.random() * 20); // 1-20
            node['cores'] = cores;
            var apps = 1 + Math.floor(Math.random() * 20); // 1-20
            node['apps'] = apps;
            var containers = apps + Math.floor(Math.random() * 21); // apps-(apps+20)
            node['containers'] = containers;
        }
        nodes.push(node);
    }
    return nodes;
}


  render() {
    let nodes = this.state.nodes;
    return (
      <div className="App">
        <Header count={nodes.length}/>
        <Summary nodes={nodes}/>
        <Cubes nodes={nodes} />
      </div>
    );
  }
}

export default App;
