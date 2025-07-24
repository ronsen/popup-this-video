const dailymotion = (url) => {
	if (url.href.indexOf('/video/') > 0) {
		const videoId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1,
			url.pathname.length);

		if (videoId) {
			return `https://www.dailymotion.com/embed/video/${videoId}?autoplay=1`;
		}
	}

	return url.href;
}