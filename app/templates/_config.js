angular.module('<%= app_name %>', [
  'ui.router'
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('first');
	$stateProvider.
	state('first', {
		url: '/first',
		templateUrl: 'views/firstTemplate.html',
		controller: 'firstCtrl'
	}).
	state('second', {
		url: '/second',
		templateUrl: 'views/secondTemplate.html',
		controller: 'secondCtrl'
	});
}]);


var isLoggedIn = function($firebase, $state, firebaseRefFactory){
	var ref = new Firebase(firebaseRefFactory.getMainRef());
	var authData = ref.getAuth();
	if (authData) {
	  console.log("Authenticated user with uid:", authData.uid);
		return;
	}
	else{
		// send user to login state/route
		$state.go('login');
	}
};
