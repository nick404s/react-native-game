import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#ffffffff",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "#000",
  },
  wall: {
    position: "absolute",
    backgroundColor: "#000000ff",
  },
  textStyle: {
    fontSize: 25,
  },
  winText: {
    position: "absolute",
    zIndex: 2,
    fontSize: 40,
    fontStyle: "bold",
    color: "#fec702ff",
    marginTop: 60,
  },
  lostText: {
    position: "absolute",
    zIndex: 2,
    fontSize: 40,
    fontStyle: "bold",
    color: "#fc0404ff",
    marginTop: 60,
  },
  iconStyle: {
    // marginTop: 10,
    marginBottom: 10,
    position: "absolute",
    // zIndex: 1,
  },
});
