import React from 'react'
import Square from './Square'


const socket = new WebSocket("ws://localhost:3000")


// receive a message from the server





export default class Chess extends React.Component {
    state = {
        board: [
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
        ],
        selected: '',
    }
    componentDidMount() {
        
        socket.addEventListener("message", ({ data }) => {
            const packet = JSON.parse(data)
        
            switch (packet.type) {
                case "connected":
                    this.setBoard(packet.content)
                    break
                case "board":
                    this.setBoard(packet.content)
                    break    
            }

            
        })
        
    }

    setBoard = (board) => {
        this.setState((prevState) => ({
            board: board,
            selected: prevState.selected
        }))
    }
    pieceSelected = (piece) => {
        this.setState((prevState) => ({board: prevState.board, selected: piece}))
        this.movePawn(piece)
        
    }
    movePawn = (piece) => {

        if(piece != "") 
            this.sendData({
                type: "move",
                content: piece
            })
        

    }

    sendData = (data) => {
        socket.send(JSON.stringify(data))
    }

    getSquare = (y, x) => {
        try {
            let square = this.state.board[y][x]
            return square
        } catch (e) {
            console.error(e)
        }
    }

    render () {
        const gridWidth = 8
        const gridHeight = 8
        let white = true
        let black = false // unnecessary

        let squares = []
        for (let row = 0; row < gridWidth; row++) {
            white = !white
            black = !black
            for (let col = 0; col < gridHeight; col++) {
                white = !white
                black = !black
                
                squares.push(
                    {
                        posX: col,
                        posY: row,
                        white: white,
                        black: black
                    }
                )
            }
        }
        // console.log(this.state.board)
        return (
            <div className="grid">
                {
                    squares.map((square) => (
                        <Square 
                            key={"X"+square.posX+"Y"+square.posY}
                            posX={square.posX+1}
                            posY={square.posY+1}
                            white={square.white}
                            black={square.black}
                            selected={this.getSquare(square.posY, square.posX) == this.state.selected}
                            piece={this.getSquare(square.posY, square.posX)}
                            pieceSelected={this.pieceSelected}
                        /> 
                    ))
                }
            </div>
        )
    }
}


async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    console.log(response.json())
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
