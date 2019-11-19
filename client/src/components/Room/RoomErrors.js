import React from 'react'

function RoomErrors({errors}) {
  return (
    <div>
      {errors.length > 0 && errors.map((error, index) => (
        <p key={index}>{error}</p>
      )) }
    </div>
  )
}

export default RoomErrors
