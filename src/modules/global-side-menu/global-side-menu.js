(function ($, _z, undefined) {
    "use strict";

    _z.createModule('global-side-menu', globalSideMenuCtrl);

    function globalSideMenuCtrl($module) {
        var $closeButton = $module.find('.menu-config__menu-close');

        //accordeon logics
        $module.find('.expandable > a').on('click',function() {
            if ($(this).find('+ ul').hasClass('open')){
                $(this).find('+ ul').toggleClass('open');
                $(this).toggleClass('open');
            } else {
                $module.find('.expandable > a').removeClass('open');
                $module.find('.expandable > ul').removeClass('open');
                $(this).find('+ ul').addClass('open');
                $(this).addClass('open');
            }
        });

        _z.subscribe('globalSideMenu.toggleState', toggleOpenClassOnBody);

        $body.find('.el-content').click(handleBodyClick);
        $closeButton.click(handleCloseButtonClick);

        function handleBodyClick(event){
            if ($body.hasClass('open')){
                _z.publish('globalSideMenu.toggleState');
            }
        }

        function handleCloseButtonClick(event){
            _z.publish('globalSideMenu.toggleState');
        }

        function toggleOpenClassOnBody(){
            $body.toggleClass('open');
        }
    }
})(jQuery, window._z);
