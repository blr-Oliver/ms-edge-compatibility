angular.module('fullscreen-test', ['fullscreen'])//
.controller('RootCtrl', ['fullscreen', '$scope', function(fullscreen, $scope){
  var self = this;
  $scope.fullscreen = fullscreen;
  fullscreen.$watch(function(active, manual){
    self.isFullscreen = active && !manual;
  });
}]);