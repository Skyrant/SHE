var Tab = {};

(function() {
    var t = {},
        _q = Query,
        _content = document.getElementById("hdtb-msb-vis");

    t.hideItems = function() {
        _hideItems();
    }

    t.showItems = function() {
        _showItems();
    }

    function _hideItems() {
        var tabItems = _content.querySelectorAll("div");

        if (tabItems.length > 0) {
            tabItems.forEach(function(item) {
                var a = item.querySelector("a");

                if (a != null) {
                    var url = a.href,
                        queryVars = _q.getUrlVars(url);

                    if (typeof queryVars['tbm'] != "undefined" && queryVars['tbm'] != "isch") {
                        item.style.display = "none";
                    }
                    
                }
            });
        }

        _content.nextElementSibling.style.display = "none";

    }

    function _showItems() {
        var tabItems = _content.querySelectorAll("div");

        if (tabItems.length > 0) {
            tabItems.forEach(function(item) {
                item.removeAttribute("style");
            });
        }

        _content.nextElementSibling.removeAttribute("style");
    }

    Tab = t;
    
})();