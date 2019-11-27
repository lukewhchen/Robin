import React from 'react';

export default function Header(props) {
  return (
    <div className="header-container">
      <div className="header-number">Nodes ({props.count})</div>
      <div className="icon-container">
        <i className="fa fa-calendar"></i>
      </div>
    </div>
  )
}
