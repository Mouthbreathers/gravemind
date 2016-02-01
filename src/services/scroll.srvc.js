(function ($, _z, undefined) {
    "use strict";

    _z.onScrollDirChange = onScrollDirChange;
    _z.onScrollTop = onScrollTop;

    var lastScrollPos = window.pageYOffset,
        lastDir = false;

    $(window).scroll(_.debounce(onUserScroll, 100));

    function onUserScroll(){
        var newScrollPos = window.pageYOffset;

        if (newScrollPos < lastScrollPos) {
            if (lastDir != 1) {
                _z.publish('scrollService.dirChange.up');
            }
            lastDir = 1;
        } else {
            if (lastDir != 2) {
                _z.publish('scrollService.dirChange.down');
            }
            lastDir = 2;
        }

        if (newScrollPos == 0) {
            _z.publish('scrollService.scrollTop');
        }

        lastScrollPos = newScrollPos;
    }

    function onScrollDirChange(dir, cb) {
        if (dir == 'up') {
            _z.subscribe('scrollService.dirChange.up', cb);
        } else if (dir == 'down') {
            _z.subscribe('scrollService.dirChange.down', cb);
        }
    }

    function onScrollTop(cb) {
        _z.subscribe('scrollService.scrollTop', cb);
    }

})(jQuery, window._z);