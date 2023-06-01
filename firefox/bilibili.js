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