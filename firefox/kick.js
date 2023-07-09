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