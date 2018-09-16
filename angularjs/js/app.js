var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: 'page01.htm',
        controller: 'mainCtrl'
    })
    .when("/02", {
        templateUrl: 'page02.htm',
        controller: 'helpCtrl'
    })
    .otherwise({
        templateUrl: '404.htm',
    });
});

app.run(function($rootScope) {

});

app.directive('w3TestDirective', function() {
    return {
        template: '<div>Template for <b>w3TestDirective directive</b> <font color="blue">content</font></div>'
    };
});

app.controller('namesCtrl', function($scope) {
    $scope.names = [{name: "João", country: "Brasil"}, {name: "Jennifer", country: "USA"}, {name: "Linus", country: "Finlândia"}];
    }
);

app.controller('formCtrl', function($scope) {
    $scope.emailX = 'xxx';
});

app.controller('validateCtrl', function($scope) {
    $scope.user = 'X Y';
    $scope.email = 'x.y@gmail.com';
});

app.controller('mainCtrl', function($scope) {
    console.log('mainCtrl');
});

app.controller('helpCtrl', function($scope) {
    console.log('helpCtrl');
});

app.controller('requestCtrl', function($scope, $http) {
    console.log('requestCtrl');

    $scope.requestData = function() {
        $scope.receivedData = 'Requesting data..';

        $http.get('list.json').then(
            function(response) {
                console.log('received data: ' + response.data);

                $scope.receivedData = 'Received data: ' + JSON.stringify(response.data);
            },
            function() {
                console.log('error on requesting data.');
            }
        );
    };
});