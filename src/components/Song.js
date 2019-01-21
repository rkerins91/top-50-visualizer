import React from 'react'

const Song = (props) => {

  return (
    <div className='single-song'>
      {props.number + ' - ' + props.title + ' - ' + props.artist}
    </div>
  ) 

}

export default Song