import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CustomButton} from '../../../components/Button/Button';
import {globalStyles} from '../../../global/styles/globalStyles';
import {AddNewTask} from '../../../redux-store/redux/Task/TaskReducer';
import { Colors } from '../../../utils/constants';
import {DefaultRootStoreType} from '../../../utils/types/defaultRootStoreType';
import {taskType} from '../../../utils/types/taskType';

export const AddTaskScreen = ({
  navigation,
}: {
  navigation: StackScreenProps<any, any>['navigation'];
}) => {
  const [newTask, setNewTask] = useState('');
  const dispatch = useDispatch();
  const tasks: Array<taskType> = useSelector(
    (state: DefaultRootStoreType) => state.TaskReducer.taskList,
  );

  const submitHandler = () => {
    if (newTask.trim() === '') {
      return Alert.alert('Validation', 'Task description is required!');
    }
    const alreadyExist = tasks.find(
      (l: taskType) =>
        l.taskNote.toLowerCase() === newTask.trim().toLowerCase(),
    );
    if (alreadyExist) {
      return Alert.alert('Validation', 'List with this name already exist!');
    }

    const newListObject: taskType = {
      id: Math.random(),
      completed: false,
      listId: 1,
      taskNote: newTask,
    };

    dispatch(AddNewTask(newListObject));
    ToastAndroid.show(`"${newTask}" task created!`, ToastAndroid.LONG);
    navigation.navigate('Home');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <TextInput
          style={globalStyles.input}
          value={newTask}
          onChangeText={val => setNewTask(val)}
          placeholder="List name"
          placeholderTextColor={Colors.tertiary}
        />
        <CustomButton text="Submit" onPress={submitHandler} style={{backgroundColor: Colors.danger, borderRadius: 50}}/>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    flex: 1,
  },
});
