import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Screen Imports
import HomeScreen from './src/screens/HomeScreen';
import ScannerScreen from './src/screens/ScannerScreen';

const Stack = createNativeStackNavigator();

// BMW Themed Dark Colors
const BMWTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#0066B1', // BMW Blue
    background: '#0a0a0a',
    card: '#111111',
    text: '#ffffff',
    border: '#222222',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={BMWTheme}>
      <StatusBar style="light" />
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#111111' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: '300', letterSpacing: 1 },
          animation: 'fade',
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'PROACTIVE CARE' }} 
        />
        <Stack.Screen 
          name="Scanner" 
          component={ScannerScreen} 
          options={{ title: 'AR DIAGNOSIS', headerBackTitleVisible: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
