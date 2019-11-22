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
import utf8 from 'utf8';
import sha256 from 'js-sha256'
import AsciiMap from './components/Map/AsciiMap';

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
    },
    examine: {
      "name": "Wishing Well",
      "description": "You see a faint pattern in the water...\n\n10000010\n00000001\n01001101\n01001000\n00000001\n10000010\n00000001\n01101001\n01001000\n00000001\n10000010\n00000001\n01101110\n01001000\n00000001\n10000010\n00000001\n01100101\n01001000\n00000001\n10000010\n00000001\n00100000\n01001000\n00000001\n10000010\n00000001\n01111001\n01001000\n00000001\n10000010\n00000001\n01101111\n01001000\n00000001\n10000010\n00000001\n01110101\n01001000\n00000001\n10000010\n00000001\n01110010\n01001000\n00000001\n10000010\n00000001\n00100000\n01001000\n00000001\n10000010\n00000001\n01100011\n01001000\n00000001\n10000010\n00000001\n01101111\n01001000\n00000001\n10000010\n00000001\n01101001\n01001000\n00000001\n10000010\n00000001\n01101110\n01001000\n00000001\n10000010\n00000001\n00100000\n01001000\n00000001\n10000010\n00000001\n01101001\n01001000\n00000001\n10000010\n00000001\n01101110\n01001000\n00000001\n10000010\n00000001\n00100000\n01001000\n00000001\n10000010\n00000001\n01110010\n01001000\n00000001\n10000010\n00000001\n01101111\n01001000\n00000001\n10000010\n00000001\n01101111\n01001000\n00000001\n10000010\n00000001\n01101101\n01001000\n00000001\n10000010\n00000001\n00100000\n01001000\n00000001\n10000010\n00000001\n00110100\n01001000\n00000001\n10000010\n00000001\n00110100\n01001000\n00000001\n10000010\n00000001\n00110100\n01001000\n00000001\n00000001",
      "cooldown": 7.5,
      "errors": [],
      "messages": [],
      
    },
    "input": "",
    "dashNums": "",
    "dashDir": "",
    "flyDir": "",
    "wear": "",
    "ghost": "",
    'sellItem': "",
    "showMap": false
  }

  wait = cd => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(cd)
      }, cd * 1000);
    })
  }

  fly = (direction) => {
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/fly/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      },
      data: {
        "direction": direction
      }
    })
      .then(({data}) => this.setState({room: data}))
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
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
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
    }

    carry = () => {
      axios({
        method: "post",
        url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/carry/`,
        headers: {
          Authorization: `Token ${process.env.REACT_APP_TOKEN}`
        },
        data: {
          "name": this.state.ghost
        }
      })
        .then(({data}) => alert(JSON.stringify.fy(data)))
        .catch(err => {
          alert(JSON.stringify(err))
          console.log("error", err)
        })
    }
    
    receive = () => {
      axios({
        method: "post",
        url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/receive/`,
        headers: {
          Authorization: `Token ${process.env.REACT_APP_TOKEN}`
        },
        data: {
          'name': this.state.ghost
        }
      })
        .then(({data}) => alert(JSON.stringify.fy(data)))
        .catch(err => {
          alert(JSON.stringify(err))
          console.log("error", err)
        })
    }
    
    mine = (proof) => {
      console.log("FIRED")
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/bc/mine/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      }, data: {'proof': proof}
    })
      .then(({data}) => alert(JSON.stringify(data)))
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
  }

  lastProof = async () => {
    console.log("FIRED")
    const {data: last_proof} = await axios({
      method: "get",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/bc/last_proof/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      }
    })
    // .then(({data: last_proof}) => {
      alert( JSON.stringify(last_proof))
      return last_proof
    // })
    // .catch(err => {console.log("error", err)})
  }

  proof_of_work = (last_proof, difficulty) => {
    console.log("searching for proof...");
    let proof = 0

    const valid = "0".repeat(difficulty);

    while (!this.valid_proof(proof, last_proof, valid, difficulty)) {
      proof +=1;
      if (proof % 1000000 === 0) {
        console.log(proof);
      }
    }
    console.log("Proof found: ", proof);
    return proof
  }

  mineForCoin = async cd => {
    console.log("starting to mine coins...");
    await this.wait(cd);
    const last_proof = await this.lastProof()
    console.log("last proof: ", last_proof.proof, "difficulty: ", last_proof.difficulty)
    const proof = await this.proof_of_work(last_proof.proof, last_proof.difficulty)
    console.log("next valid proof", proof);
    const {data} = await this.mine(proof)
    console.log("mine data", data)
    return this.mineForCoin(data.cooldown)      
  }

  valid_proof = (proof, validProof, difficulty, last_proof) => {
    let guessStr = `${last_proof}${proof}`;
    console.log("GUESSString: ", guessStr)
    let guess = utf8.encode(guessStr);
    console.log("GUESS: ", guess)
    let guessHash = sha256.create().update(guess).hex().slice(0, difficulty);
    console.log("GUESSING: ", guessHash)
    return guessHash === validProof
  }
  
  balance = () => {
    console.log("FIRED")
    axios({
      method: "get",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/bc/get_balance/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then(({data}) => alert(JSON.stringify(data)))
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
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
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
  }

  dash = () => {
    let nums = this.state.dashNums.split(",")
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/dash/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      },
      data: {"direction": this.state.dashDir, "num_rooms": `${nums.length}`, "next_room_ids": this.state.dashNums

      }
    })
      .then(({data}) => this.setState({room: data}))
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
  }

  examine = () => {
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/examine/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      },
      data: {
        'name': this.state.input
      }
    })
      .then(({data}) => this.setState({examine: data}))
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
  }

  handleInputChange = ({target: {value, name}}) => {
    this.setState({
      [name]: value
    })
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
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
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
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
  }

  dropTreasure = () => {
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      },
      data: {'name': 'treasure'}
      
    })
      .then(({data}) => this.setState({room: data}))
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
  }

  sellTreasure = () => {
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      },
      data: {'name': this.state.sellItem}
      
    })
      .then(({data}) => this.setState({room: data}))
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
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
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
  }

  changeName = () => {
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/change_name/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      },
      data: {'name': 'Sean Pheneger', 'confirm':'aye'}
      
    })
      .then(({data}) => this.setState({room: data}))
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
  }

  pray = () => {
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/pray/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      }
      
    })
      .then(({data}) => this.setState({room: data}))
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
  }

  transmog = () => {
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/transmogrify/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      },
      data: {
        "name": 'treasure'
      }
    })
      .then(({data}) => this.setState({room: data}))
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
  }

  wear = () => {
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/wear/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      },
      data: {
        "name": this.state.wear
      }
      
    })
      .then(({data}) => this.setState({player: data}))
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
  }

  remove = () => {
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/undress/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      },
      data: {
        "name": this.state.wear
      }
      
    })
      .then(({data}) => this.setState({player: data}))
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
  }

  warp = () => {
    axios({
      method: "post",
      url: `https://lambda-treasure-hunt.herokuapp.com/api/adv/warp/`,
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`
      },
      data: {
        "room_id": 0
      }
      
    })
      .then(({data}) => alert(JSON.stringify(data)))
      .catch(err => {
        alert(JSON.stringify(err))
        console.log("error", err)
      })
  }

  toggleMap = () => {
    console.log("FIredddd")
    this.setState({showMap: !this.state.showMap})
  }

  render() {
    const {title, room_id, description, coordinates, elevation, terrain, players, items, exits, cooldown, errors, messages} = this.state.room
    return (
      <>
          <AsciiMap showMap={this.state.showMap} toggleMap={this.toggleMap}/>
      <AppDiv>
        <Header/>
        <div className="container">
          <PlayerStatus player={this.state.player} examineState={this.state.examine} toggleMap={this.toggleMap}/>
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
              room={this.state.room}
              checkStatus={this.checkStatus}
              initPlayer={this.initPlayer}
              move={this.move}
              takeTreasure={this.takeTreasure}
              sellTreasure={this.sellTreasure}
              confirmSale={this.confirmSale}
              dropTreasure={this.dropTreasure}
              changeName={this.changeName}
              pray={this.pray}
              examine={this.examine}
              handleInputChange={this.handleInputChange}
              input={this.state.input}
              dash={this.dash}
              dashDir={this.state.dashDir}
              dashNums={this.state.dashNums}
              lastProof={this.lastProof}
              balance={this.balance}
              mine={this.mineForCoin}
              transmog={this.transmog}
              wear={this.wear}
              remove={this.remove}
              fly={this.fly}
              flyDir={this.flyDir}
              wearString={this.state.wear}
              warp={this.warp}
              carry={this.carry}
              receive={this.receive}
              ghost={this.state.ghost}
              sellItem={this.state.sellItem}
            />
          </div>
        </div>
      </AppDiv>
      </>
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