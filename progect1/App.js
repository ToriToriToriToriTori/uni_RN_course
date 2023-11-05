import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
            setIsRunning(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <Text style={styles.timer_time}>
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {isRunning ? (
          <Button title="Pause" onPress={pauseTimer} />
        ) : (
          <Button title="Start" onPress={startTimer} />
        )}
        <Button title="Reset" onPress={resetTimer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    height: 200,
    width: 200,
    borderRadius: 200,
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timer_time: {
    color: "white",
    fontSize: 60,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
});
