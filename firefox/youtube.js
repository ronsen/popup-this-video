class YouTube {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;
        let videoId = '';

        if (this.url.href.indexOf("youtube.com") > 0) {
            if (this.url.href.indexOf("/shorts/") > 0) {
                videoId = this.url.pathname.substring(this.url.pathname.lastIndexOf('/') + 1,
                    this.url.pathname.length);
            } else {
                const params = new URLSearchParams(this.url.search);
                videoId = params.get('v');
            }
        }

        if (this.url.href.indexOf("youtu.be") > 0) {
            videoId = this.url.pathname.substring(1, this.url.pathname.length);
        }

        if (videoId) {
            newUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }

        return newUrl;
    }
}