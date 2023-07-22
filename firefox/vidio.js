class Vidio {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        let newUrl = this.url.href;

        const videoId = this.url.pathname.substring(this.url.pathname.lastIndexOf('/') + 1,
            this.url.pathname.length);

        if (videoId) {
            if (this.url.href.indexOf("/watch/") > 0) {
                newUrl = `https://www.vidio.com/embed/${videoId}?autoplay=true&player_only=true&mute=false`;
            }
            
            if (this.url.href.indexOf("/live/") > 0) {
                newUrl = `https://www.vidio.com/live/${videoId}/embed?autoplay=true&player_only=true&mute=false`;
            }
        }

        return newUrl;
    }
}