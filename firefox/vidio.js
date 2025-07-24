const vidio = (url) => {
	const videoId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1,
		url.pathname.length);

	if (videoId) {
		if (url.href.indexOf("/watch/") > 0) {
			return `https://www.vidio.com/embed/${videoId}?autoplay=true&player_only=true&mute=false`;
		}

		if (url.href.indexOf("/live/") > 0) {
			return `https://www.vidio.com/live/${videoId}/embed?autoplay=true&player_only=true&mute=false`;
		}
	}

	return url.href;
}