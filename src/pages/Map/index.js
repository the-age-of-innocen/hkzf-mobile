import React from 'react'
import './index.scss'

class Map extends React.Component {
  render() {
    return (
      <div className="map" id="map">
        我是Map
      </div>
    )
  }
  componentDidMount() {
    const map = new window.BMap.Map('map')
    const point = new window.BMap.Point(121.61895125119062, 31.040452304898167)
    map.centerAndZoom(point, 20)
  }
}

export default Map
