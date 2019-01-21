import React from 'react'
import Song from './Song'
import { gotSongs } from '../store'
import {connect} from 'react-redux'

const SongList = (props) => {

  return (
    <div id={props.id}>
    {console.log(props)}
      {props.songs.items.map((song, idx) => {
        return <Song key={idx} title={song.name} artist={song.artists[0].name} number={idx + 1} />
      })}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    songs: state.songData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotSongs: () =>
      dispatch(gotSongs())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SongList)