import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, StyleSheet, Alert, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { AddListScreen } from '../screens/AddList/AddListScreen';
import { Colors } from '../utils/constants';

const TasksStackNavigator = createStackNavigator();

const defaultStyles = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTintColor: Colors.white,
    headerTitleStyle: {
        fontFamily: "Eina02-Regular"
    }
}

const TaskNavigator = () => {
  return (
    <TasksStackNavigator.Navigator>
      <TasksStackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{...defaultStyles, title: 'Your lists', headerTitleAlign: 'center'}}
      />
      <TasksStackNavigator.Screen
        name="NewList"
        component={AddListScreen}
        options={{...defaultStyles, title: 'Add new list'}}
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
