const bilibili = (url) => {
	const videoId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1,
		url.pathname.length);

	if (videoId) {
		if (url.href.indexOf("/video/") > 0) {
			return `https://player.bilibili.com/player.html?bvid=${videoId}`;
		}

		if (url.href.indexOf("/live.bilibili.com/") > 0) {
			return `https://www.bilibili.com/blackboard/live/live-activity-player.html?cid=${videoId}`;
		}
	}

	return url.href;
}