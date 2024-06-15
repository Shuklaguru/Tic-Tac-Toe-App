const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartbtn = document.querySelector('.restartbtn');
const alertBox = document.querySelector('.alertBox');


//Making Variable
let currentPlayer = 'X'
let nextPlayer = '0';
let playerTurn = currentPlayer;

player1.textContent = `Player 1 : ${currentPlayer}`;
player2.textContent = `Player 2 : ${nextPlayer}`;

//-----------------------------------------------------------------------------------


//Start The Game
const startGame = () => {
    gameCells.forEach(cell =>{
        cell.addEventListener('click', handleClick);
    });
}

 //function to handle click in Board
   const handleClick = (e) =>{
    if(e.target.textContent === ''){
        e.target.textContent = playerTurn;
           if(checkWin()){
            //console.log(`${playerTurn} a Winner!`);
            showAlert(`${playerTurn} a Winner!`);
            disableCells();
            
           }else if(checkTie()){
              //console.log(`It's a Tie!`);
              showAlert(`It's a Tie!`);
              disableCells();
           }else{
              changePlayerTurn();
              showAlert(`Turn for Player : ${playerTurn} `);
              
           }
             //      changePlayerTurn();
      }
   }

//Fn to change Player turn 
const changePlayerTurn = () => {
   
    playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
}

// fn to check winner
const checkWin = () => {
   const winningconditions = 
   [
    [0, 1 ,2],
    [3, 4 ,5],
    [6, 7 ,8],
    [0, 3 ,6],
    [1, 4 ,7],
    [2, 5 ,8],
    [0, 4 ,8],
    [2, 4 ,6],
   ];
   for (let i = 0; i < winningconditions.length; i++) {
      const [pos1, pos2, pos3] = winningconditions[i];
      if(gameCells[pos1].textContent !== '' &&
        gameCells[pos1].textContent === gameCells[pos2].textContent &&
        gameCells[pos2].textContent === gameCells[pos3].textContent){
        return true;
       }
   }
   return false;
}

//Function for to check tie
const checkTie  = () => {
    let emptyCellesCount = 0;
    gameCells.forEach(cell =>{
        if(cell.textContent === ''){
            emptyCellesCount++;
        }
    });

    return emptyCellesCount === 0 && !checkWin();
}

//function to disable game board after win or tie
const disableCells = () =>{
    gameCells.forEach(cell => {
       cell.removeEventListener('click', handleClick);
       cell.classList.add('disabled');
    });
}

//function to Restart game
const restartGame = () => {
    gameCells.forEach(cell =>{
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    startGame();
}
//function to show alert
const showAlert = (msg) =>{
     alertBox.textContent = msg;
     alertBox.style.display = "block";
     
     setTimeout(() =>{
        alertBox.style.display = "none";
     },60000);
}

//Adding eventListner to restart Botton
restartbtn.addEventListener(`click`, restartGame);


//Calling start function
startGame();