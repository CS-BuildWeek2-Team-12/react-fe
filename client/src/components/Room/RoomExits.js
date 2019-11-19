import React from 'react'

function RoomExits({exits}) {
  return (
    <ul className="exits">
      <li>Exits:</li>
      {exits.map((exit, index) => (
        <li key={index}>{exit}</li>
      ))}
    </ul>
  )
}

export default RoomExits
