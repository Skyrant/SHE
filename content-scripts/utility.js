
/*
 * Utility
*/
var Utility = {};

(function() {
    var u = {};

    u.compare = function (a, b, key) {
        if (a[key] < b[key])
          return -1;
        if (a[key] > b[key])
          return 1;
        return 0;
    };

    u.domainFromUrl = function (url) {
        var result, match;
        
        if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
            result = match[1];
            if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
                result = match[1];
            }
        }
        
        return result;
    }; 

    u.domainWithoutProtocol = function(url) {
        return url.replace(/^(https?:|)\/\//, '').toLowerCase();
    }

    u.idGenerator = function() {
        return Math.random().toString(36).substr(2, 14) + ":";
    };

    Utility = u;
})();