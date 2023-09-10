import React, { useState } from 'react';
import { Text, View, Modal, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import { APP_URL } from "@/config";
import { LoginUser } from '@/contexts/auth/type';
import createModalStyles from './CreateModal.style';
import { fetchStore } from '@/services/fetchStore';

interface CreateModalProps {
  postId: number;
  loginUser: LoginUser;
  setSnackMessage: (message: string) => void;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateModal: React.FC<CreateModalProps> = ({
  postId,
  loginUser,
  setSnackMessage,
  modalVisible,
  setModalVisible,
  setShouldRefetch,
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [inputHeight, setInputHeight] = useState<number>(0);

  async function makePost(loginUser: LoginUser) {
    const path = APP_URL + '/api/post_comment';
    const requestBody = JSON.stringify({
      post_id: postId,
      user_id: loginUser.user.id,
      body: body,
      ...imageUrl && { image_url: imageUrl },
    });
    
    const { data, error } = await fetchStore(path, requestBody);
  
    if (data) {
      setSnackMessage('新規のコメントを作成しました');
      setShouldRefetch(true);
    } else if (error) {
      setSnackMessage('エラー：操作に失敗しました');
    }
  
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
            <Text style={createModalStyles.modalText}>コメント投稿</Text>
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
                style={{ height: 300 }}
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