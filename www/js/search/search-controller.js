angular.module('final')

  .controller("searchCtrl", function($scope, $q, $log, $http, $rootScope, BestBuyService,
                                     $ionicSlideBoxDelegate, $ionicPopup, LogService, timeStamp) {

    var ZERO_RESULTS = 'ERROR: Search returned 0 results for: ',
        PROMISE_REJECT = 'ERROR: product search promise rejected: ';

    $scope.searchForProducts = function(term, page) {
      $scope.searchTerm = term;
      var deferred = $q.defer();

      BestBuyService.getProducts( term, page ).success( function( data ) {
          deferred.resolve( data );
          $scope.prods = data;
          $ionicSlideBoxDelegate.update();
          $scope.currentPage = data.currentPage;
          $scope.totalPages = data.totalPages;

          if(data.total == 0){
            LogService.add(timeStamp.get() + " - " + ZERO_RESULTS + " "+ term);
              $ionicPopup.alert({
                  title: 'Results',
                  content: "Search for " + term + " returned 0 results. Please try again"
              });
          }
      })
        .error(function( errorData ) {
          LogService.add(timeStamp.get() + " - " + PROMISE_REJECT + " "+ errorData);
          deferred.reject( errorData )
        });
      return deferred.promise;
    };

    $scope.swipeBack = function() {

      // on first slide
      if($ionicSlideBoxDelegate.currentIndex() == 0) {

        // Disable fetch if on first slide of first http response 'page'
        if( $scope.currentPage == 1 ){
          return;
        } else {
          $scope.searchForProducts($scope.searchTerm, $scope.currentPage -1);
          $ionicSlideBoxDelegate.slide(9);
          return;
        }
      }
    };

    $scope.swipeForward = function() {

      // on last slide of group
      if($ionicSlideBoxDelegate.currentIndex() == 9){

        if( $scope.currentPage != $scope.totalPages ){
          $scope.searchForProducts($scope.searchTerm, $scope.currentPage +1);
          $ionicSlideBoxDelegate.slide(0);
          return;
        } else {
          return;
        }
      }

    }

  });

