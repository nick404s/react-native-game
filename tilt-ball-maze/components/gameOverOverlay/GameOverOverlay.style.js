import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#2c3e50",
    // opacity: 0.9,
    alignItems: "center",
    zIndex: 1000,
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#ecf0f1",
    padding: 30,
    alignItems: "center",
    borderRadius: 15,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    fontSize: 25,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 8,
    margin: 10,
    minWidth: 200,
    alignItems: "center",
  },
  quitButton: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "#ffffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
