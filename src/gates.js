var module = module || {};

(function(module) {

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
             * @type {[number]}
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

                return;

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
                    (settings[1] || settings[1] === "*")
                ) {

                    callback();

                    this.resolved = true;

                }

                return this;

            },

            /**
             * Defult callback when non of gates where launched
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

    module.exports = gates;

})(module);
