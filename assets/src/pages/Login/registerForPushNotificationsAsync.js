async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        //①このアプリからのPush通知の許可を取得
        const { status: existingStatus } = await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        //②初回起動時は許可ダイアログを出してユーザからPush通知の許可を取得
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        //許可がない場合
        alert('通知をONにする場合は、ホーム画面の「設定」から行なってください');
        return;
      }
      //③通知用トークンの取得
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      //実機以外の場合
      alert('Must use physical device for Push Notifications');
    }
    return token;
}