var storage = {};


//ANCHOR Chrome runtime onMessage
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.state) {
        case "start":
            start();
            break;
        case "stop":
            stop();
            break;
        case "optimize":
            var data = JSON.parse(request.data);
            optimize(data.feature, data.categories);
            break;
        case "menu":
            menu(request.running, request.error);
            break;
        case "flagged":
            Menu.flagged();
            break;
    }
});

function start() {
    //console.log("start");
    chrome.storage.sync.get(['query'], function(result) {
        storage.query = result.query;
        Query.init();
    });
}



function optimize(data, categories) {
    //console.log("optimize");

    if (Query.imageSearchPage()) {
        if (data.image.length > 0) {
            Images.init(data.image);
        }
    } else if (Query.listSearchPage()) {

        if (data.article.length > 0) {
            List.init(data.article);   
        }

        if (data.popularOnWeb.length > 0) {
            Extabar.init(data.popularOnWeb);
        }
        
        if (data.image.length > 0) {
            ImageBox.init(data.image);
        }
    }

    Menu.set("optimized", categories);
}


function stop() {
    //console.log("stop");
    if (Query.queryOptimize()) {
        Tab.showItems();
        if (Query.imageSearchPage()) {
            Images.originalImages();
        } else{
            Extabar.originalExtabarList();
            List.originalList();
            ImageBox.originalImageBox();
        }
    }
    
    Menu.set("disabled");
}

function menu(running, error) {
    if (typeof error != "undefined") {
        Menu.set("flag");
    } else{
        Menu.visibility(running);
    }
    
}







