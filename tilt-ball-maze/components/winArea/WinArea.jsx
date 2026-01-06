import { Text, View } from "react-native";
import { styles } from "./WinArea.style";
import Timer from "../timer/Timer";

const WinArea = ({ width, height, size = 100, handleOnWinAreaLayout }) => {
  return (
    <View
      onLayout={handleOnWinAreaLayout}
      style={[styles.area, { width: width, height: height }]}
    >
      <Timer />
    </View>
  );
};

export default WinArea;
