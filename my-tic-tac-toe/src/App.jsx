import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import GameOver from "./components/GameOver";

const initialGameBoard =[
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

const Winning_Comb =[
  [
    {row:0,col:0},{row:0,col:1},{row:0,col:2},
  ],
  [
    {row:1,col:0},{row:1,col:1},{row:1,col:2},
  ],
  [
    {row:2,col:0},{row:2,col:1},{row:2,col:2},
  ],
  [
    {row:0,col:0},{row:1,col:0},{row:2,col:0},
  ],
  [
    {row:0,col:1},{row:1,col:1},{row:2,col:1},
  ],
  [
    {row:0,col:2},{row:1,col:2},{row:2,col:2},
  ],
  [
    {row:0,col:0},{row:1,col:1},{row:2,col:2},
  ],
  [
    {row:0,col:2},{row:1,col:1},{row:2,col:0},
  ],
];

function deriveActivePlayer(gameTurns){
  let currPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player ==='X'){
    currPlayer = 'O';
  }
  return currPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  });
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for(const turn of gameTurns){
      const{square,player} = turn;
      const{row,col} = square;

      gameBoard[row][col] = player;

  }

  let winner;  
  for(const comb of Winning_Comb)
  {
    const firstSymbol = gameBoard[comb[0].row][comb[0].col];
    const secondSymbol = gameBoard[comb[1].row][comb[1].col];
    const thirdSymbol = gameBoard[comb[2].row][comb[2].col];

    if(firstSymbol && firstSymbol === secondSymbol && firstSymbol===thirdSymbol)
    {
      winner =players[firstSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex,colIndex){
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{square:{row: rowIndex, col: colIndex},player:currentPlayer},...prevTurns];

      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerName(symbol,newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer ==='X'} onChangeName={handlePlayerName}/>
          <Player name="Player 2" symbol="O" isActive={activePlayer ==='O'} onChangeName={handlePlayerName}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} restart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
