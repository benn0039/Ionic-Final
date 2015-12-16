angular.module('final')

  .controller("storeCtrl", function($scope, BestBuyService, $q, $ionicPopup, timeStamp, LogService) {

    var GPS_OK = 'GPS supported',
        GPS_NFG = 'GPS not supported',
        GPS_ERROR = 'GPS not available: ',
        STORE_SEARCH_ERROR = 'ERROR: No stores found';

    $scope.searchGPS = function() {
        if(navigator.geolocation){
            LogService.add(timeStamp.get() +' ' + GPS_OK);
            navigator.geolocation.getCurrentPosition(searchByGPS, onError);

        } else {
            LogService.add(timeStamp.get() +' ' + GPS_NFG);
            $ionicPopup.alert({
              title: 'GPS',
              content: "GPS not supported. Please search by city or region."
            });
        }
    };

    $scope.searchForStores = function(term) {
      var deferred = $q.defer();

      BestBuyService.getStoresByCity(term).success( function( data ) {
          deferred.resolve( data );
          $scope.stores = data;

          if(data.total == 0){
              LogService.add(timeStamp.get() +' ' + STORE_SEARCH_ERROR);
              $ionicPopup.alert({
                title: 'Results',
                content: "No Stores Found. Please try again"
            });
          }
        })
        .error(function( errorData ) {
            deferred.reject( errorData )
        });
    };

    //GPS error callback
    function onError(error) {
        LogService.add(timeStamp.get() +' ' + GPS_ERROR + error);
        $ionicPopup.alert({
          title: 'GPS',
          content: "GPS not available: " + error
        });
    }

    // GPS success callback
     function searchByGPS(position) {
        var deferred = $q.defer();

        BestBuyService.getStoresByGPS(position.coords.latitude, position.coords.longitude ).success( function( data ) {
            deferred.resolve( data );
            $scope.stores = data;

            if(data.total == 0){
                LogService.add(timeStamp.get() +' ' + STORE_SEARCH_ERROR);
                $ionicPopup.alert({
                    title: 'Results',
                    content: "No Stores Found. Please try again"
                });
            }
        })
        .error(function( errorData ) {
          deferred.reject( errorData )
        });
    }

  });
