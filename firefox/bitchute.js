class Bitchute {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        const pathname = this.url.pathname.substring(0, this.url.pathname.length - 1);
        const videoId = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);

        if (videoId) {
            if (this.url.href.indexOf("/video/") > 0) {
                newUrl = `https://www.bitchute.com/embed/${videoId}/`;
            }
        }
        
        return newUrl;
    }
}