console.clear();

const { stdout } = require('process');
// readline module
const readline = require('readline');

class TicTacToe {
  constructor() {
    // Variables
    this.gameLayout = '';
    this.ticTacToe = new Array(9);
    this.currentPlayer = true; // player 1 = true (X), player 2 = false (O)
    this.moveHistory = [];
    this.gameEnded = false;

    // readline declare
    this.rl = readline.createInterface(process.stdin, process.stdout);
  }

  // replace empty places on layout
  replaceEmptyPlaces(emptyPlace) {
    return emptyPlace === undefined ? ' ' : emptyPlace;
  }

  // create the Layout
  layout() {

    this.gameLayout = `
        ${this.replaceEmptyPlaces(this.ticTacToe[0])}   |  ${this.replaceEmptyPlaces(this.ticTacToe[1])}   |  ${this.replaceEmptyPlaces(this.ticTacToe[2])}
        ----+------+----
        ${this.replaceEmptyPlaces(this.ticTacToe[3])}   |  ${this.replaceEmptyPlaces(this.ticTacToe[4])}   |  ${this.replaceEmptyPlaces(this.ticTacToe[5])}
        ----+------+----
        ${this.replaceEmptyPlaces(this.ticTacToe[6])}   |  ${this.replaceEmptyPlaces(this.ticTacToe[7])}   |  ${this.replaceEmptyPlaces(this.ticTacToe[8])}`;

    console.log(this.gameLayout);
  }

  // getter
   getChar() {
    return this.currentPlayer ? 'X' : 'O';
  }

  // select Player
   getPlayer() {
    return this.currentPlayer ? 1 : 2;
  }

  getPlayerFromChar(char) {
    return this.getPlayer(char === 'X');
  }

  //  Check the position
  checkPosition(position) {
    // Check if position is existed
    if (position > 9 || position < 1) {
      console.log(`This position isn't existed, please choose a position between 1 and 9`);
      this.currentPlayer = !this.currentPlayer;
    }
    // Check if position is already taken
    else if (this.ticTacToe[position - 1] !== undefined) {
      // empty position = undefined (see line 22)
      console.log(`Position number ${position} is already taken, please choose other position between 1 and 9`);
      this.currentPlayer = !this.currentPlayer;
    } else {
      // Registration the player's char
      this.ticTacToe[position - 1] = this.getChar();
      // add the move to our moveHistory
      this.moveHistory.push({
        position: position,
        char: this.ticTacToe[position - 1],
        player: this.getPlayer(),
      });
    }
  }

  // How the game works
  gameProcess() {

    // we need 5 moves at least to complete the game 
    if (this.moveHistory.length >= 5 ){

        // Set() delete the doubled elements in a Array and count the different elements 
        const checkSet = new Set();

        // possible horizontal alignments 
        
        checkSet.clear();
        if ((this.ticTacToe[0] && this.ticTacToe[1] && this.ticTacToe[2] && 
           (Array.from(checkSet.add(this.ticTacToe[0]).add(this.ticTacToe[1]).add(this.ticTacToe[2])).length === 1 ))||

           (this.ticTacToe[3] && this.ticTacToe[4] && this.ticTacToe[5] && 
            (Array.from(checkSet.add(this.ticTacToe[3]).add(this.ticTacToe[4]).add(this.ticTacToe[5])).length === 1 ))||

            (this.ticTacToe[6] && this.ticTacToe[7] && this.ticTacToe[8] && 
            (Array.from(checkSet.add(this.ticTacToe[6]).add(this.ticTacToe[7]).add(this.ticTacToe[8])).length === 1 ))){

            console.log(`\nPlayer ${this.getPlayerFromChar(Array.from(checkSet)[0])} Wins!!`);
           
            this.gameEnd();
        }
       
        // possible vertical alignments 
        checkSet.clear();
        
        if ((this.ticTacToe[0] && this.ticTacToe[3] && this.ticTacToe[6] && 
          (Array.from(checkSet.add(this.ticTacToe[0]).add(this.ticTacToe[3]).add(this.ticTacToe[6])).length === 1 ))||

          (this.ticTacToe[1] && this.ticTacToe[4] && this.ticTacToe[7] && 
           (Array.from(checkSet.add(this.ticTacToe[1]).add(this.ticTacToe[4]).add(this.ticTacToe[7])).length === 1 ))||

           (this.ticTacToe[2] && this.ticTacToe[5] && this.ticTacToe[8] && 
           (Array.from(checkSet.add(this.ticTacToe[2]).add(this.ticTacToe[5]).add(this.ticTacToe[8])).length === 1 ))){

           console.log(`\nPlayer ${this.getPlayerFromChar(Array.from(checkSet)[0])} Wins!!`);
           
           this.gameEnd();
       }
     
        // possible diagonal alignments
        checkSet.clear();
        
        if ((this.ticTacToe[0] && this.ticTacToe[4] && this.ticTacToe[8] && 
          (Array.from(checkSet.add(this.ticTacToe[0]).add(this.ticTacToe[4]).add(this.ticTacToe[8])).length === 1 ))||

          (this.ticTacToe[2] && this.ticTacToe[4] && this.ticTacToe[6] && 
           (Array.from(checkSet.add(this.ticTacToe[2]).add(this.ticTacToe[4]).add(this.ticTacToe[6])).length === 1 ))){

           console.log(`\nPlayer ${this.getPlayerFromChar(Array.from(checkSet)[0])} Wins!!`);
           
           this.gameEnd();
       }

        // possible Draw
        checkSet.clear();
         if (this.moveHistory.length === 9){

            console.log(`\nGame ended in a Draw !!`)
            
            this.gameEnd()
        } 
        
    }

}

switchPlayer() {
    
    this.layout();
    this.gameProcess();
    
    if(!this.gameEnded){
        this.currentPlayer = arguments[0] ? this.currentPlayer : !this.currentPlayer;
        console.log(`\nPlayer ${this.getPlayer(this.currentPlayer)}, Your move! (Position [1 - 9]):`)
    }
    
}

run() {

  console.log('Welcome to my Tic Tac Toe');
   this.layout() 
   console.log(`\nPlayer ${this.getPlayer(this.currentPlayer)}, Your move! (Position [1 - 9]):`)

   // listen to inputs
   this.rl.on('line',(input) => {
    if(this.ticTacToe.length < 10 ){
        this.checkPosition(parseInt(input));
        this.switchPlayer();
    }
    else {
        console.log(`Game Ended`);
        this.gameProcess();
      }
    })
  }
  
gameEnd() {
    
  // Set gameEnded to true to stop the game in the switchPlayer() method.
  this.gameEnded = true;
  
  console.log(`${this.moveHistory.length} moves needed\nMoves history ...`);
  console.log(this.moveHistory);
  this.restartGame();
}

restartGame() {
  //restart the game 
  this.rl.question('\nRestart the game Y/N : ', (input) => {
    if (input.trim().toLowerCase() === 'y') {
      if(this.gameEnded === true) {
      this.ticTacToe = new Array(9);}
      this.gameEnded = false;
      this.moveHistory = [];
      this.currentPlayer = true;
      console.clear();
      this.run();
    } else if (input.trim().toLowerCase() === 'n') {
      this.rl.close();
      process.exit();
    } else {
      console.log('Invalid input. Please enter Y or N.');
      this.restartGame();
    }
  });
}
}
const game = new TicTacToe();
game.run();


