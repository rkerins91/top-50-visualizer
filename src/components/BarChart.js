import React from 'react'
import { Bar } from 'react-chartjs-2'


const BarChart = (props) => {
  
  return (
    <div id={props.id}>
      <Bar
        data={props.data}
        height={650}
        width={950}
        options={props.options}/>
    </div>
  )
}

export default BarChart
