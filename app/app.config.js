(function () {
    angular
        .module('victorHome')
        .config(config);

    function config ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'app/home/home.html'
            })
            .when('/about-me', {
                templateUrl: 'app/about-me/about-me.html'
            })
            .otherwise({
                redirectTo: 'app/home/home.html'
            });
    }
})();
