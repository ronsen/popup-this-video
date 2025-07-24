const youtube = (url) => {
	let videoId = '';

	if (url.href.indexOf("youtube.com") > 0) {
		if (url.href.indexOf("/shorts/") > 0) {
			videoId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1,
				url.pathname.length);
		} else {
			const params = new URLSearchParams(url.search);
			videoId = params.get('v');
		}
	}

	if (url.href.indexOf("youtu.be") > 0) {
		videoId = url.pathname.substring(1, url.pathname.length);
	}

	if (videoId) {
		return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
	}

	return url.href;
}