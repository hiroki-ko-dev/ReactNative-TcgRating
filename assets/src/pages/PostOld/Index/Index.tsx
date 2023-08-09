import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, Text, View, ScrollView, RefreshControl, Linking, Pressable, Modal } from 'react-native';
import { FAB, Portal, Provider, Card, Title, Paragraph, TextInput, Snackbar  } from 'react-native-paper';
import { APP_URL } from "../../../config";
import { getDateFormat } from '../../../utils/date';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../../../contexts/auth/AuthContext';
import { LoginUser } from '../../../contexts/auth/type';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Post } from '../type';
import postStyles from '../Post.style';
// import { Admob } from "../../components/Common/Common";

const Index = () => {

  const navigation = useNavigation();
  const route = useRoute();

  const userContext = useContext(AuthContext);
  const { loginUser, setLoginUser } = userContext;
  if (!loginUser) {
      throw new Error('UserContext is not provided');
  }
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [inputHeight, setInputHeight] = useState<number>(0);

  // SnacBar関連
  const [message, setMessage] = useState<string>('');
  const [snackVisible, setSnackVisible] = useState<boolean>(false);

  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPost();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getPost();
  },[]);

  function getPost(){
    fetch(APP_URL + '/api/post', {method: 'GET'})
      .then(res => res.json())
      .then(response => {
        if (response.code === 200)  {
          setPosts(response.data.paginate.data)
        } else {
          setMessage(response.message);
          setSnackVisible(true)
        }
      })
      .catch((error) => {
        setMessage('エラー：操作に失敗しました');
        setSnackVisible(true)
      })
  }

  function makePost(loginUser: LoginUser){
    fetch(APP_URL + '/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: loginUser.id,
        title: title,
        image_url: imageUrl,
        body: body,
      })
    })
      .then(res => res.json())
      .then(response => {
        setPosts(response.paginate.data)
        setMessage('新規のスレッドを作成しました');
      })
      .catch((error) => {
        setMessage('エラー：操作に失敗しました');
        setSnackVisible(true)
      })

    setTitle('')
    setBody('')

    setSnackVisible(true)
    setModalVisible(!modalVisible);
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={postStyles.container}>
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
          {(!posts) && <View style={postStyles.cardContent}><Text style={postStyles.cardContent}>現在スレッドがありません</Text></View>}

          {posts?.map((post: Post, i) =>
            <Card style={postStyles.card} key={post.id}
              onPress={() => {
                navigation.navigate('スレッド', {post: post}
              )}}
            >
              <View style={postStyles.cardContent}>
                {/* {i%3 == 0 && <Admob />} */}
                <View style={postStyles.cardHeader}>
                  <Text style={postStyles.cardHeaderText}>{'　NO.' + (i+1)}</Text>
                  <Text style={[postStyles.cardDate,postStyles.cardHeaderText]}>作成日：{getDateFormat(post.createdAt)}</Text>
                </View>
                <View style={postStyles.cardTitle}>
                  <IconFontAwesome name="twitch" size={30} color="#4682b4" />
                  <Text  numberOfLines={5} ellipsizeMode="tail" style={postStyles.cardTitleText}>{post.title}</Text>
                </View>
              </View>
            </Card>
          )}
          <View style={postStyles.snackView}>
            <Snackbar 
              visible={snackVisible}
              onDismiss={() => setSnackVisible(false)}
              action={{
                label: "閉じる",
                onPress: () => setSnackVisible(false)
              }}
            >
              {message}
            </Snackbar>
          </View>
        </View>
      </ScrollView>
      <View style={postStyles.plusButton}>
        <Provider>
          <FAB icon="plus"
            onPress={() => setModalVisible(true)}
          />
        </Provider>
      </View>
    </>
  );
}

export default Index;