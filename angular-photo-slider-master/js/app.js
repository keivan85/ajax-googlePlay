angular.module('website', ['ngAnimate', 'ngTouch'])
    .controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

         $scope.slides = [];
       var successCallBack = function(data) { 
       
                  $(".screenshot", data).each(function() {

                  $scope.test = {image: "http:"+$(this).attr("src")};  
                        //console.dir("This is slides:"+JSON.stringify($scope.slides));
                  $scope.slides.push($scope.test);

                   });

                    //console.dir("This is outer1:"+JSON.stringify($scope.slides));
        };

        var errorCallBack = function(reason) {
            console.log(reason);
        };


       
        $http({
            method: 'GET',
            url: "https://play.google.com/store/apps/details?id=com.skgames.trafficracer"})
        .success(successCallBack, errorCallBack);
        
      

        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };
    }])
    .animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    });

