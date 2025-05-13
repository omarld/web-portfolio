import { useEffect, useState } from "react";


const checkWinner = (squares: any[])=>{
    const winnerCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    let hasWinner = false;
    winnerCombos.forEach((comboIndx)=> {
        if(!hasWinner){
            hasWinner = squares[comboIndx[0]] && squares[comboIndx[0]] === squares[comboIndx[1]] && squares[comboIndx[0]] === squares[comboIndx[2]]
        }
    });
    return hasWinner;
}

const Board = ({player, squares, onMove}: any) => {

    const handleClick = (index: any) =>{
        if(checkWinner(squares)){
            return;
        }

        const newSquares = squares.slice();
        if(!squares[index]){
            newSquares[index]= player;
            const nextPlayer = player === 'X' ? 'O' : 'X';
            onMove(nextPlayer, newSquares);
        }
    }

    return (
        <div className='board-container' >
            <div className="cell" onClick={() => handleClick(0)}>{squares[0]}</div>
            <div className="cell" onClick={() => handleClick(1)}>{squares[1]}</div>
            <div className="cell" onClick={() => handleClick(2)}>{squares[2]}</div>
            <div className="cell" onClick={() => handleClick(3)}>{squares[3]}</div>
            <div className="cell" onClick={() => handleClick(4)}>{squares[4]}</div>
            <div className="cell" onClick={() => handleClick(5)}>{squares[5]}</div>
            <div className="cell" onClick={() => handleClick(6)}>{squares[6]}</div>
            <div className="cell" onClick={() => handleClick(7)}>{squares[7]}</div>
            <div className="cell" onClick={() => handleClick(8)}>{squares[8]}</div>
        </div>
    )
}

const Game = () => {
    const player1 = 'X';
    const defaultSquares = Array(9).fill(null);

    const [currentPlayer, setCurrentPlayer] = useState(player1);
    const [currentSquares, setCurrentSquares] = useState(defaultSquares);
    const [winner, setWinner] = useState('');
    const [history, setHistory] = useState([defaultSquares]);
    

    const handleMove = (nextPlayer: any, newSquares: any[]) => {
        setCurrentSquares(newSquares);
        
        const newHistory = [...history, newSquares];
        setHistory(newHistory);
        if(checkWinner(newSquares)){
            setWinner(currentPlayer);
            return;
        }
        setCurrentPlayer(nextPlayer);
    };

    const goToMove = (moveIndx: number)=>{
        const newSquares =  history[moveIndx];
        setCurrentSquares(newSquares);
    }

    const reset = ()=>{
        setCurrentSquares(defaultSquares);
        setHistory([defaultSquares]);
    }

    return (    
        <div>
            <h2>Player: {currentPlayer} {winner && ' (Winner!)'}</h2>
            <button onClick={reset}>Reset</button>
            <Board player={currentPlayer} squares={currentSquares} onMove={handleMove}/>
            <div>
                History:
                {history.map((move, idx) => <div key={idx} onClick={() => goToMove(idx)}> Return to move {idx}</div>) }
            </div>
        </div>
    )
}


export default Game;

/***
 * players
 * check winnner
 *  when when do not allow click
 * reset game
 */