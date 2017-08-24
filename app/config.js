const CONFIG = {

  //
  // Analytics
  //
  analytics: {
    // Google Analytics
    // Don't change the id, we are always tracking internally
    // to Integration Marketing Account
    // Change the category according to the name of
    // your project
    ga: {
      id: 'UA-12310597-137',
      category: '[JIRA-ID] BRAND | CAMPAIGN NAME - PRODUCT - VERSION'
    },

    // Evolve Analytics
    // For now... we can only track events sent
    // from iframes living inside origin
    // Set the id of the origin product you created
    // For placement, use overthepage for overlays,
    // or inpage
    // In case you don't need EA (standalone) set it to null
    // 'ea' :  null
    ea: {
      adId: 190,
      placement: 'overthepage'
    }
  },

  //
  // Images Preloader
  //
  preload: {
    images: [
      'assets/images/bg.png',
      'assets/images/copy.png',
      'assets/images/cover.png',
      'assets/images/page1-2.png',
      'assets/images/page3-4.png',
      'assets/images/page5-6.png',
      'assets/images/page7-8.png'
    ]
  },

  //
  // Settings for our app
  //
  settings: {
    options: {
      height: 560,
      width: 778,
      acceleration: true,
      autoCenter: false,
      duration: 600,
      gradients: false
    },
    navigation: {
      zoom: true,
      firstAndLast: true,
      prevAndNext: true,
      textIndicator: true
    }
  }
};

export default CONFIG;
