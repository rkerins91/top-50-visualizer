import React, { Component } from 'react';
import '../App.css';
import Navbar from './Navbar'
import Chart from './Chart';
import SongList from './SongList';
import { connect } from 'react-redux'
import { gotSongs, gotFeatures, gotToken } from '../store'
import { data, features } from '../dummyData'
import queryString from 'query-string'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  //   // const parsed = queryString.parse(window.location.search)
  //   // this.props.getToken(parsed.access_token)
       this.props.gotSongs(data)
  //   this.props.getFeatures(features)
  //   // console.log(this.props.songs)
  }

  render() {
    return (
      <>
        <Navbar id='nav'/>
        <div id='main'>
        {console.log(this.props)}
          <Chart className='chart-container' data={this.props.data} options={this.props.options}/>
          <SongList id='song-list' songs={this.props.songs}/>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.chartData,
    options: state.chartOptions,
    accessToken: state.accessToken,
    songs: state.songData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotSongs: (data) => dispatch(gotSongs(data)),
    getFeatures: (data) => dispatch(gotFeatures(data)),
    getToken: token  => dispatch(gotToken(token))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);