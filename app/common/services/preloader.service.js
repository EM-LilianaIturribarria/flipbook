import ImagePreloader from 'image-preloader';

export const Preloader = {
  bind
};

function bind(images, handlersObject) {
  const preloader = new ImagePreloader();

  // preloader.onProgress = function (info) {
  //   console.log('image with source %s is loaded with status %s', info.value.src, info.status);
  // };

  preloader.preload(images)
    .then(() => {
      handlersObject.complete();
    }).catch(() => {
      handlersObject.error();
    });
}
