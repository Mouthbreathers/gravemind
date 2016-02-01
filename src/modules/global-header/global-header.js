(function ($, _z, undefined) {
    "use strict";

    _z.createModule('global-header', globalHeaderCtrl);

    function globalHeaderCtrl($module) {
        var countryMenuIsOpen = false,
            $sideMenuButton = $module.find('.global-header_side-menu-button'),
            $countryMenuButton = $module.find('.global-header_country-button'),
            $countryMenu = $module.find('.global-header_country-wrap'),
            $countryMenuClose = $countryMenu.find('.global-header_country-menu-close');

        $sideMenuButton.click(publishSideMenuToggle);
        $countryMenuButton.click(toggleCountryMenu);
        $countryMenuClose.click(closeCountryMenu);

        _z.subscribe('globalHeader.countryMenu.open', openCountryMenu);
        _z.subscribe('globalHeader.countryMenu.close', closeCountryMenu);
        _z.subscribe('globalHeader.countryMenu.toggle', toggleCountryMenu);

        function publishSideMenuToggle(event){
            _z.publish('globalSideMenu.toggleState');
        }

        function toggleCountryMenu(event){
            if (countryMenuIsOpen) {
                closeCountryMenu();
            } else {
                openCountryMenu();
            }
        }

        function openCountryMenu(){
            _z.publish('stickyHeader.countryMenu.close');
            $countryMenu.addClass('global-header_country-wrap--open');
            countryMenuIsOpen = true;
        }

        function closeCountryMenu(){
            $countryMenu.removeClass('global-header_country-wrap--open');
            countryMenuIsOpen = false;
        }
    }
})(jQuery, window._z);
