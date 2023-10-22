import React, { useState, useEffect } from 'react';
import { Text, View, Modal, Pressable, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import UserModalStyles from './UserModal.style';

interface UserModalProps {
  messages: any,
  userIdForModal: number | null;
  setUserIdForModal: React.Dispatch<React.SetStateAction<number|null>>;
}

const UserModal: React.FC<UserModalProps> = ({
  messages,
  userIdForModal,
  setUserIdForModal,
}) => {

  const [blockSelectVisible, setBlockSelectVisible] = useState<boolean>(false);
  const [modalAnimation, setModalAnimation] = useState<string>("fadeIn");
  const message = messages.find((message: any) => message.user._id === userIdForModal);

  let temp = false;
  if (userIdForModal) {
    temp = true;
  } else {
    return <></>
  }

  const modalFadeOut = () => {
    setModalAnimation("fadeOut");
    setTimeout(() => {
      setUserIdForModal(null);
    }, 1000);
  }

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={temp}
      style={UserModalStyles.modalView}
      onRequestClose={() => {
        setModalAnimation("fadeOut")
      }}
    >
      <Animatable.View
        animation={modalAnimation}
        duration={1000}
        style={UserModalStyles.centeredView}
      >
        <View style={UserModalStyles.modalView}>
          <Text style={UserModalStyles.modalText}>{message.user.name}</Text>
          <Image
            source={{ uri: message.user.avatar }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
            {blockSelectVisible ?
              <Animatable.View
                animation={modalAnimation}
                duration={1000}
                >
                <View style={UserModalStyles.confirmView}>
                  <Text style={UserModalStyles.textStyle}>本当に強制退会してよろしいですか？</Text>
                  <View style={UserModalStyles.confirmButtonView}>
                    <Pressable
                      style={[UserModalStyles.button]}
                      onPress={() => modalFadeOut()}
                    >
                      <Text style={UserModalStyles.textStyle}>はい</Text>
                    </Pressable>
                    <Pressable
                      style={[UserModalStyles.button]}
                      onPress={() => modalFadeOut()}
                    >
                      <Text style={UserModalStyles.textStyle}>いいえ</Text>
                    </Pressable>
                  </View>
                </View>
              </Animatable.View>
            : <Pressable
              style={[UserModalStyles.button]}
              onPress={() => {setBlockSelectVisible(true)}}
            >
              <Text style={UserModalStyles.textStyle}>強制退会</Text>
            </Pressable>
          }
          <View style={[UserModalStyles.buttonView]}>
            <Pressable
              style={[UserModalStyles.closeButton]}
              onPress={() => modalFadeOut()}
            >
              <Text style={UserModalStyles.textStyle}>閉じる</Text>
            </Pressable>
          </View>
        </View>
      </Animatable.View>
    </Modal>
  );
}

export default UserModal;