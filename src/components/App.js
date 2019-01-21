import React, { Component } from 'react';
import '../App.css';
import Danceability from './Danceability' 

import Popularity from './Popularity'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <div id='bar'>
            <Route to='/danceability'
              render={(props) => 
                <Danceability {...props} 
                features={this.props.state.features.audio_features}
                data={this.props.state.data.items}
                />
              }
            />
            <Route to='/popularity'
              render={(props) => 
                <Danceability {...props} 
                features={this.props.state.features.audio_features}
                data={this.props.state.data.items}
                />
              }
            />
              
          {/* <div id='song-list'>
            <SongList songs={this.props.state.data.items.map(item => item.name)}/>
          </div> */}
        </div>
        </div>
    );
  }
}

export default App;