const vidio = (url) => {
	const path = url.pathname;
	const videoId = path.split('/').pop();

	if (!videoId) return url.href;

	if (path.startsWith('/watch/')) {
		return `https://www.vidio.com/embed/${videoId}?autoplay=true&player_only=true&mute=false`;
	}

	if (path.startsWith('/live/')) {
		return `https://www.vidio.com/live/${videoId}/embed?autoplay=true&player_only=true&mute=false`;
	}

	return url.href;
};
