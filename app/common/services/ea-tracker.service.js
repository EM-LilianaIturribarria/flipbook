import {OriginApi} from './origin-api.service';

export const EAtracker = {
  record
};

function record(event, attr, value) {
  if (OriginApi.isInitiated()) {
    if (window.location.hostname === 'localhost') {
      console.log(event, attr, value);
    }
    OriginApi.trackEvent(event, attr, value);
  }
}
