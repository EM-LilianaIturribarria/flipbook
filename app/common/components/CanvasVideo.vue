<template>
    <div id="canvas_output" :style="canvasStyling">
      <video :id="id" ref="myVideo" style="display: none;">
        <slot></slot>
      </video>
    </div>
</template>

<script>
  import { CanvasRender } from '../../common/services/canvas-render.service';

  export default{
    name: 'CanvasVideo',
    props:{
      'id': {type: String},
      'canvasStyling': {type: Object},
      'onAnimationStart' : {type: Function},
      'onAnimationComplete' : {type: Function}
    },
    data () {
      return {
        video: ''
      };
    },
    mounted() {
      this.video = this.$refs.myVideo;

      CanvasRender.RenderVideo(this.video,
      () => {
        this.onAnimationStart ? this.onAnimationStart() : ()=>{};
      },
      () => {
        this.onAnimationComplete ? this.onAnimationComplete() : ()=>{};
      });
    }
}
</script>
