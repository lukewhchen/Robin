import React from 'react';

export default function Square(props) {
  let unit;
  if (props.description === "Memory" ||
      props.description === "HDD Capacity" ||
      props.description === "SSD Capacity"
      ) unit = "GB"
  let number = props.number;
  if (number >= 1000) {
    number = Math.round(number/1000*10)/10;
    unit = "TB";
  }
  return (
    <div className="square">
      <div className="square-number">{number} {unit}</div>
      <div className="square-description">{props.description}</div>
      <i className="fa fa-database" aria-hidden="true" />
    </div>
  )
}
