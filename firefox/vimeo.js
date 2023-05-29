class Vimeo {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        const url = new URL(this.url);
        const path = url.pathname.substring(1, url.pathname.length);
        const newUrl = `https://player.vimeo.com/video/${path}?autoplay=1`;

        return newUrl;
    }
}