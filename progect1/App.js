import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

function PomodoroTimerApp() {
  const [workTime, setWorkTime] = useState("");
  const [restTime, setRestTime] = useState("");
  const [mode, setMode] = useState("pause");
  const [timeLeft, setTimeLeft] = useState(0);
  const [rests, setRests] = useState(0);
  const [workSprints, setWorkSprints] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);

  useEffect(() => {
    if (mode === "work" || mode === "rest") {
      const interval = setInterval(() => {
        if (timeLeft <= 0) {
          if (mode === "work") {
            setMode("rest");
            setTimeLeft(restTime * 60);
          } else {
            setMode("work");
            if (workSprints > 0) {
              setRests(rests + 1);
              setWorkSprints(workSprints - 1);
              setTimeLeft(workTime >= 20 ? 20 * 60 : workTime * 60);
            } else if (workTime % 20 > 0) {
              setRests(rests + 1);
              setTimeLeft((workTime % 20) * 60);
            } else {
              setMode("pause");
              setWorkSprints(0);
            }
          }
        } else {
          setTimeLeft(timeLeft - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [mode, timeLeft, workTime, restTime, rests, workSprints]);

  const startTimer = () => {
    if (mode === "pause") {
      if (workTime && restTime) {
        setWorkSprints(Math.floor(workTime / 20));
        if (pausedTime > 0) {
          setTimeLeft(pausedTime);
        } else {
          setTimeLeft(workTime >= 20 ? 20 * 60 : workTime * 60);
          setRests(0);
        }
        setMode("work");
      }
    } else if (mode === "work" || mode === "rest") {
      setMode("pause");
      setPausedTime(timeLeft);
    }
  };

  const buttonLabel = mode === "pause" ? "Start" : "Pause";

  const getColor = (mode) => {
    switch (mode) {
      case "pause":
        return "#4a4a4a";
      case "work":
        return "#245932";
      case "rest":
        return "#243159";
      default:
        return "#4a4a4a";
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.timer, { backgroundColor: getColor(mode) }]}>
        <Text style={styles.timer_time}>{formatTime(timeLeft)}</Text>
      </View>
      <View style={styles.btn_container}>
        <Button title={buttonLabel} onPress={startTimer} />
        <Text>Rests: {rests}</Text>
      </View>
      <View style={styles.btn_container}>
        <TextInput
          style={styles.input}
          placeholder="Work"
          value={workTime}
          onChangeText={(text) => setWorkTime(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Rest"
          value={restTime}
          onChangeText={(text) => setRestTime(text)}
        />
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
  input: {
    width: 50,
    height: 40,
    borderColor: "#4a4a4a",
    borderBottomWidth: 3,
    margin: 10,
    padding: 5,
    textAlign: "center",
  },
  timer: {
    height: 200,
    width: 200,
    borderRadius: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timer_time: {
    color: "white",
    fontSize: 60,
  },
  btn_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 26,
    gap: 10,
  },
});

export default PomodoroTimerApp;
