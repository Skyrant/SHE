
var running = true,
	icons = {
		"passive": {
			"16": "images/icon-16-p.png",
			"48": "images/icon-48-p.png",
			"128": "images/icon-128-p.png"
		},
		"active": {
			"16": "images/icon-16.png",
			"48": "images/icon-48.png",
			"128": "images/icon-128.png"
		},
		"disable": {
			"16": "images/icon-16-d.png",
			"48": "images/icon-48-d.png",
			"128": "images/icon-128-d.png"
		}
	};



function onMessage(request, sender, sendResponse) {
	var state = request.state,
		tabId = sender.tab.id;
	switch (state) {
		case "start":
			running = true;
			break;
		case "stop":
			running = false;
			changeIconToAllTabs("disable");
			break;
		case "search":
			getSearchWithQuery(tabId, request.query);
			break;
		case "flag":
			changeIcon("passive", tabId);
			break;
		case "saveFlag":
			saveFlag(tabId, request.query);
			break;
		case "safeMode":
			chrome.tabs.update(tabId, {url: sender.tab.url + "&safe=active"});
			break;
	}

	if (state == "start" || state == "stop") {
		sendStateToAllTabs(request.state);
		changePopup();
	}
}

function getQuery() {
	var obj = {
		service: "keyword",
		callBack: function(response) {
			var date = new Date(),
			now = date.getTime();
		
			chrome.storage.sync.set({'queryCheckedTime': now});
			chrome.storage.sync.set({'query': response.data });
			
			sendStateToAllTabs("start");
		},
		errorFnc: function(response) {
			
		}
	};
	
	callService(obj);
}

function getSearchWithQuery(tabId, query){
	
	var obj = {
		service: "keyword", 
		param: encodeURIComponent(query),
		callBack: function(response) {
			
			if (response.data) {
				chrome.tabs.sendMessage(tabId, { state: 'optimize', data: JSON.stringify(response.data) });
				changeIcon("active", tabId);
			} else {
				chrome.tabs.sendMessage(tabId, { state: 'menu', error: "data is null!" });
				changeIcon("passive", tabId);
			}
		},
		errorFnc: function(response) {
			serviceError(response, tabId);
		}
	};
	
	callService(obj);
}

function saveFlag(tabId, query) {
	var obj = {
		method: "POST",
		service: "feedback", 
		param: encodeURIComponent(query),
		callBack: function(response) {
			chrome.tabs.sendMessage(tabId, { state: 'flagged' });
		},
		errorFnc: function(response) {
			serviceError(response, tabId);
		}
	};
	
	callService(obj);
}

function serviceError(response, tabId) {
	changeIcon("disable", tabId);
	chrome.tabs.sendMessage(tabId, { state: 'menu', error: response });
	console.log("Error: \n", response);
}

function onUpdated(tabId, change, tab){
	var tabUrl = tab.url;
	if (!tabUrl.match(/https:\/\/www.google.(com|ca)\/search/g)) {
		changeIcon("disable", tabId);
		changePopup("disable", tabId);
	} 

	if (running) {
		chrome.tabs.sendMessage(tabId, { state: "start" });
	}
}


function initBackground() {
	
	chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
		
		if (change.status == "complete") {
			//console.log("onUpdated");
			onUpdated(tabId, change, tab);
		}
		
	});

	chrome.extension.onMessage.addListener(onMessage); 

	//TODO getQuery -> onStartup & onInstalled
	chrome.runtime.onStartup.addListener(function(callback) {
		//console.log("runtime onStartup");
		getQuery();
	});

	chrome.runtime.onInstalled.addListener(function(callback) {
		//console.log("runtime onInstalled");
		getQuery();
	});

	chrome.browserAction.onClicked.addListener(function (tab) {
		//console.log("browserAction.onClicked");
		if (tab.status == "complete") {
			chrome.tabs.sendMessage(tab.id, { state: "menu", running: running });
		}
	});
}
  
initBackground();



