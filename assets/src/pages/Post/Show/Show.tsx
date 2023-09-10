import React, { useState, useContext } from 'react';
import { ScrollView, View, Text, Image, ImageBackground } from 'react-native';
import { Card, Paragraph, ActivityIndicator, List, FAB, Provider } from "react-native-paper";
import PostComment from '../PostComment/PostComment';
import { getDateFormat } from '../../../utils/date';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { PostType } from '../type';
import styles from "./Show.style";
import { RootStackParamList } from '../../Navigation/type';
import CreateModal from './CreateModal/CreateModal';
import DeckImage from './DeckImage';
import { useLoginUser } from '@/contexts/auth/useLoginUser';
import { useSnackbar } from '@/contexts/snack/useSnackbar';

const Show = () => {
  const navigation = useNavigation();
  const loginUser = useLoginUser();
  const { setSnackMessage } = useSnackbar();
  const route = useRoute<RouteProp<RootStackParamList, 'スレッド'>>();
  if (!route.params) {
    console.error('route.params is undefined');
    return null; 
  }

  const [post, setPost] = useState<PostType>(route.params.post);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const userIconSource = post.user.profileImagePath ? { uri: post.user.profileImagePath } : require('../../../../images/icon/default-account.png');

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <CreateModal
            postId={post.id}
            loginUser={loginUser}
            setSnackMessage={setSnackMessage}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setShouldRefetch={setShouldRefetch}
          />
          <View>
          <Card style={styles.card}>
            <List.Section>
              <Text style={styles.cardDate}>{getDateFormat(post.createdAt)}</Text>
              <View style={styles.postUser}>
                <View style={styles.postIcon}>
                  <ImageBackground source={require('../../../../images/icon/default-account.png')} resizeMode="cover" style={styles.twitterIcon}>
                    <Image
                      style={styles.twitterIcon}
                      source={userIconSource}
                    />
                  </ImageBackground>
                </View>
                <Text style={styles.postUserName}>{post.user.name}</Text>
              </View>
              <Paragraph>{post.body}</Paragraph>
            </List.Section>
          </Card>
          {post.imageUrl && <DeckImage imageUrl={post.imageUrl} />}
          <PostComment
            postId={post.id}
            setIsLoading={setIsLoading}
            shouldRefetch={shouldRefetch}
            setShouldRefetch={setShouldRefetch}
          />
          </View>
        </View>
        <View style={styles.loadingAnimation}>
          <ActivityIndicator animating={isLoading} size='large' color="#FF4500" />
        </View>
      </ScrollView>
      <FAB
        style={styles.plusButton}
        icon="plus"
        onPress={() => setModalVisible(true)}
      />
    </>
  );
};

export default Show;
