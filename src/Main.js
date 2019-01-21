import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Danceability from './components/Danceability'
import { data, features } from './dummyData' 
import SongList from './components/SongList'
import Popularity from './components/Popularity'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import App from './components/App'
import Navbar from './components/Navbar'

class Main extends Component {
  constructor() {
    super()
    this.state = {
      data: data,
      features: features
    }
  }

  render() {
    return (
      <div className='App'>
        <Navbar />
        <div id='main'>
          <div className='chart-container'>
            <App /> 
          </div>
          <div id='song-list'>
            <SongList songs={this.state.data.items.map(item => item.name)} id='song-list'/>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
