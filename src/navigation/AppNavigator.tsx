import React from 'react';
import {NavigationContainer, Route, RouteProp} from '@react-navigation/native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { AddListScreen } from '../screens/AddList/AddListScreen';
import { Colors } from '../utils/constants';
import { TaskListScreen } from '../screens/Task/TaskList/TaskListScreen';

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

      <TasksStackNavigator.Screen
        name="TaskList"
        component={TaskListScreen}
        options={({route, navigation}: {route: any, navigation: StackScreenProps<any, any>['navigation'] })=>({...defaultStyles, title: route.params.name})}
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
