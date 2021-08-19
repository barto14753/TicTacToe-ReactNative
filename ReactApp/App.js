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
    result: ""
  }

  makeMove = (pos) => {
    const board = [...this.state.board];
      board[pos] = this.state.move;
      this.setState({board: board}, () => {alert("MOVE")});
  }

  isWin = (board) => {
    
    for (let i=0; i<3; i++)
    {
      if ((board[i] == board[i+3]) && (board[i] == board[i+6]) && (board[i])) return true;
      if ((board[i*3] != board[i*3+1]) && (board[i*3] == board[i*3+2]) && (board[i*3])) return true;
    }

    if (board[0] == board[4] && board[0] == board[8] && board[0]) return true;
    if (board[2] == board[4] && board[2] == board[6] && board[2]) return true;
    return false;

  }

  isDraw = (board) => {
    for(let i=0; i<board.length; i++)
    {
      if (!board[i]) return false;
    }
    return true;

  }

  isEndGame = (board) => {
    if (this.isWin(board))
    {
      this.setState({endgame: true});
      if (this.state.move == "O") this.setState({result: "You win!"});
      else this.setState({result: "You lost!"});
    }
    else if (this.isDraw(board)) this.setState({endgame: true, result: "You draw!"});
    else return false;
    return true;
  }

  botMove = () => {
    let legalMoves = Array();
    for (let i=0; i<9; i++)
    {
      if (!this.state.board[i])
      {
        const board = [...this.state.board]
        board[i] = this.state.move;
        if (this.isEndGame(board))
        {
          const board = [...this.state.board];
          board[i] = "X";
          this.setState({board: board}, () => {this.isEndGame(this.state.board)});
          return;
        }
        legalMoves.push(i);

      }
    }
    let move = legalMoves[Math.floor(Math.random()*legalMoves.length)];
    const board = [...this.state.board];
    board[move] = "X";
    this.setState({board: board, move: "O"}, () => {this.isEndGame(this.state.board)});

  }

  onPress = (pos) => {
    if(!this.state.endgame && !this.state.board[pos] && this.state.move == "O")
    {
      const board = [...this.state.board];
      board[pos] = "O";
      this.setState({board: board}, () => {
        if (this.isEndGame(this.state.board))
        {
          return;
        }
        this.setState({move: "X"}, () =>
        {
          this.botMove();
          // this.isEndGame(this.state.board);
        });
        
      });
      

    }
  }

  renderMessage(){
    if(this.state.endgame)
       return <Text>{this.state.result}</Text>;
    else
    {
      return <Text>Move: {this.state.move}</Text>
    }
    return null;
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

        <View style={styles.game_board}>
        <TouchableOpacity style={styles.box} onPress={() => this.onPress(0)}>
          <Text style={styles.box_text}>{ this.state.board[0] }</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => this.onPress(1)}>
        <Text style={styles.box_text}>{ this.state.board[1] }</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => this.onPress(2)}>
        <Text style={styles.box_text}>{ this.state.board[2] }</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => this.onPress(3)}>
        <Text style={styles.box_text}>{ this.state.board[3] }</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => this.onPress(4)}>
        <Text style={styles.box_text}>{ this.state.board[4] }</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => this.onPress(5)}>
        <Text style={styles.box_text}>{ this.state.board[5] }</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => this.onPress(6)}>
        <Text style={styles.box_text}>{ this.state.board[6] }</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => this.onPress(7)}>
        <Text style={styles.box_text}>{ this.state.board[7] }</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => this.onPress(8)}>
        <Text style={styles.box_text}>{ this.state.board[8] }</Text>
        </TouchableOpacity>

      </View>

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

  game_board: {
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "aliceblue",
    maxHeight: 360,
    marginTop: 100,
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
  }
})

export default App;
