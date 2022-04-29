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

class Video {
	constructor(url) {
		this.url = url.toLowerCase();

		this.getPopOutURL = function () {
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
			} else if (this.url.indexOf("nimo.tv") > 0) {
				let v = new NimoTv(url);
				return v.popOut();
			} else {
				return url;
			}
		};
	}
}

class Youtubecom {
	constructor(url) {
		this.url = url;

		this.getURLParams = function () {
			let vars = [], hash;
			let hashes = this.url.slice(this.url.indexOf('?') + 1).split('&');
			for (let i = 0; i < hashes.length; i++) {
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
			return vars;
		};

		this.getVideoID = function () {
			return this.getURLParams()["v"];
		};

		this.popOut = function () {
			let id = this.getVideoID();
			
			return id == undefined ? this.url : 'https://www.youtube.com/embed/' + id + '?autoplay=1';
		};
	}
}

class Youtube {
	constructor(url) {
		this.url = url;

		this.getVideoID = function () {
			let regExp = /[^/]+$/;
			let match = this.url.match(regExp);
			return match[0];
		};

		this.popOut = function () {
			let id = this.getVideoID();

			return id == undefined ? this.url : 'https://www.youtube.com/embed/' + id + '?autoplay=1';
		};
	}
}

class Vimeo {
	constructor(url) {
		this.url = url;

		this.getVideoID = function () {
			let regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
			let match = this.url.match(regExp);
			if (match != null)
				return match[2];
			return null;
		};

		this.popOut = function () {
			let id = this.getVideoID();

			return id == undefined ? this.url : 'https://player.vimeo.com/video/' + id + '?autoplay=1';
		};
	}
}

class Vidio {
	constructor(url) {
		this.url = url;

		this.getVideoID = function () {
			let regExp = /[^/]+$/;
			let match = this.url.match(regExp);
			return match[0];
		};

		this.popOut = function () {
			if (this.url.indexOf('/live/') == -1)
				return 'https://www.vidio.com/embed/' + this.getVideoID() + '?autoplay=true&player_only=true&live_chat=false&mute=false';

			else
				return 'https://www.vidio.com/live/' + this.getVideoID() + '/embed?autoplay=true&player_only=true&live_chat=false&mute=false';
		};
	}
}

class Gfycat {
	constructor(url) {
		this.url = url;

		this.getVideoID = function () {
			let regExp = /[^/]+$/;
			let match = this.url.match(regExp);
			return match[0];
		};

		this.popOut = function () {
			return "https://gfycat.com/ifr/" + this.getVideoID();
		};
	}
}


class Dailymotion {
	constructor(url) {
		this.url = url;

		this.getVideoID = function () {
			let regExp = /[^/]+$/;
			let match = this.url.match(regExp);
			return match[0];
		};

		this.popOut = function () {
			return "https://www.dailymotion.com/embed/video/" + this.getVideoID() + "?autoPlay=1";
		};
	}
}

class Metacafe {
	constructor(url) {
		this.url = url;

		this.popOut = function () {
			return url.replace("watch", "embed");
		};
	}
}

class Twitch {
	constructor(url) {
		this.url = url;

		this.getVideoID = function () {
			if (this.url.indexOf('/videos/') > 0) {
				let regExp = /[^/]+$/;
				let match = this.url.match(regExp);
				if (match != null) {
					return 'https://player.twitch.tv/?parent=google.com&video=' + match[0];
				}
			} else if (this.url.indexOf('/clip/') > 0) {
				let regExp = /[^/]+$/;
				let match = this.url.match(regExp);
				if (match != null) {
					return 'https://clips.twitch.tv/embed?parent=google.com&clip=' + match[0];
				}
			} else {
				let regExp = /[^/]+$/;
				let match = this.url.match(regExp);
				if (match != null) {
					return 'https://player.twitch.tv/?parent=google.com&channel=' + match[0];
				}
			}

			return null;
		};

		this.popOut = function () {
			let id = this.getVideoID();
			if (id == undefined) {
				return "https://www.twitch.tv";
			}
			return id;
		};
	}
}

class Facebook {
	constructor(url) {
		this.url = url;

		this.popOut = function () {
			if (this.url.toLowerCase().indexOf("/videos/") > 0)
				return "https://www.facebook.com/plugins/video.php?href=" + encodeURI(this.url) + "&autoplay=true";

			else
				return this.url;
		};
	}
}

class Dtube {
	constructor(url) {
		this.url = url;

		this.getVideoID = function () {
			let fragments = url.split('/');
			if (fragments.length == 6)
				return fragments[4] + "/" + fragments[5];
			if (fragments.length == 7)
				return fragments[5] + "/" + fragments[6];
			return null;
		};

		this.popOut = function () {
			return this.getVideoID() != null ? "https://emb.d.tube/#!/" + this.getVideoID() : null;
		};
	}
}

class Viddsee {
	constructor(url) {
		this.url = url;

		this.getVideoID = function () {
			let fragments = url.split('/');
			return fragments[5];
		};

		this.popOut = function () {
			return this.getVideoID() != null ? "https://www.viddsee.com/player/" + this.getVideoID() : null;
		};
	}
}

class BitChute {
	constructor(url) {
		this.url = url;

		this.getVideoID = function () {
			let fragments = url.split('/');
			return fragments[4];
		};

		this.popOut = function () {
			return this.getVideoID() != null ? "https://www.bitchute.com/embed/" + this.getVideoID() : null;
		};
	}
}

class Archive {
	constructor(url) {
		this.url = url;

		this.getVideoID = function () {
			let fragments = url.split('/');
			console.log(fragments[4]);
			return fragments[4];
		};

		this.popOut = function () {
			return this.getVideoID() != null ? "https://archive.org/embed/" + this.getVideoID() : null;
		};
	}
}

class NimoTv {
	constructor(url) {
		this.url = url;

		this.popOut = function () {
			return url.replace("live", "embed");
		};
	}
}