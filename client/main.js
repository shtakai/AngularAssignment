
/*
 This is the monolithic JavaScript that you should be modularizing.
 The whole project has 5 problems in it, that when rectified will allow the project to run.
 Feel free to improve upon code quality, readability, and comments.
 */
/* our angular app modularize, with config */
var app = angular.module('app', ['ngRoute']);
/* configuration for angular route */
app.config(function($routeProvider) {
  $routeProvider
    .when('/index', {
      templateUrl: '/partials/index.html',
      controller: 'indexController'
    })
    .when('/edit/:id', {
      templateUrl: '/partials/edit.html',
      controller: 'editController',
      controllerAs: 'eC'
    })
    .when('/new', {
      templateUrl: '/partials/new.html',
      controller: 'newController',
    })
    .otherwise({
      redirectTo: '/index'
    });
});
/*
 Our factory: This is going to control all of our data.
 Modularize into a folder called: 'factories' within 'client'
 */
app.factory('userFactory', [function() {
  /* Our factory is going to provide the methods to gather user data from a RESTful API
     (we aren't quite there yet, but that's where we are going!)
     Index: return all users
     Show: return one user based on an a unique selector(often id)
     Create: generate a new user
     Update: update a specific user
     Delete: remove a specific user

     Our controller is going to determine what happens once we complete the change in the dataset using a callback function.
     These are denoted below, for clarity as: functionPassedByControllerAsAnArgTo **Method**

     Bonus: convert these callbacks to promises!
     */
  function UserConstructor() {

    var users = [{
      name: "mike"
    }];

    this.index = function(functionPassedByControllerAsAnArgToIndex) {
      if (typeof(functionPassedByControllerAsAnArgToIndex) === 'function') {
        functionPassedByControllerAsAnArgToIndex(users);
      }
    };
    /*
     Creates a newUser by pushing the newUser argument into the users array
     then runs the callback to return the updated array to controllers
     */
    this.create = function(newUser, functionPassedByControllerAsAnArgToCreate) {
      if (typeof(newUser) === 'object') {
        users.push(newUser)
      }
      if (typeof(functionPassedByControllerAsAnArgToCreate) === 'function') {
        functionPassedByControllerAsAnArgToCreate(users);
      }
    };
    /* perhaps a comment here about what this does would help us understand it! */
    this.update = function(updateUser, idx, functionPassedByControllerAsAnArgToUpdate) {
      if (users[idx]) {
        for (var key in updateUser) {
          users[idx][key] = updateUser[key];
        }
      }
      if (typeof(functionPassedByControllerAsAnArgToUpdate) === 'function') {
        functionPassedByControllerAsAnArgToUpdate(users[idx]);
      }
    }
    this.show = function(idx, functionPassedByControllerAsAnArgToShow) {
      if (typeof(functionPassedByControllerAsAnArgToShow) === 'function') {
        functionPassedByControllerAsAnArgToShow(users[idx]);
      }
    }
    this.delete = function(idx, functionPassedByControllerAsAnArgToDelete) {
      if (users[idx]) {
        users.splice(idx, 1);
      }
      if (typeof(functionPassedByControllerAsAnArgToDelete) === 'function') {
        functionPassedByControllerAsAnArgToDelete(users);
      }
    }
  }
  /*
   What is this factory returning?  Could we extend this code to be reused?
   */
  return (new UserConstructor());
}]);
/*
 Our controllers: Modularize these into a folder called:
 'controllers' within 'client' (you can further organize all these if you desire: e.g. client/assets/js/controllers)
 */
app.controller('indexController', ['$scope', 'userFactory', '$location', function($scope, userFactory, $location) {
  /* Private Methods */
  var usersIndex = function() {
    userFactory.index(function beingPassedToTheFactoryIndexByThisController(usersFromTheFactory) {
      $scope.users = usersFromTheFactory;
    } /* end args passed to userFactor index */ ); //end userFactory method invokation
  } //end usersIndex

  /* Scope Methods */
  $scope.show = function(user_id) {
    $location.url('/edit/' + user_id);
  }
  /* on load time */
  console.log("loading the controller");
  console.log(userFactory);
  console.log(this);
  usersIndex();
}]);
/* EDIT CONTROLLER: this controller uses 'this', and the controlValue seems to not update (a bug for you to fix! possibly one new line of code ~ 14 characters, and one modification of something that already exists)*/
app.controller('editController', ['$scope', 'userFactory', '$location', '$routeParams', function($scope, userFactory, $location, rParams) {
  /* Public Properties */
  this.controlValue = "Current Name:";
  /* Public Methods */
  this.getUser = function() {
    userFactory.show(rParams.id, function passedToUserFactoryShow(user) {
      $scope.user = user;
    })
  }

  this.updateUser = function(){
    userFactory.update($scope.users, rParams.id, function passedToUserFactoryUpdate(userFromFactory){
      $scope.user = userFromFactory;
      // what is this?
      this.controlValue = "Updated Name: "
    });
  }
  /* on load time */
  this.getUser();
  console.log(this);
}]);
app.controller('newController', ['$scope','userFactory', function($scope) {
  $scope.addUser = function(){
    console.log($scope.user);
  }
}]);
