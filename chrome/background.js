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

const bitchute = (url) => {
	const videoId = url.pathname.substring(url.pathname.lastIndexOf('/') + 1, url.pathname.length);

	if (videoId && url.pathname.startsWith("/video/")) {
		return `https://www.bitchute.com/embed/${videoId}/`;
	}

	return url.href;
}

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

const facebook = (url) =>
	/\/(video|watch)\//.test(url.pathname)
		? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url.href)}`
		: url.href;

const kick = (url) => {
	const videoId = url.pathname.split('/').pop();

	return videoId ? `https://player.kick.com/${videoId}` : url.href;
};

const odysee = (url) => {
	const videoId = url.pathname.substring(url.pathname.indexOf('/') + 1,
		url.pathname.length);

	if (videoId && url.pathname.indexOf(":") > 0) {
		return `https://odysee.com/$/embed/${videoId}?&autoplay=true`;
	}

	return url.href;
}

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

const vimeo = (url) => {
	const videoId = url.pathname.slice(1); // remove leading slash

	return videoId
		? `https://player.vimeo.com/video/${videoId}?autoplay=1`
		: url.href;
};

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
