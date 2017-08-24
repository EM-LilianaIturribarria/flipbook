<template>
  <div
    :class="{
      'page': true,
      'odd': index % 2 === 0,
      'even': index % 2 !== 0,
      'hard cover': index === 0,
      'hard': index === 1
    }"
  >
    <div class="content">
      <div
        v-if="page.hotspots"
        v-for="(hotspot, i) in page.hotspots"
        :key="i"
        :class="getClasses(i, 'item')"
      >
        <div class="hotspot__wrapper">
          <a
            :href="hotspot.href"
            :class="getClasses(i, 'hotspot')"
            target="_blank"
            v-trackevent:ga="'hotspot-'+i"
          ></a>
          <a
            :href="hotspot.href"
            target="_blank"
            :class="getClasses(i, 'popup')"
            v-trackevent:ga="'hotspot-'+i+'-popup'"
          ></a>
        </div>
      </div>

      <a
        v-if="page.ctas"
        v-for="(cta, i) in page.ctas"
        :key="i"

        :class="getClasses(i, 'cta')"
        :href="cta.url"
        target="_blank"
      ></a>

    </div>
  </div>
</template>

<script>
  export default {

    name: 'Page',

    props: ['page', 'index'],

    created(){

    },

    methods: {

      getClasses(i, type){
        return 'page__'+type+' '+type+(i+1);
      }
    }
  };
</script>
