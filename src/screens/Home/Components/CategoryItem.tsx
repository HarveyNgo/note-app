import React from 'react';
import {Category} from '../../../types/category';
import {Image, StyleSheet, View} from 'react-native';
import {Icons} from '../../../assets';
import CustomText from '../../../components/CustomText';
import {Colors} from '../../../constants/colors';

interface Props {
  category: Category;
}
const MAX_DISPLAY_ITEMS = 3;
const MAX_LENGTH = 20;

const CategoryItem: React.FC<Props> = ({category}) => {
  return (
    <View style={styles.container}>
      <View style={styles.categoryItem}>
        <Image
          source={Icons[category.icon as keyof typeof Icons]}
          style={styles.image}
        />
        <CustomText style={styles.categoryText}>{category.name}</CustomText>
      </View>
      <View style={styles.itemsList}>
        {category.items.slice(0, MAX_DISPLAY_ITEMS).map((item, _) => (
          <View key={item.id} style={styles.item}>
            <CustomText style={styles.itemTitle}>
              {item.title.slice(0, MAX_LENGTH)}
            </CustomText>
            <Image source={Icons.arrowRight} style={styles.arrowRight} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 27,
  },
  categoryItem: {
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19.2,
    letterSpacing: -0.02,
    color: Colors.white,
    marginLeft: 8,
  },
  itemsList: {},
  item: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.blur_3,
    backgroundColor: Colors.blur_2,
    marginTop: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 16.8,
    letterSpacing: -0.02,
    color: Colors.blur_1,
    maxWidth: 271,
  },
  arrowRight: {
    resizeMode: 'contain',
  },
});

export default React.memo(CategoryItem);
