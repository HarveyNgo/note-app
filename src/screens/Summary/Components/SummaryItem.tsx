import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Images} from '../../../assets';
import PrimaryButton from '../../../components/PrimaryButton';
import {Colors} from '../../../constants/colors';
import {Category} from '../../../types/category';
import {useTranslation} from 'react-i18next';
import CustomText from '../../../components/CustomText';

interface Props {
  category: Category;
}
const SummaryItem: React.FC<Props> = ({category}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.firstLine}>
        <Image
          source={Images[category.avatar as keyof typeof Images]}
          style={styles.image}
        />
        <Text style={styles.text}>{category.name}</Text>
        <PrimaryButton
          style={styles.button}
          title={t('detail')}
          onPress={() => {}}
        />
      </View>

      <View style={styles.secondLine}>
        <CustomText style={styles.secondLineText}>
          {t('topic_total_records', {count: category.items.length})}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  firstLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 30,
    resizeMode: 'contain',
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19.2, // Converted 120% of fontSize (16 * 1.2)
    letterSpacing: -0.32, // Converted -2% of fontSize (16 * -0.02)
    marginLeft: 6,
    color: Colors.white,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 0,
    borderRadius: 24,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 18.2, // Converted 130% of fontSize (14 * 1.3)
    letterSpacing: -0.02, // Converted -2% of fontSize (14 * -0.02)
  },
  secondLine: {
    backgroundColor: Colors.blur_2,
    borderRadius: 16,
    padding: 16,
  },
  secondLineText: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 18.2, // Converted 130% of fontSize (14 * 1.3)
    letterSpacing: -0.28, // Converted -2% of fontSize (14 * -0.02)
    color: Colors.blur_4,
  },
});

export default React.memo(SummaryItem);
