chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: 'ptv',
		title: 'Popup This Video',
		type: 'normal',
		contexts: ['link']
	});
});

chrome.contextMenus.onClicked.addListener((info) => {
	const url = new URL(info.linkUrl);

	let popupUrl = url.href;

	const handlers = {
		"youtube.com": youtube,
		"youtu.be": youtube,
		"vimeo.com": vimeo,
		"twitch.tv": twitch,
		"dailymotion.com": dailymotion,
		"viddsee.com": viddsee,
		"bilibili.com": bilibili,
		"odysee.com": odysee,
		"bitchute.com": bitchute,
		"facebook.com": facebook,
		"kick.com": kick,
		"vidio.com": vidio
	};

	for (const domain in handlers) {
		if (url.href.includes(domain)) {
			popupUrl = handlers[domain](url);
			break;
		}
	}

	chrome.windows.create({
		height: 281,
		width: 500,
		state: "normal",
		type: "popup",
		url: popupUrl
	});
});

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

const vimeo = (url) => {
	const videoId = url.pathname.substring(1, url.pathname.length);

	if (videoId) {
		return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
	}

	return url.href;
}

const dailymotion = (url) => {
	if (url.href.indexOf('/video/') > 0) {
		const videoId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1,
			url.pathname.length);

		if (videoId) {
			return `https://www.dailymotion.com/embed/video/${videoId}?autoplay=1`;
		}
	}

	return url.href;
}

const viddsee = (url) => {

	if (url.href.indexOf('/video/') > 0) {
		const videoId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1,
			url.pathname.length);

		if (videoId) {
			return `https://www.viddsee.com/player/${videoId}`;
		}
	}

	return url.href;
}

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

const bitchute = (url) => {
	const videoId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1, url.pathname.length);

	if (videoId) {
		if (url.href.indexOf("/video/") > 0) {
			return `https://www.bitchute.com/embed/${videoId}/`;
		}
	}

	return url.href;
}

const facebook = (url) => {
	if (url.href.indexOf("/video/") > 0 || url.href.indexOf("/watch/") > 0) {
		return 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(url.href);
	}

	return url.href;
}

const odysee = (url) => {
	const videoId = url.pathname.substring(url.pathname.indexOf('/') + 1,
		url.pathname.length);

	if (videoId) {
		if (url.pathname.indexOf(":") > 0) {
			return `https://odysee.com/$/embed/${videoId}?&autoplay=true`;
		}
	}

	return url.href;
}

const kick = (url) => {
	const videoId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1,
		url.pathname.length);

	if (videoId) {
		return `https://player.kick.com/${videoId}`;
	}

	return url.href;
}

const vidio = (url) => {
	const videoId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1,
		url.pathname.length);

	if (videoId) {
		if (url.href.indexOf("/watch/") > 0) {
			return `https://www.vidio.com/embed/${videoId}?autoplay=true&player_only=true&mute=false`;
		}

		if (url.href.indexOf("/live/") > 0) {
			return `https://www.vidio.com/live/${videoId}/embed?autoplay=true&player_only=true&mute=false`;
		}
	}

	return url.href;
}