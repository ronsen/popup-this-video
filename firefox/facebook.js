class Facebook {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        if (this.url.href.indexOf("/video/") > 0 || this.url.href.indexOf("/watch/") > 0) {
            newUrl = 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(newUrl);
        }
        
        return newUrl;
    }
}