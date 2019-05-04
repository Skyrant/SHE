/*
 * List
 *
 * search content "#search > #rso"
 * search list section one ".bkWMgd > .g", multi ".bkWMgd > .srg > .g" 
 * image list section  ".bkWMgd > .g#imagebox_bigimages"
 * featured .g.mnr-c.g-blk
*/
var List = {};

(function() {
    var l = {},
        _data = [],
        _startQuery = Query.getStartQuery(),
        _pageCount = 10,
        _originalElements = {},
        _listItems = [];

    _setListItems = function() {
        
        var data = _data;

        data.forEach(function(item, index) {
            var obj = {};
            obj = item;
            obj.index = -1;
            obj.orderId = index + 1;

            _originalElements.elements.forEach(function(itemEl){
                
                if (Utility.domainWithoutProtocol(itemEl.siteUrl) == Utility.domainWithoutProtocol(item.siteUrl)) {
                    obj.el = itemEl.el;
                    obj.index = itemEl.index;
                    obj.parentChildCount = itemEl.parentChildCount;
                }
            });
            _listItems.push(obj);
        });
        
        _changeList();
    }

    _changeList = function() {
        
        _listItems.forEach(function(item) {
            if (item.orderId <= (_startQuery + _pageCount) && item.orderId > _startQuery) {

                _changeElements(item);

            }
        });
    };

    _changeElements = function(item) {
        var orderId = item.orderId,
            index = orderId - 1;
            updatedElements = _listElements();
           

        if (typeof updatedElements.elements != "undefined" && updatedElements.elements.length > 0) {
            var elementWithChanged = updatedElements.elements[index].el;

            if (typeof elementWithChanged != "undefined") {

                if (typeof item.el == "undefined") {
                    var elementPosition = "beforebegin",
                        originalLength = _originalElements.originalLength;

                    
                    var element = 
                            '<div class="g" data-ex-she="list">'+
                                '<div>' +
                                    '<div class="rc">' +
                                        '<div class="r">'+ 
                                            '<a href="'+ item.siteUrl +'"><h3 class="LC20lb">'+ item.metaTitle +'</h3><br><div class="TbwUpd"><cite class="iUh30" style="width:560px; overflow:hidden; display:block; text-overflow: ellipsis; white-space:nowrap;">'+ item.siteUrl +'</cite></div></a>'+
                                        '</div>' +
                                        '<div class="s">' +
                                            '<div><span class="st">'+ item.metaDescription +'</span></div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';

                    
                    if (typeof _originalElements.elements[index - 1] != "undefined") {
                        
                        var prevItem = updatedElements.elements[index - 1];
                        
                        if (typeof prevItem != "undefined") {
                            if (prevItem.parentChildCount == index) {
                                elementWithChanged = prevItem.el;
                                elementPosition = "afterend";
                            }
                        }
                    }
                        
                    elementWithChanged.insertAdjacentHTML(elementPosition, element);
                    
                } else {

                    elementWithChanged.parentNode.insertBefore(item.el, elementWithChanged);

                }
            }
        }
        
    };

    _listElements = function (init) {
        var data = {},
            search = document.getElementById("search"),
            listBlock = search.querySelectorAll("#rso > .bkWMgd");
      
        data.elements = [];
        if (init) 
            data.originalLength = 0;

        if (listBlock.length > 0) {
            listBlock.forEach(function(item) {
                var listChild = item.children;
                
                for (var i =  0; i < listChild.length; i++) {
                    if ((listChild[i].className == "g" && listChild[i].id == "" && listChild[i].className != "g-blk") || listChild[i].className == "srg") {
                        
                        var elLength, el = [];
                        if (listChild[i].className == "g" && listChild[i].id == "") {
                            var parentChildCount = listChild[i].parentNode.querySelectorAll(".g").length,
                                siteUrlItem = listChild[i].querySelector("div.rc > div.r"),
                                siteUrl = "";

                                if (siteUrlItem != null) {
                                    var siteUrlItemFirstChild = siteUrlItem.firstChild;
                                    if (siteUrlItemFirstChild != null) {
                                        siteUrl = siteUrlItemFirstChild.getAttribute("href");
                                    }
                                }

                            el.push({
                                el:listChild[i],
                                siteUrl: siteUrl,
                                parentChildCount: parentChildCount,
                                index: i - 1
                            });
                            
                            elLength = parentChildCount;
                        } else if (listChild[i].className == "srg") {
                            var elQuery = listChild[i].querySelectorAll(".g");
                            if (elQuery.length > 0) {
                                elQuery.forEach(function(itemEl, indexEl){
                                    var siteUrlItem = itemEl.querySelector("div.rc > div.r"),
                                        siteUrl = "";

                                    if (siteUrlItem != null) {
                                        var siteUrlItemFirstChild = siteUrlItem.firstChild;
                                        if (siteUrlItemFirstChild != null) {
                                            siteUrl = siteUrlItemFirstChild.getAttribute("href");
                                        }
                                    }
                                    el.push({
                                        el: itemEl,
                                        siteUrl: siteUrl,
                                        parentChildCount: elQuery.length,
                                        index: indexEl
                                    });
                                });
                            }
                            elLength = el.length;
                        }

                        if (init) {
                            data.originalLength += elLength;
                        }
                        
                        data.elements = data.elements.concat(el);
                    }
                }
            });
        }
        
        if (init) {
            _originalElements.elements = data.elements;
            _originalElements.originalLength = data.originalLength;
            
        }
        
        return data;
    }

    l.originalList = function() {
        var items = Array.from(document.querySelectorAll('[data-ex-she="list"]')),
            data = _listItems.sort(function(a, b) { Utility.compare(a, b, "index"); }).reverse();
        
        if (typeof items != "undefined" && items.length > 0) {
            items.forEach(function(item) {
                item.remove();
            });
        }

        if (data.length > 0) {
            data.forEach(function(item) {
                if (typeof item.el != "undefined") {
                    var updatedElements = _listElements(),
                        parent = item.el.parentNode,
                        changedItem;
                    
                    if (typeof updatedElements.elements != "undefined" && updatedElements.elements.length > 0) {
                        updatedElements.elements.forEach(function(itemEl) {
                            
                            if (itemEl.el.parentElement == item.el.parentElement && itemEl.index == (item.index + 1)) {
                                changedItem = itemEl.el;
                                return;
                            }
                        });
                    }
                    item.el.style = "";
                    if (typeof changedItem != "undefined") {
                        parent.insertBefore(item.el, changedItem);
                    }
                }
            });
        }

    }

    l.init = function (data) {

        if (document.getElementById("search") == null) return false;

        _data = data;

        _listItems = [];

        _listElements(true);
        _setListItems();
    }

    List = l;

})();