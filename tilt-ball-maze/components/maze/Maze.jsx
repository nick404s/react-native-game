import { Text, View } from "react-native";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { styles } from "./Maze.style";
import Ball from "../ball/Ball";
import WinArea from "../winArea/WinArea";
import Animated, { useSharedValue } from "react-native-reanimated";
import { GameContext } from "../../contexts/GameContext";
import { useContext } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const WALLS_THICKNESS = 10;
// hardcoded the walls for now
let WALLS = [
  // horizontal walls. width is the length
  { x: 210, y: 50, width: 120, height: WALLS_THICKNESS },
  { x: 0, y: 100, width: 220, height: WALLS_THICKNESS },
  { x: 210, y: 170, width: 40, height: WALLS_THICKNESS },
  { x: 70, y: 170, width: 80, height: WALLS_THICKNESS },
  { x: 140, y: 250, width: 170, height: WALLS_THICKNESS },
  { x: 0, y: 250, width: 70, height: WALLS_THICKNESS },
  { x: 130, y: 320, width: 170, height: WALLS_THICKNESS },
  { x: 210, y: 500, width: 100, height: WALLS_THICKNESS },
  { x: 290, y: 570, width: 70, height: WALLS_THICKNESS },
  { x: 0, y: 500, width: 140, height: WALLS_THICKNESS },
  { x: 70, y: 575, width: 80, height: WALLS_THICKNESS },
  { x: 300, y: 350, width: 30, height: WALLS_THICKNESS },
  { x: 140, y: 650, width: 120, height: WALLS_THICKNESS },
  { x: 140, y: 725, width: 190, height: WALLS_THICKNESS },
  // vertical walls. height is the length
  { x: 140, y: 0, width: WALLS_THICKNESS, height: 40 },
  { x: 70, y: 60, width: WALLS_THICKNESS, height: 40 },
  { x: 210, y: 50, width: WALLS_THICKNESS, height: 50 },
  { x: 320, y: 50, width: WALLS_THICKNESS, height: 135 },
  { x: 140, y: 175, width: WALLS_THICKNESS, height: 75 },
  { x: 125, y: 320, width: WALLS_THICKNESS, height: 185 },
  { x: 60, y: 250, width: WALLS_THICKNESS, height: 185 },
  { x: 300, y: 250, width: WALLS_THICKNESS, height: 185 },
  { x: 300, y: 325, width: WALLS_THICKNESS, height: 175 },
  { x: 320, y: 650, width: WALLS_THICKNESS, height: 80 },
  { x: 210, y: 500, width: WALLS_THICKNESS, height: 150 },
  { x: 140, y: 500, width: WALLS_THICKNESS, height: 80 },
  { x: 70, y: 580, width: WALLS_THICKNESS, height: 160 },
  { x: 140, y: 650, width: WALLS_THICKNESS, height: 80 },
  { x: 200, y: 730, width: WALLS_THICKNESS, height: 25 },
];

const Maze = () => {
  const { isGameOver, isWon, isLost, isGameStarted } = useContext(GameContext);
  const [mazeBounds, setMazeBounds] = useState({
    width: 0,
    height: 0,
  });
  // console.log("mazeBounds", mazeBounds);

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
