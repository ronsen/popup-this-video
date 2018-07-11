browser.contextMenus.create({
	id: "yvp",
	title: "Popup This Video",
	contexts: [
		"link"
	]
})

browser.contextMenus.onClicked.addListener(contextMenuAction);

function contextMenuAction(info) {
	const url = info.linkUrl;
	var video = new Video(url);
	var popupUrl = video.getPopOutURL();

	if (popupUrl != 'unknown') {
		browser.windows.create({
			height: 390,
			width: 640,
			state: "normal",
			type: "popup",
			url: video.getPopOutURL(),
		});
	}
}

function Video(url) {
	this.url = url;
	this.message = 'unknown';
	
	this.getService = function() {
		if (url.toLowerCase().indexOf("youtube.com") > 0) {
			return "youtube.com";
		} else if (url.toLowerCase().indexOf("vimeo.com") > 0) {
			return "vimeo.com";
		} else if (url.toLowerCase().indexOf("vidio.com") > 0) {
			return "vidio.com";
		} else if (url.toLowerCase().indexOf("youtu.be") > 0) {
			return "youtu.be";
		} else {
			return "unknown";
		}
	};

	this.getPopOutURL = function() {
		if (this.getService() == "youtube.com") {
			var youtubecom = new Youtubecom(url);
			return youtubecom.popOut();
		} else if (this.getService() == "vimeo.com") {
			var vimeo = new Vimeo(url);
			return vimeo.popOut();
		} else if (this.getService() == "vidio.com") {
			var vidio = new Vidio(url);
			return vidio.popOut();
		} else if (this.getService() == "youtu.be") {
			var youtube = new Youtube(url);
			return youtube.popOut();
		} else {
			return this.message;
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
	}

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
		return 'https://www.vidio.com/embed/'+ this.getVideoID();
	};
}