import React, { useState, useContext } from 'react';
import { Platform, View, Text, Image, ImageBackground, } from 'react-native';
import {Card, Title, Paragraph, ActivityIndicator, List } from "react-native-paper";
import ImageModal from 'react-native-image-modal';
import PlatformImage from '../../../components/PlatformImage';
import PostComment from '../PostComment/PostComment';
import { getDateFormat } from '../../../utils/date';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { AuthContext } from '../../../contexts/auth/AuthContext';
import { Post } from '../type';
import styles from "./Show.style";

type RootStackParamList = {
  PostScreen: { post: Post };  // この行を適宜変更します。'PostScreen'はあなたのスクリーン名になります。
  // 他のスクリーンも必要に応じてここに追加できます。
};

const Show = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'PostScreen'>>();

  const userContext = useContext(AuthContext);
  if (!userContext) {
      throw new Error('UserContext is not provided');
  }
  const { loginUser: LoginUser, setLoginUser } = userContext;

  if (!route.params) {
    // Display error message
    console.error('route.params is undefined');
    return;
  }
  const [post, setPost] = useState<Post>(route.params.post);
  const [isLoding, setIsLoding] = useState(true);
  const [messages, setMessages] = useState();
  const setLoadingStatus = (status: any) => {
    setIsLoding(status)
  }
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);

  return (
    <>
      <View style={styles.container}>
        <Card style={styles.card}>
          <List.Section>
            <View style={styles.postUser}>
              <Text style={styles.cardDate} numberOfLines={5}>【作成日：{getDateFormat(post.createdAt)}】</Text>
              <Text numberOfLines={5}>{'作成者：' + post.user.name}</Text>
              <View style={styles.postIcon}>
                <ImageBackground source={require('../../../../images/icon/default-account.png')} resizeMode="cover" style={styles.twitterIcon}>
                  <Image
                    style={styles.twitterIcon}
                    source={{uri: post.user.profileImagePath}}
                  />
                </ImageBackground>
              </View>
            </View>
            <List.Accordion
              expanded={expanded}
              onPress={handlePress}
              title={post.title}
              titleNumberOfLines={5}
            >
              {/* {post.imageUrl &&
                <View style={styles.postHeader}>
                  <PlatformImage
                    uri={'https://www.pokemon-card.com/deck/deckView.php/deckID/' + post.imageUrl}
                    imageStyle={{
                      width: 380,
                      height: 190,
                    }}
                    modalStyle={{
                      width: 380,
                      height: 190,
                    }}
                    resizeMode="contain"
                  />
                </View>
              } */}
              <Paragraph>{post.body}</Paragraph>
            </List.Accordion>
          </List.Section>
        </Card>
      </View>
      <PostComment
        postId={post.id}
        setIsLoadingStatus={setLoadingStatus}
        setExpanded={setExpanded}
      />
      <View style={styles.loadingAnimation}>
        <ActivityIndicator animating={isLoding} size='large'/>
      </View>
    </>
  );
};

export default Show;
