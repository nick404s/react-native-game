import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import { styles } from "./GameOverOverlay.style";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";

const GameOverOverlay = () => {
  const { restartGame } = useContext(GameContext);

  // handle restart button press
  const handleRestart = () => {
    restartGame();
  };
  // handle quit button press
  const handleQuit = () => {
    // quit the app
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.textStyle}>Game Over</Text>
        <TouchableOpacity style={styles.button} onPress={handleRestart}>
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.quitButton]}
          onPress={handleQuit}
        >
          <Text style={styles.buttonText}>Quit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GameOverOverlay;
