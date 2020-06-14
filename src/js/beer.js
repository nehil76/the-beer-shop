if('serviceWorker' in navigator){
  console.log("browser supported service worker");
  navigator.serviceWorker.register("/sw.js").then(()=>{
    console.log("service worker has been registered");
  });
}

var app = angular.module('beer',['ng']);


app.service('beerFactory',['$http','$q',function($http,$q){
  return{
     getBeerDetails : function(){
       var deffered = $q.defer();

     $http.get('/beerdetails').then((res)=>{
         if(res.data){
           deffered.resolve(res.data);
         }
       });
       return deffered.promise;
    }

  }


}]);

app.controller('homeController',['beerFactory','$scope',function(beerFactory,$scope){
  $scope.welcomeMessage = 'Welcome to beer cafe.';
  $scope.propertyName= "name";
  $scope.searchBar = false;
  $scope.filterBar = false;
  $scope.cart= [];

  $scope.addBeerToCart = function(beer){
      $scope.cart.push(beer);
      $scope.isbeerinCart(beer);

  }

  $scope.isbeerinCart=function(beer){
    if($scope.cart.indexOf(beer) >-1){

      return true;
    }else{
      return false;
    }
  }

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

  $scope.showSearchBar = function(){
    $scope.searchBar = !$scope.searchBar;
  }

  $scope.showfilterBar = function(){
    $scope.filterBar = !$scope.filterBar;
  }

   beerFactory.getBeerDetails().then((res)=>{
     $scope.addBitterNess(res);
  });

  $scope.addBitterNess = function (res){
     $scope.beerslist =[];
     angular.forEach(res,function(beer){
        if(parseFloat(beer.ibu) >=30){
          beer.bitterness ="Highly bitter";
        }else if(parseFloat(beer.ibu) >=15){
          beer.bitterness ="Slighthly bitter";
        }else {
          beer.bitterness ="Less bitter";
        }
        $scope.beerslist.push(beer);
     });
  }

}]);
