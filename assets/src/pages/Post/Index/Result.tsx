import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { getDateFormat } from '../../../utils/date';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import postStyles from './Index.style';
// import { Admob } from "../../components/Common/Common";

interface ResultProps {
  post: any;
  i: number;
  navigation: any;
}

const Result = ({ post, i, navigation }: ResultProps) => {
  return (
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
  );
}

export default Result;