/**
 * @author: Piotr Kabaciński
 * @version: 0.1.3
 * licence: MIT
 * https://github.com/piotrkabacinski/gatesJs
 *
 */

/**
 * Module declaration pattern inspired by Numeral.js library.
 * https://github.com/adamwdraper/Numeral-js/blob/master/src/numeral.js
 *
 */
(function(global, factory) {

    if (typeof define === 'function' && define.amd) {

        define(factory);

    } else if (typeof module === 'object' && module.exports) {

        module.exports = factory();

    } else {

        global.gatesJs = factory();

    }
    
}(this, function() {

    var gates = {

        /**
         * Set to true for preventing initiating default callback when
         * any others were launched
         *
         * @type {Boolean}
         */
        resolved: false,

        /**
         * Response's status code
         * @type {number}
         */
        responseCode: undefined,

        /**
         * Setter for response code
         *
         * @param  {[number]} responseCode
         */
        set: function(responseCode) {

            if (typeof responseCode == "number") {

                this.responseCode = responseCode;

                return this;

            }

            console.error("No response code was set for gates");

        },

        /**
         * Gate entry
         *
         * @param  {[array]}   settings array with status code and expression
         * @param  {Function} callback
         */
        gate: function(settings, callback) {

            if (
                (settings[0] === this.responseCode || settings[0] === "*") &&
                (settings[1] || settings[1] === "*") &&
                !this.resolved
            ) {

                callback();

                this.resolved = true;

            }

            return this;

        },

        /**
         * Defult callback when none of gates where launched
         *
         * @param  {Function} callback
         */
        default: function(callback) {

            if (!this.resolved) {
                callback();
            }

            return this;

        }

    };

    return gates;

}));
