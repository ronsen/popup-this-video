browser.contextMenus.create({
	id: "ptv",
	title: "Popup This Video",
	contexts: ["link"]
});

function contextMenuAction(info) {
	popupThis(info.linkUrl);
}

browser.contextMenus.onClicked.addListener(contextMenuAction);

function openAction() {
	const activeTab = browser.tabs.query({
		active: true, currentWindow: true
	});

	activeTab.then((tabs) => {
		let url = tabs[0].url;
		popupThis(url);
	});
}

browser.browserAction.onClicked.addListener(openAction);

function popupThis(url) {
	let popupUrl  = url;

	if (url.toLowerCase().indexOf("youtube.com") > 0) {
		const v = new YouTube(url);
		popupUrl = v.getPopupUrl();
	}

	if (url.toLowerCase().indexOf("youtu.be") > 0) {
		const v = new YouTube(url);
		popupUrl = v.getPopupUrl();
	}

	if (url.toLowerCase().indexOf("vimeo.com") > 0) {
		const v = new Vimeo(url);
		popupUrl = v.getPopupUrl();
	}

	console.log(popupUrl);
	
	chrome.windows.create({
		height: 369,
		width: 600,
		state: "normal",
		type: "popup",
		url: popupUrl
	});
}
