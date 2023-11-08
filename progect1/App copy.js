import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Vibration,
  TextInput,
} from "react-native";

const TimePicker = ({}) => {
  minutes = "00";
  return (
    <View style={styles.TimePickercontainer}>
      <TextInput
        style={styles.TimePickerinput}
        placeholder="MM"
        keyboardType="numeric"
        maxLength={2}
        value={minutes}
        onChangeText={handleMinutesChange}
        defaultValue="00"
      />
      <Text style={styles.TimePickercolon}>:</Text>
      <TextInput
        style={styles.input}
        placeholder="SS"
        keyboardType="numeric"
        maxLength={2}
        value={seconds}
        onChangeText={handleSecondsChange}
        defaultValue="00"
      />
    </View>
  );
};

export default function App() {
  const [minutes, setCurMinutes] = useState(1);
  const [seconds, setCurSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("rest");
  const [time, setTime] = useState(20);
  const [usersWorkTime, setUsersWorkTime] = useState("00:00");
  const [usersRestTime, setUsersRestTime] = useState("00:00");

  const handleTimeChange = (text) => {
    // Ensure that the input contains only digits and colons
    const sanitizedText = text.replace(/[^0-9:]/g, "");

    // You can implement more advanced time formatting/validation here
    // For simplicity, this example assumes a basic format like HH:MM
    setTime(sanitizedText);

    if (isValidTimeFormat(sanitizedText)) {
      setFormattedTime(formatTime(sanitizedText));
    } else {
      setFormattedTime(null);
    }
  };

  const isValidTimeFormat = (text) => {
    // Implement your own time format validation logic here
    // For simplicity, this example assumes a basic format like HH:MM
    return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(text);
  };

  const formatTime = (text) => {
    // You can implement custom time formatting here if needed
    return text;
  };

  const handleSetTime = () => {
    // Use the formatted time in your app logic
    console.log("Selected time:", formattedTime);
  };

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            Vibration.vibrate();
            clearInterval(timer);
            setIsRunning(false);
          } else {
            setCurMinutes(minutes - 1);
            setCurSeconds(59);
          }
        } else {
          setCurSeconds(seconds - 1);
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
    setCurMinutes(1);
    setCurSeconds(0);
  };

  const colors = {
    pause: "#4a4a4a",
    work: "#245932",
    rest: "#243159",
  };

  color = colors.pause;
  switch (mode) {
    case "pause":
      color = colors.pause;
      break;
    case "work":
      color = colors.work;
      break;
    case "rest":
      color = colors.rest;
      break;
    default:
      color = colors.pause;
      break;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: isRunning ? color : colors.pause,
          ...styles.timer,
        }}
      >
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
      <View>
        <TimePicker />
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
  TimePickercontainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  TimePickerinput: {
    width: 40,
    fontSize: 20,
    borderBottomWidth: 1,
    textAlign: "center",
  },
  TimePickercolon: {
    fontSize: 20,
    marginHorizontal: 5,
  },
});
