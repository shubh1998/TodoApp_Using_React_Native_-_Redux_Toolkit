import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CustomButton} from '../../../components/Button/Button';
import {Tasks} from '../../../components/Tasks/Tasks';
import { globalStyles } from '../../../global/styles/globalStyles';
import { setActiveListId } from '../../../redux-store/redux/List/ListReducer';
import {Colors} from '../../../utils/constants';
import {DefaultRootStoreType} from '../../../utils/types/defaultRootStoreType';

export const TaskListScreen = ({
  navigation,
  route,
}: {
  navigation: StackScreenProps<any, any>['navigation'];
  route: any;
}) => {
  const listIdParam = route.params.id;
  const dispatch = useDispatch()
  const tasks = useSelector(
    (state: DefaultRootStoreType) => state.TaskReducer.taskList,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      dispatch(setActiveListId(listIdParam))
    }, 1000);
  }, [loading, dispatch]);

  return (
    loading ? 
    <ActivityIndicator color={Colors.quaternary} size={"large"} style={globalStyles.loader}/> :
    <View style={styles.container}>
      <Tasks navigation={navigation} listId={listIdParam} tasks={tasks}/>
      <CustomButton
        text="Add new task"
        icon="add"
        iconColor="#fff"
        onPress={() => navigation.navigate('NewTask')}
        style={{backgroundColor: Colors.danger}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});
