import React, { Component } from 'react'

class SpotifyLogin extends Component {
  constructor () {
    super()
  }

  
  

  render() {
    return (
      <div id='spotify-login-container'>
        <h3>My Top 50 Visualizer</h3>
        <button id="spotify-login-button" type='btn'
          onClick={()=>window.location = 'http://localhost:3000/login'}>Login with Spotify</button>
        <p>Click the button above to view the attributes of your top 50 Spotify songs</p>
      </div>
    )
  }
}

export default SpotifyLogin