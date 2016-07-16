
app.controller('newController', ['$scope', '$location','userFactory', function($scope, $location, userFactory) {
  $scope.addUser = function(){
    console.log($scope.user);
    userFactory.create($scope.user);
    $location.url('/');

  }
}]);
