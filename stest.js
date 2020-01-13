// listen for MusicKit Loaded callback
document.addEventListener('musickitloaded', () => {
    // MusicKit global is now defined
    
      /***
        Configure our MusicKit instance with the signed token from server, returns a configured MusicKit Instance
        https://developer.apple.com/documentation/musickitjs/musickit/musickitinstance
      ***/
      const music = MusicKit.configure({
        developerToken: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjlEUjMyRDRZMzYifQ.eyJpc3MiOiJZQ1Q4NFU0NEIzIiwiZXhwIjoxNTc4Mjk3MDUwLCJpYXQiOjE1NzgyNTM4NTB9.2J7cLHQLcZmsKDp9OUEus3v_1AOcW3FAirRGB85zCboVP1NtEOCiqI57nO0koOcjdm9C7Zj_0k35fAO5khmKmg",
        app: {
          name: 'AppleMusicKitExample',
          build: '1978.4.1'
        }
      });
  
      // setup click handlers
      document.getElementById('add-to-q-btn').addEventListener('click', () => {
        const idInput   = document.getElementById('id-input');
        const typeInput = document.getElementById('type-input');
  
        /***
          Add an item to the playback queue
          https://developer.apple.com/documentation/musickitjs/musickit/musickitinstance/2992716-setqueue
        ***/
        music.setQueue({
          [typeInput.value]: idInput.value
        });
  
        idInput.value   = '';
        typeInput.value = '';
      });
  
      document.getElementById('play-btn').addEventListener('click', () => {
        /***
          Resume or start playback of media item
          https://developer.apple.com/documentation/musickitjs/musickit/musickitinstance/2992709-play
        ***/
        music.play();
      });
  
      document.getElementById('pause-btn').addEventListener('click', () => {
        /***
          Pause playback of media item
          https://developer.apple.com/documentation/musickitjs/musickit/musickitinstance/2992708-pause
        ***/
        music.pause();
      });
  
      document.getElementById('login-btn').addEventListener('click', () => {
        /***
          Returns a promise which resolves with a music-user-token when a user successfully authenticates and authorizes
          https://developer.apple.com/documentation/musickitjs/musickit/musickitinstance/2992701-authorize
        ***/
       console.log("fuck");
       alert("fuck")
       
        music.authorize().then(musicUserToken => {
          console.log(`Authorized, music-user-token: ${musicUserToken}`);
        });
      });
  
      // expose our instance globally for testing
      window.music = music;
    
  });