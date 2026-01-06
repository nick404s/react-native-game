import { createContext, useState, useCallback } from "react";
import { useSharedValue } from "react-native-reanimated";
import { START_X, START_Y } from "../constants/ballConstants";
import { INITIAL_GAME_TIME } from "../constants/gameConstants";

export const GameContext = createContext();

export const DataProvider = ({ children }) => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [seconds, setSeconds] = useState(INITIAL_GAME_TIME);
  const ballPositionX = useSharedValue(0);
  const ballPositionY = useSharedValue(0);

  const startGame = useCallback(() => {
    setIsGameStarted(true);
    setIsGameOver(false);
    setIsWon(false);
    setIsLost(false);
    setSeconds(INITIAL_GAME_TIME);
    ballPositionX.value = START_X;
    ballPositionY.value = START_Y;
  }, [ballPositionX, ballPositionY]);

  const restartGame = useCallback(() => {
    setIsGameOver(false);
    setIsWon(false);
    setIsLost(false);
    setSeconds(INITIAL_GAME_TIME);
    ballPositionX.value = START_X;
    ballPositionY.value = START_Y;
  }, []);

  return (
    <GameContext.Provider
      value={{
        isGameOver,
        isWon,
        isLost,
        isGameStarted,
        seconds,
        setIsGameOver,
        setIsWon,
        setIsLost,
        setSeconds,
        ballPositionX,
        ballPositionY,
        startGame,
        restartGame,

      }}
    >
      {children}
    </GameContext.Provider>
  );
};
