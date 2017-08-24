import Vue from 'vue';
import {GAtracker} from '../services/ga-tracker.service';
import {EAtracker} from '../services/ea-tracker.service';
import {EVENTS, EVENT_ATTRIBUTES} from '../services/track-event.service';

Vue.directive('trackevent', {
  bind(el, binding) {
    let rolloverTimer;
    const ga = binding.arg === 'ga' ? binding.value : '';

    el.onclick = function () {
      if (el.href) {
        EAtracker.record(EVENTS.Click, EVENT_ATTRIBUTES.Click.URL, el.href);
        GAtracker.record(EVENTS.Click, ga + ' URL: ' + el.href);
      } else {
        EAtracker.record(EVENTS.Click, EVENT_ATTRIBUTES.Click.Actions);
        GAtracker.record(EVENTS.Click, ga);
      }
    };

    el.onmouseenter = function () {
      rolloverTimer = setTimeout(() => {
        if (el.href) {
          EAtracker.record(EVENTS.Hover, EVENT_ATTRIBUTES.Hover.Hover, el.href);
          GAtracker.record(EVENTS.Hover, ga + ' hover URL: ' + el.href);
        } else {
          EAtracker.record(EVENTS.Hover, EVENT_ATTRIBUTES.Hover.Actions);
          GAtracker.record(EVENTS.Hover, ga);
        }
      }, 300);
    };

    el.onmouseleave = function () {
      clearTimeout(rolloverTimer);
    };
  }
});
