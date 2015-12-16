angular.module('final')

.factory("LogService", function ($localStorage) {

    $localStorage = $localStorage.$default({
      logs: []
    });

    return {
        getAll: function() {
          return $localStorage.logs;
        },

        add: function(log) {
          $localStorage.logs.push(log);
        },

        remove: function() {
          $localStorage.logs.splice($localStorage.logs.indexOf(log), 1);
        }
    }
});

