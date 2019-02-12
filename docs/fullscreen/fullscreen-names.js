angular.module('fullscreen-names', [])
  .factory('fullscreenNames', fullscreenNamesFactory);

fullscreenNamesFactory.$inject = ['$document'];
function fullscreenNamesFactory($document){
  var allNames = [[
    'requestFullscreen',
    'exitFullscreen',
    'fullscreenElement',
    'fullscreenEnabled',
    'fullscreen',
    'fullscreenchange',
    'fullscreenerror'
  ], [
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitFullscreenElement',
    'webkitFullscreenEnabled',
    'webkitIsFullScreen',
    'webkitfullscreenchange',
    'webkitfullscreenerror'
  ], [
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozFullScreenElement',
    'mozFullScreenEnabled',
    'mozFullScreen',
    'mozfullscreenchange',
    'mozfullscreenerror'
  ], [
    'msRequestFullscreen',
    'msExitFullscreen',
    'msFullscreenElement',
    'msFullscreenEnabled',
    '',
    'MSFullscreenChange',
    'MSFullscreenError'
  ]];

  var match = allNames.find(function(list){
    return list[1] in $document[0];
  });
  match = match || allNames[0];
  return match.reduce(function(names, propName, i){
    return names[allNames[0][i]] = propName, names;
  }, {});
}