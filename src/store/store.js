import {data, features} from '../dummyData'
import {createStore} from 'redux'


const initialState = {
  songData: data,
  songFeatures: features,
  chartData: {},
  chartOptions: {}
}

const GET_CHART_PROPS = 'GET_CHART_PROPS'

const chartProps = option => {
  return {
    type: GET_CHART_PROPS,
    option
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_CHART_PROPS:
    const values = [], label = [], colors = []
    
    state.songFeatures.audio_features.forEach((ele, idx) => {
      values.push(ele[action.option])
      label.push(idx)
      colors.push('rgba(' + 
      (Math.floor(Math.random() * 128 + 64)) + ', ' +
      (Math.floor(Math.random() * 128 + 64)) + ', ' +
      (Math.floor(Math.random() * 128 + 64)) + ', .8)')
    })
      return {...state,
        chartData: {
          labels: label,
          datasets: [
            {data: values,
            backgroundColor: colors}
          ]
        },
        chartOptions: {
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
            text: action.option + 'of Your Top 50',
            fontSize: 25
          },
          legend: {
            display: false
          }
        }
      }
    default:
      return state
  }
}

const store = createStore(reducer)

export default store