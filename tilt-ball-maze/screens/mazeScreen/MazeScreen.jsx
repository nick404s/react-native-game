import { View, Text } from "react-native";
import { styles } from "./MazeScreen.style";
import Maze from "../../components/maze/Maze";
import GameOverOverlay from "../../components/gameOverOverlay/GameOverOverlay";
import SplashOverlay from "../../components/splashOverlay/SplashOverlay";
import { GameContext } from "../../contexts/GameContext";
import { useContext } from "react";

const MazeScreen = () => {
  const { isGameOver, isGameStarted } = useContext(GameContext);
  return (
    <View style={styles.container}>
      {!isGameStarted && <SplashOverlay />}
      {isGameStarted && isGameOver && <GameOverOverlay />}
      <Maze />
    </View>
  );
};
export default MazeScreen;
