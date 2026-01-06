import { StyleSheet } from "react-native";
import { BALL_DIAMETER, BALL_RADIUS } from "../../constants/ballConstants";

export const styles = StyleSheet.create({
  ball: {
    position: "absolute",
    backgroundColor: "rgba(44, 174, 64, 1)",
    top: 0,
    left: 0,
    width: BALL_DIAMETER,
    height: BALL_DIAMETER,
    borderRadius: BALL_RADIUS,
    alignContent: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 12,
    padding: 9,
    textAlign: "center",
    color: "#fff",
  },
});
