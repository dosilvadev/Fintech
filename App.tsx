import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/home';
import {Ionicons} from   'react-native-vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import WalletScreen from './src/screens/wallet/Index';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';

const Tab = createBottomTabNavigator();

export default function App() {
    useEffect(() => {
    // Define a cor da navigation bar (parte inferior com botão de voltar)
    SystemUI.setBackgroundColorAsync('#1f1f1f'); // preto
  }, []);

  return (
    <>
      <StatusBar style="dark" backgroundColor="#1f1f1f" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#fff',
            //  gestureEnabled: true, // permite swipe no iOS
            //  gestureDirection: 'horizontal',
            tabBarStyle: {
              backgroundColor: '#1f1f1f',
              borderTopWidth: 0,
            },
            tabBarIcon: ({ color, size }) => {
              let iconName: string;

              if (route.name === 'Home') {
                iconName = 'home-outline';
              } else if (route.name === 'Wallet') {
                iconName = 'wallet-outline';
              } else {
                iconName = 'ellipse-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Wallet" component={WalletScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
