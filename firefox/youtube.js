const youtube = (url) => {
	let videoId = '';

	if (url.hostname.includes('youtube.com')) {
		if (url.pathname.startsWith('/shorts/')) {
			videoId = url.pathname.split('/').pop();
		} else {
			const params = new URLSearchParams(url.search);
			videoId = params.get('v') || '';
		}
	} else if (url.hostname === 'youtu.be') {
		videoId = url.pathname.slice(1);
	}

	return videoId
		? `https://www.youtube.com/embed/${videoId}?autoplay=1`
		: url.href;
};
