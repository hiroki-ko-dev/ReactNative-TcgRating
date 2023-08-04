    //Web側からのpostMessageに対応
    const login = (e) => {
      const loginUserId = e.nativeEvent.data;
      // const loginUserId = 1;

      // ログインキャンセルした場合
      if(loginUserId == 0){
          // ログイン情報をリセット
          setLoginCheck(false);
          setTwitterView(false);
          setGameUser();
          setDiscordName();
          setDiscordNameError();
          return false;
      }
      let json = JSON.stringify({
          user_id: loginUserId,
          game_id: Config.GAME_ID,
          expo_push_token: expoPushToken,
      });

      fetch(Config.APP_URL + '/api/auth/expo/token/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: json
      })
          .then(res => res.json())
          .then(data => {
              setGameUser(data)
              setTwitterView(false)
              setAppleView(false)
              if(data.discord_name){
                  setDiscordName(data.discord_name)
                  setLoginCheck(true)
              }
              // ログイン時にバッジ数を更新
              badgeUpdate()
          },[])
  };