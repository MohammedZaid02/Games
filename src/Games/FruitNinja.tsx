import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// Type definitions
type Fruit = {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
  speed: number;
  sliced?: boolean;
};

type LeaderboardEntry = {
  name: string;
  score: number;
  timestamp: number;
};

type SliceEffect = {
  id: number;
  x: number;
  y: number;
  timestamp: number;
};

const FruitNinjaGame: React.FC = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [score, setScore] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>('');
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [combo, setCombo] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [slicedFruits, setSlicedFruits] = useState<Set<number>>(new Set());
  const [sliceEffects, setSliceEffects] = useState<SliceEffect[]>([]);
  const gameAreaRef = useRef<HTMLDivElement | null>(null);
  const fruitIdCounter = useRef<number>(0);
  const sliceEffectCounter = useRef<number>(0);

  const fruitEmojis = ['🍎', '🍊', '🍌', '🍇', '🍓', '🥝', '🍑', '🍉', '🥭', '🍍'];

  // Difficulty settings
  const difficultySettings: Record<'easy' | 'medium' | 'hard', { spawnRate: number; speedMultiplier: number; fruitCount: number }> = {
    easy: { spawnRate: 1200, speedMultiplier: 0.7, fruitCount: 3 },
    medium: { spawnRate: 800, speedMultiplier: 1, fruitCount: 4 },
    hard: { spawnRate: 500, speedMultiplier: 1.5, fruitCount: 6 }
  };

  // Generate random fruit
  const generateFruit = useCallback(() => {
    if (gameState !== 'playing') return;

    const settings = difficultySettings[difficulty];
    const fruit: Fruit = {
      id: fruitIdCounter.current++,
      emoji: fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)],
      x: Math.random() * 80 + 10, // 10% to 90% of screen width
      y: 110, // Start below screen
      rotation: Math.random() * 360,
      speed: (Math.random() * 2 + 2) * settings.speedMultiplier, // Adjusted speed based on difficulty
    };

    setFruits(prev => [...prev, fruit]);
  }, [gameState, difficulty]);

  // Start game
  const startGame = () => {
    if (!playerName.trim()) {
      alert('Please enter your name!');
      return;
    }
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setFruits([]);
    setCombo(0);
    setSlicedFruits(new Set());
    setSliceEffects([]);
  };

  // Exit game function
  const exitGame = useCallback(() => {
    setGameState('menu');
    setFruits([]);
    setSliceEffects([]);
    setScore(0);
    setCombo(0);
    setSlicedFruits(new Set());
    setTimeLeft(60);
  }, []);

  // End game
  const endGame = useCallback(() => {
    setGameState('gameOver');
    setFruits([]);
    setSliceEffects([]);
    
    // Add to leaderboard
    const newEntry = { name: playerName, score, timestamp: Date.now() };
    setLeaderboard(prev => {
      const updated = [...prev, newEntry].sort((a, b) => b.score - a.score).slice(0, 10);
      return updated;
    });
  }, [playerName, score]);

  // Handle fruit slice
  const sliceFruit = useCallback((fruitId: number, event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Prevent slicing the same fruit multiple times
    if (slicedFruits.has(fruitId)) return;
    
    // Find the fruit to get its position
    const fruit = fruits.find(f => f.id === fruitId);
    if (!fruit) return;
    
    // Mark fruit as sliced immediately
    setSlicedFruits(prev => new Set([...prev, fruitId]));
    
    // Create slice effect
    const sliceEffect: SliceEffect = {
      id: sliceEffectCounter.current++,
      x: fruit.x,
      y: fruit.y,
      timestamp: Date.now()
    };
    setSliceEffects(prev => [...prev, sliceEffect]);
    
    // Remove slice effect after animation
    setTimeout(() => {
      setSliceEffects(prev => prev.filter(effect => effect.id !== sliceEffect.id));
    }, 500);
    
    // Remove fruit with animation
    setFruits(prev => prev.map(f => 
      f.id === fruitId ? { ...f, sliced: true } : f
    ));
    
    // Remove sliced fruit after animation
    setTimeout(() => {
      setFruits(prev => prev.filter(f => f.id !== fruitId));
    }, 600);
    
    // Update score and combo immediately
    setScore(prev => prev + 10 + combo * 2);
    setCombo(prev => prev + 1);
    
    // Reset combo after 2 seconds of no slicing
    setTimeout(() => setCombo(0), 2000);
  }, [combo, slicedFruits, fruits]);

  // Game timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState, timeLeft, endGame]);

  // Fruit spawning
  useEffect(() => {
    let spawnTimer: ReturnType<typeof setInterval> | undefined;
    if (gameState === 'playing') {
      const settings = difficultySettings[difficulty];
      spawnTimer = setInterval(() => {
        generateFruit();
      }, settings.spawnRate);
    }
    return () => {
      if (spawnTimer) clearInterval(spawnTimer);
    };
  }, [gameState, generateFruit, difficulty]);

  // Remove fruits that fall off screen
  useEffect(() => {
    const cleanupTimer = setInterval(() => {
      setFruits(prev => prev.filter(fruit => fruit.y > -20));
    }, 100);
    return () => clearInterval(cleanupTimer);
  }, []);

  // Animate fruits upward
  useEffect(() => {
    const animationTimer = setInterval(() => {
      setFruits(prev => prev.map(fruit => ({
        ...fruit,
        y: fruit.y - fruit.speed,
        rotation: fruit.rotation + 2
      })));
    }, 50);
    return () => clearInterval(animationTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Game Menu */}
        {gameState === 'menu' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center"
          >
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-4">
              🥷 Fruit Ninja
            </h1>
            <p className="text-xl text-gray-700 mb-8">Slice the fruits before they escape!</p>
            
            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter your ninja name..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="px-6 py-3 text-xl border-2 border-orange-300 rounded-full focus:border-orange-500 focus:outline-none w-full max-w-sm"
              />
            </div>

            {/* Difficulty Selection */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Choose Difficulty</h3>
              <div className="flex gap-4 justify-center flex-wrap">
                {Object.keys(difficultySettings).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level as 'easy' | 'medium' | 'hard')}
                    className={`px-6 py-3 rounded-full font-bold transition-all duration-200 transform hover:scale-105 ${
                      difficulty === level
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                        : 'bg-white/70 text-gray-700 hover:bg-white/90'
                    }`}
                  >
                    {level === 'easy' && '🟢 Easy'}
                    {level === 'medium' && '🟡 Medium'}
                    {level === 'hard' && '🔴 Hard'}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {difficulty === 'easy' && 'Slower fruits, more time to slice! Perfect for beginners.'}
                {difficulty === 'medium' && 'Balanced gameplay for casual players.'}
                {difficulty === 'hard' && 'Lightning fast fruits! Only for true ninjas!'}
              </p>
            </div>
            
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xl font-bold rounded-full hover:from-orange-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Slicing! 🗡️
            </button>

            {/* Leaderboard */}
            {leaderboard.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">🏆 Leaderboard</h3>
                <div className="bg-white/50 rounded-2xl p-4">
                  {leaderboard.slice(0, 5).map((entry, index) => (
                    <div key={entry.timestamp} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span className="font-semibold">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`} {entry.name}
                      </span>
                      <span className="font-bold text-orange-600">{entry.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Game Playing */}
        {gameState === 'playing' && (
          <div className="relative">
            {/* Game HUD */}
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl px-6 py-3 shadow-lg">
                <div className="text-2xl font-bold text-orange-600">Score: {score}</div>
                {combo > 1 && (
                  <div className="text-lg font-semibold text-red-500">Combo x{combo}!</div>
                )}
              </div>
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl px-4 py-3 shadow-lg text-center">
                <div className="text-lg font-bold text-purple-600 capitalize">{difficulty}</div>
                <div className="text-2xl font-bold text-red-600">⏰ {timeLeft}s</div>
              </div>
              <motion.button
                onClick={() => {
                  if (window.confirm('Are you sure you want to exit the game? Your progress will be lost.')) {
                    exitGame();
                  }
                }}
                className="bg-red-500/90 hover:bg-red-600/90 backdrop-blur-lg text-white p-3 rounded-2xl shadow-lg transition-all duration-200"
                title="Exit to Main Menu"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 90,
                  backgroundColor: "rgba(220, 38, 38, 0.95)"
                }}
                whileTap={{ 
                  scale: 0.9,
                  rotate: 180
                }}
                animate={{
                  boxShadow: [
                    "0 10px 25px rgba(220, 38, 38, 0.3)",
                    "0 10px 25px rgba(220, 38, 38, 0.6)",
                    "0 10px 25px rgba(220, 38, 38, 0.3)"
                  ]
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  scale: { duration: 0.2 },
                  rotate: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <motion.svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              </motion.button>
            </div>

            {/* Game Area */}
            <div 
              ref={gameAreaRef}
              className="relative w-full h-screen bg-gradient-to-b from-sky-400 to-green-400 overflow-hidden rounded-3xl"
            >
              {/* Fruits */}
              {fruits.map((fruit) => (
                <motion.div
                  key={fruit.id}
                  className={`absolute text-6xl select-none z-20 ${fruit.sliced ? 'pointer-events-none' : 'cursor-pointer'}`}
                  style={{
                    left: `${fruit.x}%`,
                    top: `${fruit.y}%`,
                  }}
                  onClick={(e) => !fruit.sliced && sliceFruit(fruit.id, e)}
                  onMouseDown={(e) => !fruit.sliced && sliceFruit(fruit.id, e)}
                  onTouchStart={(e) => {
                    if (!fruit.sliced) {
                      e.preventDefault();
                      sliceFruit(fruit.id, e);
                    }
                  }}
                  animate={fruit.sliced ? {
                    scale: [1, 1.5, 0],
                    rotate: [0, 180, 720],
                    x: [0, Math.random() * 200 - 100],
                    y: [0, -100],
                    opacity: [1, 0.8, 0]
                  } : {
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={fruit.sliced ? {
                    duration: 0.6,
                    ease: "easeOut"
                  } : {
                    rotate: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }
                  }}
                  whileHover={!fruit.sliced ? { 
                    scale: 1.2,
                    transition: { duration: 0.1 }
                  } : {}}
                  whileTap={!fruit.sliced ? { 
                    scale: 0.9,
                    transition: { duration: 0.1 }
                  } : {}}
                >
                  {fruit.emoji}
                </motion.div>
              ))}

              {/* Slice Effects */}
              {sliceEffects.map((effect) => (
                <motion.div
                  key={effect.id}
                  className="absolute pointer-events-none z-30"
                  style={{
                    left: `${effect.x}%`,
                    top: `${effect.y}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1.5, 2, 0],
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {/* Slice flash effect */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-300 rounded-full w-16 h-16 -translate-x-8 -translate-y-8 opacity-80"></div>
                    <div className="absolute inset-0 bg-white rounded-full w-12 h-12 -translate-x-6 -translate-y-6"></div>
                    <div className="absolute inset-0 text-4xl -translate-x-4 -translate-y-4">💥</div>
                  </div>
                </motion.div>
              ))}

              {/* Floating Score Effects */}
              {sliceEffects.map((effect) => (
                <motion.div
                  key={`score-${effect.id}`}
                  className="absolute pointer-events-none z-40 text-2xl font-bold text-yellow-300"
                  style={{
                    left: `${effect.x}%`,
                    top: `${effect.y}%`,
                  }}
                  initial={{ opacity: 0, y: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: [-50, -100, -150],
                    scale: [0, 1.2, 1, 0.8]
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  +{10 + combo * 2}
                  {combo > 1 && <div className="text-lg text-red-400">COMBO!</div>}
                </motion.div>
              ))}

              {/* Slice Effect Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full opacity-20 bg-gradient-to-r from-yellow-400 via-transparent to-yellow-400"></div>
              </div>
            </div>
          </div>
        )}

        {/* Game Over */}
        {gameState === 'gameOver' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center"
          >
            <h2 className="text-5xl font-bold text-red-600 mb-4">🎯 Game Over!</h2>
            <p className="text-2xl text-gray-700 mb-2">Well done, {playerName}!</p>
            <p className="text-4xl font-bold text-orange-600 mb-8">Final Score: {score}</p>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setGameState('menu')}
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-full hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200"
              >
                Back to Menu
              </button>
              <button
                onClick={startGame}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-full hover:from-orange-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200"
              >
                Play Again! 🗡️
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FruitNinjaGame;