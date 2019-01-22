// import {data, features} from '../dummyData'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'


const initialState = {
  songList: [],
  songPopularity: [],
  songFeatures: {},
  chartData: {},
  chartOptions: {},
  type: 'bar',
  accessToken: null
}

const GET_CHART_PROPS = 'GET_CHART_PROPS'
const GET_SONGS = 'GET_SONGS'
const GET_FEATURES = 'GET_FEATURES'
const GET_TOKEN = 'GET_TOKEN'

export const getChartProps = option => {
  return {
    type: GET_CHART_PROPS,
    option
  }
}

export const gotToken = token => {
  return {
    type: GET_TOKEN,
    token
  }
}

export const gotSongs = songs => {
  return {
    type: GET_SONGS,
    songs
  }
}

export const gotFeatures = songs => {
  return {
    type: GET_FEATURES,
    songs
  }
}


// THUNKS FOR GOT SONGS AND FEATURES
export const getSongs = (token) => async dispatch => {
  console.log('token', token)
  const { data } = await axios.post('/getSongs', {
      params: {
        token: token
      }
    }
  )
    console.log('data here', data)

  dispatch(gotSongs(data))
}

// export const getFeatures = (token) => async dispatch => {
//   console.log('token', token)
//   const ids = initialState.songList.map(ele => ele.id).join(',') 
//   const { data } = await axios.post('/getFeatures', {
//       params: {
//         token: token
//       }
//     }
//   )
//     console.log('data here', data)

//   dispatch(gotFeatures(data))
// }

const reducer = (state = initialState, action) => {
  switch(action.type) {
    // case GET_CHART_PROPS:
    // const values = [], label = [], colors = []
    
    // state.songFeatures.audio_features.forEach((ele, idx) => {
    //   action.option === 'popularity' ? values.push(state.songList[idx][1]) : values.push(ele[action.option])
    //   label.push(idx + 1)
    //   colors.push('rgba(' + 
    //   (Math.floor(Math.random() * 128 + 64)) + ', ' +
    //   (Math.floor(Math.random() * 128 + 64)) + ', ' +
    //   (Math.floor(Math.random() * 128 + 64)) + ', .8)')
    // })
    //   return {...state,
    //     chartData: {
    //       labels: label,
    //       datasets: [
    //         {data: values,
    //         backgroundColor: colors}
    //       ]
    //     },
    //     chartOptions: {
    //       scales: {
    //         maintainAspectRatio: true,
    //         xAxes: [{
    //             categorySpacing: 0,
    //             barPercentage: 1,
    //             categoryPercentage: 1
    //         }],
    //       },
    //       title: {
    //         display: true,
    //         text: action.option[0].toUpperCase() + action.option.slice(1) + ' of Your Top 50',
    //         fontSize: 25
    //       },
    //       legend: {
    //         display: false
    //       }
    //     }
    //   }
    case GET_TOKEN: 
      return {...state, accessToken: action.token}
    case GET_SONGS:
      return {...state, songList: action.songs}
    // case GET_FEATURES:
    //   return {...state, songFeatures: action.songs}
    default:
      return state
  }
}

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})))
const store = createStore(reducer, middleware)

export default store