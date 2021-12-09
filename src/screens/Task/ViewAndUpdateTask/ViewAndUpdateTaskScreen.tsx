import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, TouchableWithoutFeedback, Keyboard, ActivityIndicator, ToastAndroid, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CustomButton } from '../../../components/Button/Button';
import { globalStyles } from '../../../global/styles/globalStyles';
import { deleteTask, updateTask } from '../../../redux-store/redux/Task/TaskReducer';
import { Colors } from '../../../utils/constants';
import { DefaultRootStoreType } from '../../../utils/types/defaultRootStoreType';
import { taskType } from '../../../utils/types/taskType';

export const ViewAndUpdateTaskScreen = ({ route, navigation }: {
    route: any;
    navigation: StackScreenProps<any, any>['navigation'];
}) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [task, setTask] = useState<taskType>();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const tasks = useSelector((state: DefaultRootStoreType) => state.TaskReducer.taskList);
  const taskId = route.params.id;

  useEffect(() => {
    setTimeout(()=>{
        setLoading(false);
    }, 1000)
    const taskFound: taskType = tasks.find((t: taskType) => t.id === taskId) as taskType;
    if (taskFound) {
      setTaskDescription(taskFound.taskNote);
      setCompleted(taskFound.completed);
      setTask(taskFound);
    }
  }, [tasks, taskId]);

  const updateTaskHandler = () => {
    if(task){
        if (task.taskNote === taskDescription && task.completed === completed) {
            return Alert.alert('Nothing changed', 'Cannot update because nothing was changed!');
        }
        
        if (taskDescription.trim() === '') {
            return Alert.alert('Validation', 'Name is required!');
        }
        const alreadyExist = tasks.find((t: taskType) => t.taskNote.toLowerCase() === taskDescription.trim().toLowerCase() && t.completed === completed);
        if (alreadyExist) {
            return Alert.alert('Validation', 'Task already exist in the list!');
        }

        const updatedTaskObject: taskType = {
          ...task,
          taskNote: taskDescription,
          completed,
        };
        dispatch(updateTask(updatedTaskObject))
        setTimeout(()=>{
            navigation.goBack();
        }, 500)
        ToastAndroid.show('Task updated!', ToastAndroid.LONG);
        Keyboard.dismiss()
    }
  };

  const deleteTaskClickHandler = () => {
    Alert.alert(
      'Delete task',
      'Are you sure you want to delete this task?',
      [{ text: 'Cancel' }, { text: 'Delete', onPress: () => {
            dispatch(deleteTask(taskId))
            setTimeout(()=>{
                navigation.goBack();
            }, 500)
            ToastAndroid.show(`Task "${task?.taskNote} deleted!"`, ToastAndroid.LONG);
      } }]
    );
  };


  return (
    loading 
    ? <ActivityIndicator color={Colors.primary} size="large" style={globalStyles.loader} /> :
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <TextInput value={taskDescription} onChangeText={(val) => setTaskDescription(val)} placeholder="Task name" placeholderTextColor={Colors.quaternary} style={globalStyles.input} />
        <View style={globalStyles.switchContainer}>
          <Switch
            value={completed}
            onValueChange={(val) => setCompleted(val)}
            thumbColor={completed ? Colors.primary : Colors.secondary}
            trackColor={{ false: Colors.tertiary, true: Colors.quaternary }}
          />
          <Text style={globalStyles.switchText}>{completed ? 'Complete task' : 'Incomplete task'}</Text>
        </View>
        <CustomButton text="Update task" onPress={updateTaskHandler} style={{...styles.spaceBottom, backgroundColor: Colors.primary, borderRadius: 50}}/>
        <CustomButton text="Delete task" onPress={deleteTaskClickHandler} style={{backgroundColor: Colors.danger, borderRadius: 50}}/>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  spaceBottom: {
    marginBottom: 30,
  },
});