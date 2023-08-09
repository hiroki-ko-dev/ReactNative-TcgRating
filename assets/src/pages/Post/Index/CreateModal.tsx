import React, { useState } from 'react';
import { Text, View, Modal, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import { APP_URL } from "../../../config";
import { LoginUser } from '../../../contexts/auth/type';
import postStyles from '../Post.style';

interface CreateModalProps {
  loginUser: LoginUser;
  setMessage: (message: string) => void;
  setSnackVisible: (visible: boolean) => void;
  modalVisible: boolean;  // これを追加
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>; // これも追加
}

const CreateModal: React.FC<CreateModalProps> = ({ loginUser, setMessage, setSnackVisible, modalVisible, setModalVisible }) => {
  const [title, setTitle] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [inputHeight, setInputHeight] = useState<number>(0);

  function makePost(loginUser: LoginUser) {
    fetch(APP_URL + '/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: loginUser.user.id,
        title: title,
        image_url: imageUrl,
        body: body,
      })
    })
      .then(res => res.json())
      .then(response => {
        setMessage('新規のスレッドを作成しました');
      })
      .catch((error) => {
        setMessage('エラー：操作に失敗しました');
        setSnackVisible(true)
      });

    setTitle('');
    setBody('');
    setImageUrl('');

    setSnackVisible(true);
    setModalVisible(!modalVisible);
  }

  return (
    <View style={postStyles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={postStyles.centeredView}>
          <View style={postStyles.modalView}>
            <Text style={postStyles.modalText}>新規スレッド作成</Text>
            <TextInput
              label="タイトル"
              value={title}
              onChangeText={text => setTitle(text)}
            />
            <TextInput
              label="デッキコード(省略可)"
              value={imageUrl}
              placeholder="デッキ構築相談などにご利用ください"
              onChangeText={text => setImageUrl(text)}
            />
            <View style={[postStyles.inputContainer, {height: inputHeight+20},]}>
              <TextInput
                label="本文"
                value={body}
                multiline={true}
                blurOnSubmit={false}
                onChangeText={text => setBody(text)}
                onContentSizeChange={(event) => {
                  // 入力ボックスの高さをsetState
                  setInputHeight(event.nativeEvent.contentSize.height+20);
                }}
              />
            </View>
            <Pressable
              style={[postStyles.button, postStyles.buttonConform]}
              onPress={() => makePost(loginUser)}
            >
              <Text style={postStyles.textStyle}>確定する</Text>
            </Pressable>
            <Pressable
              style={[postStyles.button, postStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={postStyles.textStyle}>閉じる</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CreateModal;