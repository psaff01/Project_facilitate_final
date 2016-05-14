var app = angular.module('facApp', ["firebase"]);
app.controller('indexController11', function($scope) 
{
      var ref = new Firebase("https://project-facilitate.firebaseio.com/");
      
        var authData = ref.getAuth();
            $scope.isAuthenticated = false;
            $scope.authData = authData;
            //$scope.webPost = $http;
           // $scope.serviceType = "snow";
            
            //if we ARE authenticated...
            if(authData)
            {

                $scope.isAuthenticated = true; 
                $scope.userEmail = authData.password.email; //this is used to display the userEmail in the header  
                //...then we find out what our role is by going to a child auth of our base reference and then the child within that to get our uid
                ref.child("role").child(authData.uid).on("value", function(data) 
                {
                  //set role to user, admin, or provider
                  $scope.role = data.val();
                  $scope.$apply();    
                });
            }


$scope.submitForm = function() 
    {
        console.log("posting data....");
        formData = $scope.form;
        console.log(formData);
        
    };

    $scope.logout = function() 
    {
        ref.unauth();
        location.reload();
    } 

    $scope.login = function() 
    {
        ref.authWithPassword({
        email    : this.username,
        password : this.password
    }, function(error, authData) 
    {
        if (error) 
        {
          //console.log("Login Failed!", error);
          //$scope.authenticated = "Failed"
            console.log(error);
        }
        else 
        {
            location.reload();        
        }
    });
    };
});
      
