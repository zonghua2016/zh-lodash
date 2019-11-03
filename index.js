(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define('zh-lodash', [], factory);
    }else{
        root['zh-lodash'] = factory();
    }
})(this ? this : window, function(){
    'use strict';
    function dateNow() {
        return new Date();
    }
    function log(val) {
        console.log(`${dateNow()}: ${val}`);
    }
    return {
        log,
        dateNow
    }
})