import React, { useEffect, useRef } from 'react';
import { View, Button, StyleSheet, Text, Animated, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image source={require('../assets/adaptive-icon.png')} style={styles.image} tintColor="#ffffff" />
      <Text style={styles.title}>سامانه بازرسی سرک-کسری جایگاه های سوخت GS PMC</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="شروع بازرسی"
          onPress={() => navigation.navigate('Calculations')}
          color="blue" // Change the button text color to white for better contrast
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0005B4', // Change the background to a different color
    padding: 20,
  },
  image: {
    width: 130, // Set your desired width
    height: 100, // Set your desired height
    tintColor: '#ffffff', // Apply the white tint color
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#007BFF', // Add a background color to the button container for better visibility
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default HomeScreen;
