import React from 'react'
import PlayerMove from './PlayerMove'

function PlayerActions({sellItem, carry, receive, ghost, warp, room, fly, flyDir, wear, remove, wearString, checkStatus, initPlayer, move, takeTreasure, sellTreasure, confirmSale, dropTreasure, changeName, pray, examine, input, handleInputChange, transmog, dash, dashNums, dashDir, lastProof, mine, balance}) {
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
          <button onClick={wear}>Wear Gear</button>
          <input value={wearString} onChange={handleInputChange} type='text' placeholder="jacket" name="wear" />
          <button onClick={remove}>Remove Gear</button>
        </div>
        <div className="playerModifications">
          <h3>Player Modifications:</h3>
          <button onClick={changeName}>Change Name</button>
          <button onClick={pray}>Pray To Shrine</button>
          <button onClick={transmog}>Transmogrify</button>
        </div>
        <div className="playerPowerUps">
          <h3>Player Powerups:</h3>
          <PlayerMove fly={fly} room={room}/>
          {/* <input value={flyDir} onChange={handleInputChange} type='text' placeholder="n" name="flyDir" /><br/>
          <button onClick={fly}>Fly</button> */}
          <input value={dashNums} onChange={handleInputChange} type='text' placeholder="10,8,120,6" name="dashNums" /><br/>
          <input value={dashDir} onChange={handleInputChange} type='text' placeholder="n" name="dashDir" />
          <button onClick={dash}>Dash</button>
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
          <input value={sellItem} onChange={handleInputChange} type='text' placeholder="item to sell..." name="sellItem" /><br/>
          <button onClick={confirmSale}>Confirm Sale</button>
        </div>
        <div className="playerGhost">
          <h3>Ghostly Companion:</h3>
          <input value={ghost} onChange={handleInputChange} type='text' placeholder="treasure" name="ghost" /><br/>
          <button onClick={carry}>Ghostly Carry</button>
          <button onClick={receive}>Ghostly Receive</button>
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
          <button onClick={warp}>Warp to start</button>
        </div>
      </div>
    </div>
  )
}

export default PlayerActions
