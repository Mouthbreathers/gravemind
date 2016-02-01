(function ($, _z, undefined) {
    "use strict";

    _z.createModule = createModule;

    function createModule(id, ctrlFn) {
        var Module = function () {
        };

        Module = _.extend(Module.prototype, {
            id: id,

            initialize: function () {
                Module.EnelModule();
                Module.init();
            },

            EnelModule: function () {
                Module._zModuleCtrl = ctrlFn;

                Module.init = function($module){
                    var $thisModule;
                    if (typeof $module == 'undefined' || !$module) {
                        $thisModule = $('[data-module=' + Module.id + ']');
                    } else {
                        $thisModule = $module;
                    }

                    if ($thisModule.length > 0) {
                        $thisModule.each(function() {
                             Module._zModuleCtrl($(this));
                             $(this).addClass('module--initialized');
                        });
                    }
                };
            }
        });

        $(document).trigger('_zModuleInit', Module);
    }
})(jQuery, window._z);