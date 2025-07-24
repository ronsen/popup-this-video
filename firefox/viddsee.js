const viddsee = (url) => {
	const path = url.pathname;

	if (path.startsWith('/video/')) {
		const videoId = path.split('/').pop();
		
		if (videoId) {
			return `https://www.viddsee.com/player/${videoId}`;
		}
	}

	return url.href;
};
