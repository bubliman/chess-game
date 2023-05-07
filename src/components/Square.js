import React from "react"
let white
export default class Square extends React.Component {
    state = {
        selected: false
    }

    pieceClicked = () => {
        if (this.props.piece[0] != '0') {
            // this.setState((prevState) => ({selected: !prevState.selected}))
            this.props.pieceSelected(this.props.piece)

        }
    }
    render () {
        return (   
            <div 
            className={`square ${this.props.white == true ? 'w' : 'b'} row-${this.props.posY} col-${this.props.posX}${this.props.piece == 0 ? '' : ' piece'}${this.props.selected == true ? ' selected' : ''}`} 
            onClick={this.pieceClicked} 
            style={{gridColumn: this.props.posX, gridRow: this.props.posY}}
            >
                <div 
                className={this.props.piece}
                style={this.props.piece != '0' ? {backgroundImage: `url('https://www.chess.com/chess-themes/pieces/neo/100/${this.props.piece[0]+this.props.piece[1]}.png')`} : undefined}
                > 
                </div>
            </div>
        )
    }
    
}












