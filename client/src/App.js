import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import RoomTitle from './components/Room/RoomTitle';
import RoomId from './components/Room/RoomId';
import RoomMessages from './components/Room/RoomMessage';
import RoomExits from './components/Room/RoomExits';
import RoomDescription from './components/Room/RoomDescription';
import RoomErrors from './components/Room/RoomErrors';
import RoomCoordinates from './components/Room/RoomCoordinates';
import RoomPlayers from './components/Room/RoomPlayers';
import RoomItems from './components/Room/RoomItems';
import RoomInfo from './components/Room/RoomInfo';
import PlayerActions from './components/Player/PlayerActions';
import axios from 'axios';
import PlayerStatus from './components/Player/PlayerStatus';

// ===========================
// =======  COMPONENT   ======
// ===========================

class App extends Component {
  // state = {
  //   room: {
  //     "room_id": 0,
  //     "title": "A brightly lit room",
  //     "description": "You are standing in the center of a brightly lit room. You notice a shop to the west and exits to the north, south and east.",
  //     "coordinates": "(60,60)",
  //     "elevation": 0,
  //     "terrain": "NORMAL",
  //     "players": ["player401", "player402", "player403", "player404", "player405", "player406", "player407", "player408", "player409", "player410", "player411", "player413", "player414", "player415", "player416", "player417", "player418", "player419", "player420", "player421", "player422", "player423", "player424", "player426", "player427", "player428", "player429", "player430", "player431", "player432", "player435", "player436", "player437", "player438", "player439", "player441", "player443", "player444", "player445", "player446", "player447", "player448", "player449", "player450", "player451", "player452", "player453", "player454", "player455", "player456", "player457", "player458", "player459", "player460", "player461", "player462", "player465", "player466", "player467", "player468", "player469", "player470", "player471", "player472", "player473", "player474", "player475", "player476", "player477", "player478", "player479", "player480", "player481", "player482", "player483", "player484", "player485", "player486", "player487", "player488", "player489", "player490", "player491", "player492", "player493", "player494", "player495", "player496", "player497", "player498", "player499", "player500"],
  //     "items": ["small treasure", "small treasure", "small treasure", "small treasure"],
  //     "exits": ["n", "s", "e", "w"],
  //     "cooldown": 1.0,
  //     "errors": [],
  //     "messages": ["You have moved South"]
  //   }
  // }
  state = {
    room: {
      "room_id": 0,
      "title": "",
      "description": "",
      "coordinates": "",
      "elevation": 0,
      "terrain": "",
      "players": [],
      "items": [],
      "exits": [],
      "cooldown": 0,
      "errors": [],
      "messages": []
    },
    player: {
      "name": "",
      "cooldown": 1.0,
      "encumbrance": 0,
      "strength": 10,
      "speed": 10,
      "gold": 0,
      "bodywear": null,
      "footwear": null,
      "inventory": [],
      "status": [],
      "has_mined": false,
      "errors": [],
      "messages": []
    }
  }

  checkStatus = () => {
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/status/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then(({data}) => this.setState({player: data}))
      .catch(err => console.log("error", err))
  }

  initPlayer = () => {
    axios({
      method: "get",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/init/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then(({data}) => this.setState({room: data}))
      .catch(err => console.log("error", err))
  }

  move = (direction) => {
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/move/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      },
      data: {direction}
      
    })
      .then(({data}) => this.setState({room: data}))
      .catch(err => console.log("error", err))
  }

  takeTreasure = () => {
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/take/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      },
      data: {'name': 'treasure'}
      
    })
      .then(({data}) => this.setState({room: data}))
      .catch(err => console.log("error", err))
  }

  sellTreasure = () => {
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      },
      data: {'name': 'tiny treasure'}
      
    })
      .then(({data}) => this.setState({room: data}))
      .catch(err => console.log("error", err))
  }

  confirmSale = () => {
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      },
      data: {'name': 'treasure', 'confirm': 'yes'}
      
    })
      .then(({data}) => this.setState({room: data}))
      .catch(err => console.log("error", err))
  }

  render() {
    const {title, room_id, description, coordinates, elevation, terrain, players, items, exits, cooldown, errors, messages} = this.state.room
    return (
      <AppDiv>
        <Header/>
        <div className="container">
          <PlayerStatus player={this.state.player} />
          <div className="room">
            <div className="roomHeader">
              <RoomId room_id={room_id}/>
              <RoomCoordinates coordinates={coordinates} />
              <RoomTitle title={title}/>
              <RoomDescription description={description} />
            </div>
            <RoomErrors errors={errors} />
            <RoomMessages messages={messages} />
            <RoomItems items={items} />
            <RoomPlayers players={players} />
            <RoomInfo elevation={elevation} terrain={terrain} cooldown={cooldown} />
            <RoomExits exits={exits} />
          </div>
          <div className="playerControls">
            <h3 className="pcheading">Player Controls:</h3>
            <PlayerActions
              checkStatus={this.checkStatus}
              initPlayer={this.initPlayer}
              move={this.move}
              takeTreasure={this.takeTreasure}
              sellTreasure={this.sellTreasure}
              confirmSale={this.confirmSale}
            />
          </div>
        </div>
      </AppDiv>
    );
  }
}

export default App;

// ===========================
// =======    STYLES  ========
// ===========================

const AppDiv = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`