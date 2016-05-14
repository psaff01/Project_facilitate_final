var app = angular.module('facApp');
app.controller('adminController', function($scope, $firebaseArray) 
{
    var ref = new Firebase("https://project-facilitate.firebaseio.com/");
    var authData = ref.getAuth();

    //get the data for facility requests
    var facility_requests = ref.child("facility_requests");
    $scope.facility_request_data = $firebaseArray(facility_requests);

    $scope.facility_request_data.$loaded().then(function(data) 
    {
        $scope.myAccountTotal = 0;
        angular.forEach(data, function(obj, key) 
        {
            if(obj.completed == true)
            {
                $scope.myAccountTotal += (obj.cost/100*0.2);
            }
        });
   });

    $scope.payoutProvider = function(obj) 
    {
        
    };
});