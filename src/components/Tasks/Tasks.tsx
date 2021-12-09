import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalStyles} from '../../global/styles/globalStyles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {taskType} from '../../utils/types/taskType';
import {StackScreenProps} from '@react-navigation/stack';

export const Tasks = ({
  navigation,
  listId,
  tasks,
}: {
  navigation?: StackScreenProps<any, any>['navigation'];
  listId: number | string;
  tasks: Array<taskType>;
}) => {
  const [data, setData] = useState<Array<taskType>>([]);

  useEffect(() => {
    if (tasks) {
      const copyTasks = [...tasks];
      const filteredTasks = copyTasks.filter(
        (t: taskType) => t.listId === listId,
      );
      setData(filteredTasks);
    }
  }, [tasks, listId]);

  const taskClickHandler = (item: taskType) => {
    if (navigation) {
      navigation.navigate('ViewAndUpdateTask', {id: item.id});
    }
  };

  return (
    <View style={styles.container}>
      {data.length ? (
        <FlatList
          data={data}
          contentContainerStyle={globalStyles.listContainer}
          keyExtractor={(item: any) => item.id}
          renderItem={({item}: {item: taskType}) => (
            <TouchableOpacity
              style={
                !item.completed
                  ? globalStyles.listItem
                  : {...globalStyles.listItem, ...styles.itemCompleted}
              }
              onPress={() => taskClickHandler(item)}  
            >
              <View style={styles.textWrapper}>
                <Text style={styles.itemText}>{item.taskNote}</Text>
                {item.completed && (
                  <Icon
                    name="checkmark-circle-outline"
                    size={30}
                    color={Colors.primary}
                  />
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={globalStyles.noData}>No tasks in this list</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemCompleted: {
    backgroundColor: Colors.secondary,
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'Eina02-Regular',
    flex: 1,
    paddingRight: 10,
  },
});
