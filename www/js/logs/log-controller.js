angular.module('final')

  .controller('logCtrl', function($scope, LogService) {

      $scope.logs = LogService.getAll();

      $scope.add = function (newLog) {
        LogService.add(newLog);
      };

      $scope.remove = function (log) {
        LogService.remove(log);
      };

  });
