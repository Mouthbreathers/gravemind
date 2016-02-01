(function ($, _z, undefined) {
    "use strict";

    _z.reinit = reinit;

    function reinit($module) {
        var moduleId = $module.data('module');

        if (typeof _z.modules[moduleId] != 'undefined') {
            _z.modules[moduleId].init($module);
        }
    }
})(jQuery, window._z);