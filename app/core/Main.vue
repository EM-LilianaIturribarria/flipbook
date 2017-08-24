<template>
  <div class="si-wrapper">
    <si-spinner
      v-if="loadingSpinner.show"
    ></si-spinner>
    <si-flipbook
      :pages="pages"
    ></si-flipbook>
    <si-nav
      v-if="nav && ready"
      :nav="nav"
      :flipbook="flipbook"
    ></si-nav>
  </div>
</template>

<script>
  import axios from 'axios';
  import { Preloader } from '../common/services/preloader.service';
  import LoadingSpinner from '../common/services/loading-spinner.service';
  import CONFIG from '../config.js';
  import Spinner from '../common/components/Spinner.vue';
  import Flipbook from './Flipbook.vue';
  import Navigation from './Navigation.vue';
  import FlipbookService from './FlipbookService';

  export default {

    name: 'Main',

    data (){

      return {
        ready: false,
        loadingSpinner: LoadingSpinner.spinner,
        nav: CONFIG.settings.navigation,
        pages: [],
        flipbookService: new FlipbookService('.si-wrapper__flipbook', CONFIG.settings.options),
        flipbook: null
      };
    },

    created() {
      let vm = this;

      LoadingSpinner.show();

      axios.get('../data.json')
        .then(function (response) {
          vm.pages = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });

      Preloader.bind(CONFIG.preload.images, {
        complete: function() {
          console.log('Images Loaded!');
          vm.flipbook = vm.flipbookService.init();
          LoadingSpinner.hide();
          vm.ready = true;
        },
        error: function() {
          console.log('Failed to load one or more images!');
        }
      });
    },

    methods: {},

    components: {
      siSpinner: Spinner,
      siFlipbook: Flipbook,
      siNav: Navigation
    }
  };
</script>
