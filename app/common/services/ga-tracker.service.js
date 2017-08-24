import CONFIG from '../../config.js';

export const GAtracker = {
  record,
  init
};

const category = CONFIG.analytics.ga.category;
const id = CONFIG.analytics.ga.id;

function record(action, label) {
  if (window.location.hostname === 'localhost') {
    console.log(category, action, label);
  }
  window.ga('send', 'event', category, action, label);
}

function init() {
  window.ga('create', id);
  window.ga('send', 'pageview');
}
