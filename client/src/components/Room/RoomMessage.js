import React from 'react'

function RoomMessages({messages}) {
  return (
    <ul className="messages">
      <li>Messages:</li>
      {messages.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
  )
}

export default RoomMessages