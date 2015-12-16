angular.module('final')

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $auth, $ionicPopup,
                                 $ionicLoading, LogService, timeStamp) {

    // Form data for the login modal
    $scope.loginData = {};
    $scope.logs = [];

    $scope.LoginTest = {
      usernameException: 'guest',
      usernameException1: 'Guest',
      passwordLimit: 5
    };

    $scope.isLoggedIn = false;


    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    $scope.fbLogin = function () {
        alert("inside");
    };


    $scope.$on("authentication-failed", function() {
        $auth.logout();
        $scope.login();

    });

    $scope.$on("loader_show", function() {
        $ionicLoading.show({
            template: "loading..."
        });
    });

    $scope.$on("loader_hide", function() {
        $ionicLoading.hide();
    });


    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        var UNAME_ERROR = "LOGIN ERROR: restricted username: ",
            PW_ERROR = 'LOGIN ERROR: password length: ';


        // Check username against criteria
        if ($scope.loginData.username != $scope.LoginTest.usernameException
                && $scope.loginData.username != $scope.LoginTest.usernameException1){

            // Check password against criteria
            if( $scope.loginData.password.length >= $scope.LoginTest.passwordLimit ) {
                $scope.isLoggedIn = true;
                $ionicPopup.alert({
                  title: 'Success',
                  content: 'You Have Successfully Logged In'
                });
                $scope.closeLogin();
            } else {
                $ionicPopup.alert({
                    title: 'Error',
                    content: 'Password should be at least 5 characters'
              });
              LogService.add(timeStamp.get() + ' - ' + PW_ERROR + $scope.loginData.password.length);
              $scope.loginData.username = '';
              $scope.loginData.password = '';
            }
        } else {
            $ionicPopup.alert({
             title: 'Error',
              content: "You really shouldn't use that username"
            });

            LogService.add(timeStamp.get() + ' - ' + UNAME_ERROR + $scope.loginData.username);
            //clear out input elements
            $scope.loginData.username = '';
            $scope.loginData.password = '';
        }
    };

    $scope.authenticate = function (provider) {
        $auth.authenticate(provider).then(function () {
          var AUTH_ERROR = 'AUTH ERROR: authentication failed: ',
              AUTH_SUCCESS = 'AUTH SUCCESS: ';

            LogService.add(timeStamp.get() + ' - ' + AUTH_SUCCESS + provider);
            $ionicPopup.alert({
                title: 'Success',
                content: 'You Have Successfully Logged In'
            })

            .catch(function(response){
                $ionicPopup.alert({
                    title: 'Error',
                    content: response.data ? response.data ||
                             response.data.message : response
                })
              LogService.add(timeStamp.get() + ' - ' + AUTH_ERROR + provider);
            });
        });
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };

    $scope.isAuthenticated = function (){
        return $auth.isAuthenticated();
    };

    $scope.logout = function(){
        $scope.isLoggedIn = false;
        $scope.loginData = {};
        $ionicPopup.alert({
            title: 'Logout',
            content: 'You Have Been Logged Out'
        });
        return $auth.logout();
    }
});
