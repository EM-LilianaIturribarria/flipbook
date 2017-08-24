import SeeThru from '../../lib/seeThru.js';

export const CanvasRender = {
  RenderVideo
};

function RenderVideo(videoEl, cbStart, cbEnd) {
  SeeThru.create(videoEl, {
    start: 'autoplay',
    end: 'stop',
    alphaMask: true
  }).ready((instance, video) => {
    video.addEventListener('canplaythrough', () => {
      cbStart();
    });
    video.addEventListener('ended', () => {
      cbEnd();
    });
  });
}
