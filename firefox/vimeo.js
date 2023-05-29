class Vimeo {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        const path = this.url.pathname.substring(1, this.url.pathname.length);

        if (path.length > 0) {
            newUrl = `https://player.vimeo.com/video/${path}?autoplay=1`;
        }

        return newUrl;
    }
}