import React, { Component } from 'react';
import '../App.css';
import Navbar from './Navbar'
import Chart from './Chart';
import SongList from './SongList';
import { connect } from 'react-redux'
import { getSongs, gotToken } from '../store'
import { data, features } from '../dummyData'
import queryString from 'query-string'
import SpotifyLogin from './SpotifyLogin'
import store from '../store'

class App extends Component {
  constructor(props) {
    super(props)
  }
  
  async componentDidMount() {
    const parsed = queryString.parse(window.location.search)
    this.props.getToken(parsed.access_token)
    await this.props.getSongs(parsed.access_token)
  }

  render() {
    return (
      <>
      {!this.props.accessToken ? (
        <div className='fill-viewport'>
          <img id="background" className="fill-viewport" src='static/images/background.png' />
          <div id='black-overlay' className='fill-viewport'>
            <SpotifyLogin />
          </div>
        </div>
      ) : (
        <>
        <Navbar id='nav'/>
        <div id='main'>
        {console.log(this.props)}
          <Chart className='chart-container' data={this.props.data} options={this.props.options}/>
          <SongList id='song-list' songs={this.props.songs}/>
        </div>
        </>)
      }
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.chartData,
    options: state.chartOptions,
    accessToken: state.accessToken,
    songs: state.songList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSongs: (token) => dispatch(getSongs(token)),
    getToken: token  => dispatch(gotToken(token))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);









































//  FIX STATE BY CHECKING IMMUTABILITY -- CONSIDER MULTIPLE STORE