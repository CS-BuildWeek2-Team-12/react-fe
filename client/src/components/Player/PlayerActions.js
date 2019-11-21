import React from 'react'
import PlayerMove from './PlayerMove'

function PlayerActions({room, checkStatus, initPlayer, move, takeTreasure, sellTreasure, confirmSale, dropTreasure, changeName, pray, examine, input, handleInputChange, transmog, dash, dashNums, dashDir, lastProof, mine, balance}) {
  return (
    <div className="controlCenter">
      <div className="playerControls">
        <PlayerMove move={move} room={room}/>
        <div className="playerStatusChecks">
          <h3>Status Checking:</h3>
          <button onClick={checkStatus}>Check Status</button>
          <input value={input} onChange={handleInputChange} type='text' placeholder="Name of player or item" name="input" />
          <button onClick={examine}>Examine Item/Player</button>
        </div>
        <div className="playerClothingInteraction">
          <h3>Equipping Items:</h3>
          <button disabled>Wear Gear</button>
          <button disabled>Remove Gear</button>
        </div>
        <div className="playerModifications">
          <h3>Player Modifications:</h3>
          <button onClick={changeName}>Change Name</button>
          <button onClick={pray}>Pray To Shrine</button>
          <button onClick={transmog}>Transmogrify</button>
        </div>
        <div className="playerPowerUps">
          <h3>Player Powerups:</h3>
          <button disabled>Fly</button>
          <input value={dashNums} onChange={handleInputChange} type='text' placeholder="10,8,120,6" name="dashNums" /><br/>
          <input value={dashDir} onChange={handleInputChange} type='text' placeholder="n" name="dashDir" />
          <button disabled onClick={dash}>Dash</button>
          {/* <button onClick={dash}>Dash</button> */}
        </div>
      </div>
      <div className="itemControls">
        <div className="playerItemInteraction">
          <h3>Item interaction:</h3>
          <button onClick={takeTreasure}>Pick Up Item</button>
          <button onClick={dropTreasure}>Drop Item</button>
        </div>
        <div className="playerTreasureSelling">
          <h3>Treasure Selling:</h3>
          <button onClick={sellTreasure}>Check Treasure Price</button>
          <button onClick={confirmSale}>Confirm Sale</button>
        </div>
        <div className="playerGhost">
          <h3>Ghostly Companion:</h3>
          <button disabled>Ghostly Carry</button>
          <button disabled>Ghostly Receive</button>
        </div>
        <div className="playerMining">
          <h3>Mining Interactions:</h3>
          <button disabled>Mine</button>
          {/* <button onClick={mine}>Mine</button> */}
          <button onClick={lastProof}>Obtain Last Proof</button>
          <button onClick={balance}>Get Coin Balance</button>
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
