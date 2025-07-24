const kick = (url) => {
	const videoId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1,
		url.pathname.length);

	if (videoId) {
		return `https://player.kick.com/${videoId}`;
	}

	return url.href;
}