chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.method=="disabled" && request.hasOwnProperty("data")){
		if(parseInt(request.data)){
			dogesable();	
		}else{
			dogeize();	
		}
	}
	sendResponse({});
});

function compare(th, array) {
	if(!array){return false;}
	if (th.length != array.length){return false;}
	for(var i = 0, l=th.length; i < l; i++) {
		if (th[i] instanceof Array && array[i] instanceof Array) {
			if (!th[i].compare(array[i])){return false;}
		}
		else if (th[i] != array[i]) {
			return false;
		}
	}
	return true;
}

var dogetimer = null;
function dogeize(){
	var colors = ["red", "green","blue","lblue","yellow","orange","pink","purple","teal"];
	
	$("h1, h2, h3, h4, p, li, a").each(function(){
		if(!$(this).hasClass("dogeized")){
			$(this).toggleClass('doge_'+colors[Math.floor(Math.random()*colors.length)],true).toggleClass("dogeized", true);
		}
	});
	
	if(!$("#ext_doge_stylesheet").length){
		var path = chrome.extension.getURL('doge.css');
		$('head').append($('<link>')
			.attr("rel","stylesheet")
			.attr("type","text/css")
			.attr("href", path)
			.attr("id", "ext_doge_stylesheet")
		);
	}
	
	clearTimeout(dogetimer);
	if(dogetimer == null)dogetimer = setTimeout(dogeize, 1000);
	else dogetimer = setTimeout(dogeize, 10000);
}

function dogesable(){
	// Disable
	clearTimeout(dogetimer);
	$("#ext_doge_stylesheet").remove();
}

chrome.extension.sendMessage({method:"getConfig"}, function(response){
	if(!parseInt(response.data)){
		dogeize();
	}
});

