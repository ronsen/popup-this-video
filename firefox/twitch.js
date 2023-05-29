class Twitch {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        const url = new URL(this.url);

        return url.href;
    }
}