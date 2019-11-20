import React from 'react'

function PlayerStatus({player}) {
  const {name, cooldown, encumbrance, strength, speed, gold, bodywear, footwear, inventory, status, has_mined, errors, messages} = player
  return (
    <div className="playerStatus">
      <p>Name: {name}</p>
      <p>Cooldown: {cooldown}</p>
      <p>Encumbrance: {encumbrance}</p>
      <p>Strength: {strength}</p>
      <p>Speed: {speed}</p>
      <p>Gold: {gold}</p>
      <p>Bodywear: {bodywear}</p>
      <p>Footwear: {footwear}</p>
      {has_mined ? <p>Has Mined: {has_mined}</p> : <p>Has Not Mined</p>}
        <ul>Inventory: {inventory.length > 0 ? inventory.map((item, index) => (
      <li key={index}>{item}</li>
        )) : "No Items"}</ul>
          <ul>Status: {status.length > 0 ? status.map((status, index) => (
      <li key={index}>{status}</li>
        )) : "No Status"}</ul>
          <ul>Errors: {errors.length > 0 ? errors.map((error, index) => (
      <li key={index}>{error}</li>
        )) : "No Errors"}</ul>
          <ul>Messages: {messages.length > 0 ? messages.map((message, index) => (
      <li key={index}>{message}</li>
        )) : "No Messages"}</ul>
    </div>
  )
}

export default PlayerStatus