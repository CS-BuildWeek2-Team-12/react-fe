import React from 'react'
import PlayerMove from './PlayerMove'

function PlayerActions({checkStatus, initPlayer, move}) {
  return (
    <div className="controlCenter">
      <div className="playerControls">
        <PlayerMove move={move}/>
        <div className="playerStatusChecks">
          <h3>Status Checking:</h3>
          <button onClick={checkStatus}>Check Status</button>
          <button>Examine Item/Player</button>
        </div>
        <div className="playerClothingInteraction">
          <h3>Equipping Items:</h3>
          <button>Wear Gear</button>
          <button>Remove Gear</button>
        </div>
        <div className="playerModifications">
          <h3>Player Modifications:</h3>
          <button>Change Name</button>
          <button>Pray To Shrine</button>
          <button>Transmogrify</button>
        </div>
        <div className="playerPowerUps">
          <h3>Player Powerups:</h3>
          <button>Fly</button>
          <button>Dash</button>
        </div>
      </div>
      <div className="itemControls">
        <div className="playerItemInteraction">
          <h3>Item interaction:</h3>
          <button>Pick Up Item</button>
          <button>Drop Item</button>
        </div>
        <div className="playerTreasureSelling">
          <h3>Treasure Selling:</h3>
          <button>Sell Treasure</button>
          <button>Confirm Sale</button>
        </div>
        <div className="playerGhost">
          <h3>Ghostly Companion:</h3>
          <button>Ghostly Carry</button>
          <button>Ghostly Recieve</button>
        </div>
        <div className="playerMining">
          <h3>Mining Interactions:</h3>
          <button>Mine</button>
          <button>Obtain Last Proof</button>
          <button>Get Coin Balance</button>
        </div>
        <div className="playerInit">
          <h3>Start Player:</h3>
          <button onClick={initPlayer}>Start</button>
        </div>
      </div>
    </div>
  )
}

export default PlayerActions
