/*
 * Images
 * 
 * Images Tab
 * trigger function -> google.isr.layoutInit();
 */

var Images = {};

(function(){
    var i = {},
        _imageItems = [],
        _searchData = [],
        _data = [],
        _errorImageSrc = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRUU4MkM2RjU1NDQxMUU5QUIxMjk0ODg0MjJBMzI4OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRUU4MkM3MDU1NDQxMUU5QUIxMjk0ODg0MjJBMzI4OSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZFRTgyQzZENTU0NDExRTlBQjEyOTQ4ODQyMkEzMjg5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZFRTgyQzZFNTU0NDExRTlBQjEyOTQ4ODQyMkEzMjg5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgBLAEsAwERAAIRAQMRAf/EAEsAAQEAAAAAAAAAAAAAAAAAAAAIAQEAAAAAAAAAAAAAAAAAAAAAEAEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCqQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z";


    _setImageElements = function () {
        var imagesItem = _imageListItems();            

        if (imagesItem.length > 0) {
            imagesItem.forEach(function(item, index) {
                
                var obj = {
                        el: item,
                        index: index,
                        siteUrl: ""
                    },
                    itemData = item.querySelector(".rg_meta");

                if (typeof itemData != null) {
                    var parseItemData = JSON.parse(itemData.innerHTML);
                    obj.siteUrl = parseItemData.ru;
                }

                _imageItems.push(obj);
                
            });

            _setImagesSearchedData();
        }
        
    };

    _setImagesSearchedData = function () {
        var data = _data;
            
        data.forEach(function(item, index) {
            var newObj = {};

            newObj = item;
            newObj.subTitle = Utility.domainFromUrl(item.siteUrl||item.imageUrl);
            newObj.orderId = index + 1;
            newObj.index = -1;

            _imageItems.forEach(function(itemImage) {
                if (Utility.domainWithoutProtocol(item.siteUrl) == Utility.domainWithoutProtocol(itemImage.siteUrl)) {
                    newObj.el = itemImage.el;
                    newObj.index = itemImage.index;
                    return;
                }
            });

            _searchData.push(newObj);
            
        });

        _changeImagesList();    
    };

    _changeImagesList = function() {
        
        var data = _searchData.sort(function(a, b) { Utility.compare(a, b, "orderId"); });

        if (data.length > 0) {
            data.forEach(function(item) {
                var imageListItems = _imageListItems();

                if (imageListItems.length > 0) {
                    childForChangedOrder = imageListItems[(item.orderId - 1)];

                    if (typeof childForChangedOrder != "undefined") {

                        if (typeof item.el != "undefined") {
                            var img = item.el.querySelectorAll("img");

                            if (img.length > 0) {
                                img = img[0];
                                var dataSrc = img.getAttribute("data-src");

                                if (dataSrc != null) {
                                    img.src = dataSrc;
                                }
                            }

                            item.el.parentNode.insertBefore(item.el, childForChangedOrder);
                            
                        } else {
                            if (item.width == 0 && item.height == 0) {
                                item.imageUrl = _errorImageSrc;
                                item.width = 300;
                                item.height = 300;
                            }

                            var imageType = item.imageUrl.match(/\.(gif|jpg|jpeg|tiff|png)/g),
                                imageTypeString = "jpg",
                                itemId = Utility.idGenerator();
                                            
                            if (imageType != null) {
                                imageTypeString = imageType[0].replace(".","");
                            } else {
                                isBase64 = item.imageUrl.match(/^data\:(?<type>image\/(png|tiff|jpg|gif|jpeg|bmp));base64,(?<data>[A-Z0-9\+\/\=])*$/i);
                                
                                if (isBase64 != null) {
                                    imageTypeString = isBase64[2].replace(".","");
                                }
                            }

                            var thumb = {
                                width: item.width,
                                height: item.height
                            };
                            
                            if (thumb.width > 300) {
                                thumb.width = 300;
                                thumb.height = (300 / item.width) * item.height;
                            }
                            
                    
                            var html = 
                                '<div jscontroller="Q7Rsec" data-ri="" class="rg_bx rg_di rg_el ivg-i" data-row="" style="display: inline-block;" data-ex-she="images">' +
                                    '<a jsname="hSRGPd" href="'+ (item.siteUrl||item.imageUrl) +'" class="rg_l" rel="noopener" style="background: rgb(255, 255, 255);" target="_blank">' +
                                        '<div class="THL2l"></div>' +
                                        '<img id="'+ itemId +'" src="'+ item.imageUrl +'" class="rg_ic rg_i" data-iml="" style="max-width:300px;" onError="this.onerror=null;this.src=\'' + _errorImageSrc + '\';" />' +
                                        '<div class="rg_ilmbg"> '+ item.width +'&nbsp;×&nbsp;'+ item.height +' </div>' +
                                    '</a>' +
                                    '<a class="iKjWAf irc-nic isr-rtc a-no-hover-decoration" href="'+ item.siteUrl +'" rel="noopener" target="_blank">' +
                                        '<div class="mVDMnf nJGrxf">'+ item.title +'</div>' +
                                        '<div class="nJGrxf FnqxG">'+ item.subTitle +'</div>' +
                                    '</a>' +
                                    '<div class="rg_meta notranslate">{"cb":6,"cl":9,"clt":"n","cr":21,"id":"'+ itemId +'","isu":"","itg":0,"ity":"'+ imageTypeString +'","oh":'+ item.height +',"ou":"'+ item.imageUrl +'","ow":'+ item.width +',"pt":"'+ item.title +'","rh":"chatsports.com","rid":"AUN_t3o3XQpYyM","rt":0,"ru":"'+ item.siteUrl +'","s":"","sc":1,"st":"Chat Sports","th":'+ thumb.height +',"tu":"'+ item.imageUrl +'","tw":'+ thumb.width +'}</div>' +
                                '</div>';

                            childForChangedOrder.insertAdjacentHTML("beforebegin", html);
                        }
                    }
                }
            });
                
            window.location = "javascript: google.isr.layoutInit();";
        }
        
    };

    _imageListItems = function() {
        return document.getElementById("search").querySelectorAll("#rg_s .rg_bx");
    }

    i.originalImages = function() {
        var items = Array.from(document.querySelectorAll('[data-ex-she="images"]')),
            data = _imageItems.sort(function(a, b) { Utility.compare(a, b, "index"); }).reverse();
        
        if (typeof items != "undefined" && items.length > 0) {
            items.forEach(function(item) {
                item.remove();
            });
        }

        if (data.length > 0) {
            data.forEach(function(item) {
                if (typeof item.el != "undefined") {
                    var updatedElements = _imageListItems();
                    
                    item.el.style = "";
                        
                    if (updatedElements.length > 0) {
                        var childForChangedOrder = updatedElements[item.index + 1];
                        if (typeof childForChangedOrder != "undefined") {
                            item.el.parentNode.insertBefore(item.el, updatedElements[item.index + 1]);
                        }
                    }
                }
            });
        }

        window.location = "javascript: google.isr.layoutInit();"
    };

    i.onImageError = function(e) {
        return e.src = _errorImageSrc;
    }

    i.init = function(data) {
        if (document.getElementById("search") == null) return false;
 
        _data = data;

        _imageItems = [];
        _searchData = [];

        _setImageElements();
    };

    Images = i;
})();

