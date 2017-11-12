angular
    .module('app', [])
    .controller('mainController', [
        '$scope',
        function(
            $scope) {
                $scope.do = function(){
                    alert('!!!');
                };
            }
    ]);