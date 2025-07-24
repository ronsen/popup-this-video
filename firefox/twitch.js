const twitch = (url) => {
	const videoId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1,
		url.pathname.length);

	if (videoId) {
		if (url.href.indexOf("/videos/") > 0) {
			return `https://player.twitch.tv/?video=${videoId}&parent=twitch.tv`;
		} else if (url.href.indexOf("/clip/") > 0) {
			return `https://clips.twitch.tv/embed?clip=${videoId}&parent=twitch.tv`;
		} else {
			return `https://player.twitch.tv/?channel=${videoId}&parent=twitch.tv`;
		}
	}

	return url.href;
}