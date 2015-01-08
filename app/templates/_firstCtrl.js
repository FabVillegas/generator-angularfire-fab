angular.module('<%= app_name %>').controller('firstCtrl', firstCtrl);

firstCtrl.$inject = ['$scope', '$state'];

function firstCtrl($scope, $state){
  $scope.changeState = function(){
    $state.go('second');
  };
};
