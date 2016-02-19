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
            .when('/china-map', {
                templateUrl: 'app/china-map/china-map.html'
            })
            .otherwise({
                redirectTo: 'app/home/home.html'
            });
    }
})();
