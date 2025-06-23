import {FlatList, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../redux/hook/useAppSelector';
import SummaryItem from './Components/SummaryItem';
import {Colors} from '../../constants/colors';

const SummaryScreen = () => {
  const categories = useAppSelector(state => state.notes.categories);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.categoryList}
        data={categories}
        renderItem={({item}) => <SummaryItem category={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blur_2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  categoryList: {},
});

export default SummaryScreen;
