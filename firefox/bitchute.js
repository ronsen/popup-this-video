const bitchute = (url) => {
	const pathname = url.pathname.substring(0, url.pathname.length - 1);
	const videoId = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);

	if (videoId) {
		if (url.href.indexOf("/video/") > 0) {
			return `https://www.bitchute.com/embed/${videoId}/`;
		}
	}

	return url.href;
}