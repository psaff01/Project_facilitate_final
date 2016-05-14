var app = angular.module('facApp');
 app.controller('providerController', function($scope, $firebaseArray) 
 {
  var ref = new Firebase("https://project-facilitate.firebaseio.com/");
      var authData = ref.getAuth();
      $scope.myUID = authData.uid;

      //get the data for service requests
          var facility_requests = ref.child("facility_requests");
          $scope.facility_request_data = $firebaseArray(facility_requests);

          $scope.facility_request_data.$loaded().then(function(data) 
          {
              $scope.myAccountTotal = 0;
              angular.forEach(data, function(obj, key) 
              {
                  console.log("checking: " + obj);
                  console.log("key " + key);
                  if(obj.completed == true && obj.facilityProvider == $scope.myUID)
                  {
                      $scope.myAccountTotal += (obj.cost/100*0.8);
                  }
              });
         });

          $scope.claimRequest = function(obj) 
          {
              obj.facilityProvider = authData.uid;
              $scope.facility_request_data.$save(obj);
          };

          $scope.completeRequest = function(obj) 
          {
              obj.completed = true;
              $scope.facility_request_data.$save(obj);
          };
      });      
  
   