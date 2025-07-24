const bilibili = (url) => {
	const videoId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1,
		url.pathname.length);

	if (videoId) {
		if (url.pathname.startsWith("/video/")) {
			return `https://player.bilibili.com/player.html?bvid=${videoId}`;
		}

		if (url.hostname.includes('live.bilibili.com')) {
			return `https://www.bilibili.com/blackboard/live/live-activity-player.html?cid=${videoId}`;
		}
	}

	return url.href;
}