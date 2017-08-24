export const OriginApi = {};

(function (_out) {
  let _originApi;

  _out.init = function (settings) {
    if (settings === null) {
      _originApi = null;
      return;
    }
    console.log('Origin AdId: '+settings.adId);
    _originApi = new (window).OriginExternalAPI({
      adId: settings.adId,
      placement: settings.placement
    });
  };

  _out.isInitiated = function () {
    return _originApi !== null;
  };

  _out.trackEvent = function (event, attr, value) {
    _originApi.track({
      event,
      attr,
      value
    });
  };

  _out.iframeResize = function (width, height, unit, ms) {
    this._originApi.iframeResize(width, height, unit, ms);
    console.log('%c Origin API. Iframe Resize event sent', 'font-weight:bold');
    return;
  };

  _out.closeOverlay = function () {
    this._originApi.closeOverlay();
    console.log('%c Origin API. Close event sent', 'font-weight:bold');
    return;
  };

  _out.getClickthrus = function () {
    const self = this;
    let dfpVars = {
      clickthru1: 'http://staging.microsites.gorillanation.com/temp.html?i=1',
      clickthru2: 'http://staging.microsites.gorillanation.com/temp.html?i=2',
      clickthru3: 'http://staging.microsites.gorillanation.com/temp.html?i=3',
      clickthru4: 'http://staging.microsites.gorillanation.com/temp.html?i=4',
      clickthru5: 'http://staging.microsites.gorillanation.com/temp.html?i=5',
      clickthru6: 'http://staging.microsites.gorillanation.com/temp.html?i=6',
      clickthru7: 'http://staging.microsites.gorillanation.com/temp.html?i=7'
    };

    if (self.isInitiated() && window.name && window.location.hostname !== 'localhost') {
      try {
        dfpVars = null;
        dfpVars = JSON.parse(decodeURIComponent(window.name));
        console.log('%c Origin API. Get clickthrus ' + dfpVars, 'font-weight:bold');
      } catch (e) {
        console.error('Local: returning dummy clickthrus');
      }
    }

    return dfpVars;
  };
})(OriginApi);
