import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, StyleSheet, Alert, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { AddListScreen } from '../screens/AddList/AddListScreen';

const TasksStackNavigator = createStackNavigator();

const TaskNavigator = () => {
  return (
    <TasksStackNavigator.Navigator>
      <TasksStackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Your lists', headerTitleAlign: 'center'}}
      />
      <TasksStackNavigator.Screen
        name="NewList"
        component={AddListScreen}
        options={{title: 'Add new list'}}
      />
    </TasksStackNavigator.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TaskNavigator></TaskNavigator>
    </NavigationContainer>
  );
};
