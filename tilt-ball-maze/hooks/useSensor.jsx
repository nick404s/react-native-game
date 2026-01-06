import { useState, useEffect } from "react";
import { Accelerometer, Gyroscope } from "expo-sensors";
import { Platform } from "react-native";

const useSensor = (interval = 50, sensorX, sensorY) => {
  // docs: https://docs.expo.dev/versions/latest/sdk/accelerometer/
  // set interval between the measurments
  Accelerometer.setUpdateInterval(interval); // millisec

  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((data) => {
        let { x, y } = data;

        if (Platform.OS === "ios") {
          x = -x;
          y = -y;
        }
        // assign the values to the accelerometer measurments
        sensorX.value = x;
        sensorY.value = y;
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, [sensorX, sensorY]);
};

export default useSensor;
