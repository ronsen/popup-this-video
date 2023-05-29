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
		popupUrl = new Twitch(url).getPopupUrl();
	}

    if (url.href.indexOf("viddsee.com") > 0) {
		popupUrl = new Twitch(url).getPopupUrl();
	}

	chrome.windows.create({
		height: 369,
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

        if (this.url.href.indexOf("youtube.com") > 0) {
            if (this.url.href.indexOf("/shorts/") > 0) {
                const videoId = this.url.pathname.substring(this.url.pathname.lastIndexOf('/')+ 1,
                    url.pathname.length);
                newUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            } else {
                const params = new URLSearchParams(this.url.search);
                if (params.get('v')) {
                    newUrl = `https://www.youtube.com/embed/${params.get('v')}?autoplay=1`;
                }
            }
        }

        if (this.url.href.indexOf("youtu.be") > 0) {
            const videoId = this.url.pathname.substring(1, this.url.pathname.length);
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

        if (this.url.href.indexOf("/videos/") > 0) {
            newUrl = `https://player.twitch.tv/?video=${videoId}&parent=twitch.tv`;
        } else if (this.url.href.indexOf("/clip/") > 0) {
            newUrl = `https://clips.twitch.tv/embed?clip=${videoId}&parent=twitch.tv`;
        } else {
            if (videoId.length > 0) {
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

        if (videoId.length > 0) {
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

        const videoId = this.url.pathname.substring(this.url.pathname.lastIndexOf('/') + 1,
            this.url.pathname.length);

        if (videoId.length > 0) {
            newUrl = `https://www.dailymotion.com/embed/video/${videoId}?autoplay=1`;
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

            if (videoId.length > 0) {
                newUrl = `https://www.viddsee.com/player/${videoId}`;
            }
        }

        return newUrl;
    }
}