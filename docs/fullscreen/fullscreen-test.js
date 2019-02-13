angular.module('fullscreen-test', ['fullscreen', 'fullscreen-names'])//
.controller('RootCtrl', ['fullscreen', '$scope', 'fullscreenNames', function(fullscreen, $scope, fullscreenNames){
  var self = this;
  $scope.fullscreen = fullscreen;
  $scope.fullscreenNames = fullscreenNames;
  fullscreen.$watch(function(active, manual){
    self.isFullscreen = active && !manual;
  });
}]);