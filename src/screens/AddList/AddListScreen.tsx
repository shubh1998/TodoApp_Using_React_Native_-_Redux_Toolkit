import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, TextInput, Keyboard, Alert, ToastAndroid } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton } from '../../components/Button/Button';
import { globalStyles } from '../../global/styles/globalStyles';
import { AddNewList } from '../../redux-store/redux/ToDoApp/ListReducer';
import { DefaultRootStoreType } from '../../utils/types/defaultRootStoreType';
import { listType } from '../../utils/types/listType';

export const AddListScreen = ({
    navigation,
  }: {
    navigation: StackScreenProps<any, any>['navigation'];
  }) => {
  const [newList, setNewList] = useState('');
  const dispatch = useDispatch();
  const lists: Array<listType> = useSelector(
    (state: DefaultRootStoreType) => state.ListReducer.list,
  );

  const submitHandler = () => {
    if (newList.trim() === '') {
      return Alert.alert('Validation', 'Name is required!');
    }
    const alreadyExist = lists.find((l: listType) => l.note.toLowerCase() === newList.trim().toLowerCase());
    if (alreadyExist) {
      return Alert.alert('Validation', 'List with this name already exist!');
    }
    
    const newListObject = {
        id: Math.random(),
        note: newList
    }

    dispatch(AddNewList(newListObject));
    ToastAndroid.show(`"${newList}" list created!`, ToastAndroid.LONG);
    navigation.navigate("Home")
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <TextInput style={globalStyles.input} value={newList} onChangeText={(val) => setNewList(val)} placeholder="List name" placeholderTextColor={Colors.tertiary} />
        <CustomButton text="Submit" onPress={submitHandler} />
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