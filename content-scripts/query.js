/*
 * Query 
 */
var Query = {},
    _optimize = false;

(function(){
    var q = {},
        _startQuery = 0,
        _searchQuery = "",
        _queryVars = [];

    _queryControl = function () {
        _queryVars = _getUrlVars();
        
        _optimize = false;
        if (typeof _queryVars['q'] != "undefined" && _queryVars['q'] != "") {
            _searchQuery = _queryVars['q'].toLowerCase().replace(/\+/g," ");

            if (typeof _queryVars['start'] != "undefined" && _queryVars['start'] != "") {
                _startQuery = Number(_queryVars['start']);
            }

            return true;
        }

        return false;
    };

    _queryDataSearch = function () {
        var data = storage.query;
        
        data.forEach(function(item) { 
            if (_searchQuery == item.keyword.toLocaleLowerCase()) {
                if (item.isSafeSearch) {
                    if (typeof _queryVars != "undefined" && typeof _queryVars['safe'] == "undefined") {
                        chrome.extension.sendMessage({ state: "safeMode" });
                        return;
                    } else {
                        Tab.hideItems();
                    }
                } 
                _optimize = true;
                chrome.extension.sendMessage({ state: "search", query: _searchQuery });
                return;
            }
        });

        if (!_optimize) {
            Menu.set("flag");    
            chrome.extension.sendMessage({ state: "flag" });
        }
        
    };

    _getUrlVars = function (url) {
        var vars = [], hash,
            url = url || window.location.href;
        var hashes = url.slice(url.indexOf('?') + 1).split('&');
    
        
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            if (hash[0] != "") {
                vars[hash[0]] = hash[1];
            }
        }
        
        return vars;
    };

    q.getStartQuery = function() {
        _queryControl();
        return _startQuery;
    }

    q.getSearchQuery = function() {
        return _searchQuery;
    }

    q.getQueryVars = function() {
        return _queryVars;
    }

    q.getUrlVars = function(url) {
        return _getUrlVars(url);
    }

    q.queryOptimize = function() {
        return _optimize;
    }

    q.imageSearchPage = function() {
        
        if (typeof _queryVars['tbm'] != "undefined" && _queryVars['tbm'] == "isch") {
            return true;
        }

        return false;
    }

    q.listSearchPage = function() {
        
        if (typeof _queryVars['tbm'] == "undefined") {
            return true;
        }

        return false;
    }

    q.init = function () {

        if (!_queryControl()) return;

        _queryDataSearch();
    }

    Query = q;

})();
