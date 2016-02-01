/**
 * init.js
 * Initializes a namespace (_z) for ProjectZ related utilities, as well as a namespace on jQuery for
 * _z related plugins.
 */

;(function ($, window, undefined) {

    var $body = $('body');

    if (!$._z) {
        $._z = {};
    }

    if (!window._z) {
        window._z = {
            modules: {}
        };
    }

    // check if IE11 and add class

    if (!(window.ActiveXObject) && "ActiveXObject" in window) {
        $body.addClass('ie11');
    }

    // check if iOS and add class
    if  ( /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ) {
        $body.addClass('ios');
    }

    if (/IEMobile/.test(navigator.userAgent)) {
        $body.addClass('iemobile');
    }

    if (/Android/.test(navigator.userAgent)) {
        $body.addClass('android');
    }

    $(document).on("_zModuleInit", bootstrapModule);

    function bootstrapModule(event, Module){
        window.$body = $body;
        Module.initialize();
        window._z.modules[Module.id] = Module;
    }
})(jQuery, window);
