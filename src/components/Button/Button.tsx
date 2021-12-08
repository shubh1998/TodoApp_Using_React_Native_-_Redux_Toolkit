import React, { ReactNode } from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const CustomButton = ({
  onPress,
  text,
  icon,
  iconColor,
  style,
}: {
    onPress?: ()=>void
    text: string
    icon?: string
    iconColor?: string
    style?: Object
}) => {
  let btnStyle = {...styles.container, ...style};

  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.8}
      underlayColor="transparent">
      <View style={btnStyle}>
        {icon && (
          <Icon name={icon} size={24} color={iconColor} style={styles.icon} />
        )}
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Eina02-Regular',
    color: '#fff',
  },
  icon: {
    marginRight: 5,
  },
  danger: {
    backgroundColor: Colors.danger,
  },
  round: {
    borderRadius: 30,
  },
});
