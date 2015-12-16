
angular.module('final', ['ionic', 'satellizer', 'ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// Facebook Credentials
.config(function($authProvider){
    $authProvider.facebook({
        clientId: '1670689369877391',
        scope: 'email, public_profile, user_photos, user_friends',
        responseType: 'token'
    });
})

    .config(function($httpProvider) {
      $httpProvider.interceptors.push('httpInterceptor');
    })

   .value('isLoggedIn', false);









