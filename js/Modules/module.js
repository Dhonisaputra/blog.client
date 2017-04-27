window.mainApp = angular.module("mainApp", ['ngRoute', 'ngSanitize'/*, 'ui.bootstrap'*/]);
window.mainApp
.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=0; i<total; i++) {
      input.push(i);
    }

    return input;
  };
})
.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}])
.factory('global_configuration', function(){
    var config = {}
    config.namespace_sudo = 'sudo';
    config.namespace_admin = 'admin';
    config.namespace_public = 'public';
    return config;
});


window.mainApp.run(['$rootScope', '$location', '$routeParams','$config', '$owner', '$authorize', function ($rootScope, $location, $routeParams, $config, $owner, $authorize) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {

    	/*var Cook = window.sessionStorage.getItem('auth');
        var source = $config.source;
        if (source == 'panel' && !Cook) {
            event.preventDefault();
            $location.path('/login');
            $rootScope.is_auth = 0;
            $rootScope.style_main_panel= 'width:100%';
            $rootScope.sidebar= false
        }else
        {
            if(next.params.owner_key)
            {
                $rootScope._owner_key = next.params.owner_key;

            }else
            {
                $rootScope._owner_key = '';
            }
            $config.set_public_key($rootScope._owner_key);

            // console.log($config, $rootScope._owner_key, next.params);
            $rootScope.is_auth = 1;
            $rootScope.sidebar= true
            $rootScope.style_main_panel= '';
            $rootScope.base_url = $config.base_url;
        }*/
        $rootScope.is_auth = 0;
        $rootScope.style_main_panel= 'width:100%';
        $rootScope.sidebar= false
        console.log(current)
        if(next.$$route.need_login)
        {
            if($authorize.is_need_login())
            {
                event.preventDefault();
                $location.path('/login');
            }else
            {
                
                $rootScope.is_auth = 1;
                $rootScope.sidebar= true
                $rootScope.style_main_panel= '';
                $rootScope.base_url = $config.base_url;
            }
        }
    });
}]);