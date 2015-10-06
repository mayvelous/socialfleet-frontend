angular.module('app', ['satellizer', 'ui.bootstrap', 'ui.router', 'toastr', 'ngAnimate'])
    .config(function($authProvider, $stateProvider, toastrConfig){

        // Twitter
        $authProvider.twitter({
            url: '/api/user/login'//,
            //authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
            //redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            //type: '1.0',
            //popupOptions: { width: 495, height: 645 }
        });

        $stateProvider.state('posts', {
            url: '/',
            templateUrl: 'myposts.html',
            controller: 'MyPosts'
        }).state('post', {
            url: '/post/:id',
            templateUrl: 'post.html',
            controller: 'Post'
        });

        toastrConfig.positionClass = 'toast-bottom-right';
});