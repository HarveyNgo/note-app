import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

const CustomText: React.FC<TextProps> = ({style, ...props}) => {
  return <Text style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'PingFang-SC-Regular',
  },
});
export default CustomText;
