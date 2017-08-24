import {EAtracker} from './ea-tracker.service.js';
import {GAtracker} from './ga-tracker.service.js';
import CONFIG from '../../config.js';

export const TrackEvent = {
  record
};

function record(action, attr, value) {
  console.log('Event: '+action+'\nAttribute: '+attr+'\nValue: '+value);

  if (CONFIG.analytics.ga) {
    GAtracker.record(action, attr + ': ' + value);
  }
  if (CONFIG.analytics.ea) {
    EAtracker.record(action, attr, value);
  }
}

export const EVENTS = {
  Click: 'Click',
  Game: 'Game',
  Hover: 'Hover',
  Video: 'Video'
};

export const EVENT_ATTRIBUTES = {
  Click: {
    Actions: 'Actions',
    Clickthru: 'Clickthru',
    URL: 'URL'
  },
  Game: {
    Started: 'Started',
    Completed: 'Completed',
    Muted: 'Muted',
    Unmuted: 'Unmuted',
    Replay: 'Replay',
    Actions: 'Actions'
  },
  Hover: {
    Hover: 'Hover',
    Actions: 'Actions'
  },
  Video: {
    Start: 'Start',
    Pause: 'Pause',
    VP_25: 'VP_25',
    VP_50: 'VP_50',
    VP_75: 'VP_75',
    Finish: 'Finish',
    Hover: 'Hover',
    Mute: 'Mute',
    Unmute: 'Unmute',
    Fullscreen: 'Fullscreen',
    Resume: 'Resume',
    Seek: 'Seek',
    Click: 'Click'
  }
};
