import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, TouchableWithoutFeedback, Keyboard, ActivityIndicator, ToastAndroid, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CustomButton } from '../../../components/Button/Button';
import { globalStyles } from '../../../global/styles/globalStyles';
import { Colors } from '../../../utils/constants';
import { DefaultRootStoreType } from '../../../utils/types/defaultRootStoreType';
import { taskType } from '../../../utils/types/taskType';

export const ViewAndUpdateTaskScreen = ({ route, navigation }: {
    route: any;
    navigation: StackScreenProps<any, any>['navigation'];
}) => {
  const [name, setName] = useState('');
  const [completed, setCompleted] = useState(false);
  const [task, setTask] = useState<taskType>();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const tasks = useSelector((state: DefaultRootStoreType) => state.TaskReducer.taskList);

  useEffect(() => {
    const taskFound: taskType = tasks.find((t: taskType) => t.id === route.params.id) as taskType;
    if (taskFound) {
      setName(taskFound.taskNote);
      setCompleted(taskFound.completed);
      setTask(taskFound);
      setLoading(false);
    }
  }, [tasks, route.params.id]);

  const updateTaskHandler = () => {
    if (task?.taskNote === name && task.completed === completed) {
      return Alert.alert('Nothing changed', 'Cannot update because nothing was changed!');
    }

    // const updatedTask = {
    //   ...task,
    //   name,
    //   completed,
    // };

    // navigation.goBack();
    // ToastAndroid.show('Task updated!', ToastAndroid.LONG);
  };

  const deleteTaskClickHandler = () => {
    Alert.alert(
      'Delete task',
      'Are you sure you want to delete this task?',
      [{ text: 'Cancel' }, { text: 'Delete', onPress: () => deleteTaskHandler() }]
    );
  };

  const deleteTaskHandler = () => {
    navigation.goBack();
        ToastAndroid.show(`Task "${task?.taskNote} deleted!"`, ToastAndroid.LONG);
  };

  if (loading) {
    return <ActivityIndicator color={Colors.primary} size="large" style={globalStyles.loader} />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <TextInput value={name} onChangeText={(val) => setName(val)} placeholder="Task name" placeholderTextColor={Colors.quaternary} style={globalStyles.input} />
        <View style={globalStyles.switchContainer}>
          <Switch
            value={completed}
            onValueChange={(val) => setCompleted(val)}
            thumbColor={completed ? Colors.primary : Colors.secondary}
            trackColor={{ false: Colors.tertiary, true: Colors.quaternary }}
          />
          <Text style={globalStyles.switchText}>Complete task</Text>
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