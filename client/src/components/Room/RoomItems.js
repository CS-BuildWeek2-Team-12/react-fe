import React from 'react'

function RoomItems({items}) {
  return (
    <ul className="inventory">
      <li>Inventory:</li>
      {items.length > 0 ? items.map((item, index) => (
        <li key={index} >
          {item}
        </li>
      )) : <li>There is nothing in this room</li>}
    </ul>
  )
}

export default RoomItems
