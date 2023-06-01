class Odysee {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        const videoId = this.url.pathname.substring(this.url.pathname.indexOf('/') + 1,
            this.url.pathname.length);

        if (videoId) {
            if (this.url.pathname.indexOf(":") > 0) {
                newUrl = `https://odysee.com/$/embed/${videoId}?&autoplay=true`;
            }
        }
        
        return newUrl;
    }
}