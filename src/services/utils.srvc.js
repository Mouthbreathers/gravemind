(function ($, _z, undefined) {
    "use strict";

    _z.utils = utils();

    function utils() {

        return {
            isIE11: (!(window.ActiveXObject) && "ActiveXObject" in window ) ? true : false,
            isIOS: (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream),
            isEdge: (/Edge/.test(navigator.userAgent)),
            isIEMobile: /IEMobile/.test(navigator.userAgent),
            isAndroid: /Android/.test(navigator.userAgent)
        };
    }
})(jQuery, window._z);