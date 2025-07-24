const vimeo = (url) => {
	const videoId = url.pathname.slice(1); // remove leading slash

	return videoId
		? `https://player.vimeo.com/video/${videoId}?autoplay=1`
		: url.href;
};