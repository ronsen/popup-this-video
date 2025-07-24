const twitch = (url) => {
	const path = url.pathname;
	const videoId = path.split('/').pop();

	if (!videoId) return url.href;

	if (path.startsWith('/videos/')) {
		return `https://player.twitch.tv/?video=${videoId}&parent=twitch.tv`;
	}

	if (path.startsWith('/clip/')) {
		return `https://clips.twitch.tv/embed?clip=${videoId}&parent=twitch.tv`;
	}

	return `https://player.twitch.tv/?channel=${videoId}&parent=twitch.tv`;
}