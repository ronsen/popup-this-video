chrome.contextMenus.create({
	id: "ptv",
	title: "Popup This Video",
	contexts: ["link"]
});

chrome.contextMenus.onClicked.addListener(contextMenuAction);
chrome.browserAction.onClicked.addListener(openAction);

function popupThis(url) {
	var video = new Video(url);
	var popupUrl = video.getPopOutURL();

	if (null != popupUrl) {
		chrome.windows.create({
			height: 369,
			width: 600,
			state: "normal",
			type: "popup",
			url: video.getPopOutURL(),
		});
	}
}

function contextMenuAction(info) {
	const url = info.linkUrl;
	popupThis(url);
}

function openAction() {
	var activeTab = browser.tabs.query({active: true, currentWindow: true});
	activeTab.then((tabs) => {
		var url = tabs[0].url;
		popupThis(url);
	});
}

function Video(url) {
	this.url = url.toLowerCase();
	
	this.getPopOutURL = function() {
		if (this.url.indexOf("youtube.com") > 0) {
			var v = new Youtubecom(url);
			return v.popOut();
		} else if (this.url.indexOf("vimeo.com") > 0) {
			var v = new Vimeo(url);
			return v.popOut();
		} else if (this.url.indexOf("vidio.com") > 0) {
			var v = new Vidio(url);
			return v.popOut();
		} else if (this.url.indexOf("youtu.be") > 0) {
			var v = new Youtube(url);
			return v.popOut();
		} else if (this.url.indexOf("gfycat.com") > 0) {
			var v = new Gfycat(url);
			return v.popOut();
		} else if (this.url.indexOf("dailymotion.com") > 0) {
			var v = new Dailymotion(url);
			return v.popOut();
		} else if (this.url.indexOf("metacafe.com") > 0) {
			var v = new Metacafe(url);
			return v.popOut();
		} else if (this.url.indexOf("twitch.tv") > 0) {
			var v = new Twitch(url);
			return v.popOut();
		} else if (this.url.indexOf("facebook.com") > 0) {
			var v = new Facebook(url);
			return v.popOut();
		} else if (this.url.indexOf("openload.co") > 0 || this.url.indexOf("oload.stream") > 0) {
			var v = new Openload(url);
			return v.popOut();
		} else if (this.url.indexOf("d.tube") > 0) {
			var v = new Dtube(url);
			return v.popOut();
		} else if (this.url.indexOf("viddsee.com") > 0) {
			var v = new Viddsee(url);
			return v.popOut();
		} else if (this.url.indexOf("uptostream.com") > 0) {
			var v = new Uptostream(url);
			return v.popOut();
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
			return 'https://www.vidio.com/embed/'+ this.getVideoID() +'?autoplay=true&player_only=true&live_chat=false&mute=false';
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
		return "https://player.twitch.tv/?channel="+ this.getVideoID() + "&parent=twitch.tv";
	};
}

function Facebook(url) {
	this.url = url;
	
	this.popOut = function() {
		if (this.url.toLowerCase().indexOf("/videos/") > 0)
			return "https://www.facebook.com/plugins/video.php?href=" + encodeURI(this.url) + "&autoplay=true";
		else
			return null;
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

function Dtube(url) {
	this.url = url;

	this.getVideoID = function() {
		var fragments = url.split('/');
		if (fragments.length == 6)
			return fragments[4]+"/"+ fragments[5];
		if (fragments.length == 7)
			return fragments[5]+"/"+ fragments[6];
		return null;
	};

	this.popOut = function() {
		return this.getVideoID() != null ? "https://emb.d.tube/#!/"+ this.getVideoID() : null;
	}
}

function Viddsee(url) {
	this.url = url;

	this.getVideoID = function() {
		var fragments = url.split('/');
		return fragments[5];
	};

	this.popOut = function() {
		return this.getVideoID() != null ? "https://www.viddsee.com/player/"+ this.getVideoID() : null;
	}
}

function Uptostream(url) {
	this.url = url;

	this.getVideoID = function() {
		var fragments = url.split('/');
		return fragments[3];
	};

	this.popOut = function() {
		return this.getVideoID() != null ? "https://uptostream.com/iframe/"+ this.getVideoID() : null;
	}
}