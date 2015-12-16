angular.module('final')

    .factory('httpInterceptor', function($q, $rootScope) {
        var numLoadings = 0;
        return {
            request: function(config) {
                numLoadings++;

                $rootScope.$broadcast("loader_show");
                return config || $q.when(config);
            },
            response: function(response) {
                if ((--numLoadings) == 0) {
                    $rootScope.$broadcast("loader_hide");
                }
                return response || $q.when(response);
            },
            responseError: function( response ) {
                if ( ! (--numLoadings)) {
                    $rootScope.$broadcast("loader_hide");
                }
                $rootScope.$broadcast("loader_hide");
                return $q.reject(response);
            }
        };
    })

  .factory('timeStamp', function () {
    return{
      get: function(){
        var TIMESTAMP,
          TIME,
          DATE,
          d;

        d = new Date();
        DATE = d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate()  + " @ ";
        TIME = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        //TIMESTAMP = DATE + TIME;
        return TIME;

      }
    }
  });
