function changeIcon(type, tabId) {
	var options = {
		path: icons[type]
	};

	if (typeof tabId != "undefined") {
		options.tabId = tabId
	}

	chrome.browserAction.setIcon(options);
}


function changePopup(type, tabId) {
	var options = {
		popup: (typeof type == "undefined" ? "" : "popup/"+ type +".html")
	};

	if (typeof tabId != "undefined") {
		options.tabId = tabId
	}

	chrome.browserAction.setPopup(options);
}

function callService(obj) {
    var fetchData = { 
            method: "GET", 
            mode: "cors",
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: "omit"
        },
        param = "";
    
    if (typeof obj.param != "undefined") {
        param = "/" + obj.param;
    }

    if (typeof obj.method != "undefined" && obj.method == "POST") {
        fetchData.method = "POST";
        fetchData.body = JSON.stringify({ data: obj.param });
        param = "";
    }


	fetch("https://pantenesheplugin-api.azure-api.net/" + obj.service + param, fetchData)
    .then(function(response) { return response.json(); })
    .then(function(response) {
        if (response.status) {
            obj.callBack(response);
        } else {
            obj.errorFnc(response);
        }
	}).catch(function(error) { obj.errorFnc(error); });
}

function changeIconToAllTabs(type) {
    chrome.windows.getAll({ populate: true }, function (windows) {
        tabIds = ([].concat.apply([], windows.map(w => w.tabs))).map(tb => tb.id);

        for (var i = 0; i < tabIds.length; i++) {
            chrome.browserAction.setIcon({ path:icons[type], tabId: tabIds[i] });
        }
    });
}

function sendStateToAllTabs(state) {
    chrome.windows.getAll({ populate: true }, function (windows) {
        tabs = ([].concat.apply([], windows.map(w => w.tabs)));

        if (tabs.length > 0) {
            for (var i = 0; i < tabs.length; i++) {
                if (!tabs[i].url.match(/https:\/\/www.google.(com|ca)\/search/g)) {
                    changeIcon("disable", tabs[i].id);
                    changePopup("disable", tabs[i].id);
                }
                chrome.tabs.sendMessage(tabs[i].id, { 'state': state });
            }
        }
    });
}
