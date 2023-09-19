import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, RefreshControl, Image, ImageBackground} from 'react-native';
import { DataTable } from 'react-native-paper';
import { APP_URL } from '../../config';
// import { AdMob } from "../../components/AdMob";
import rankStyles from './Rank.style';
import { RankUser } from './type';

const RankComponent = (rank: RankUser, i: number) => {
  return (
    <DataTable.Row>
      <DataTable.Cell style={rankStyles.cell}>{i + 1 + "位"}</DataTable.Cell>
      <DataTable.Cell style={rankStyles.cell}>
        <View>
          <ImageBackground
            source={require('@/assets/images/icon/default-account.png')}
            resizeMode="cover"
            style={rankStyles.twitterIcon}
          >
            <Image
              style={rankStyles.twitterIcon}
              source={{uri: rank.profileImagePath}}
            />
          </ImageBackground>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={rankStyles.cell}>{rank.name}</DataTable.Cell>
      <DataTable.Cell style={rankStyles.cell}>{rank.rate}</DataTable.Cell>
    </DataTable.Row>
  );
}

const Rank = () => {
    const [ranks, setRanks] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefreshRank = React.useCallback(() => {
        setRefreshing(true);  
        getRank()
        setRefreshing(false);
      }, []);

    useEffect(() => {
      getRank()
    }, []);

    function getRank(){
      fetch(APP_URL + '/api/rank', {method: 'GET'})
        .then(res => res.json())
        .then(response => {
          setRanks(response.data.paginate.data)
        });
    }

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshRank}
          />
        }
      >
        <View style={rankStyles.header}>
          <Text style={{fontSize: 20,fontWeight: "bold"}}>ランキング</Text>
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={rankStyles.cell}>順位</DataTable.Title>
            <DataTable.Title style={rankStyles.cell}></DataTable.Title>
            <DataTable.Title style={rankStyles.cell}>プレイヤー名</DataTable.Title>
            <DataTable.Title style={rankStyles.cell}>レート</DataTable.Title>
          </DataTable.Header>
        </DataTable>
        <View>
          {ranks.map((rank: RankUser, i: number) => 
            <View key={rank.id}>
              {i%10===0 && 
                <View key={'ad_'+i}>
                    <DataTable.Row>
                        {/* <AdMob /> */}
                    </DataTable.Row>
                </View>
              }
              {RankComponent(rank, i)}
            </View>
          )}
        </View>
      </ScrollView>
    );
}

export default Rank;