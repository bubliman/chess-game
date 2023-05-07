import { WebSocketServer } from "ws"
import express from "express"


const ws_server = new WebSocketServer({ port: 3000 })
// const cors = require("cors");
const app = express();

let board = [
  ['br2', 'bn2', 'bb2', 'bk', 'bq', 'bb1', 'bn1', 'br1'],
  ['bp8', 'bp7', 'bp6', 'bp5', 'bp4', 'bp3', 'bp2', 'bp1'],
  ['0', '0', 'bk', '0', '0', '0', '0', '0'],
  ['0', 'bp9', 'bp0', '0', '0', '0', '0', '0'],
  ['0', 'wp9', '0', '0', '0', 'wp0', '0', '0'],
  ['0', '0', '0', '0', '0', '0', '0', '0'],
  ['wp1', 'wp2', 'wp3', 'wp4', 'wp5', 'wp6', 'wp7', 'wp8'],
  ['wr1', 'wn1', 'wb1', 'wk', 'wq', 'wb2', 'wn2', 'wr2'],
] 

// app.use(cors());
app.use(express.json());

ws_server.on("connection", (socket) => {
  // send a message to the client
  socket.send(JSON.stringify({
      type: "connected",
      content: board
  }))

  socket.on("message", (data) => {
      const packet = JSON.parse(data)

      // drop too long messages and "whitespace" only messages
      //if((packet.content.length > 600 || packet.content.trim() === "") && packet.type == "message")
      //  return false

      switch (packet.type) {
          case "move":
              console.log(packet.conent)
              movePawn(packet.content)
              sendData(socket, {
                type: "board",
                content: board
            })
              break
      }
  })

  // socket.on("close", (code, reason) => {
  //     const msg = `${socket.username} left.`
  //     broadcast(ws_server, { type: "disconnect", content: msg })
  //     sendConnected(ws_server)
  //     sendPrecense(ws_server)
  // })
})



const broadcast = (ws, message, skip = "") => {
  ws.clients.forEach(function each(client) {
      if (client.username != skip)
          client.send(JSON.stringify(message))
  })
}

function sendData(socket, message) {
  socket.send(JSON.stringify(message))
}







// let board = [
//   ['br2', 'bn2', 'bb2', 'bk', 'bq', 'bb1', 'bn1', 'br1'],
//   ['bp8', 'bp7', 'bp6', 'bp5', 'bp4', 'bp3', 'bp2', 'bp1'],
//   ['0', '0', 'bk', '0', '0', '0', '0', '0'],
//   ['0', 'bp9', 'bp0', '0', '0', '0', '0', '0'],
//   ['0', 'wp9', '0', '0', '0', 'wp0', '0', '0'],
//   ['0', '0', '0', '0', '0', '0', '0', '0'],
//   ['wp1', 'wp2', 'wp3', 'wp4', 'wp5', 'wp6', 'wp7', 'wp8'],
//   ['wr1', 'wn1', 'wb1', 'wk', 'wq', 'wb2', 'wn2', 'wr2'],
// ] 

// app.get("/board", (req, res) => {
//   console.log('sending ' + board)
//   res.json({board: board})
// });

// app.post("/move", (req, res) => { 
//   // console.log(req.body.piece)
  
//   // console.log(board[6][0])
//   movePawn(req.body.piece)
//   // console.log(board[6][0])
//   res.json({board: board})
// });

// app.listen(8000, () => {
//   console.log(`Server is running on port 8000.`)
// });
  
 

const movePawn = (piece) => {
  for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
          if (board[row][col] == piece) {
              if (board[row][col][0]+board[row][col][1] == 'wp') {
                try {
                  board[row-1][col] = board[row][col]
                  board[row][col] = '0'
                } catch (e) {

                }
              }
          }
      } 
  }
  // console.log(board) 
  
}



// class Square {
//   constructor (x, y, piece) {
//       this.piece = piece
//       this.x = x
//       this.y = y
//   }


// }

// class Piece {
//   constructor () {
//     if (this.constructor == Piece) {
//       throw new Error("Abstract classes can't be instantiated.");
//     }
//   }
  
//   getHints() {

//   }
// }


// class Board {
//   constructor () {
//     this.board = []
    
//   }

//   createPawnRow(y) {
//     for (let x = 0; x < 8; x++) {
//         this.board[y][x] = new Square(x, y, new Pawn)
//     }
//   }
// }

// class Player {
//   constructor () {
      
//   }
// }

// class Move {
//   constructor () {
      
//   }
// }

// class Game {
//   constructor () {
      
//   }
// }



