//= require Dizmo

Class("MVCExample.Main", {
    has: {
        // This will be your wrapper around the dizmo API. It is instantiated
        // before the initialize function (defined below) is called and can
        // therefor already be used there.
        dizmo: {
            is: 'ro',
            init: function() {
                return new MVCExample.Dizmo();
            }
        }
    },

    after: {
        initialize: function() {
            var self = this;

            self.initEvents();
        }
    },

    methods: {
        onSliderValueChanged: function(val) {
            var self = this;
            // console.log("on slider value change " + val);
            MVCExample.Dizmo.save('value', val);
        },

        changeValue: function(val) {
            var self = this;
            jQuery('.inputfield').val(val);
            DizmoElements('.my-slider-div').dslider('value', val);

        },

        restore: function() {
            var self = this;
            var value = MVCExample.Dizmo.load('value');

            if (jQuery.type(value) !== 'number') {
                DizmoElements('.my-slider-div').dslider('value', 50);
            } else {
                self.changeValue(value);
                DizmoElements('.my-slider-div').dslider('value', value);
            }

        },

        initEvents: function() {
            var self = this;

            // DizmoElements
            DizmoElements('.my-slider-div').dslider({
                max: 100,
                min: 0,
                step: 1,
                onSliderMoved: function(val) {
                    // console.log("move " + val);
                    self.onSliderValueChanged(val);
                }
            });

            DizmoElements('.my-slider-div').dslider('update');

            // subscriptions
            MVCExample.Dizmo.subscribe('value', function(value) {
                self.changeValue(value);
            });

            jQuery('.inputfield').keypress(function(e) {
                if (e.which == 13) {
                    var value = parseInt(jQuery('.inputfield').val());
                    if (value <= 100 && value >= 0) {
                         MVCExample.Dizmo.save('value', value);
                    } else {
                        self.restore();
                    }
                }
            });

            self.restore();

            jQuery('.done-btn').on('click', function() {
                MVCExample.Dizmo.showFront();
            });
        }
    }
});