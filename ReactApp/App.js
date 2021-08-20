import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'


class App extends Component {
  state = {
    endgame: false,
    move: "O",
    board: new Array(9),
    result: "",
    message: "",
    pattern: Array(0),
  }

  WinConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  tmpBoard = [null, null, null, null, null, null, null, null, null];

  updateBoard = () => {
      this.setState({board: this.tmpBoard});
  }

  isWinner = (board, move) => {
    for(let i=0; i<8; i++)
    {
      let allConds = true;
      for (let j=0; j<3; j++)
      {
        let p = this.WinConditions[i][j];
        if(board[p] !== move)
        {
          allConds = false;
          break;
        }
      }
      if (allConds)
      {
        return this.WinConditions[i];
      } 
    }
    
    return false;

  }

  isDraw = (board) => {
    for(let i=0; i<board.length; i++)
    {
      if (!board[i]) return false;
    }
    return true;

  }

  isEndGame = (board, move) => {
    let pattern = this.isWinner(board,move);
    if (pattern)
    {
      this.setState({endgame: true, pattern: pattern});
      if (move == "O") this.setState({result: "win", message: "You win!"});
      else this.setState({result: "loss", message: "You lost!"});
      return true;
    }
    else if (this.isDraw(board)) this.setState({endgame: true, result: "draw", message: "You draw!"});
    else return false;

  }

  botMove = () => {
    let legalMoves = Array();
    let loseThreads = Array();
    for (let i=0; i<9; i++)
    {
      if (!this.tmpBoard[i])
      {
        const board = [...this.tmpBoard];
        board[i] = "X";
        if (this.isWinner(board, "X"))
        {
          this.tmpBoard[i] = "X";
          return;
        }
        
        board[i] = "O";
        if (this.isWinner(board, "O"))
        {
          loseThreads.push(i);
        }
        legalMoves.push(i);

      }
    }
    let move = legalMoves[Math.floor(Math.random()*legalMoves.length)];
    if (loseThreads.length > 0) move = loseThreads[Math.floor(Math.random()*loseThreads.length)];
    this.tmpBoard[move] = "X";

  }

  onPress = (pos) => {
    if(!this.state.endgame && !this.state.board[pos] && this.state.move == "O")
    {
      this.tmpBoard[pos] = "O";
      if (this.isEndGame(this.tmpBoard, "O"))
      {
          this.updateBoard();
          return;
      }
      this.botMove();
      this.updateBoard();
      this.isEndGame(this.tmpBoard, "X");

    }
  }

  onReset = () => {
    this.setState({
      endgame: false,
      move: "O",
      board: new Array(9),
      result: "",
      message: "",
      pattern: Array(0),
    })

    this.tmpBoard = [null, null, null, null, null, null, null, null, null];
  }

  renderMessage(){
    if(this.state.endgame)
       return <Text style={styles.message_text}>{this.state.message}</Text>;
    else
    {
      return <Text style={styles.message_text}>Your move: O</Text>
    }
    return null;
 }

 renderBoard(){
    let boxes = []
    for (let i=0; i<9; i++)
    {
        boxes.push(
          <TouchableOpacity style={[styles.box, 
          (this.state.result == "win" && this.state.pattern.includes(i)) ? styles.box_win : null, 
          (this.state.result == "loss" && this.state.pattern.includes(i)) ? styles.box_loss : null]} 
            onPress={() => this.onPress(i)}>
            <Text style={styles.box_text}>{ this.state.board[i] }</Text>
          </TouchableOpacity>
        )
      
      
    }
    return <View style={styles.game_board}>{boxes}</View>
 }

 renderResetButton()
 {
   if(this.state.endgame)
   {
     return (
      <TouchableOpacity
        style={styles.btn}
          onPress={() => this.onReset()}>
        <Text style={styles.btn_text}>Reset</Text>

      </TouchableOpacity>
     )
   }
 }

 renderFooter()
 {
   return (
    <View style={styles.footer}>
      <Text style={styles.footer_text}>
        Author: barto14753
      </Text>
    </View>
   );
 }

 render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.title_text}>TicTacToe</Text>
        </View>

        <View style={styles.message}>
          { this.renderMessage() }
        </View>

        {this.renderBoard()}
        {this.renderResetButton()}
        {this.renderFooter()}
        

      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container:
  {
    justifyContent: 'center',
    alignItems: 'center',
  },

  title:
  {
    marginTop: 10,
    paddingTop: 50,
    height: 100,
  },

  title_text:
  {
    fontSize: 50,
    fontWeight: "700"
  },

  message_text:
  {
    fontWeight: "400",
    fontSize: 40,
  },

  game_board: {
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "aliceblue",
    maxHeight: 360,
    marginTop: 20,
    marginBottom: 10,
    maxWidth: 360,
    alignContent: 'center',
    borderRadius: 10,
    
  },
  box: {
    width: 120,
    height: 120,
    backgroundColor: "deepskyblue",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },

  box_text: {
    color: "white",
    fontSize: 120,
    fontWeight: "700",
    textAlign: "center",
  },

  box_win: {
    backgroundColor: "green",
  },

  box_loss: {
    backgroundColor: "red",
  },

  footer: {
    marginTop: 0,
  },

  footer_text: {
    fontWeight: "700",
  },

  btn:
  {
    backgroundColor: "red",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 20,
    marginBottom: 10,
  },

  btn_text: {
    fontSize: 40,
    color: "white",
  }

})

export default App;
