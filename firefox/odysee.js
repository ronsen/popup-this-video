const odysee = (url) => {
	const videoId = url.pathname.substring(url.pathname.indexOf('/') + 1,
		url.pathname.length);

	if (videoId && url.pathname.indexOf(":") > 0) {
		return `https://odysee.com/$/embed/${videoId}?&autoplay=true`;
	}

	return url.href;
}