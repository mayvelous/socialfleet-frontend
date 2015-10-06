angular.module('app').controller('Scheduler', function($scope, $http){

    $scope.tweet = function(){

        var datetime = new Date(
            $scope.date.getFullYear()
            , $scope.date.getMonth()
            , $scope.date.getDate()
            , $scope.time.getHours()
            , $scope.time.getMinutes()
        );

        var objToPost = {
            message: $scope.message,
            datetime: datetime
        };

        console.log(objToPost);

        $http.post('/api/post/tweet', objToPost).then(function(){

        });
    };



    $scope.time = new Date();

    $scope.minDate = new Date();

    $scope.opened = false;

    $scope.open = function($event){
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = !$scope.opened;
    };



});