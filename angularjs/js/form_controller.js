app.controller('formController', function($scope) {
    $scope.currentInput = "Unknown";
    $scope.showButton = true;

    $scope.buttonSwitch = function() {
        console.log("buttonSwitch()");

        if ($scope.showButton) {
            console.log('Show button');
            $scope.showButton = false;
        }
        else {
            console.log('Hide button');
            $scope.showButton = true;
        }
    };

    $scope.changeName = function() {
        $scope.name = "Isaac Asimov";
    }
});