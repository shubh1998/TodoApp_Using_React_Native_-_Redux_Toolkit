import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {globalStyles} from '../../global/styles/globalStyles';
import {DefaultRootStoreType} from '../../utils/types/defaultRootStoreType';
import {listType} from '../../utils/types/listType';

export const List = ({
  navigation,
}: {
  navigation?: StackScreenProps<any, any>['navigation'];
}) => {
  const lists = useSelector(
    (state: DefaultRootStoreType) => state.ListReducer.list,
  );

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
