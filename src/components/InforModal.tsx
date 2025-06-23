import React from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../constants/colors';
import CustomText from './CustomText';
import PrimaryButton from './PrimaryButton';

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

const InfoModal: React.FC<InfoModalProps> = ({visible, onClose, message}) => {
  const {t} = useTranslation();
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <LinearGradient
          colors={['#C724E1', '#4E22CC']}
          style={styles.modalContainer}>
          <View style={styles.content}>
            <CustomText style={styles.message}>{message}</CustomText>
            <View style={styles.buttonContainer}>
              <PrimaryButton title={t('ok')} onPress={onClose} />
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    minHeight: 76,
    borderRadius: 20,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 31,
  },
  message: {
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default InfoModal;
