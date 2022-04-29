browser.contextMenus.create({
	id: "ptv",
	title: "Popup This Video",
	contexts: ["link"]
});

browser.contextMenus.onClicked.addListener(contextMenuAction);
browser.browserAction.onClicked.addListener(openAction);

function popupThis(url) {
	let video = new Video(url);
	let popupUrl = video.getPopOutURL();

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
	let activeTab = browser.tabs.query({active: true, currentWindow: true});
	activeTab.then((tabs) => {
		let url = tabs[0].url;
		popupThis(url);
	});
}

function Video(url) {
	this.url = url.toLowerCase();
	
	this.getPopOutURL = function() {
		if (this.url.indexOf("youtube.com") > 0) {
			let v = new Youtubecom(url);
			return v.popOut();
		} else if (this.url.indexOf("vimeo.com") > 0) {
			let v = new Vimeo(url);
			return v.popOut();
		} else if (this.url.indexOf("vidio.com") > 0) {
			let v = new Vidio(url);
			return v.popOut();
		} else if (this.url.indexOf("youtu.be") > 0) {
			let v = new Youtube(url);
			return v.popOut();
		} else if (this.url.indexOf("gfycat.com") > 0) {
			let v = new Gfycat(url);
			return v.popOut();
		} else if (this.url.indexOf("dailymotion.com") > 0) {
			let v = new Dailymotion(url);
			return v.popOut();
		} else if (this.url.indexOf("metacafe.com") > 0) {
			let v = new Metacafe(url);
			return v.popOut();
		} else if (this.url.indexOf("twitch.tv") > 0) {
			let v = new Twitch(url);
			return v.popOut();
		} else if (this.url.indexOf("facebook.com") > 0) {
			let v = new Facebook(url);
			return v.popOut();
		} else if (this.url.indexOf("d.tube") > 0) {
			let v = new Dtube(url);
			return v.popOut();
		} else if (this.url.indexOf("viddsee.com") > 0) {
			let v = new Viddsee(url);
			return v.popOut();
		} else if (this.url.indexOf("bitchute.com") > 0) {
			let v = new BitChute(url);
			return v.popOut();
		} else if (this.url.indexOf("archive.org") > 0) {
			let v = new Archive(url);
			return v.popOut();
		} else if (this.url.indexOf("liveleak.com") > 0) {
			let v = new LiveLeak(url);
			return v.popOut();
		} else if (this.url.indexOf("nimo.tv") > 0) {
			let v = new NimoTv(url);
			return v.popOut();
		} else {
			return url;
		}
	};
}

function Youtubecom(url) {
	this.url = url;

	this.getURLParams = function() {
		let vars = [], hash;
	    let hashes = this.url.slice(this.url.indexOf('?') + 1).split('&');
	    for(let i = 0; i < hashes.length; i++) {
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
		let id = this.getVideoID();
		if (id == undefined) {
			return 'https://www.youtube.com/';
		}
		return 'https://www.youtube.com/embed/'+ id + '?autoplay=1';
	};
}

function Youtube(url) {
	this.url = url;

	this.getVideoID = function() {
		let regExp = /[^/]+$/;
		let match = this.url.match(regExp);
		return match[0];
	};

	this.popOut = function() {
		let id = this.getVideoID();
		if (id == undefined) {
			return 'https://www.youtube.com/';
		}
		return 'https://www.youtube.com/embed/'+ id + '?autoplay=1';
	};
}

function Vimeo(url) {
	this.url = url;

	this.getVideoID = function() {
		let regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
		let match = this.url.match(regExp);
		return match[2];
	};

	this.popOut = function() {
		let id = this.getVideoID();
		if (id == undefined) {
			return 'https://vimeo.com/';
		}
		return 'https://player.vimeo.com/video/'+ id + '?autoplay=1';
	};
}

function Vidio(url) {
	this.url = url;

	this.getVideoID = function() {
		let regExp = /[^/]+$/;
		let match = this.url.match(regExp);
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
		let regExp = /[^/]+$/;
		let match = this.url.match(regExp);
		return match[0];
	};
	
	this.popOut = function() {
		return "https://gfycat.com/ifr/"+ this.getVideoID();
	};
}


function Dailymotion(url) {
	this.url = url;
	
	this.getVideoID = function() {
		let regExp = /[^/]+$/;
		let match = this.url.match(regExp);
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
		let regExp = /[^/]+$/;
		let match = this.url.match(regExp);
		return match[0];
	};
	
	this.popOut = function() {
		let id = this.getVideoID();
		if (id == undefined) {
			return "https://www.twitch.tv";
		}
		return "https://player.twitch.tv/?channel="+ id;
	};
}

function Facebook(url) {
	this.url = url;
	
	this.popOut = function() {
		if (this.url.toLowerCase().indexOf("/videos/") > 0)
			return "https://www.facebook.com/plugins/video.php?href="+ encodeURI(this.url) +"&autoplay=true";
		else
			return null;
	}
}

function Dtube(url) {
	this.url = url;

	this.getVideoID = function() {
		let fragments = url.split('/');
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
		let fragments = url.split('/');
		return fragments[5];
	};

	this.popOut = function() {
		return this.getVideoID() != null ? "https://www.viddsee.com/player/"+ this.getVideoID() : null;
	}
}

function BitChute(url) {
	this.url = url;

	this.getVideoID = function() {
		let fragments = url.split('/');
		return fragments[4];
	}

	this.popOut = function() {
		return this.getVideoID() != null ? "https://www.bitchute.com/embed/"+ this.getVideoID() : null;
	}
}

function Archive(url) {
	this.url = url;

	this.getVideoID = function() {
		let fragments = url.split('/');
		console.log(fragments[4]);
		return fragments[4];
	}

	this.popOut = function() {
		return this.getVideoID() != null ? "https://archive.org/embed/"+ this.getVideoID() : null;
	}	
}

function LiveLeak(url) {
	this.url = url;

	this.getURLParams = function() {
		let lets = [], hash;
	    let hashes = this.url.slice(this.url.indexOf('?') + 1).split('&');
	    for(let i = 0; i < hashes.length; i++) {
	        hash = hashes[i].split('=');
	        lets.push(hash[0]);
	        lets[hash[0]] = hash[1];
	    }
	    return lets;
	};

	this.getVideoID = function() {
		return this.getURLParams()["t"];
	};

	this.popOut = function() {
		return this.getVideoID() != null ? "https://www.liveleak.com/e/"+ this.getVideoID() : null;
	}
}

function NimoTv(url) {
	this.url = url;
	
	this.popOut = function() {
		return url.replace("live", "embed");
	};
}