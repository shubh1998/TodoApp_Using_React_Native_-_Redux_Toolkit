import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {List} from '../../components/List/List';
import {CustomButton} from '../../components/Button/Button';

export const HomeScreen = ({
  navigation,
}: {
  navigation: StackScreenProps<any, any>['navigation'];
}) => {
  return (
    <View style={styles.container}>
      <List navigation={navigation} />
      <CustomButton
        text="Add new list"
        icon="add"
        iconColor="#fff"
        onPress={() => navigation.navigate('NewList')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
