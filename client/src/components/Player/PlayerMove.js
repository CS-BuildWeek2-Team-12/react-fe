import React from 'react'

function PlayerMove({move}) {
  return (
    <div>
      <h3>Movement: </h3>
      <div className="moveControls">
        <p>&nbsp;</p>
        <p onClick={() => move("n")}>&uarr;</p>
        <p>&nbsp;</p>
        <p onClick={() => move("w")}>&larr;</p>
        <p>&nbsp;</p>
        <p onClick={() => move("e")}>&rarr;</p>
        <p>&nbsp;</p>
        <p onClick={() => move("s")}>&darr;</p>
        <p>&nbsp;</p>
      </div>
    </div>
  )
}

export default PlayerMove
