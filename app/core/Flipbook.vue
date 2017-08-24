<template>
  <div class="si-wrapper__flipbook">
    <si-page
      v-for="(page, index) in pages"
      :key="index"
      :page="page"
      :index="index"
    ></si-page>
  </div>
</template>

<script>
  import CONFIG from '../config.js';
  import Page from './Page.vue';

  export default {

    name: 'Flipbook',

    props: ['pages'],

    components: {
      siPage: Page
    }
  };
</script>
