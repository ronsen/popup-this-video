class YouTube {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        if (this.url.href.indexOf("youtube.com") > 0) {
            if (this.url.href.indexOf("/shorts/") > 0) {
                const videoId = this.url.pathname.substring(this.url.pathname.lastIndexOf('/')+ 1,
                    url.pathname.length);
                newUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            } else {
                const params = new URLSearchParams(this.url.search);
                const videoId = params.get('v');
                if (videoId.length > 0) {
                    newUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                }
            }
        }

        if (this.url.href.indexOf("youtu.be") > 0) {
            const videoId = this.url.pathname.substring(1, this.url.pathname.length);
            newUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }

        return newUrl;
    }
}