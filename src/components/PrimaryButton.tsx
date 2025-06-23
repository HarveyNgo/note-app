import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';
import {Colors} from '../constants/colors';
import CustomText from './CustomText';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      testID="button"
      onPress={onPress}
      style={[styles.button, style]}>
      <CustomText style={[styles.text, textStyle]}>{title}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 24,
    paddingVertical: 8,
    backgroundColor: Colors.primary,
  },
  text: {
    fontSize: 14,
    lineHeight: 18.2, // 130% of 14px
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
  },
});

export default PrimaryButton;
