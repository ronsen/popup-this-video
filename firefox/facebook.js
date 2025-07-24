const facebook = (url) =>
	/\/(video|watch)\//.test(url.pathname)
		? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url.href)}`
		: url.href;
