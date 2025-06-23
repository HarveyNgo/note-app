import {useNavigation} from '@react-navigation/native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Icons} from '../../assets';
import ConfirmModal from '../../components/ConfirmModal';
import {deleteAllNote} from '../../redux/slices/notesSlice';
import {AppDispatch} from '../../redux/store/store';
import {Colors} from '../../constants/colors';
import InfoModal from '../../components/InforModal';

const items = [
  {id: 1, icon: 'onlineCustomer', text: 'online_customer'},
  {id: 2, icon: 'userAgreement', text: 'user_agreement'},
  {id: 3, icon: 'privacyPolicy', text: 'privacy_policy'},
  {id: 4, icon: 'aboutUs', text: 'about_us'},
];

export interface Props {
  deleteAllNote: () => void;
}

const SettingScreen = forwardRef<Props>((_, ref) => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  const handleDelete = () => {
    setModalVisible(false);
    dispatch(deleteAllNote({}))
      .unwrap()
      .then(() => {
        setInfoVisible(true);
      });
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleInfoClose = () => {
    setInfoVisible(false);
    navigation.goBack();
  };

  useImperativeHandle(ref, () => ({
    deleteAllNote() {
      setModalVisible(true);
    },
  }));

  return (
    <>
      <View style={styles.container}>
        {items.map(item => (
          <TouchableOpacity key={item.id} style={styles.item}>
            <Image
              source={Icons[item.icon as keyof typeof Icons]}
              style={styles.icon}
            />
            <Text style={styles.text}>{t(item.text)}</Text>
            <Image source={Icons.arrowRight} style={styles.arrowRight} />
          </TouchableOpacity>
        ))}
      </View>
      <ConfirmModal
        visible={modalVisible}
        title={t('delete_all_notes')}
        message={t('confirm_delete_all_notes')}
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />
      <InfoModal
        visible={infoVisible}
        onClose={handleInfoClose}
        message={t('all_notes_cleared_message')}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    paddingLeft: 12,
    paddingRight: 28,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: Colors.blur_2,
    marginBottom: 16,
  },
  icon: {
    marginRight: 16,
    resizeMode: 'contain',
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19.2,
    letterSpacing: -0.02,
    color: Colors.blur_1,
  },

  arrowRight: {
    resizeMode: 'contain',
  },
});

export default SettingScreen;
