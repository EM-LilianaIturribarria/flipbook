import {EAtracker} from '../common/services/ea-tracker.service.js';
import {GAtracker} from '../common/services/ga-tracker.service.js';
import turn from '../lib/turn.js';
import bus from '../common/services/bus.service.js';

const contexts = new WeakMap();

export default class FlipbookService {

  constructor(el, settings) {
    const ctx = {
      el,
      options: settings,
      sendEvent: {
        status: 0,
        corner: null,
        page: ''
      }
    };

    ctx.options.when = {
      start(event, pageObject, corner) {
        if (corner !== null) {
          ctx.sendEvent.status = 1;
          ctx.sendEvent.corner = corner;
          ctx.sendEvent.page = pageObject.page;
        }
      },

      end(event, pageObject, turned) {
        if (turned) {
          ctx.sendEvent.status = 2;

          if (ctx.sendEvent.corner !== null) {
            const value = 'page-' + ctx.sendEvent.page + '_corner-' + ctx.sendEvent.corner;
            GAtracker.record('Click', value);
            EAtracker.record('Click', 'Actions', value);
          }
        } else {
          ctx.sendEvent = {
            status: 0,
            corner: null,
            page: ''
          };
        }
      },

      turning(event, page, view) {
        const data = {
          page,
          view: (view[0] - 1) + ' - ' + (view[1] - 1)
        };
        console.log(data);
        GAtracker.record('View', 'pages_'+ view);
        bus.$emit('flipbook.turning', data);
      }
    };
    contexts.set(this, ctx);
  }

  init() {
    const ctx = contexts.get(this);
    console.log(turn);
    $(ctx.el).turn(ctx.options);
    return this;
  }

  getLength() {
    const ctx = contexts.get(this);
    return $(ctx.el).turn('pages');
  }

  turnTo(page) {
    const ctx = contexts.get(this);
    $(ctx.el).turn('page', page);
  }

  turnToPrevious() {
    const ctx = contexts.get(this);
    $(ctx.el).turn('previous');
  }

  turnToNext() {
    const ctx = contexts.get(this);
    $(ctx.el).turn('next');
  }

  getView() {
    const ctx = contexts.get(this);
    return $(ctx.el).turn('view');
  }

  open() {
    const ctx = contexts.get(this);

    setTimeout(() => {
      $(ctx.el).turn('page', 2);
    }, 400);
  }

}
