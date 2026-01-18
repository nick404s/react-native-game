import { View, Text, Platform } from "react-native";
import { styles } from "./Ball.style";
import { useCallback, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useFrameCallback,
  cancelAnimation,
  withDelay,
} from "react-native-reanimated";

import { scheduleOnRN } from "react-native-worklets";

import {
  START_X,
  START_Y,
  SPEED,
  BALL_DIAMETER,
} from "../../constants/ballConstants";
import { GAME_OVER_DELAY } from "../../constants/gameConstants";

import useSensor from "../../hooks/useSensor";
import { GameContext } from "../../contexts/GameContext";
import { useContext } from "react";

const Ball = ({ mazeBounds, wallsShared, winAreaShared }) => {
  const {
    isGameOver,
    setIsGameOver,
    setIsWon,
    isWon,
    isLost,
    ballPositionX,
    ballPositionY,
    isGameStarted,
  } = useContext(GameContext);
  // console.log(mazeBounds);

  // set the ball position at the start point
  useEffect(() => {
    ballPositionX.value = START_X;
    ballPositionY.value = START_Y;
  }, []);

  const sensorX = useSharedValue(0);
  const sensorY = useSharedValue(0);

  // subscribe to the sensor data. set for 60 fps
  useSensor(1000 / 60, sensorX, sensorY);

  // handle game over state with a delay
  const gameOverWithDelay = useCallback(() => {
    if (!isGameOver) {
      setIsWon(true);
      const timeoutId = setTimeout(() => {
        setIsGameOver(true);
      }, GAME_OVER_DELAY);
      return () => clearTimeout(timeoutId);
    }
  }, [isGameOver, isWon]);

  // UI thread
  useFrameCallback(() => {
    "worklet";

    // check for game over to stop the ball
    if (!isGameStarted || isWon || isGameOver || isLost) {
      cancelAnimation(ballPositionX);
      cancelAnimation(ballPositionY);
      return;
    }

    const currentBallX = ballPositionX.value;
    const currentBallY = ballPositionY.value;

    // calculate bounds for the ball
    const maxX = mazeBounds.width - BALL_DIAMETER;
    const maxY = mazeBounds.height - BALL_DIAMETER;

    // correct orientation for IOS
    let adjustedSensorX = sensorX.value;
    let adjustedSensorY = sensorY.value;

    // calculate the ball movement with adjusted values
    let newX = currentBallX + adjustedSensorX * -SPEED;
    let newY = currentBallY + adjustedSensorY * SPEED;

    // keep the ball inside the maze boundaries
    newX = Math.max(0, Math.min(maxX, newX));
    newY = Math.max(0, Math.min(maxY, newY));

    // Collision detection function
    const checkCollision = (x, y) => {
      // Ball boundaries
      const ballLeft = x;
      const ballRight = x + BALL_DIAMETER;
      const ballTop = y;
      const ballBottom = y + BALL_DIAMETER;

      const winArea = winAreaShared.value;

      // check if the ball is at the win area
      if (
        ballRight > winArea.x &&
        ballLeft < winArea.x + winArea.width &&
        ballBottom > winArea.y &&
        ballTop < winArea.y + winArea.height
      ) {
        // set game over with delay on the JS thread
        scheduleOnRN(gameOverWithDelay);
      }

      const walls = wallsShared.value;

      for (const wall of walls) {
        const wallLeft = wall.x;
        const wallRight = wall.x + wall.width;
        const wallTop = wall.y;
        const wallBottom = wall.y + wall.height;

        // Check if ball intersects with wall
        if (
          ballRight > wallLeft &&
          ballLeft < wallRight &&
          ballBottom > wallTop &&
          ballTop < wallBottom
        ) {
          return true;
        }
      }
      return false;
    };

    // Check for collisions and adjust position if needed
    if (checkCollision(newX, newY)) {
      // Try moving only in X direction
      if (!checkCollision(newX, currentBallY)) {
        newY = currentBallY; // Only allow X movement
      }
      // Try moving only in Y direction
      else if (!checkCollision(currentBallX, newY)) {
        newX = currentBallX; // Only allow Y movement
      }
      // If both directions cause collision, don't move
      else {
        newX = currentBallX;
        newY = currentBallY;
      }
    }

    // update the ball position
    ballPositionX.value = newX;
    ballPositionY.value = newY;
  }, [
    mazeBounds,
    wallsShared,
    winAreaShared,
    isWon,
    isGameStarted,
    isGameOver,
    ballPositionX,
    ballPositionY,
    sensorX,
    sensorY,
  ]);

  const animatedBallStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      transform: [
        { translateX: ballPositionX.value },
        { translateY: ballPositionY.value },
      ],
    };
  });

  return (
    <Animated.View style={[styles.ball, animatedBallStyle]}>
      <Text style={styles.textStyle}>You</Text>
    </Animated.View>
  );
};

export default Ball;
