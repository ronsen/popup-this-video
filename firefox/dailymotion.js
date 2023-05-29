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