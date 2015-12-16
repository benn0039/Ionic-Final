angular.module('final')

  .factory('BestBuyService', function ($auth, $http) {

    var BASE_URL = 'https://api.bestbuy.com/v1/',
      KEY= 'wgcj47cn2c362tdskqf5aemz',
      PRODUCTS = 'products',
      STORE ='stores';

    return {
      getProducts: function (searchTerm, page) {
        return $http.get(BASE_URL + PRODUCTS + '((search='+ searchTerm + '))', {
          params: {
            page: page,
            format: 'json',
            apiKey: KEY
          }
        });
      },

      getStoresByCity: function (searchTerm) {
        var CITY = '((city=' + searchTerm + '))';
        //if ($auth.isAuthenticated()) {
        return $http.get(BASE_URL + STORE + CITY, {
          params: {
            format: 'json',
            apiKey: KEY
          }
        });
        //return $http.get(testReq);
      },

      getStoresByGPS: function (lat, long) {
        var GPS = '((area(' + lat + ',' + long + ',500)))';
        //if ($auth.isAuthenticated()) {
        return $http.get(BASE_URL + STORE + GPS, {
          params: {
            format: 'json',
            apiKey: KEY,
            pageSize: 25
          }
        });
        //return $http.get(testReq);
      }
    }
  });
