import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Images} from '../../assets';
import CustomText from '../../components/CustomText';
import {Colors} from '../../constants/colors';

export interface RightIcon {
  icon: any;
  onPress: () => void;
}

interface Props {
  title: string;
}

const SummaryHeader: React.FC<Props> = ({title}) => {
  return (
    <View style={styles.headerContainer}>
      <CustomText style={styles.title}>{title}</CustomText>
      <Image source={Images.robot} style={[styles.robotmage]} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 220,
  },

  title: {
    fontSize: 24,
    fontWeight: 600,
    color: Colors.white,
    marginLeft: 20,
  },
  rightIcon: {
    marginLeft: 16,
  },
  robotmage: {
    resizeMode: 'contain',
  },
});

export default SummaryHeader;
