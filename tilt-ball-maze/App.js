import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import MazeScreen from "./screens/mazeScreen/MazeScreen";
import { DataProvider } from "./contexts/GameContext";

export default function App() {
  return (
    <DataProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <MazeScreen />
          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    padding: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
