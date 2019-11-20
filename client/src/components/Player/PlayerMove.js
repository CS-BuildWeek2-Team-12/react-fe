import React from 'react'

function PlayerMove({move, room}) {
  return (
    <div>
      <h3>Movement: </h3>
      <div className="moveControls">
        <p>&nbsp;</p>
        <p className={room.exits.includes('n') ? "" : "disabled"} onClick={() => move("n")}>&uarr;</p>
        <p>&nbsp;</p>
        <p className={room.exits.includes('w') ? "" : "disabled"} onClick={() => move("w")}>&larr;</p>
        <p>&nbsp;</p>
        <p className={room.exits.includes('e') ? "" : "disabled"} onClick={() => move("e")}>&rarr;</p>
        <p>&nbsp;</p>
        <p className={room.exits.includes('s') ? "" : "disabled"} onClick={() => move("s")}>&darr;</p>
        <p>&nbsp;</p>
      </div>
    </div>
  )
}

export default PlayerMove
