/*
Menu
*/
var Menu = {};

(function() {
    var m = {},
        _exMenu;
        _exMenuHeader = 
            '<div class="ex-she-header">' +
                '<span>S.H.E.</span>' +
                '<button type="button" id="ex-she-menu-close-btn"></button>' +
            '</div>';
        _exMenuController = 
            '<div class="ex-she-controller">'+
                '<span>Modify Search Results</span>' +
                '<button type="button" id="ex-she-status-btn"></button>' +
            '</div>';

    _exMenuBottom = function(type, categories) {
        var bottomContent = "",
        bottomText = "S.H.E. is providing more equalized results in the “All” and “Images” tabs of this search.";

        if (typeof categories != "undefined" && categories.indexOf("Can't be equalized") != -1) {
            bottomText = "S.H.E. is unable to equalize this search result.";
        }
        
        switch (type) {
            case "optimized":
                bottomContent = '<p>' + bottomText +'</p>';
                break;
            case "flag":
                bottomContent = 
                    '<p>This search term hasn’t been equalized yet.<br /> Flag it below to transform its future.</p>' +
                    '<p class="ex-she-mt"><button type="button" id="ex-she-flag-btn">Flag this Search</button></p>';
                break;
            default:
                bottomContent = "";
                break;
        }


        return '<div class="ex-she-bottom"><div>'+ bottomContent +'</div></div>';
    };

    _exMenuControl = function() {
        return document.getElementById("ex-she-menu");        
    };

    _statusOnClick = function(e) {
        e.preventDefault();
        var isDisabled = _exMenu.className.match(/ex-she-disabled/g);

        if (typeof chrome.app.isInstalled !== "undefined") {
            chrome.extension.sendMessage({ state: (isDisabled ? "start" : "stop") });
        }
    };

    _flagOnClick = function(e) {
        e.preventDefault();
        e.target.disabled = true;
        if (typeof chrome.app.isInstalled !== "undefined") {
            chrome.extension.sendMessage({ state: "saveFlag", query: Query.getSearchQuery() });
        }
    };

    m.visibility = function(running) {
        if (!running) m.set("disabled");

        _exMenu.classList.toggle("ex-she-show");
    }

    m.flagged = function() {
        document.getElementById("ex-she-flag-btn").innerHTML = "Flagged this Search";
    }
 
    m.set = function(type, categories) {
        var exMenuControl = _exMenuControl(),
            exMenuHTML = "";
        if (exMenuControl == null) {
            _exMenu = document.createElement('div');
            _exMenu.id = "ex-she-menu";
            exMenuHTML = _exMenuHeader + _exMenuController + (type != "error" ? _exMenuBottom(type, categories) : "");
        } else {
            _exMenu = exMenuControl;
        }
        
        _exMenu.classList[(type == "disabled" ? "add":"remove")]("ex-she-disabled");
        _exMenu.classList[(type == "flag" ? "add":"remove")]("ex-she-flag");
        
        if (exMenuControl == null) {
            _exMenu.innerHTML = exMenuHTML;
            document.getElementsByTagName('body')[0].appendChild(_exMenu);
            document.getElementById("ex-she-menu-close-btn").addEventListener("click", function() { m.visibility(true) });
            document.getElementById("ex-she-status-btn").addEventListener("click", _statusOnClick);
        } else {
            _exMenu.querySelector('.ex-she-bottom').outerHTML = _exMenuBottom(type, categories);
        }

        if (type == "flag") {
            document.getElementById("ex-she-flag-btn").addEventListener("click", _flagOnClick);
        }
    };

    m.remove = function() {
        var exMenuControl = _exMenuControl();

        if (exMenuControl != null) {
            _exMenu.remove();
        }
    };

    Menu = m;

})();
