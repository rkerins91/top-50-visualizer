import React, { Component } from 'react';
import '../App.css';
import Navbar from './Navbar'
import Chart from './Chart';
import SongList from './SongList';
import { connect } from 'react-redux'
import { gotSongs, gotFeatures } from '../store'
import { data, features } from '../dummyData'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getSongs(data)
    this.props.getFeatures(features)
  }

  render() {
    return (
      <>
        <Navbar id='nav'/>
        <div id='main'>
          <Chart className='chart-container' data={this.props.data} options={this.props.options}/>
          <SongList id='song-list' />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.chartData,
    options: state.chartOptions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSongs: data => dispatch(gotSongs(data)),
    getFeatures: songs => dispatch(gotFeatures(songs))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);