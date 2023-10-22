import React, { useState } from 'react';
import { Text, View, Modal, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import howToUseModalStyles from './HowToUseModal.style';
import { fetchStore } from '@/app/services/fetchStore';

interface CreateModalProps {
  howToUseModalVisible: boolean;
  setHowToUseModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const HowToUseModal: React.FC<CreateModalProps> = ({
  howToUseModalVisible,
  setHowToUseModalVisible,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={howToUseModalVisible}
      style={howToUseModalStyles.modalView}
      onRequestClose={() => {
        alert("Modal has been closed.");
        setHowToUseModalVisible(false);
      }}
    >
      <View style={howToUseModalStyles.centeredView}>
        <View style={howToUseModalStyles.modalView}>
          <Text style={howToUseModalStyles.modalText}>新規スレッド作成</Text>
          <View style={[howToUseModalStyles.buttonView]}>
            <Pressable
              style={[howToUseModalStyles.button]}
              onPress={() => setHowToUseModalVisible(!howToUseModalVisible)}
            >
              <Text style={howToUseModalStyles.textStyle}>閉じる</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default HowToUseModal;