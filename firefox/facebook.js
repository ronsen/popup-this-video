const facebook = (url) => {
	if (url.href.indexOf("/video/") > 0 || url.href.indexOf("/watch/") > 0) {
		return 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(newUrl);
	}

	return url.href;
}