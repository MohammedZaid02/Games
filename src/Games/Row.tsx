import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const PLAYER1 = 1;
const PLAYER2 = 2;

// Type definitions
type CellValue = typeof EMPTY | typeof PLAYER1 | typeof PLAYER2;
type Board = CellValue[][];
type GameMode = 'menu' | '1player' | '2player';
type Player = typeof PLAYER1 | typeof PLAYER2;

interface WinningCell {
  row: number;
  col: number;
}

interface DroppingDisc {
  col: number;
  row: number;
  player: Player;
}

interface Leaderboard {
  player1: number;
  player2: number;
  ai: number;
}

const Row: React.FC = () => {
  const [board, setBoard] = useState<Board>(() => 
    Array(ROWS).fill(null).map(() => Array(COLS).fill(EMPTY))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>(PLAYER1);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningCells, setWinningCells] = useState<[number, number][]>([]);
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [isAIThinking, setIsAIThinking] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<Leaderboard>(() => {
    const saved = localStorage.getItem('connect-four-leaderboard');
    return saved ? JSON.parse(saved) : { player1: 0, player2: 0, ai: 0 };
  });
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [boardReady, setBoardReady] = useState<boolean>(false);
  const [droppingDisc, setDroppingDisc] = useState<DroppingDisc | null>(null);
  const [animatingDiscs, setAnimatingDiscs] = useState<Set<string>>(new Set());

  // Initialize board animation
  useEffect(() => {
    const timer = setTimeout(() => setBoardReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const updateLeaderboard = useCallback((winner: Player) => {
    const newLeaderboard: Leaderboard = { ...leaderboard };
    if (winner === PLAYER1) newLeaderboard.player1++;
    else if (winner === PLAYER2 && gameMode === '2player') newLeaderboard.player2++;
    else if (winner === PLAYER2 && gameMode === '1player') newLeaderboard.ai++;
    
    setLeaderboard(newLeaderboard);
    localStorage.setItem('connect-four-leaderboard', JSON.stringify(newLeaderboard));
  }, [leaderboard, gameMode]);

  const checkWin = useCallback((board: Board, row: number, col: number, player: Player): [number, number][] | null => {
    const directions: [number, number][] = [
      [0, 1], [1, 0], [1, 1], [1, -1] // horizontal, vertical, diagonal
    ];

    for (const [dx, dy] of directions) {
      const cells: [number, number][] = [[row, col]];
      
      // Check in positive direction
      for (let i = 1; i < 4; i++) {
        const newRow = row + dx * i;
        const newCol = col + dy * i;
        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && 
            board[newRow][newCol] === player) {
          cells.push([newRow, newCol]);
        } else break;
      }
      
      // Check in negative direction
      for (let i = 1; i < 4; i++) {
        const newRow = row - dx * i;
        const newCol = col - dy * i;
        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && 
            board[newRow][newCol] === player) {
          cells.unshift([newRow, newCol]);
        } else break;
      }
      
      if (cells.length >= 4) {
        return cells.slice(0, 4);
      }
    }
    return null;
  }, []);

  const getLowestRow = useCallback((board: Board, col: number): number => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][col] === EMPTY) return row;
    }
    return -1;
  }, []);

  const makeMove = useCallback((col: number): void => {
    if (gameOver || isAIThinking || droppingDisc) return;
    
    const row = getLowestRow(board, col);
    if (row === -1) return;

    // Set dropping animation state
    setDroppingDisc({ col, row, player: currentPlayer });
    
    // Add to animating discs
    setAnimatingDiscs(prev => new Set([...prev, `${row}-${col}`]));

    // Delay the actual board update to sync with animation
    setTimeout(() => {
      const newBoard: Board = board.map(row => [...row]);
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);

      const winCells = checkWin(newBoard, row, col, currentPlayer);
      if (winCells) {
        setWinner(currentPlayer);
        setWinningCells(winCells);
        setGameOver(true);
        updateLeaderboard(currentPlayer);
      } else if (newBoard.every(row => row.every(cell => cell !== EMPTY))) {
        setGameOver(true);
      } else {
        setCurrentPlayer(currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1);
      }
      
      setDroppingDisc(null);
      // Remove from animating discs after animation completes
      setTimeout(() => {
        setAnimatingDiscs(prev => {
          const newSet = new Set(prev);
          newSet.delete(`${row}-${col}`);
          return newSet;
        });
      }, 100);
    }, 600 + (row * 100)); // Dynamic timing based on drop distance
  }, [board, currentPlayer, gameOver, isAIThinking, droppingDisc, getLowestRow, checkWin, updateLeaderboard]);

  // AI Move
  const makeAIMove = useCallback((): void => {
    if (gameOver || currentPlayer !== PLAYER2 || gameMode !== '1player') return;
    
    setIsAIThinking(true);
    
    setTimeout(() => {
      const availableCols: number[] = [];
      for (let col = 0; col < COLS; col++) {
        if (getLowestRow(board, col) !== -1) {
          availableCols.push(col);
        }
      }
      
      if (availableCols.length > 0) {
        // Simple AI: Try to win, then block player, then random
        let bestCol = availableCols[Math.floor(Math.random() * availableCols.length)];
        
        // Check for winning move
        for (const col of availableCols) {
          const row = getLowestRow(board, col);
          const testBoard: Board = board.map(r => [...r]);
          testBoard[row][col] = PLAYER2;
          if (checkWin(testBoard, row, col, PLAYER2)) {
            bestCol = col;
            break;
          }
        }
        
        // Check for blocking move
        if (bestCol === availableCols[Math.floor(Math.random() * availableCols.length)]) {
          for (const col of availableCols) {
            const row = getLowestRow(board, col);
            const testBoard: Board = board.map(r => [...r]);
            testBoard[row][col] = PLAYER1;
            if (checkWin(testBoard, row, col, PLAYER1)) {
              bestCol = col;
              break;
            }
          }
        }
        
        makeMove(bestCol);
      }
      setIsAIThinking(false);
    }, 1000 + Math.random() * 1000);
  }, [board, currentPlayer, gameMode, gameOver, getLowestRow, checkWin, makeMove]);

  useEffect(() => {
    if (gameMode === '1player' && currentPlayer === PLAYER2 && !gameOver) {
      makeAIMove();
    }
  }, [currentPlayer, gameMode, gameOver, makeAIMove]);

  const resetGame = (): void => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(EMPTY)));
    setCurrentPlayer(PLAYER1);
    setGameOver(false);
    setWinner(null);
    setWinningCells([]);
    setIsAIThinking(false);
    setHoveredCol(null);
    setDroppingDisc(null);
    setAnimatingDiscs(new Set());
  };

  const startGame = (mode: GameMode): void => {
    setGameMode(mode);
    resetGame();
  };

  const backToMenu = (): void => {
    setGameMode('menu');
    setShowLeaderboard(false); // Ensure leaderboard closes
    resetGame();
  };

  const getCellColor = (cell: CellValue): string => {
    if (cell === PLAYER1) return 'bg-red-500';
    if (cell === PLAYER2) return 'bg-yellow-500';
    return 'bg-gray-100';
  };

  const isWinningCell = (row: number, col: number): boolean => {
    return winningCells.some(([r, c]) => r === row && c === col);
  };

  if (gameMode === 'menu') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-white mb-8 bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
            Four in a Row
          </h1>
          
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => startGame('1player')}
              className="w-64 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Play vs AI
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => startGame('2player')}
              className="w-64 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Two Players
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLeaderboard(true)}
              className="w-64 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Leaderboard
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {showLeaderboard && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 min-w-[250px]"
            >
              <h3 className="text-2xl font-bold mb-4 text-center">Leaderboard</h3>
              <div className="space-y-2">
                <motion.div 
                  layout
                  className="flex justify-between p-2 bg-red-100 rounded"
                >
                  <span className="font-semibold">Player 1:</span>
                  <span className="text-red-600 font-bold">{leaderboard.player1}</span>
                </motion.div>
                {/* Only show Player 2/AI when not in menu mode */}
                {gameMode !== 'menu' && (
                  <motion.div 
                    layout
                    className="flex justify-between p-2 bg-yellow-100 rounded"
                  >
                    <span className="font-semibold">
                      {gameMode === '1player' ? 'AI:' : 'Player 2:'}
                    </span>
                    <span className="text-yellow-600 font-bold">
                      {gameMode === '1player' ? leaderboard.ai : leaderboard.player2}
                    </span>
                  </motion.div>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLeaderboard(false)}
                className="w-full mt-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                Close
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      {/* Turn Indicator */}
      <motion.div
        key={currentPlayer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: isAIThinking ? [1, 1.05, 1] : 1
        }}
        transition={{ 
          duration: 0.3,
          scale: { repeat: isAIThinking ? Infinity : 0, duration: 1 }
        }}
        className={`mb-6 px-8 py-4 rounded-full text-2xl font-bold text-white shadow-lg ${
          currentPlayer === PLAYER1 ? 'bg-red-500' : 'bg-yellow-500'
        }`}
      >
        {gameOver && winner ? (
          `Player ${winner} Wins!`
        ) : gameOver ? (
          "It's a Draw!"
        ) : isAIThinking ? (
          "AI is thinking..."
        ) : (
          `Player ${currentPlayer}'s Turn`
        )}
      </motion.div>

      {/* Game Board */}
      <motion.div 
        className="bg-blue-600 p-4 rounded-xl shadow-2xl relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Dropping Disc Animation - moves straight down in column */}
        <AnimatePresence>
          {droppingDisc && (
            <motion.div
              className={`absolute w-16 h-16 rounded-full border-2 border-white z-20 ${
                droppingDisc.player === PLAYER1 ? 'bg-red-500' : 'bg-yellow-500'
              }`}
              style={{
                left: `${droppingDisc.col * 72 + 16}px`, // Fixed horizontal position
              }}
              initial={{ 
                y: -80 // Start above the board
              }}
              animate={{ 
                y: `${(ROWS - 1 - droppingDisc.row) * 72 + 16}px` // Drop to target row
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.6 + (droppingDisc.row * 0.1), // Longer fall for lower positions
                ease: [0.25, 0.1, 0.25, 1], // Gravity-like easing
                type: "tween"
              }}
            />
          )}
        </AnimatePresence>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: COLS }, (_, col) => (
            <motion.div
              key={col}
              className="flex flex-col-reverse gap-2 relative"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: col * 0.1 }}
              onHoverStart={() => !gameOver && !droppingDisc && setHoveredCol(col)}
              onHoverEnd={() => setHoveredCol(null)}
            >
              {/* Clickable column overlay */}
              <button
                className="absolute inset-0 z-10 bg-transparent"
                onClick={() => makeMove(col)}
                disabled={gameOver || isAIThinking || droppingDisc !== null}
              />
              
              {Array.from({ length: ROWS }, (_, row) => {
                const cellKey = `${row}-${col}`;
                const isAnimating = animatingDiscs.has(cellKey);
                const cellValue = board[row][col];
                
                return (
                  <motion.div
                    key={cellKey}
                    className={`w-16 h-16 rounded-full border-2 border-white ${getCellColor(cellValue)}
                      ${hoveredCol === col && !gameOver && !droppingDisc ? 'ring-2 ring-white ring-opacity-30' : ''}
                      transition-all duration-200`}
                    animate={
                      isWinningCell(row, col) && gameOver
                        ? {
                            scale: [1, 1.3, 1.1],
                            rotate: [0, 15, -15, 0],
                            boxShadow: [
                              "0 0 0 0px rgba(255,255,255,0)",
                              "0 0 0 8px rgba(255,255,255,0.3)",
                              "0 0 0 0px rgba(255,255,255,0)"
                            ],
                          }
                        : cellValue !== EMPTY && !isAnimating
                        ? {
                            // FIX: Only two keyframes for scale
                            scale: [0.8, 1],
                          }
                        : {}
                    }
                    transition={
                      isWinningCell(row, col) && gameOver
                        ? { 
                            repeat: Infinity, 
                            duration: 2,
                            ease: "easeInOut"
                          }
                        : { 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 15,
                            delay: 0.1
                          }
                    }
                  />
                );
              })}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Game Over Overlay */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              className="bg-white rounded-xl p-8 text-center shadow-2xl"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                {winner ? (
                  <span className={winner === PLAYER1 ? 'text-red-500' : 'text-yellow-500'}>
                    {winner === PLAYER1 ? 'Red' : 'Yellow'} Wins!
                  </span>
                ) : (
                  <span className="text-gray-600">It's a Draw!</span>
                )}
              </h2>
              
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetGame}
                  className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg"
                >
                  Play Again
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={backToMenu}
                  className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg shadow-lg"
                >
                  Main Menu
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={backToMenu}
        className="mt-6 px-6 py-2 bg-gray-600 text-white font-bold rounded-lg shadow-lg"
      >
        Back to Menu
      </motion.button>
    </div>
  );
};

export default Row;