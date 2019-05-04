/*
 * Extabar 
 *
 * "Popular on the web bar"
*/
var Extabar = {};

(function(){
    var e = {},
        _data = [],
        _searchData = [],
        _extabarItems = [],
        _extabar = document.getElementById("extabar"),
        _extabarChild = [];

   
    _extabarControl = function() {
        if (_extabar.querySelector(".qe1Dgc") != null) {
            return true;
        }
        return false;
    };

    _setExtabarItems = function() {
        if (_extabarChild.length > 0) {
            _extabarChild.forEach(function(itemChild, indexChild){
                var element = itemChild.querySelectorAll("div.lzmqLb > div.wfg6Pb"),
                    title = "",
                    obj = {};

                if (element.length > 0) {
                    element.forEach(function(itemEl, indexEl) {
                        title += (indexEl > 0 ? " " : "") + itemEl.innerText;
                    });
                }

                obj.title = title;
                obj.index = indexChild;
                obj.element = itemChild;
                
                _extabarItems.push(obj);
            });

            _setExtabarSearchedData();
        }
    };

    _setExtabarSearchedData = function () {
        var data = _data;
            
        data.forEach(function(item, index) {
            var newObj = {};

            newObj.title = item.title;
            newObj.subTitle = item.subTitle;
            newObj.imageUrl = item.imageUrl;
            newObj.orderId = index + 1;
            newObj.index = -1;

            _extabarItems.forEach(function(itemExtabar) {
                if (item.title.toLowerCase() == itemExtabar.title.toLowerCase()) {
                    newObj.element = itemExtabar.element;
                    newObj.index = itemExtabar.index;
                    return;
                }
            });

            _searchData.push(newObj);
            
        });

        _changeExtabarList();    
    };

    _changeExtabarList = function() {
        
        var data = _searchData.sort(function(a, b) { Utility.compare(a, b, "orderId"); }),
            i = 1;

        data.forEach(function(item) {
            var extabarChilds = _extabarChilds();

            if (extabarChilds.length > 0) {
                var childForChangedOrder = extabarChilds[(i - 1)];

                if (typeof childForChangedOrder != "undefined") {
                    if (typeof item.element != "undefined") {
                        var img = item.element.querySelectorAll("img");

                        if (img.length > 0) {
                            img = img[0];
                            var dataSrc = img.getAttribute("data-src");

                            if (dataSrc != null) {
                                img.src = dataSrc;
                            }
                        }

                        item.element.parentNode.insertBefore(item.element, childForChangedOrder);

                        i++;
                    }
                }
            }
        });
        
    }

    _extabarChilds = function() {
        return document.getElementById("extabar").querySelectorAll("div.uais2d");
    }

    e.originalExtabarList = function () {
        if (!_extabarControl()) return false;
        
        var exSheExtabarItem = document.getElementById("extabar").querySelectorAll('[data-ex-she="extabar"]'),
            data = _searchData.sort(function(a, b) { Utility.compare(a, b, "index"); }).reverse();

        if (exSheExtabarItem.length > 0) {
            exSheExtabarItem.forEach(function(item){
                item.remove();
            });
        }

        if (data.length > 0) {
            data.forEach(function(item) {
                if (typeof item.element != "undefined") {
                    var extabarChilds = _extabarChilds();

                    item.element.style = "";

                    if (extabarChilds.length > 0) {
                        var childForChangedOrder = extabarChilds[item.index + 1];
                        
                        if (typeof childForChangedOrder != "undefined") {
                            item.element.parentNode.insertBefore(item.element, extabarChilds[item.index + 1]);
                        }
                    }
                }
            });
        }

    }

    e.init = function(data) {
        if (!_extabarControl()) return false;

        _extabarChild = _extabar.querySelectorAll("div.uais2d");

        _searchData = [];
        _extabarItems = [];

        _data = data;

        _setExtabarItems();
    };

    Extabar = e;
})();