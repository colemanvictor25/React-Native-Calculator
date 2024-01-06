import React, { useState } from 'react';
import {
  StatusBar,
  Vibration,
  Switch,
  Linking,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handlePress = (value) => {
    if (value === '=') {
      try {
        const evalResult = eval(input);
        setResult(isNaN(evalResult) || !isFinite(evalResult) ? 'Error' : evalResult.toString());
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'DEL') {
      setInput((prevInput) => prevInput.slice(0, -1));
    } else {
      setInput((prevInput) => prevInput + value);
    }

    // Vibrate when a button is pressed
    vibrate();
  };

  const vibrate = () => {
    Vibration.vibrate(50);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    // Vibrate when switching dark/light mode
    vibrate();
  };

  const containerStyle = {
    ...styles.container,
    backgroundColor: isDarkMode ? '#181818' : '#fff',
  };

  const textStyle = {
    ...styles.resultText,
    color: isDarkMode ? 'white' : 'black',
  };

  const buttonStyle = {
    ...styles.button,
    backgroundColor: isDarkMode ? '#555' : '#ddd',
  };

  const deleteButtonStyle = {
    ...styles.button,
    backgroundColor: '#ff7f7f', // Light red color for delete button
  };

  const openFacebookProfile = () => {
    Linking.openURL('https://www.facebook.com/profile.php?id=100090381831594');
  };

  // Animation for button press
  const scaleValue = new Animated.Value(1);
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <View style={containerStyle}>
      <View style={styles.resultContainer}>
        <Text style={textStyle}>{result}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={textStyle}>{input}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          {[7, 8, 9, '/'].map((number) => (
            <TouchableOpacity
              key={number}
              style={{ ...buttonStyle, ...animatedStyle }}
              onPress={() => {
                handlePress(number.toString());
                animateButton();
              }}
            >
              <Text style={styles.buttonText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[4, 5, 6, '*'].map((number) => (
            <TouchableOpacity
              key={number}
              style={{ ...buttonStyle, ...animatedStyle }}
              onPress={() => {
                handlePress(number.toString());
                animateButton();
              }}
            >
              <Text style={styles.buttonText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[1, 2, 3, '-'].map((number) => (
            <TouchableOpacity
              key={number}
              style={{ ...buttonStyle, ...animatedStyle }}
              onPress={() => {
                handlePress(number.toString());
                animateButton();
              }}
            >
              <Text style={styles.buttonText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={{ ...buttonStyle, ...animatedStyle, width: 170 }}
            onPress={() => {
              handlePress('0');
              animateButton();
            }}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...buttonStyle, ...animatedStyle }}
            onPress={() => {
              handlePress('.');
              animateButton();
            }}
          >
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...buttonStyle, ...animatedStyle }}
            onPress={() => {
              handlePress('+');
              animateButton();
            }}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={{ ...buttonStyle, ...animatedStyle, width: 170 }}
            onPress={() => {
              handlePress('C');
              animateButton();
            }}
          >
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...buttonStyle, ...animatedStyle, backgroundColor: '#ff7f7f' }}
            onPress={() => {
              handlePress('DEL');
              animateButton();
            }}
          >
            <Text style={styles.buttonText}>DEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...buttonStyle, ...animatedStyle }}
            onPress={() => {
              handlePress('=');
              animateButton();
            }}
          >
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.darkModeSwitchContainer}>
        <Text style={styles.darkModeText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={isDarkMode ? '#fff' : '#000'}
          trackColor={{ false: '#aaa', true: '#555' }}
        />
      </View>
      <View style={styles.creatorContainer}>
        <Text style={styles.creatorText}>Created by Victor Edet Coleman</Text>
        <TouchableOpacity onPress={openFacebookProfile}>
          <Text style={styles.linkText}>Visit My Facebook</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181818', // Set default background color
  },
  resultContainer: {
    marginBottom: 10,
  },
  resultText: {
    fontSize: 24,
    textAlign: 'right',
    color: 'white',
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    color: 'black',
  },
  darkModeSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  darkModeText: {
    fontSize: 16,
    marginRight: 10,
    color: 'white',
  },
  creatorContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  creatorText: {
    fontSize: 14,
    color: 'white',
  },
  linkText: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
