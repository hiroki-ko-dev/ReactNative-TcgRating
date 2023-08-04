import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, Image, RefreshControl, Linking } from 'react-native';
import { Card, Snackbar  } from 'react-native-paper';
import { APP_URL } from "../../config";
import { getDateFormat } from '../../utils/date';
import videoStyles from './Video.style';

const Video: React.FC = () => {

    const [videos, setVideos] = useState([])
    const [message, setMessage] = useState<string>();
    const [snackVisible, setSnackVisible] = useState<boolean>(false);
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    
    const onRefreshVideo = React.useCallback(() => {
        setRefreshing(true);
        getVideos()    
        setRefreshing(false);
      }, []);
    useEffect(() => {
        getVideos()
    },[]);

    function getVideos(){
        fetch(APP_URL + '/api/video', {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                setVideos(data)
            })
            .catch((error) => {
                setMessage('エラー：操作に失敗しました');
                setSnackVisible(true)
            })
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefreshVideo}
                />
            }
        >
            <View style={videoStyles.container}>
                <View style={videoStyles.header}><Text style={{fontSize: 20,fontWeight: "bold"}}>お知らせ</Text></View>
                {videos.data?.map((video: any, i: number) =>
                    <Card style={videoStyles.card} key={video.id}
                        onPress={() => {Linking.openURL(video.url)}}
                    >
                        <View style={videoStyles.cardContent}>
                            <View style={videoStyles.cardHeader}>
                                <Text style={videoStyles.cardHeaderText}>{' NO.' + (i+1)}</Text>
                                <Text style={[videoStyles.cardDate,videoStyles.cardHeaderText]}>作成日：{getDateFormat(video.created_at)}</Text>
                            </View>
                            <View style={videoStyles.cardRow}>
                                <Image
                                    style={videoStyles.thumbnailImage}
                                    source={{uri: video.thumbnail_image_url}}
                                />
                                <View style={videoStyles.cardTitle}>
                                    <Text style={videoStyles.cardTitleText}>{video.title}</Text>
                                </View>
                            </View>
                        </View>
                    </Card>
                )}
                <View style={videoStyles.snackView}>
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
    );
}

export default Video;