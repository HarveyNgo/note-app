import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icons} from '../../assets';
import CustomText from '../../components/CustomText';
import {Colors} from '../../constants/colors';

export interface RightIcon {
  icon: any;
  onPress: () => void;
}

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightIcon?: RightIcon;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = false,
  rightIcon,
}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image source={Icons.back} style={[styles.backImage]} />
          </TouchableOpacity>
        )}
        <CustomText style={styles.title}>{title}</CustomText>
        {rightIcon && (
          <TouchableOpacity
            onPress={rightIcon.onPress}
            style={styles.rightIcon}>
            <Image source={rightIcon.icon} style={[styles.rightImage]} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bottomColor,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 68,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 11,
    marginTop: 5,
  },
  backImage: {
    width: 8,
    height: 14,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    color: Colors.white,
    flex: 1,
    lineHeight: 36,
  },
  rightIcon: {
    marginLeft: 16,
  },
  rightImage: {
    width: 24,
    height: 24,
  },
});

export default CustomHeader;
