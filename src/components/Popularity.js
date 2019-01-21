import React from 'react'
import BarChart from './BarChart'


const Popularity = (props) => {
  const popularity = props.data.map(ele => ele.popularity)
  const label = props.features.map((ele, idx) => idx + 1)
  const colors = props.features.map(ele => 
      'rgba(' + 
        (Math.floor(Math.random() * 128 + 64)) + ', ' +
        (Math.floor(Math.random() * 128 + 64)) + ', ' +
        (Math.floor(Math.random() * 128 + 64)) + ', .8)'
    )
  console.log(colors)
  const data = {
    labels: label,
    datasets: [
      {data: popularity,
      backgroundColor: colors}
    ]
  }
  const options = {
    scales: {
      maintainAspectRatio: true,
      xAxes: [{
          categorySpacing: 0,
          barPercentage: 1,
          categoryPercentage: 1
      }],
    },
    title: {
      display: true,
      text: 'Popularity of Your Top 50',
      fontSize: 25
    },
    legend: {
      display: false
    }
  }

  return (
      <BarChart data={data} options={options} />
  )
}

export default Popularity