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
            if (videoId) {
                newUrl = `https://player.twitch.tv/?channel=${videoId}&parent=twitch.tv`;
            }
        }

        return newUrl;
    }
}