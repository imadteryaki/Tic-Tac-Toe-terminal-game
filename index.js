console.clear();

// readline module
const readline = require('readline');

// colors 
const colors = require('colors');

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

    console.log(colors.yellow(this.gameLayout));
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
    if (position > 9 || position < 1 || Number.isNaN(position)) {
      console.log(colors.bgRed(`\nThis position isn't existed, please choose a position between 1 and 9`));
      this.currentPlayer = !this.currentPlayer;
      return;
    }
    // Check if position is already taken
    else if (this.ticTacToe[position - 1] !== undefined) {
      // empty position = undefined (see line 22)
      console.log(colors.bgRed(`\nPosition number ${position} is already taken, please choose other position between 1 and 9`));
      this.currentPlayer = !this.currentPlayer;
      return;
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

              if(this.currentPlayer)
              console.log(colors.blue(`\nPlayer ${this.getPlayerFromChar(Array.from(checkSet)[0])} Wins!!`));
              else
              console.log(colors.red(`\nPlayer ${this.getPlayerFromChar(Array.from(checkSet)[0])} Wins!!`));
           
            this.resetGame();
        }
       
        // possible vertical alignments 
        checkSet.clear();
        
        if ((this.ticTacToe[0] && this.ticTacToe[3] && this.ticTacToe[6] && 
          (Array.from(checkSet.add(this.ticTacToe[0]).add(this.ticTacToe[3]).add(this.ticTacToe[6])).length === 1 ))||

          (this.ticTacToe[1] && this.ticTacToe[4] && this.ticTacToe[7] && 
           (Array.from(checkSet.add(this.ticTacToe[1]).add(this.ticTacToe[4]).add(this.ticTacToe[7])).length === 1 ))||

           (this.ticTacToe[2] && this.ticTacToe[5] && this.ticTacToe[8] && 
           (Array.from(checkSet.add(this.ticTacToe[2]).add(this.ticTacToe[5]).add(this.ticTacToe[8])).length === 1 ))){

            if(this.currentPlayer)
            console.log(colors.blue(`\nPlayer ${this.getPlayerFromChar(Array.from(checkSet)[0])} Wins!!`));
            else
            console.log(colors.red(`\nPlayer ${this.getPlayerFromChar(Array.from(checkSet)[0])} Wins!!`));
           
           this.gameEnd();
       }
     
        // possible diagonal alignments
        checkSet.clear();
        
        if ((this.ticTacToe[0] && this.ticTacToe[4] && this.ticTacToe[8] && 
          (Array.from(checkSet.add(this.ticTacToe[0]).add(this.ticTacToe[4]).add(this.ticTacToe[8])).length === 1 ))||

          (this.ticTacToe[2] && this.ticTacToe[4] && this.ticTacToe[6] && 
           (Array.from(checkSet.add(this.ticTacToe[2]).add(this.ticTacToe[4]).add(this.ticTacToe[6])).length === 1 ))){

            if(this.currentPlayer)
           console.log(colors.blue(`\nPlayer ${this.getPlayerFromChar(Array.from(checkSet)[0])} Wins!!`));
           else
           console.log(colors.red(`\nPlayer ${this.getPlayerFromChar(Array.from(checkSet)[0])} Wins!!`));

           this.gameEnd();
       }

        // possible Draw
        checkSet.clear();
         if (this.moveHistory.length === 9){

            console.log(colors.yellow(`\nGame ended in a Draw !!`));
            
            this.gameEnd();
        }

       if (this.gameEnded) {
        if (this.gameEnded) {
          this.rl.question (colors.green('\nPress R + Enter to restart the game or press only Enter to end : '),(input) => {
            if ( input.toLowerCase() == 'r') {
              console.clear();
              this.resetGame();
              this.rl.prompt();
              this.run();
              return;
            }
            else {
              console.log(colors.green('\nThank you for playing this game , See you later !'));
              this.rl.close();
            }})
        }
      
       } 
    }
}

switchPlayer() {
    
    this.layout();
    this.gameProcess();
    
    if(!this.gameEnded){
        this.currentPlayer = arguments[0] ? this.currentPlayer : !this.currentPlayer;
        if (this.currentPlayer){
          this.rl.question(colors.blue(`\nPlayer ${this.getPlayer(this.currentPlayer)}, Your move! (Position [1 - 9]): `),(input) => {
            if(this.ticTacToe.length < 10 ){
              this.checkPosition(parseInt(input));
              this.switchPlayer();
             }
             else {
               this.gameProcess();
             }
           })
        }
        else 
        {
          this.rl.question(colors.red(`\nPlayer ${this.getPlayer(this.currentPlayer)}, Your move! (Position [1 - 9]): `),(input) => {
            if(this.ticTacToe.length < 10 ){
              this.checkPosition(parseInt(input));
              this.switchPlayer();
             }
             else {
               this.gameProcess();
             }
           })
        }

        
    }
}

run() {
   console.log(colors.red('Welcome to my Tic Tac Toe\n'));
   setTimeout(()=>{
    console.log(colors.green(`This game has one rule which is any player get three character in a row wins !!\n`));
   },1000);
   
   setTimeout(()=>{
    console.log(colors.green(`to play this game we need tow players\n`));
   },2000);

   setTimeout(()=>{
    console.log(colors.cyan(`Now you will see the game layout\n`));
   },3000);

   setTimeout(()=>{
    this.layout();
    console.log(`\n`)
   },4000);
   
   setTimeout(()=> {
    console.log(colors.yellow(`Let's start the game !!\n`));
   },5000)
   setTimeout(()=> {
    console.log(colors.red(`Note: to delete the last move press Ctrl + B\n`));
   },6000)
   
   
   // remove last play turn
   readline.emitKeypressEvents(process.stdin);
   process.stdin.setRawMode(true);
   process.stdin.on('keypress', async (str, key) => {
      if (key.name =='b' && key.ctrl) {
        this.deleteLastMove()
       }
     })
   
    
  // listen to inputs
  setTimeout(() => {
    this.rl.question(colors.blue(`Player ${this.getPlayer(this.currentPlayer)}, Your move! (Position [1 - 9]): `),(input) => {
      if(this.ticTacToe.length < 10 ){
        this.checkPosition(parseInt(input));
        this.switchPlayer();
       }
       else {
         this.gameProcess();
       }
     })
   },6000   
  )
   
  }  
gameEnd() {
    
  // Set gameEnded to true to stop the game in the switchPlayer() method.
  this.gameEnded = true;
  
  console.log(colors.magenta(`\n${this.moveHistory.length} moves needed\n\nMoves history ...\n`));
  console.log(this.moveHistory);
}

deleteLastMove(){
  // delete character
  if(this.moveHistory.length > 1){
    var pos = this.moveHistory[(this.moveHistory.length - 1)].position
    this.ticTacToe[pos] = ' '
    // unregister move 
    this.moveHistory.pop();
    // continue play 
    this.switchPlayer(true)
    console.log(colors.bgGreen('\nLast move has been deleted !!'))
    
  } else {
    console.log(colors.bgYellow("\nCan't delete any more moves!!"));
    // continue play
    this.switchPlayer(true); // don't change player with the next move
  }

}

resetGame() {

    this.ticTacToe = new Array(9);
    this.currentPlayer = true;
    this.moveHistory = [];
    this.gameEnded = false;

    // close the current interface 
    this.rl.close();

    // create a new interface 
    this.rl = readline.createInterface(process.stdin, process.stdout);
    console.clear();

}

}

const game = new TicTacToe();
game.run();


