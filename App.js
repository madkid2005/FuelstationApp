import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CalculationScreen from './screens/CalculationScreen';
import ResultsTabs from './screens/ResultsTabs';
import { ThemeProvider } from './context/ThemeContext'; // Adjust the path as per your project structure

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'بازرسی جایگاه‌های سوخت' }}
          />
          <Stack.Screen
            name="Calculations"
            component={CalculationScreen}
            options={{ title: 'محاسبات' }}
          />
          <Stack.Screen
            name="ResultsTabs"
            component={ResultsTabs}
            options={{ title: 'نتایج' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
