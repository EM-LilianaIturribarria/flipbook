const contexts = new WeakMap();

export default new class LoadingSpinnerService {
  constructor() {
    contexts.set(this, {
      spinner: {
        show: false
      }
    });
  }

  get spinner() {
    return contexts.get(this).spinner;
  }

  hide() {
    contexts.get(this).spinner.show = false;
  }

  show() {
    contexts.get(this).spinner.show = true;
  }
}();
