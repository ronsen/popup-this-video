const vimeo = (url) => {
	const videoId = url.pathname.substring(1, url.pathname.length);

	if (videoId) {
		return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
	}

	return url.href;
}