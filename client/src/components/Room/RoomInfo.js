import React from 'react'

function RoomInfo({elevation, terrain, cooldown}) {
  return (
    <ul className="info">
    <li>
      Elevation: {elevation}
    </li>
    <li>
      Terrain: {terrain}
    </li>
    <li>
      Cooldown: {cooldown}
    </li>

    </ul>
  )
}

export default RoomInfo
