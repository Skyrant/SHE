/*
 * Image Box 
 */

var ImageBox = {};

(function(){
    var i = {},
        _data =  [],
        _imageBox = document.getElementById("imagebox_bigimages"),
        _imageBoxChild = [],
        _imageBoxChildLegth = 0,
        _imageBoxItems = [],
        _searchData = [];

    _control = function() {
        if (_imageBox != null) {
            return true;
        }
        
        return false;
    };

    _setImageItems = function() {
        if (_imageBoxChild.length > 0) {
            _imageBoxChild.forEach(function(item, index) {
                
                var itemImg = item.querySelector("img"),
                    itemSiteUrl = "";
                if (itemImg != null) {
                    itemSiteUrl = itemImg.getAttribute("title");
                }
                var obj = {
                    el: item,
                    html: item.outerHTML,
                    siteUrl: itemSiteUrl,
                    index: index
                };

                _imageBoxItems.push(obj);
            });

            _setImageBoxSearchedData();
        }
    };

    _setImageBoxSearchedData = function (){
        var data = _data;
            
        data.forEach(function(item, index) {
            var newObj = {};

            newObj = item;
            newObj.orderId = index + 1;
            newObj.index = -1;

            _imageBoxItems.forEach(function(itemImage) {
                if (Utility.domainWithoutProtocol(item.siteUrl) == Utility.domainWithoutProtocol(itemImage.siteUrl)) {
                    newObj.element = itemImage.el;
                    newObj.index = itemImage.index;
                    return;
                }
            });

            _searchData.push(newObj);
        });

        _changeImageBox();
    };

    _changeImageBox = function() {
        var data = _searchData.sort(function(a, b) { Utility.compare(a, b, "orderId"); }),
            index = 0;
        
        data.forEach(function(item) {
            
            if (index + 1 > _imageBoxChildLegth) return;

            if (item.orderId - 1 == item.index) { 
                index++;
                return; 
            }
            
            var imageBoxChilds = _imageBoxChilds();

            if (imageBoxChilds.length > 0) {
                var childForChangedOrder = imageBoxChilds[(item.index < item.orderId - 1 ? item.orderId : item.orderId - 1)];

                if (typeof childForChangedOrder != "undefined") {
                    if (typeof item.element != "undefined") {

                        if (item.orderId == _imageBoxChildLegth) childForChangedOrder = childForChangedOrder.nextSibling;
                        if (childForChangedOrder != null) {
                            item.element.parentNode.insertBefore(item.element, childForChangedOrder);
                            index++;
                        }
                    } 
                }
            }
        });
        
        data.forEach(function(item) {
            
            if (index + 1 > _imageBoxChildLegth) return;
            
            var imageBoxChilds = _imageBoxChilds();

            if (imageBoxChilds.length > 0) {
                var childForChangedOrder = imageBoxChilds[(item.orderId - 1)];

                if (typeof childForChangedOrder != "undefined") {
                    if (typeof item.element == "undefined") {
                        
                        var img = childForChangedOrder.querySelector("img");

                        if (img != null) {
                            img.removeAttribute("width");
                            img.removeAttribute("height");
                            img.removeAttribute("style");
                            img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
                            setTimeout(function() { img.src = item.imageUrl;}, 100);
                            img.style.position = "absolute";
                            img.style.width = "100%";
                            img.style.height = "100%";
                            img.style.objectFit = "cover";
                            img.style.objectPosition = "50% 0";
                            img.title = item.siteUrl;
                        }

                        childForChangedOrder.style.backgroundColor = "#dfe1e5";

                        if (childForChangedOrder.querySelector("a") != null) {
                            childForChangedOrder.querySelector("a").href = item.siteUrl;
                        }

                        index++;
                    } 
                }
            }
        });
        
    };

    _imageBoxChilds = function() {
        return Array.from(document.getElementById("imagebox_bigimages").querySelectorAll("div.vsqVBf"));
    };

    i.originalImageBox = function() {
        if (!_control()) return;

        
        var imageBoxChilds = _imageBoxChilds();

        if (imageBoxChilds.length > 0) {
            imageBoxChilds.forEach(function(item, index){
                item.style = "";

                var changedItem = _imageBoxItems[index]; 

                if (typeof changedItem != "undefined") {
                    item.outerHTML = changedItem.html;
                }
            });
        }
    };

    i.init = function(data) {
        if (!_control()) return;

        _imageBoxChild = Array.from(_imageBox.querySelectorAll(".vsqVBf")).map(function(i) { return i; });
        _imageBoxChildLegth = _imageBoxChild.length;

        _searchData = [];
        _extabarItems = [];

        _data = data;

        _setImageItems();

    };

    ImageBox = i;
})();