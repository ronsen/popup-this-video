const bitchute = (url) => {
	const videoId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1, url.pathname.length);

	if (videoId) {
		if (url.href.indexOf("/video/") > 0) {
			return `https://www.bitchute.com/embed/${videoId}/`;
		}
	}

	return url.href;
}