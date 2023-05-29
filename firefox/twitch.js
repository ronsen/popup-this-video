class Twitch {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        const path = this.url.pathname.substring(this.url.pathname.lastIndexOf('/') + 1,
            this.url.pathname.length);

        if (this.url.href.indexOf("/videos/") > 0) {
            newUrl = `https://player.twitch.tv/?video=${path}&parent=twitch.tv`;
        } else if (this.url.href.indexOf("/clip/") > 0) {
            newUrl = `https://clips.twitch.tv/embed?clip=${path}&parent=twitch.tv" `;
        } else {
            if (path.length > 0) {
                newUrl = `https://player.twitch.tv/?channel=${path}&parent=twitch.tv`;
            }
        }

        return newUrl;
    }
}