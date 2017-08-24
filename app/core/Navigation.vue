<template>
  <nav class="si-wrapper__nav">

    <div class="si-wrapper__nav__list">
      <a
        v-on:click="settings.leftControls.disabled || zoom(0)"
        v-trackevent:ga="'nav_button_Zoom Even'"
        :class="{
          'disabled': settings.leftControls.disabled || (!settings.leftControls.zoom && mainZoom)
        }"
        v-if="nav.zoom"
      >
        <i
          :class="{
            'fa': true,
            'fa-search-minus': settings.leftControls.zoom,
            'fa-search-plus': !settings.leftControls.zoom
          }"
        ></i>
      </a>
      <a
        v-on:click="turnTo($event, 'cover')"
        v-trackevent:ga="'nav_button_Turn Cover'"
        :class="{
          'disabled': settings.leftControls.disabled || mainZoom
        }"
        v-if="nav.firstAndLast"
      >
        <i class="fa fa-step-backward"></i>
      </a>
      <a
        v-on:click="turnTo($event, 'previous')"
        v-trackevent:ga="'nav_button Turn Prev'"
        :class="{
          'disabled': settings.leftControls.disabled || mainZoom
        }"
        v-if="nav.prevAndNext"
      >
        <i class="fa fa-chevron-left"></i>
      </a>
      <p v-if="nav.textIndicator">
        Page <span>{{ settings.view }}</span>
      </p>
      <a
        v-on:click="turnTo($event, 'next')"
        v-trackevent:ga="'nav_button_Turn Next'"
        :class="{
          'disabled': settings.rightControls.disabled || mainZoom
        }"
        v-if="nav.prevAndNext"
      >
        <i class="fa fa-chevron-right"></i>
      </a>
      <a
        v-on:click="turnTo($event, 'end')"
        v-trackevent:ga="'nav_button_Turn End'"
        :class="{
          'disabled': settings.rightControls.disabled || mainZoom
        }"
        v-if="nav.firstAndLast"
      >
        <i class="fa fa-step-forward"></i>
      </a>
      <a
        v-on:click="settings.rightControls.disabled || zoom(1)"
        v-trackevent:ga="'nav_button_Zoom Odd'"
        :class="{
          'disabled' : settings.rightControls.disabled || (!settings.rightControls.zoom && mainZoom)
        }"
        v-if="nav.zoom"
      >
        <i
          :class="{
            'fa': true,
            'fa-search-minus': settings.rightControls.zoom,
            'fa-search-plus': !settings.rightControls.zoom
          }"
        ></i>
      </a>
    </div>

  </nav>
</template>

<script>
  import bus from '../common/services/bus.service.js';

  export default {

    name: 'Navigation',

    props: ['nav', 'flipbook'],

    data (){
      let vm = this;
      console.log(vm);

      return {
        mainZoom: false,
        settings: {
          view: 'Cover',
          leftControls: {
            disabled: true,
            zoom: false
          },
          rightControls: {
            disabled: false,
            zoom: false
          },
          pagesLength: vm.flipbook.getLength()
        }
      };
    },

    created(){
      let vm = this;

      bus.$on('flipbook.turning', data => {

        setTimeout(() =>{

          switch(data.page) {
            case 0 || 1:
              vm.settings.view = 'Cover';
              vm.settings.leftControls.disabled = true;
              vm.settings.rightControls.disabled = false;
              break;
            case (vm.settings.pagesLength - 1):
              vm.settings.view = data.view;
              vm.settings.leftControls.disabled = false;
              vm.settings.rightControls.disabled = true;
              break;
            case vm.settings.pagesLength:
              vm.settings.view = data.view;
              vm.settings.leftControls.disabled = false;
              vm.settings.rightControls.disabled = true;
              break;
            default:
              vm.settings.view = data.view;
              vm.settings.leftControls.disabled = false;
              vm.settings.rightControls.disabled = false;
              break;
          }
        });
      });
    },

    methods: {

      turnTo(e, to) {
        let vm = this;
        let classes = e.currentTarget.attributes.class.nodeValue;

        if (classes.indexOf('disabled') <= 1) {

          switch(to) {
            case 'cover':
              vm.flipbook.turnTo(1);
              break;
            case 'previous':
              vm.flipbook.turnToPrevious();
              break;
            case 'next':
              vm.flipbook.turnToNext();
              break;
            case 'end':
              vm.flipbook.turnTo(vm.flipbook.getLength());
              break;
          }
        }
      },

      zoom(dir) {
        let vm = this;
        vm.mainZoom = !vm.mainZoom;

        if (vm.mainZoom) {
          let view = vm.flipbook.getView();
          let page = view[dir];
          let img = 'assets/images/large/p' + page + '.png';

          if (dir === 0) {
            vm.settings.leftControls.zoom = true;
            vm.settings.rightControls.zoom = false;
          } else {
            vm.settings.leftControls.zoom = false;
            vm.settings.rightControls.zoom = true;
          }

          // overlay.open(img);
        } else {
          vm.settings.leftControls.zoom = false;
          vm.settings.rightControls.zoom = false;

          // overlay.close();
        }
      }
    }
  };
</script>
