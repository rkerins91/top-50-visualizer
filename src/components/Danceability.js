import React from 'react'
import BarChart from './BarChart'


const Danceability = (props) => {
  const danceability = props.features.map(ele => ele.danceability)
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
      {data: danceability,
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
      text: 'Danceability of Your Top 50',
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

export default Danceability
