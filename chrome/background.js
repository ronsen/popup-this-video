chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
		id: 'ptv',
		title: 'Popup This Video',
		type: 'normal',
		contexts: ['link']
    });
});

chrome.contextMenus.onClicked.addListener((info) => {
	const url = new URL(info.linkUrl);

	let popupUrl  = url.href;

	if (url.href.indexOf("youtube.com") > 0) {
		popupUrl = new YouTube(url).getPopupUrl();
	}

	if (url.href.indexOf("youtu.be") > 0) {
		popupUrl = new YouTube(url).getPopupUrl();
	}

	if (url.href.indexOf("vimeo.com") > 0) {
		popupUrl = new Vimeo(url).getPopupUrl();
	}

	if (url.href.indexOf("twitch.tv") > 0) {
		popupUrl = new Twitch(url).getPopupUrl();
	}

	if (url.href.indexOf("dailymotion.com") > 0) {
		popupUrl = new Dailymotion(url).getPopupUrl();
	}

    if (url.href.indexOf("viddsee.com") > 0) {
		popupUrl = new Viddsee(url).getPopupUrl();
	}

	if (url.href.indexOf("bilibili.com") > 0) {
		popupUrl = new Bilibili(url).getPopupUrl();
	}

	if (url.href.indexOf("odysee.com") > 0) {
		popupUrl = new Odysee(url).getPopupUrl();
	}

	if (url.href.indexOf("bitchute.com") > 0) {
		popupUrl = new Bitchute(url).getPopupUrl();
	}

	if (url.href.indexOf("facebook.com") > 0) {
		popupUrl = new Facebook(url).getPopupUrl();
	}

    if (url.href.indexOf("kick.com") > 0) {
		popupUrl = new Kick(url).getPopupUrl();
	}

    if (url.href.indexOf("vidio.com") > 0) {
		popupUrl = new Vidio(url).getPopupUrl();
	}

	chrome.windows.create({
		height: 338,
		width: 600,
		state: "normal",
		type: "popup",
		url: popupUrl
	});
});

class YouTube {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;
        let videoId = '';

        if (this.url.href.indexOf("youtube.com") > 0) {
            if (this.url.href.indexOf("/shorts/") > 0) {
                videoId = this.url.pathname.substring(this.url.pathname.lastIndexOf('/') + 1,
                    this.url.pathname.length);
            } else {
                const params = new URLSearchParams(this.url.search);
                videoId = params.get('v');
            }
        }

        if (this.url.href.indexOf("youtu.be") > 0) {
            videoId = this.url.pathname.substring(1, this.url.pathname.length);
        }

        if (videoId) {
            newUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }

        return newUrl;
    }
}

class Twitch {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        const videoId = this.url.pathname.substring(this.url.pathname.lastIndexOf('/') + 1,
            this.url.pathname.length);

        if (videoId) {
            if (this.url.href.indexOf("/videos/") > 0) {
                newUrl = `https://player.twitch.tv/?video=${videoId}&parent=twitch.tv`;
            } else if (this.url.href.indexOf("/clip/") > 0) {
                newUrl = `https://clips.twitch.tv/embed?clip=${videoId}&parent=twitch.tv`;
            } else {
                newUrl = `https://player.twitch.tv/?channel=${videoId}&parent=twitch.tv`;
            }
        }

        return newUrl;
    }
}

class Vimeo {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        const videoId = this.url.pathname.substring(1, this.url.pathname.length);

        if (videoId) {
            newUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
        }

        return newUrl;
    }
}

class Dailymotion {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        if (this.url.href.indexOf('/video/')> 0) {
            const videoId = this.url.pathname.substring(this.url.pathname.lastIndexOf('/') + 1,
                this.url.pathname.length);

            if (videoId) {
                newUrl = `https://www.dailymotion.com/embed/video/${videoId}?autoplay=1`;
            }
        }

        return newUrl;
    }
}

class Viddsee {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        if (this.url.href.indexOf('/video/')> 0) {
            const videoId = this.url.pathname.substring(this.url.pathname.lastIndexOf('/') + 1,
                this.url.pathname.length);

            if (videoId) {
                newUrl = `https://www.viddsee.com/player/${videoId}`;
            }
        }

        return newUrl;
    }
}

class Bilibili {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        const videoId = this.url.pathname.substring(this.url.pathname.lastIndexOf('/') + 1,
            this.url.pathname.length);

        if (videoId) {
            if (this.url.href.indexOf("/video/") > 0) {
                newUrl = `https://player.bilibili.com/player.html?bvid=${videoId}`;
            }

            if (this.url.href.indexOf("/live.bilibili.com/") > 0) {
                newUrl = `https://www.bilibili.com/blackboard/live/live-activity-player.html?cid=${videoId}`;
            }
        }

        return newUrl;
    }
}

class Bitchute {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        const pathname = this.url.pathname.substring(0, this.url.pathname.length - 1);
        const videoId = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);

        if (videoId) {
            if (this.url.href.indexOf("/video/") > 0) {
                newUrl = `https://www.bitchute.com/embed/${videoId}/`;
            }
        }
        
        return newUrl;
    }
}

class Facebook {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        if (this.url.href.indexOf("/video/") > 0 || this.url.href.indexOf("/watch/") > 0) {
            newUrl = 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(newUrl);
        }
        
        return newUrl;
    }
}

class Odysee {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        const videoId = this.url.pathname.substring(this.url.pathname.indexOf('/') + 1,
            this.url.pathname.length);

        if (videoId) {
            if (this.url.pathname.indexOf(":") > 0) {
                newUrl = `https://odysee.com/$/embed/${videoId}?&autoplay=true`;
            }
        }
        
        return newUrl;
    }
}

class Kick {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        const videoId = this.url.pathname.substring(this.url.pathname.lastIndexOf('/') + 1,
            this.url.pathname.length);

        if (videoId) {
            newUrl = `https://player.kick.com/${videoId}`;
        }

        return newUrl;
    }
}

class Vidio {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        const videoId = this.url.pathname.substring(this.url.pathname.lastIndexOf('/') + 1,
            this.url.pathname.length);

        if (videoId) {
            if (this.url.href.indexOf("/watch/") > 0) {
                newUrl = `https://www.vidio.com/embed/${videoId}?autoplay=true&player_only=true&mute=false`;
            }
            
            if (this.url.href.indexOf("/live/") > 0) {
                newUrl = `https://www.vidio.com/live/${videoId}/embed?autoplay=true&player_only=true&mute=false`;
            }
        }

        return newUrl;
    }
}