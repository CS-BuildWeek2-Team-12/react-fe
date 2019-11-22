import React from 'react'

function PlayerMove({move, room, fly}) {
  return (
    <div>
      <h3>{move ? "Movement:" : "Fly:"} </h3>
      <div className="moveControls">
        <p>&nbsp;</p>
        <p className={room.exits.includes('n') ? "" : "disabled"} onClick={() => move ? move("n") : fly("n")}>&uarr;</p>
        <p>&nbsp;</p>
        <p className={room.exits.includes('w') ? "" : "disabled"} onClick={() => move ? move("w") : fly("w")}>&larr;</p>
        <p>&nbsp;</p>
        <p className={room.exits.includes('e') ? "" : "disabled"} onClick={() => move ? move("e") : fly("e")}>&rarr;</p>
        <p>&nbsp;</p>
        <p className={room.exits.includes('s') ? "" : "disabled"} onClick={() => move ? move("s") : fly("s")}>&darr;</p>
        <p>&nbsp;</p>
      </div>
    </div>
  )
}

export default PlayerMove
