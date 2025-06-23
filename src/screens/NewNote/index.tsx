import {useNavigation} from '@react-navigation/native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import CategoryDropDown from '../../components/CategoryDropDown';
import CustomText from '../../components/CustomText';
import {Colors} from '../../constants/colors';
import {addNote} from '../../redux/slices/notesSlice';
import {AppDispatch} from '../../redux/store/store';
import {useTranslation} from 'react-i18next';

export interface NewNoteScreenHandle {
  saveNewNote: () => void;
}

const NewNoteScreen = forwardRef<NewNoteScreenHandle>((_, ref) => {
  const {t} = useTranslation();
  const [note, setNote] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [errorSelectedCategory, setErrorSelectedCategory] =
    useState<boolean>(false);
  const [emptyNote, setEmptyNote] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  useImperativeHandle(ref, () => ({
    saveNewNote() {
      setErrorSelectedCategory(selectedCategory ? false : true);
      setEmptyNote(note ? false : true);
      if (selectedCategory && note) {
        dispatch(addNote({categoryId: selectedCategory, note}))
          .unwrap()
          .then(() => {
            handleClearNote();
            navigation.goBack();
          });
      }
    },
  }));

  const handleInputChange = (text: string) => {
    setNote(text);
  };
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  const handleClearNote = () => {
    setNote('');
    setSelectedCategory('');
    setErrorSelectedCategory(false);
    setEmptyNote(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <CategoryDropDown
          onSelectCategory={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </View>
      {errorSelectedCategory && (
        <CustomText style={styles.selecteCategory}>
          {t('please_select_category')}
        </CustomText>
      )}
      <TextInput
        style={styles.input}
        placeholder={t('please_input_note_content')}
        placeholderTextColor={Colors.blur_1}
        multiline
        value={note}
        onChangeText={handleInputChange}
        maxLength={200}
      />
      {emptyNote && (
        <CustomText style={styles.selecteCategory}>
          {t('please_enter_note')}
        </CustomText>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 26,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: Colors.blur_2,
    borderWidth: 1,
    borderColor: Colors.blur_3,
    borderRadius: 16,
    height: 260,
    marginTop: 16,
    padding: 16,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 21, // 150% of fontSize (14)
    letterSpacing: -0.28, // -2% of fontSize (14)
    color: Colors.blur_1,
    zIndex: 0,
  },
  selecteCategory: {
    color: Colors.red,
  },
  dropdown: {
    zIndex: 10,
  },
});

export default NewNoteScreen;
