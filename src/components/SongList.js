import React from 'react'
import Song from './Song';

const SongList = (props) => {

  return (
    <div>
    { console.log(props)}
      {props.songs.map((song, idx) => {
        return <Song key={idx} title={song} number={idx + 1} />
      })}
    </div>
  )
}

export default SongList