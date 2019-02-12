angular.module('clip-test', [])//
.directive('clipTest',
    [function(){
      return {
        restrict: 'A',
        bindings: {
          value: '=clipTest'
        },
        link: function($scope, $elem, $attrs, controller){
          function deg2rad(angle){
            return angle * Math.PI / 180;
          }
          function constructClip(fraction){
            if(fraction === 0)
              return 'none';
            var angle = 360 * fraction, path;
            if(angle === 180)
              path = '50% 0%, 100% 0%, 100% 100%, 50% 100%';
            else if(angle > 0 && angle < 45){
              path = '50% 0%, ' + (50 + 50 * Math.tan(deg2rad(angle))) + '% 0%, 50% 50%';
            }else if(angle >= 45 && angle < 135){
              path = '50% 0%, 100% 0%, 100% ' + (50 - 50 * Math.tan(deg2rad(90 - angle))) + '%, 50% 50%';
            }else if(angle >= 135 && angle < 225){
              path = '50% 0%, 100% 0%, 100% 100%, ' + (50 - 50 * Math.tan(deg2rad(angle - 180))) + '% 100%, 50% 50%';
            }else if(angle >= 225 && angle < 315){
              path = '50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% ' + (50 + 50 * Math.tan(deg2rad(270 - angle)))
                  + '%, 50% 50%';
            }else if(angle >= 315 && angle < 360){
              path = '50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, ' + (50 - 50 * Math.tan(deg2rad(360 - angle)))
                  + '% 0%, 50% 50%';
            }else
              return 'unset';
            return 'polygon(' + path + ')';
          }

          $scope.$watch($attrs.clipTest, function(newValue){
            $elem.css('clip-path', constructClip(newValue / 100));
          });
        }
      }
    }])//
.controller('RootCtrl', ['$scope', function($scope){
  this.fraction = 25;
}]);