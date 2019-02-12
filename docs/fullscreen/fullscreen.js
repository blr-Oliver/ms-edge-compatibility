angular.module('fullscreen', ['fullscreen-names']).factory('fullscreen', fullscreenFactory);

fullscreenFactory.$inject = ['fullscreenNames', '$window', '$document', '$rootScope'];
function fullscreenFactory(names, $window, $document, $rootScope){
  var fullscreen;
  if(!$document[0][names.fullscreenEnabled]){ // not available or disabled :C
    fullscreen = {
      request: angular.noop,
      exit: angular.noop,
      toggle: angular.noop,
      $watch: angular.noop,
    };

    Object.defineProperties(fullscreen, {
      enabled: {
        value: false
      },
      element: {
        value: null
      },
      active: {
        value: false
      },
      manual: {
        value: true  //follows default behavior
      }
    });
    return fullscreen;
  }

  fullscreen = {
    request: function(element){
      if(!this.active)
        (element || $document[0].body)[names.requestFullscreen]();
    },
    exit: function(){
      if(this.active && !this.manual)
        $document[0][names.exitFullscreen]();
    },
    toggle: function(element){
      this.active ? this.exit() : this.request(element);
    },
    $watch: function(cb, $scope){
      $scope = $scope || $rootScope;
      var notify = function(){ cb(fullscreen.active, fullscreen.manual, $scope); }
      var listener = function(){ $scope.$apply(notify); }
      
      angular.element($window).on(names.fullscreenchange, listener);
      var unbind = function(){
        angular.element($window).off(names.fullscreenchange, listener);
      };
      $scope.$on('$destroy', unbind);
      $scope.$applyAsync(notify);
      return unbind;
    }
  };

  Object.defineProperties(fullscreen, {
    enabled: {
      value: true
    },
    element: {
      get: function(){
        return $document[0][names.fullscreenElement];
      }
    },
    active: {
      get: function(){
        if('fullScreen' in $window)
          return $window.fullScreen; // Firefox nicely provides this flag
        if(names.fullscreen && $document[0][names.fullscreen] || this.element != null)
          return true; //there is explicit element in fullscreen mode
        // okay, now try hard to guess  
        return ($window.innerWidth === $window.screen.width /*width is good*/ &&
          ($window.innerHeight === $window.screen.height || /*height is good*/
           $window.outerHeight > $window.screen.availHeight /*or even better*/));
      }
    },
    //This property indicates whether fullscreen was enabled manually by user
    //pressing F11 hotkey or using explicit command from browser menu.
    //Meaningful only when in fullscreen mode, otherwise always true.
    manual: {
      get: function(){
        return !$document[0][names.fullscreenElement];
      }
    }
  });

  var active = fullscreen.active;
  angular.element($window).on('resize', function(){
    if(active !== fullscreen.active)
      angular.element(fullscreen.element || $window).triggerHandler(names.fullscreenchange);
  }).on(names.fullscreenchange, function(){
    active = fullscreen.active;
  });

  return fullscreen;
}