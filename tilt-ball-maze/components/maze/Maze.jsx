import { Text, View } from "react-native";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { styles } from "./Maze.style";
import Ball from "../ball/Ball";
import WinArea from "../winArea/WinArea";
import Animated, { useSharedValue } from "react-native-reanimated";
import { GameContext } from "../../contexts/GameContext";
import { useContext } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { WALLS } from "../../constants/wallsConstants";


const Maze = () => {
  const { isGameOver, isWon, isLost, isGameStarted } = useContext(GameContext);
  const [mazeBounds, setMazeBounds] = useState({
    width: 0,
    height: 0,
  });

  // Create a shared value for walls so it can be accessed in worklets
  const wallsShared = useSharedValue(WALLS);

  // get the maze bounds depending on the screen size
  const handleOnMazeLayout = useCallback((event) => {
    const { width, height } = event.nativeEvent.layout;
    setMazeBounds({
      width: width,
      height: height,
    });
  }, []);

  // shared value for the win area
  const winAreaShared = useSharedValue(0);

  // get the win area position and size
  const handleOnWinAreaLayout = useCallback((event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    winAreaShared.value = { x, y, width, height };
  }, []);

  const wallsToRender = useMemo(() => {
    return WALLS.map((mazeWall, index) => {
      return (
        <View
          key={index}
          style={[
            styles.wall,
            {
              left: mazeWall.x,
              top: mazeWall.y,
              width: mazeWall.width,
              height: mazeWall.height,
            },
          ]}
        />
      );
    });
  }, [WALLS]);

  return (
    <View style={styles.container} onLayout={handleOnMazeLayout}>
      {isGameStarted && (
        <>
          {wallsToRender}
          {isWon && <Text style={styles.winText}>You Won!</Text>}
          {isLost && <Text style={styles.lostText}>You Lost!</Text>}
          <View style={styles.iconStyle}>
            <FontAwesome5 name="home" size={48} color="black" />
          </View>
          {/* show the win area/timer only if not win or lost */}
          {!isWon && !isLost && (
            <WinArea
              handleOnWinAreaLayout={handleOnWinAreaLayout}
              width={100}
              height={50}
            />
          )}
          {winAreaShared && mazeBounds && (
            <Ball
              mazeBounds={mazeBounds}
              wallsShared={wallsShared}
              winAreaShared={winAreaShared}
            />
          )}
        </>
      )}
    </View>
  );
};
export default Maze;
