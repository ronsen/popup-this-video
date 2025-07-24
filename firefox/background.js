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

	if (url.href.indexOf("youtube.com") > 0 || url.href.indexOf("youtu.be") > 0) {
		popupUrl = youtube(url);
	}

	if (url.href.indexOf("vimeo.com") > 0) {
		popupUrl = vimeo(url);
	}

	if (url.href.indexOf("twitch.tv") > 0) {
		popupUrl = twitch(url);
	}

	if (url.href.indexOf("dailymotion.com") > 0) {
		popupUrl = dailymotion(url);
	}

	if (url.href.indexOf("viddsee.com") > 0) {
		popupUrl = viddsee(url);
	}

	if (url.href.indexOf("bilibili.com") > 0) {
		popupUrl = bilibili(url);
	}

	if (url.href.indexOf("odysee.com") > 0) {
		popupUrl = odysee(url);
	}

	if (url.href.indexOf("bitchute.com") > 0) {
		popupUrl = bitchute(url);
	}

	if (url.href.indexOf("facebook.com") > 0) {
		popupUrl = facebook(url);
	}

	if (url.href.indexOf("kick.com") > 0) {
		popupUrl = kick(url);
	}

	if (url.href.indexOf("vidio.com") > 0) {
		popupUrl = vidio(url);
	}

	chrome.windows.create({
		height: 281,
		width: 500,
		state: "normal",
		type: "popup",
		url: popupUrl
	});
}