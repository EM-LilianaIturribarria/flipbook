// Vue and Dependencies
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Promise from 'promise-polyfill';

// Fix for IE
const isIE11 = Boolean(window.MSInputMethodContext) && Boolean(document.documentMode);

if (isIE11) {
  window.Promise = Promise;
}

// Components for Router
import Main from './core/Main.vue';
import {OriginApi} from './common/services/origin-api.service';
import {GAtracker} from './common/services/ga-tracker.service';
import CONFIG from './config';
// directives
import './common/directives/track-event.directive';

// Our SASS file with dependencies
import './sass/index.scss';
//
// Router
//

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        default: Main
      }
    }
  ]
});

// Get Query Parameters from URL
const parse = function (val) {
  let result = false;
  let tmp = [];
  const query = location.search.substr(1).split('&');

  query.forEach(item => {
    tmp = item.split('=');
    if (tmp[0]===val) {
      result = decodeURIComponent(tmp[1]);
    }
  });
  return result;
};

// Override AdId if found
CONFIG.analytics.ea.adId = parse('adId') ? parse('adId') : CONFIG.analytics.ea.adId;

export default new Vue({
  el: '#root',
  router,
  render: h => h('router-view'),
  created() {
    OriginApi.init(CONFIG.analytics.ea);
    GAtracker.init();
  }
});
