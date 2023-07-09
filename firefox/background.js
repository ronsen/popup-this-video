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
	let popupUrl  = url.href;

	if (url.href.indexOf("youtube.com") > 0) {
		popupUrl = new YouTube(url).getPopupUrl();
	}

	if (url.href.indexOf("youtu.be") > 0) {
		popupUrl = new YouTube(url).getPopupUrl();
	}

	if (url.href.indexOf("vimeo.com") > 0) {
		popupUrl = new Vimeo(url).getPopupUrl();
	}

	if (url.href.indexOf("twitch.tv") > 0) {
		popupUrl = new Twitch(url).getPopupUrl();
	}

	if (url.href.indexOf("dailymotion.com") > 0) {
		popupUrl = new Dailymotion(url).getPopupUrl();
	}

    if (url.href.indexOf("viddsee.com") > 0) {
		popupUrl = new Viddsee(url).getPopupUrl();
	}

	if (url.href.indexOf("bilibili.com") > 0) {
		popupUrl = new Bilibili(url).getPopupUrl();
	}

	if (url.href.indexOf("odysee.com") > 0) {
		popupUrl = new Odysee(url).getPopupUrl();
	}

	if (url.href.indexOf("bitchute.com") > 0) {
		popupUrl = new Bitchute(url).getPopupUrl();
	}

	if (url.href.indexOf("facebook.com") > 0) {
		popupUrl = new Facebook(url).getPopupUrl();
	}

	if (url.href.indexOf("kick.com") > 0) {
		popupUrl = new Kick(url).getPopupUrl();
	}

	chrome.windows.create({
		height: 369,
		width: 600,
		state: "normal",
		type: "popup",
		url: popupUrl
	});
}
