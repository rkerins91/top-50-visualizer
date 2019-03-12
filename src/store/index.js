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
  const { data } = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      params: {
        'time_range': 'medium_term',
        'limit': '50'
      }
    }
  )
  const songs = data.items.map(ele => 
    [ele.name, ele.popularity, ele.artists[0].name, ele.id])

  dispatch(gotSongs(songs))
  dispatch(getFeatures(token, songs))
  }


const getFeatures = (token, songs) => async dispatch => {
  console.log(initialState)
  const ids = songs.map(ele => ele[3]).join(',') 
  console.log(ids)
  const { data } = await axios.get('https://api.spotify.com/v1/audio-features', {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    params: {
      'ids': ids
    }
    }
  )
    console.log('data here', data)

  dispatch(gotFeatures(data.audio_features))
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_CHART_PROPS:
    const values = [], label = [], colors = []
    
    state.songFeatures.forEach((ele, idx) => {
      action.option === 'popularity' ? values.push(state.songList[idx][1]) : values.push(ele[action.option])
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
    case GET_TOKEN: 
      return {...state, accessToken: action.token}
    case GET_SONGS:
      return {...state, songList: action.songs}
    case GET_FEATURES:
      return {...state, songFeatures: action.songs}
    default:
      return state
  }
}

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})))
const store = createStore(reducer, middleware)

export default store