import React from 'react'

function RoomItems({items}) {
  return (
    <ul className="inventory">
      <li>Inventory:</li>
      {items.length > 0 ? items.map((item, index) => (
        <li key={index} >
          {item}
        </li>
      )) : <li>You Are Carrying Nothing</li>}
    </ul>
  )
}

export default RoomItems
