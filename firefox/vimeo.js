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