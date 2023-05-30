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