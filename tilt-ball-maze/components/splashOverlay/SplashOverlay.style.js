import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#2c3e50",
    alignItems: "center",
    zIndex: 2000, // Higher z-index than game over overlay
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000ff",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#000000ff",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
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
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});