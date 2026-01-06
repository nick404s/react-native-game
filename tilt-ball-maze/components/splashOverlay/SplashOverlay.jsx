import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import { styles } from "./SplashOverlay.style";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";

const SplashOverlay = () => {
  const { startGame } = useContext(GameContext);

  // handle start button press
  const handleStart = () => {
    startGame();
  };

  // handle quit button press
  const handleQuit = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tilt Ball Maze</Text>
        <Text style={styles.subtitle}>
          Navigate the ball through the maze to reach the orange target area. 
          Tilt your device to control the ball's movement.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.quitButton]} onPress={handleQuit}>
          <Text style={styles.buttonText}>Quit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashOverlay;