import React from 'react';
import {NavigationContainer, Route, RouteProp} from '@react-navigation/native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { AddListScreen } from '../screens/AddList/AddListScreen';
import { Colors } from '../utils/constants';
import { TaskListScreen } from '../screens/Task/TaskList/TaskListScreen';
import { Alert, ToastAndroid, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteList, setActiveListId } from '../redux-store/redux/List/ListReducer';
import { AddTaskScreen } from '../screens/Task/AddTask/AddTaskScreen';
import { DefaultRootStoreType } from '../utils/types/defaultRootStoreType';
import { taskType } from '../utils/types/taskType';
import { ViewAndUpdateTaskScreen } from '../screens/Task/ViewAndUpdateTask/ViewAndUpdateTaskScreen';

const TasksStackNavigator = createStackNavigator();

const defaultStyles = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTintColor: Colors.white,
    headerTitleStyle: {
        fontFamily: "Eina02-Regular",
        fontWeight: "700",
        fontSize: 21,
    },
    deleteIconStyle: {
      marginRight: 15
    }
}

const TaskNavigator = () => {
  const dispatch = useDispatch()
  const tasksExist = useSelector((state: DefaultRootStoreType) => state.TaskReducer.taskList)
  const currentActiveListId = useSelector((state: DefaultRootStoreType) => state.ListReducer.activeListId,);

  const deleteListConfirm = ({
    id, 
    navigation
  }:{
    id: string | number, 
    navigation: StackScreenProps<any, any>['navigation']
  }) => {
    const tasksOfList = tasksExist.filter((item: taskType) => item.listId===currentActiveListId)
    if(tasksOfList.length){
      return Alert.alert(
        'Alert', 
        "List can't be deleted, Please delete all tasks first !"
      )
    }
    dispatch(deleteList(id))
    navigation.goBack();
    ToastAndroid.show('List deleted successsfully!', ToastAndroid.LONG);
  }

  const onClickToDeleteList = ({
    id, 
    navigation
  }:{
    id: string | number, 
    navigation: StackScreenProps<any, any>['navigation']
  }) => {
    Alert.alert(
      'Delete List', 
      "Are you sure you want to delete list", 
      [
        {text: 'Cancel'},
        {text: 'Confirm Delete', onPress: ()=>deleteListConfirm({id, navigation})}
      ]
    )
  }

  return (
    <TasksStackNavigator.Navigator>
      <TasksStackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{...defaultStyles, title: 'Todo lists', headerTitleAlign: 'center'}}
      />

      <TasksStackNavigator.Screen
        name="NewList"
        component={AddListScreen}
        options={{...defaultStyles, title: 'Add new list'}}
      />

      <TasksStackNavigator.Screen
        name="TaskList"
        component={TaskListScreen}
        options={({route, navigation}: {
          route: any, 
          navigation: StackScreenProps<any, any>['navigation'] 
        })=>(
          {
            ...defaultStyles, 
            title: route.params.name,
            headerRight: ()=>(
              <View style={defaultStyles.deleteIconStyle}>
                <Icon name="md-trash" 
                  color="#fff" 
                  size={30} 
                  onPress={() => onClickToDeleteList({id: route.params.id, navigation})}
                />
              </View>
            )
          }
        )}
      />

      <TasksStackNavigator.Screen
        name="NewTask"
        component={AddTaskScreen}
        options={{...defaultStyles, title: 'Add new task in a list'}}
      />

      <TasksStackNavigator.Screen
        name="ViewAndUpdateTask"
        component={ViewAndUpdateTaskScreen}
        options={{...defaultStyles, title: 'Task detail'}}
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
