import '../lib/jquery.fancybox.js';
import bus from '../common/services/bus.service.js';

export default class OverlayService {

  static open(img) {
    $.fancybox.open(
      [
        {
          type: 'html',
          helpers: {
            overlay: {
              closeClick: false
            }
          }
        }
      ],
      {
        padding: 0,
        margin: 0,
        content: '<div class="scrollable"><img src="' + img + '" width="700"></div>',
        // parent: 'flipbook',
        closeBtn: false,
        topRatio: 0.0125,
        afterClose() {
          console.log(bus);
          // $rootScope.$broadcast('flipbook.zoomOut', true);
        }
      }
    );

    $('.fancybox-inner').on('mousemove', e => {
      const mouseY = e.pageY;
      const imgH = $('.scrollable img ').height() - 800;
      $('.scrollable img ').css('margin-top', -mouseY / imgH * 100);
    });
  }

  static close() {
    $.fancybox.close();
  }
}
