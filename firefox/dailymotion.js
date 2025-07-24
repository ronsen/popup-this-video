const dailymotion = (url) => {
	const path = url.pathname;

	if (path.startsWith('/video/')) {
		const videoId = path.split('/').pop();
		
		if (videoId) {
			return `https://www.dailymotion.com/embed/video/${videoId}?autoplay=1`;
		}
	}

	return url.href;
};
