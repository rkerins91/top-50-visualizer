import React from 'react'
import BarChart from './BarChart';


const Chart = (props) => {

  return (
    <BarChart options={props.options} data={props.data} id='chart-container'/>
  )
}

export default Chart
