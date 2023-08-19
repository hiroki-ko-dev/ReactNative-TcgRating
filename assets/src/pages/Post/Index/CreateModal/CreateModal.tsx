import React, { useState } from 'react';
import { Text, View, Modal, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import { APP_URL } from "../../../../config";
import { LoginUser } from '../../../../contexts/auth/type';
import createModalStyles from './CreateModal.style';
import { fetchStore } from '@/services/fetchStore';

interface CreateModalProps {
  loginUser: LoginUser;
  setSnackMessage: (message: string) => void;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // これも追加
  fetchData: () => void; 
}

const CreateModal: React.FC<CreateModalProps> = ({
  loginUser,
  setSnackMessage,
  modalVisible,
  setModalVisible,
  fetchData,
}) => {
  const [title, setTitle] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [inputHeight, setInputHeight] = useState<number>(0);

  async function makePost(loginUser: LoginUser) {
    const path = APP_URL + '/api/post';
    const requestBody = JSON.stringify({
      user_id: loginUser.user.id,
      title: title,
      ...imageUrl && { image_url: imageUrl },
      body: body,
    });
    
    const { data, error } = await fetchStore(path, requestBody);
  
    if (data) {
      setSnackMessage('新規のスレッドを作成しました');
      fetchData();
    } else if (error) {
      setSnackMessage('エラー：操作に失敗しました');
    }
  
    setTitle('');
    setBody('');
    setImageUrl('');
  
    setModalVisible(!modalVisible);
  }

  return (
    <View style={createModalStyles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={createModalStyles.centeredView}>
          <View style={createModalStyles.modalView}>
            <Text style={createModalStyles.modalText}>新規スレッド作成</Text>
            <View style={[createModalStyles.inputContainer]}>
              <TextInput
                label="タイトル"
                value={title}
                onChangeText={text => setTitle(text)}
              />
            </View>
            <View style={[createModalStyles.inputContainer]}>
              <TextInput
                label="デッキコード(省略可)"
                value={imageUrl}
                placeholder="デッキ構築相談などにご利用ください"
                onChangeText={text => setImageUrl(text)}
              />
            </View>
            <View style={[createModalStyles.inputContainer, {height: inputHeight+20},]}>
              <TextInput
                label="本文"
                value={body}
                multiline={true}
                blurOnSubmit={false}
                onChangeText={text => setBody(text)}
                numberOfLines={15}
                returnKeyType="done"
              />
            </View>
            <View style={[createModalStyles.buttonView]}>
              <Pressable
                style={[createModalStyles.button, createModalStyles.buttonConform]}
                onPress={() => makePost(loginUser)}
              >
                <Text style={createModalStyles.textStyle}>確定する</Text>
              </Pressable>
              <Pressable
                style={[createModalStyles.button, createModalStyles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={createModalStyles.textStyle}>閉じる</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CreateModal;