angular.module('app').controller('MyPosts', function($scope, $http){

    $http.get('/api/post/myposts').then(function(posts){
        $scope.posts = posts.data;
    });

});