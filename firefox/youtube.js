class YouTube {
    constructor(url) {
        this.url = url;
    }

    getPopupUrl() {
        const url = new URL(this.url);
        let newUrl = url.href;

        if (url.href.toLowerCase().indexOf("youtube.com") > 0) {
            if (url.href.toLowerCase().indexOf("/shorts/") > 0) {
                const path = url.pathname.substring(url.pathname.lastIndexOf('/')+ 1,
                    url.pathname.length);
                newUrl = `https://www.youtube.com/embed/${path}?autoplay=1`;
            } else {
                const params = new URLSearchParams(url.search);
                if (params.get('v')) {
                    newUrl = `https://www.youtube.com/embed/${params.get('v')}?autoplay=1`;
                }
            }
        }

        if (url.href.toLowerCase().indexOf("youtu.be") > 0) {
            const path = url.pathname.substring(1, url.pathname.length);
            newUrl = `https://www.youtube.com/embed/${path}?autoplay=1`;
        }

        return newUrl;
    }
}