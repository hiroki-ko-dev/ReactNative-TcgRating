import React, { useState, useContext } from 'react';
import { ScrollView, Platform, View, Text, Image, ImageBackground } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator, List } from "react-native-paper";
import ImageModal from 'react-native-image-modal';
import PlatformImage from '../../../components/PlatformImage';
import PostComment from '../PostComment/PostComment';
import { getDateFormat } from '../../../utils/date';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { AuthContext } from '../../../contexts/auth/AuthContext';
import { PostType } from '../type';
import styles from "./Show.style";
import { RootStackParamList } from '../../Navigation/type';

const Show = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'スレッド'>>();

  const userContext = useContext(AuthContext);
  if (!userContext) {
      throw new Error('UserContext is not provided');
  }

  if (!route.params) {
    console.error('route.params is undefined');
    return null; 
  }

  const [post, setPost] = useState<PostType>(route.params.post);
  const [isLoading, setIsLoading] = useState(true);
  const setLoadingStatus = (status: any) => {
    setIsLoading(status)
  }
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);

  const userIconSource = post.user.profileImagePath ? { uri: post.user.profileImagePath } : require('../../../../images/icon/default-account.png');

  return (
    <ScrollView style={{flex: 1}}>
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
                    source={userIconSource}
                  />
                </ImageBackground>
              </View>
            </View>
            <Paragraph>{post.body}</Paragraph>
          </List.Section>
        </Card>
      </View>
      <PostComment
        postId={post.id}
        setIsLoadingStatus={setLoadingStatus}
        setExpanded={setExpanded}
      />
      <View style={styles.loadingAnimation}>
        <ActivityIndicator animating={isLoading} size='large' color="#FF4500" />
      </View>
    </ScrollView>
  );
};

export default Show;
