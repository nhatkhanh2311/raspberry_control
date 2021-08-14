/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/Home";
import History from "./pages/History";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home}
                    options={{tabBarIcon: () => (
                        <Image source={require("./assets/home.png")} style={{height: 30, width: 30}}/>
                      )}}/>
        <Tab.Screen name="History" component={History}
                    options={{tabBarIcon: () => (
                        <Image source={require("./assets/history.png")} style={{height: 30, width: 30}}/>
                      )}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
