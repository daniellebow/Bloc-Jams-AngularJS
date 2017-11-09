(function() {
    function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};
          var currentAlbum = Fixtures.getAlbum();


          var getSongIndex = function(song) {
              return currentAlbum.songs.indexOf(song);
          };

         SongPlayer.currentSong = null;
         var currentBuzzObject = null;

         var playSong= function(song){
         currentBuzzObject.play();
         song.playing = true;
        }

        var stopSong= function(song){
        currentBuzzObject.stop();
        song.playing = null;
        }

    var setSong = function(song) {
    if (currentBuzzObject) {
        stopSong(song);
     }

        currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
        });

        currentBuzzObject.bind('timeupdate', function() {
            $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
            });
        });

        SongPlayer.currentSong = song;
        };

          SongPlayer.play = function(song) {
          song = song || SongPlayer.currentSong;
          if (SongPlayer.currentSong !== song) {
          setSong(song);
          playSong(song);
          } else if (SongPlayer.currentSong === song) {
               if (currentBuzzObject && currentBuzzObject.isPaused()) {
                   playSong(song);
            }
          }
       };

       SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
   };

   SongPlayer.previous = function() {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex--;

    if (currentSongIndex < 0) {
    currentBuzzObject.stop();
    SongPlayer.currentSong.playing = null;
   } else {
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
   }

   };

   SongPlayer.next = function() {
    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
    currentSongIndex++;

    if (currentSongIndex > currentAlbum.length) {
     currentBuzzObject.stop();
     SongPlayer.currentSong.playing = null;
    } else {
     var song = currentAlbum.songs[currentSongIndex];
     setSong(song);
     playSong(song);
   }
   };

   SongPlayer.setVolume = function(volume) {
     if (currentBuzzObject) {
       currentBuzzObject.setVolume(volume);
     }
     SongPlayer.volume = volume;
   };
          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
