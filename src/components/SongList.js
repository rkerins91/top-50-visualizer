import React from 'react'
import Song from './Song'
import { gotSongs } from '../store'
import {connect} from 'react-redux'

class SongList extends React.Component {
  constructor(props) {
    super(props)
    // console.log(props)
  }

  render() {
  return (
    <div id={this.props.id}>
    {/* {console.log('look at props here', this.props)} */}
      {this.props.songs.map((song, idx) => {
        return <Song key={idx} title={song[0]} number={idx + 1} artist={song[2]}/>
      })}
    </div>
  )
  }
}



export default /*connect(null, mapDispatchToProps)(*/SongList//)


