import React, { Component, PropTypes } from 'react'
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

class Map extends Component {

  static childContextTypes = {
    map: PropTypes.object
  }

  state = {
    map: null
  }

  getChildContext = () => ({
    map: this.state.map
  })

  componentDidMount() {
    MapboxGl.accessToken = 'pk.eyJ1IjoiYWxscnlkZXIiLCJhIjoidWs5cUFfRSJ9.t8kxvO3nIhCaAl07-4lkNw'

    const map = new MapboxGl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/light-v9'
    })

    map.flyTo({ center: [13.29, 52.51], zoom: 9 })

    map.on('load', (...args) => {
      this.setState({ map })
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.children !== this.props.children ||
      nextState.map !== this.state.map
    )
  }

  render() {
    const { children } = this.props
    const { map } = this.state
    return (
      <div className='Map' ref={(x) => { this.container = x }}>
        { map && children }
      </div>
    )
  }
}

export default Map
