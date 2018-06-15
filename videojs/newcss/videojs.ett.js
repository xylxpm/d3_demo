;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('videojs-hotkeys', ['video.js'], function (module) {
            return factory(module.default || module);
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('video.js'));
    } else {
        factory(videojs);
    }
}(this, function (videojs) {
    "use strict";
    if (typeof window !== 'undefined') {
        window['videojs_hotkeys'] = { version: "0.2.21" };
    }

    var hotkeys = function(options) {


        return this;
    };

    var registerPlugin = videojs.registerPlugin || videojs.plugin;

    registerPlugin('hotkeys', hotkeys);
}));