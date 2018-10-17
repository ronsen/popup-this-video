browser.contextMenus.create({
	id: "yvp",
	title: "Popup This Video",
	contexts: ["link"]
});

browser.contextMenus.onClicked.addListener(contextMenuAction);

function contextMenuAction(info) {
	const url = info.linkUrl;
	var video = new Video(url);
	var popupUrl = video.getPopOutURL();

	browser.windows.create({
		height: 383,
		width: 640,
		state: "normal",
		type: "popup",
		url: video.getPopOutURL(),
	});
}

function Video(url) {
	this.url = url.toLowerCase();
	this.message = 'unknown';
	
	this.getPopOutURL = function() {
		if (this.url.indexOf("youtube.com") > 0) {
			var youtubecom = new Youtubecom(url);
			return youtubecom.popOut();
		} else if (this.url.indexOf("vimeo.com") > 0) {
			var vimeo = new Vimeo(url);
			return vimeo.popOut();
		} else if (this.url.indexOf("vidio.com") > 0) {
			var vidio = new Vidio(url);
			return vidio.popOut();
		} else if (this.url.indexOf("youtu.be") > 0) {
			var youtube = new Youtube(url);
			return youtube.popOut();
		} else if (this.url.indexOf("gfycat.com") > 0) {
			var gfycat = new Gfycat(url);
			return gfycat.popOut();
		} else if (this.url.indexOf("dailymotion.com") > 0) {
			var dailymotion = new Dailymotion(url);
			return dailymotion.popOut();
		} else if (this.url.indexOf("metacafe.com") > 0) {
			var metacafe = new Metacafe(url);
			return metacafe.popOut();
		} else if (this.url.indexOf("twitch.tv") > 0) {
			var twitch = new Twitch(url);
			return twitch.popOut();
		} else if (this.url.indexOf("facebook.com") > 0) {
			var facebook = new Facebook(url);
			return facebook.popOut();
		} else if (this.url.indexOf("openload.co") > 0 || this.url.indexOf("oload.stream") > 0) {
			var openload = new Openload(url);
			return openload.popOut();
		} else {
			return url;
		}
	};
}

function Youtubecom(url) {
	this.url = url;

	this.getURLParams = function() {
		var vars = [], hash;
	    var hashes = this.url.slice(this.url.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++) {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	};

	this.getVideoID = function() {
		return this.getURLParams()["v"];
	};

	this.popOut = function() {
		return 'https://www.youtube.com/embed/'+ this.getVideoID() + '?autoplay=1';
	};
}

function Youtube(url) {
	this.url = url;

	this.getVideoID = function() {
		var regExp = /[^/]+$/;
		var match = this.url.match(regExp);
		return match[0];
	};

	this.popOut = function() {
		return 'https://www.youtube.com/embed/'+ this.getVideoID() + '?autoplay=1';
	};
}

function Vimeo(url) {
	this.url = url;

	this.getVideoID = function() {
		var regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
		var match = this.url.match(regExp);
		return match[2];
	};

	this.popOut = function() {
		return 'https://player.vimeo.com/video/'+ this.getVideoID() + '?autoplay=1';
	};
}

function Vidio(url) {
	this.url = url;

	this.getVideoID = function() {
		var regExp = /[^/]+$/;
		var match = this.url.match(regExp);
		return match[0];
	}

	this.popOut = function() {
		if (this.url.indexOf('/live/') == -1) 
			return 'https://www.vidio.com/embed/'+ this.getVideoID() +'/autoplay=true&player_only=true&live_chat=false&mute=false';
		else
			return 'https://www.vidio.com/live/'+ this.getVideoID() +'/embed?autoplay=true&player_only=true&live_chat=false&mute=false'
	};
}

function Gfycat(url) {
	this.url = url;
	
	this.getVideoID = function() {
		var regExp = /[^/]+$/;
		var match = this.url.match(regExp);
		return match[0];
	};
	
	this.popOut = function() {
		return "https://gfycat.com/ifr/"+ this.getVideoID();
	};
}


function Dailymotion(url) {
	this.url = url;
	
	this.getVideoID = function() {
		var regExp = /[^/]+$/;
		var match = this.url.match(regExp);
		return match[0];
	};
	
	this.popOut = function() {
		return "https://www.dailymotion.com/embed/video/"+ this.getVideoID() + "?autoPlay=1";
	};
}

function Metacafe(url) {
	this.url = url;
	
	this.popOut = function() {
		return url.replace("watch", "embed");
	};
}

function Twitch(url) {
	this.url = url;
	
	this.getVideoID = function() {
		var regExp = /[^/]+$/;
		var match = this.url.match(regExp);
		return match[0];
	};
	
	this.popOut = function() {
		return "https://player.twitch.tv/?channel="+ this.getVideoID();
	};
}

function Facebook(url) {
	this.url = url;
	
	this.popOut = function() {
		return "https://www.facebook.com/plugins/video.php?href=" + encodeURI(this.url) + "&autoplay=true";
	}
}

function Openload(url) {
	this.url = url;

	this.popOut = function() {
		if (this.url.toLowerCase().indexOf("openload.co") > 0)
			return this.url.replace("/f/", "/embed/");

		if (this.url.toLowerCase().indexOf("oload.stream") > 0)
			return this.url.replace("/oload.stream/f/", "/openload.co/embed/");
	}
}