import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useAppSelector} from '../../redux/hook/useAppSelector';
import Category from './Components/CategoryItem';
import RecentlyTitle from './Components/RecentlyTitle';
import {useMemo} from 'react';

const HomeScreen = () => {
  const categories = useAppSelector(state => state.notes.categories);
  const latestItemsPerCategory = useMemo(() => {
    return categories.map(category => {
      const sortedItems = [...category.items].sort((a, b) => {
        return (
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
      });
      return {
        ...category,
        items: sortedItems.slice(0, 3),
      };
    });
  }, [categories]);

  return (
    <View style={styles.container}>
      <RecentlyTitle />
      <FlatList
        style={styles.categoryList}
        data={latestItemsPerCategory}
        renderItem={({item}) => <Category category={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 19,
  },
  categoryList: {},
});
export default HomeScreen;
