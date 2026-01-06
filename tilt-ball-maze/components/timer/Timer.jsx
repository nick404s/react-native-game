import { useState, useEffect } from "react";
import { styles } from "./Timer.style";
import { View, Text } from "react-native";
import { getFormattedTime } from "../../utils/utils";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import {
  GAME_OVER_DELAY,
  INITIAL_GAME_TIME,
} from "../../constants/gameConstants";

const Timer = () => {
  const { setIsLost, setIsGameOver, seconds, setSeconds } =
    useContext(GameContext);

  useEffect(() => {
    if (seconds <= 0) {
      setIsLost(true);
      // delay the game over screen
      setTimeout(() => {
        setIsGameOver(true);
      }, GAME_OVER_DELAY);
      return;
    }
    const timerID = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timerID);
  }, [seconds]);

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{getFormattedTime(seconds)}</Text>
    </View>
  );
};

export default Timer;
