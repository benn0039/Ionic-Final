angular.module('final')

  .factory('FacebookService', function ($auth, $http, $ionicPopup) {

    var facebookApiURL = 'https://graph.facebook.com/v2.2';

    return {
      me: function () {
        if ($auth.isAuthenticated()) {
          return $http.get(facebookApiURL + '/me', {
            params: {
              access_token: $auth.getToken(),
              fields:  'name',
              format: 'json'
            }
          });
        } else {
          $ionicPopup.alert({
            title: 'Error',
            content: 'User Not Authorized'
          });
        }
      },

      friends: function () {
        if ($auth.isAuthenticated()) {
          return $http.get(facebookApiURL + '/me', {
            params: {
              access_token: $auth.getToken(),
              fields: 'friends',
              format: 'json'
            }
          });
        } else {
          $ionicPopup.alert({
            title: 'Error',
            content: 'User Not Authorized'
          });
        }
      }
    }
  });
