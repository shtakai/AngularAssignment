
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
  /*
   What is this factory returning?  Could we extend this code to be reused?
   */
  return (new UserConstructor());
}]);





