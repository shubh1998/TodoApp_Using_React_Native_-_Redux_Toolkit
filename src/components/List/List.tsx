import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import {globalStyles} from '../../global/styles/globalStyles';
import {listType} from '../../utils/types/listType';

export const List = ({
  navigation,
  lists
}: {
  navigation?: StackScreenProps<any, any>['navigation'];
  lists: Array<listType>
}) => {
  const onItemClick = (item: listType) => {
    if(navigation){
      navigation.navigate('TaskList', {name: item.note, id: item.id});
    }
  };

  return (
    <View style={styles.container}>
      {lists.length ? (
        <FlatList
          keyExtractor={(item: any) => item.id}
          data={lists}
          renderItem={({item}: {item: listType}) => {
            return (
              <TouchableOpacity
                style={globalStyles.listItem}
                onPress={() => onItemClick(item)}>
                <Text style={styles.itemText}>{item.note}</Text>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <Text style={globalStyles.noData}>No Lists</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  itemText: {
    fontFamily: 'Eina02-Regular',
    fontSize: 16,
    color: '#000',
  },
});
