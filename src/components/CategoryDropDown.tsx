import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {Icons} from '../assets';
import CustomText from './CustomText';
import {Colors} from '../constants/colors';
import {useAppSelector} from '../redux/hook/useAppSelector';
import {useTranslation} from 'react-i18next';

interface Props {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
}
const CategoryDropDown: React.FC<Props> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const {t} = useTranslation();

  const categories = useAppSelector(state => state.notes.categories);
  const categoryList = React.useMemo(
    () =>
      categories.map(category => ({
        id: category.id,
        name: category.name,
      })),
    [categories],
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>(
    t('choose_category'),
  );

  useEffect(() => {
    if (selectedCategory) {
      const categoryItem = categoryList.find(
        category => category.id === selectedCategory,
      );
      setCurrentCategory(categoryItem?.name || '');
    } else {
      setCurrentCategory(t('choose_category'));
    }
  }, [categoryList, selectedCategory, t]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectCategoryHandler = (categoryId: string, categoryName: string) => {
    setCurrentCategory(categoryName);
    onSelectCategory(categoryId);
    setIsDropdownOpen(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setIsDropdownOpen(false)}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          <CustomText style={styles.dropdownText}>{currentCategory}</CustomText>
          <Image source={Icons.arrowDown} style={styles.arrow} />
        </TouchableOpacity>

        {isDropdownOpen && (
          <View style={[styles.dropdownMenu, styles.dropdownShow]}>
            <FlatList
              data={categoryList}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => selectCategoryHandler(item.id, item.name)}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {},
  dropdown: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.blur_3,
    backgroundColor: Colors.blur_2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    color: Colors.blur_1,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21, // Converted 150% of fontSize (14 * 1.5)
    letterSpacing: -0.28, // Converted -2% of fontSize (14 * -0.02)
  },
  arrow: {
    resizeMode: 'contain',
  },
  dropdownMenu: {
    marginTop: 8,
    backgroundColor: Colors.blur_2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  dropdownShow: {
    position: 'absolute',
    top: 50,
    zIndex: 10,
    width: '100%',
    backgroundColor: Colors.white,
  },
  item: {
    padding: 14,
  },
  itemText: {
    color: Colors.black,
    fontSize: 16,
  },
});

export default CategoryDropDown;
