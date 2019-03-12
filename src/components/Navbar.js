import React from 'react'
import { connect } from 'react-redux'
import { getChartProps } from '../store' 


const Navbar = (props) => {



  return(
    <div id={props.id}>
        <h1>Top 50 Visualizer</h1>
      <div>
        <button onClick={()=> props.changeChart('popularity')}>Popularity</button>
        <button onClick={()=> props.changeChart('danceability')}>Danceability</button>
        <button onClick={()=> props.changeChart('energy')}>Energy</button>
        <button onClick={()=> props.changeChart('loudness')}>Loudness</button>
        <button onClick={()=> props.changeChart('instrumentalness')}>Instrumentalness</button>
        <button onClick={()=> props.changeChart('liveness')}>Liveness</button>
        <button onClick={()=> props.changeChart('valence')}>Valence</button>
        <button onClick={()=> props.changeChart('tempo')}>Tempo</button>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    changeChart: (option) =>
      dispatch(getChartProps(option))
  }
}


export default connect(null, mapDispatchToProps)(Navbar)
