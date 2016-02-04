(function ($, _z, undefined) {
    "use strict";

    var $clock = _z.createModule('clock', clock);

    function clock($module) {
      var $clock = $module;

      init();

      function init(){
        $clock.min = $clock.find('.min');
        $clock.sec = $clock.find('.sec');
        $clock.startBtn = $clock.find('.clock_start');
        $clock.stopBtn = $clock.find('.clock_stop');
        $clock.time = 0;
        $clock.currentInt = false;

        $clock.startBtn.click($clock.start);
        $clock.stopBtn.click($clock.stop);
      }

      $clock.start = function(){
        this.currentInt = setInterval(1000, $clock.update);
        return theInterval;
      }

      $clock.clear = function(intervalId)

      $clock.update = function(){

        $clock.min.html(
          formatMinute($clock.time)
        );

        $clock.sec.html(
          formatSecond($clock.time)
        );

        $clock.time++;
      };

      function formatMinute(sec) {
        if (sec < 10) {
          return "0" + Math.floor(sec / 60);
        } else {
          return Math.floor(sec / 60);
        }
      }

      function formatSecond(sec) {
        if (sec < 10) {
          return "0" + sec % 60;
        } else {
          return sec % 60;
        }
      }

      return $clock;
    }
})(jQuery, window._z);
