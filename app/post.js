angular.module('app').controller('Post', function($scope, $http, $location, $state, toastr){

    //var id = $location.search().id; // if passed via ?id=xx
    var id = $state.params.id;

    $scope.time = new Date();

    $scope.minDate = new Date();

    $scope.opened = false;

    $scope.open = function($event){
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = !$scope.opened;
    };

    if(isEditingPost()) {
        $scope.isEditing = true;
        getPost();
        $scope.save = editPost;
    } else{
        $scope.save = newPost;
    }

    $scope.delete = deletePost;

    function getPost(){
        $http.get('/api/post/' + id).then(function(post){
            $scope.message = post.data.message;

            var datetime = new Date(post.data.scheduledFor);
            $scope.date = datetime;
            $scope.time = datetime;
        });
    }

    function newPost() {

        var objToPost = {
            message: $scope.message,
            scheduledFor: getCreatedDateTime()
        };

        console.log(objToPost);

        $http.post('/api/post/tweet', objToPost).then(function(){
            toastr.success('Successfully created');
            $state.go('posts');
        });
    }

    function editPost(){
        var objToPost = {
            message: $scope.message,
            scheduledFor: getCreatedDateTime()
        };
        $http.post('/api/post/update/' + id, objToPost).then(function(){
            toastr.success('Successfully edited.');
            $state.go('posts');
        });
    }

    function deletePost(){
        $http.post('/api/post/destroy/' + id).then(function(){
            toastr.info('Successfully deleted.');
            $state.go('posts');
        });
    }

    function isEditingPost(){
        return id;
    }

    function getCreatedDateTime(){
        var datetime = new Date(
            $scope.date.getFullYear()
            , $scope.date.getMonth()
            , $scope.date.getDate()
            , $scope.time.getHours()
            , $scope.time.getMinutes()
        );

        return datetime;
    }

});