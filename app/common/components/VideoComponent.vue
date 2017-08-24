<template>
    <video
      @canplaythrough="onVideoReady()"
      class="video-js vjs-big-play-centered"
      :id="videoJsId"
      @timeupdate="reportQuartiles"
      ref="siPlayer"
      :width="videoSize.width"
      :height="videoSize.height"
      @play="onVideoPlay"
      @pause="onVideoPaused"
      @seeking="onVideoSeeking"
      @seeked="onVideoSeeked"
      @volumechange="onVolumeChanged"
      @mouseover="onVideoMouseOver"
      @click="onVideoClick"
      @ended="onVideoEnd">
      <slot name="videoSource"></slot>
    </video>

</template>

<script>
  import videojs from 'video.js';
  import {TrackEvent, EVENTS, EVENT_ATTRIBUTES} from '../services/track-event.service';

  export default{

    props: {
      'videoSize': {type: Object},
      'videoProps': {type: Object},
      'videoCallbacks': {type: Object},
      'videoClickout' : {type: String},
      'videoID': {type: String}
    },

    data() {

      return {
        videoJsId: 'si-video__'+Date.now(),
        videoPlayer: '',
        videoDuration: '',
        previousProgress: '',
        previousMuted: true
      };
    },

    mounted() {
      var self = this;
      self.videoPlayer = self.$refs.siPlayer;

      videojs(self.videoJsId, {
        controls: self.videoProps.controls,
        playbackRates: [1, 1.5, 2,3],
        muted: self.videoProps.muted,
        preload: 'auto',
        poster: self.videoProps.poster
      }, function(){

        function check(){
          if (window.screenTop && window.screenY) {
            self.onVideoFullscreen();
          }
        }
        document.addEventListener('webkitfullscreenchange', function(e) {
            check();
        }, false);
        document.addEventListener('mozfullscreenchange', function(e) {
            check();
        }, false);
        document.addEventListener('fullscreenchange', function(e) {
            check();
        }, false);
      });
    },

    methods: {

      onVideoReady() {
        this.videoDuration = this.videoPlayer.duration;

        if('autoplay' in this.videoProps){
          this.videoPlayer.play();
        }

        this.videoCallbacks.videoReady(this.videoPlayer);
      },

      reportQuartiles(e){
        let current = e.target.currentTime;
        let pst= (current * 100) / (this.videoDuration);

        if( pst == 'Infinity'){
          return;
        }

        if( pst >= 25 && this.previousProgress < 25 ){
          TrackEvent.record(EVENTS.Video, EVENT_ATTRIBUTES.Video.VP_25, this.videoID);
        }

        if( pst >= 50 && this.previousProgress < 50 ){
          TrackEvent.record(EVENTS.Video, EVENT_ATTRIBUTES.Video.VP_50, this.videoID);
        }

        if( pst >= 75 && this.previousProgress < 75 ){
          TrackEvent.record(EVENTS.Video, EVENT_ATTRIBUTES.Video.VP_75, this.videoID);
        }

        if( pst >= 100 && this.previousProgress < 100 ){
          TrackEvent.record(EVENTS.Video, EVENT_ATTRIBUTES.Video.Finish, this.videoID);
        }

        this.previousProgress = pst;
      },

      onVolumeChanged(e){

        if(e.target.muted){
          TrackEvent.record(EVENTS.Video, EVENT_ATTRIBUTES.Video.Mute, this.videoID);
        }else {

          if(this.previousMuted ) {
            TrackEvent.record(EVENTS.Video, EVENT_ATTRIBUTES.Video.Unmute, this.videoID);
          }
        }

        this.previousMuted = e.target.muted;
      },

      onVideoPlay(e){
        this.previousMuted = this.videoPlayer.muted;
        TrackEvent.record(EVENTS.Video, EVENT_ATTRIBUTES.Video.Start, this.videoID);
      },

      onVideoPaused(e){
        TrackEvent.record(EVENTS.Video, EVENT_ATTRIBUTES.Video.Pause, this.videoID);
      },

      onVideoSeeking(e){
      },

      onVideoSeeked(e){
        TrackEvent.record(EVENTS.Video, EVENT_ATTRIBUTES.Video.Seek, this.videoID);
      },

      onVideoEnd(e){
        TrackEvent.record(EVENTS.Video, EVENT_ATTRIBUTES.Video.Finish, this.videoID);
      },

      onVideoFullscreen(e){
        TrackEvent.record(EVENTS.Video, EVENT_ATTRIBUTES.Video.Fullscreen, this.videoID);
      },

      onVideoMouseOver(e){
        TrackEvent.record(EVENTS.Video, EVENT_ATTRIBUTES.Video.Hover, this.videoID);
      },

      onVideoClick(e) {
        if(this.videoClickout !== '' && typeof this.videoClickout !== 'undefined'){
          window.open(this.videoClickout, '_blank');
        }

        TrackEvent.record(EVENTS.Video, EVENT_ATTRIBUTES.Video.Click, this.videoID);
      }
    }
  }
</script>
