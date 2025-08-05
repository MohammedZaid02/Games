import React, { useState, useEffect, useRef, useCallback, MouseEvent, TouchEvent } from 'react';


interface Fruit {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
  speed: number;
  sliced?: boolean;
}

interface SliceEffect {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  timestamp: number;
}

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
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const fruitIdCounter = useRef<number>(0);
  const sliceEffectCounter = useRef<number>(0);

  const fruitEmojis: string[] = ['🍎', '🍊', '🍌', '🍇', '🍓', '🥝', '🍑', '🍉', '🥭', '🍍'];

  const difficultySettings = {
    easy: { spawnRate: 1200, speedMultiplier: 0.7, fruitCount: 3 },
    medium: { spawnRate: 800, speedMultiplier: 1, fruitCount: 4 },
    hard: { spawnRate: 500, speedMultiplier: 1.5, fruitCount: 6 }
  };

  const generateFruit = useCallback(() => {
    if (gameState !== 'playing') return;

    const settings = difficultySettings[difficulty];
    const fruit: Fruit = {
      id: fruitIdCounter.current++,
      emoji: fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)],
      x: Math.random() * 80 + 10,
      y: 110,
      rotation: Math.random() * 360,
      speed: (Math.random() * 2 + 2) * settings.speedMultiplier
    };

    setFruits(prev => [...prev, fruit]);
  }, [gameState, difficulty]);

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

  const endGame = useCallback(() => {
    setGameState('gameOver');
    setFruits([]);
    setSliceEffects([]);

    const newEntry: LeaderboardEntry = { name: playerName, score, timestamp: Date.now() };
    setLeaderboard(prev => {
      const updated = [...prev, newEntry].sort((a, b) => b.score - a.score).slice(0, 10);
      return updated;
    });
  }, [playerName, score]);

  const sliceFruit = useCallback((fruitId: number, event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (slicedFruits.has(fruitId)) return;

    const fruit = fruits.find(f => f.id === fruitId);
    if (!fruit) return;

    setSlicedFruits(prev => new Set([...prev, fruitId]));

    const sliceEffect: SliceEffect = {
      id: sliceEffectCounter.current++,
      x: fruit.x,
      y: fruit.y,
      timestamp: Date.now()
    };
    setSliceEffects(prev => [...prev, sliceEffect]);

    setTimeout(() => {
      setSliceEffects(prev => prev.filter(effect => effect.id !== sliceEffect.id));
    }, 500);

    setFruits(prev => prev.map(f => f.id === fruitId ? { ...f, sliced: true } : f));
    setTimeout(() => {
      setFruits(prev => prev.filter(f => f.id !== fruitId));
    }, 600);

    setScore(prev => prev + 10 + combo * 2);
    setCombo(prev => prev + 1);
    setTimeout(() => setCombo(0), 2000);
  }, [combo, slicedFruits, fruits]);

  useEffect(() => {
let timer: ReturnType<typeof setInterval>;
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
    return () => clearInterval(timer);
  }, [gameState, timeLeft, endGame]);

  useEffect(() => {
    let spawnTimer:  ReturnType<typeof setInterval>;
    if (gameState === 'playing') {
      const settings = difficultySettings[difficulty];
      spawnTimer = setInterval(() => {
        generateFruit();
      }, settings.spawnRate);
    }
    return () => clearInterval(spawnTimer);
  }, [gameState, generateFruit, difficulty]);

  useEffect(() => {
    const cleanupTimer = setInterval(() => {
      setFruits(prev => prev.filter(fruit => fruit.y > -20));
    }, 100);
    return () => clearInterval(cleanupTimer);
  }, []);

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
        {/* UI elements */}
      </div>
    </div>
  );
};

export default FruitNinjaGame;
