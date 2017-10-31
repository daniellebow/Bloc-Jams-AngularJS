(function() {
      function SongPlayer(Fixtures) {

          var SongPlayer = {};

          /**
         * @desc Object to get album information
         * @type {Object}
         */
          var currentAlbum = Fixtures.getAlbum();

          /**
         * @desc Buzz object audio file
         * @type {Object}
         */
          var currentBuzzObject = null;

          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
          var setSong = function(song) {
          if (currentBuzzObject) {
             stopSong;
         }

        currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
        });

        SongPlayer.currentSong = song;
        };

        /**
        * @function playSong
        * @desc Plays currently playing song and loads current audio file as currentBuzzObject
        * @param {Object} song
        */
        var playSong= function(song){
          currentBuzzObject.play();
          song.playing = true;
        }

        /**
        * @function stopSong
        * @desc Stops currently playing song and loads current audio file as currentBuzzObject
        * @param {Object} song
        */
        var stopSong= function(song){
          currentBuzzObject.stop();
          song.playing = null;
        }


        /**
        * @function getSongIndex
        * @desc function to get the index of a song
        * @param {Object} song
        */

        var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
        };

        /**
       * @desc current song playing audio file
       * @type {Object}
       */
         SongPlayer.currentSong = null;

          SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {

        setSong(song);
        playSong(song);
      }
    };

    SongPlayer.pause = function(song) {
    song = song || SongPlayer.currentSong;
    currentBuzzObject.pause();
    song.playing = false;
};
          return SongPlayer;
     }

     /**
     * @function SongPlayer.previous
     * @desc function to scroll back onesong
     * @param {Object}
     */

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

    /**
    * @function SongPlayer.next
    * @desc function to scroll forward onesong
    * @param {Object}
    */

    SongPlayer.next = function() {
    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
    currentSongIndex++;
   };

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
