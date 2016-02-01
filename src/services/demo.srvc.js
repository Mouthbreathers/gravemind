/**
 * Custom services are used to provide functionality that is reusable
 * across modules and to help them communicate.  This allows our code
 * to be decoupled and modules to be independant of other modules.
 *
 * This service is a pubSub service which allows one module or component
 * to subscribe to a certain event and other modules or components to
 * publish data to it.
 */

(function ($, _z, undefined) {
    "use strict";

    // Service are executed functions that return an object.  The returned object can use
    // variables local to the service function that creates it, which gives us a closure that
    // can be used across modules.
    _z.demo = demo();

    // you can also just execute the function if the function itself sets properties or methods
    // on the _z global.  See pubsub for an example.

    function demo() {
        var num = 0,
            thisService = {
                current: getCurrentNum,
                increment: incrementNum
            };

        return thisService;

        function getCurrentNum() {
            return num;
        }

        function incrementNum() {
            num++;
            return num;
        }
    }
})(jQuery, window._z);