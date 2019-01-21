import {data, features} from '../dummyData'
import {createStore} from 'redux'


const initialState = {
  songData: data,
  songFeatures: features,
  chartData: {},
  chartOptions: {},
  type: 'bar'
}

const GET_CHART_PROPS = 'GET_CHART_PROPS'
const GET_SONGS = 'GET_SONGS'
const GET_FEATURES = 'GET_FEATURES'

export const getChartProps = option => {
  return {
    type: GET_CHART_PROPS,
    option
  }
}

export const gotSongs = user => {
  return {
    type: GET_SONGS,
    user
  }
}

export const gotFeatures = songs => {
  return {
    type: GET_FEATURES,
    songs
  }
}


// THUNKS FOR GOT SONGS AND FEATURES


const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_CHART_PROPS:
    const values = [], label = [], colors = []
    
    state.songFeatures.audio_features.forEach((ele, idx) => {
      action.option === 'popularity' ? values.push(state.songData.items[idx].popularity) : values.push(ele[action.option])
      label.push(idx + 1)
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
            text: action.option[0].toUpperCase() + action.option.slice(1) + ' of Your Top 50',
            fontSize: 25
          },
          legend: {
            display: false
          }
        }
      }
    case GET_SONGS:
      return {...state}
    case GET_FEATURES:
      return {...state}
    default:
      return state
  }
}

const store = createStore(reducer)

export default store