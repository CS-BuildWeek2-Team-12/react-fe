import React from 'react'

function RoomPlayers({players}) {
  return (
    <>
    <h3 className="playerHeader">Players In Room: </h3>
    <ul className="players">
      {players.length > 0 ? players.map((player, index) => (
        <li key={index}>{player}</li>
      )) : <li>No One Is Here!!!</li>}
    </ul>
    </>
  )
}

export default RoomPlayers