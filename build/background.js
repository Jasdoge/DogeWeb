// JavaScript Document
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.method == "getConfig"){
		if(!localStorage.hasOwnProperty("disabled"))localStorage["disabled"] = 0;
    	sendResponse({
			data:localStorage["disabled"]
		});
	}else sendResponse({});
});

if(parseInt(localStorage.disabled))chrome.browserAction.setIcon({"path":"doge_disabled_48.png"});

chrome.browserAction.onClicked.addListener(function(tab){
	if(parseInt(localStorage.disabled) == true){
		localStorage["disabled"] = 0;
		chrome.browserAction.setIcon({"path":"doge_48.png"});
		
	}
	else{
		localStorage["disabled"] = 1;
		chrome.browserAction.setIcon({"path":"doge_disabled_48.png"});
	}
	
	chrome.tabs.query({}, function(tabs){
		for(i=0; i<tabs.length; i++)
			chrome.tabs.sendMessage(tabs[i].id, {method:"disabled", data:localStorage["disabled"]}, function(response){});
	});
});

//chrome.browserAction.onClicked.addListener(function callback)