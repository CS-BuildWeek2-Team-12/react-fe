import React from 'react'
import map from '../../assets/worldMap.png';

function AsciiMap({showMap, toggleMap}) {
  return (
    <div  id="map" className={`${showMap ? "" : "hidden"}`}>
      <img onClick={toggleMap} src={map} />
    </div>
  )
}

export default AsciiMap
