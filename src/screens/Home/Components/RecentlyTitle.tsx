import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, View} from 'react-native';
import {Icons} from '../../../assets';
import CustomText from '../../../components/CustomText';
import {Colors} from '../../../constants/colors';

const RecentlyTitle: React.FC = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Image source={Icons.clock} style={styles.image} />
      <CustomText style={styles.text}>{t('recently_created_notes')}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    marginRight: 9,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19.2, // 120% of 16
    letterSpacing: -0.32, // -2% of 16
    color: Colors.blur_4,
    marginTop: 5,
  },
});

export default React.memo(RecentlyTitle);
