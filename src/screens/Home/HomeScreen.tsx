import React from 'react';
import {Button, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

export const HomeScreen = ({
  navigation,
}: {
  navigation: StackScreenProps<any, any>['navigation'];
}) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title={'Add List'}
        onPress={() => navigation.navigate('NewList')}
      />
    </View>
  );
};
