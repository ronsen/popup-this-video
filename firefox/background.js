browser.contextMenus.create({
	id: "ptv",
	title: "Popup This Video",
	contexts: ["link"]
});

function contextMenuAction(info) {
	popupThis(new URL(info.linkUrl));
}

browser.contextMenus.onClicked.addListener(contextMenuAction);

function openAction() {
	const activeTab = browser.tabs.query({
		active: true, currentWindow: true
	});

	activeTab.then((tabs) => {
		popupThis(new URL(tabs[0].url));
	});
}

browser.browserAction.onClicked.addListener(openAction);

function popupThis(url) {
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
}