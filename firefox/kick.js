const kick = (url) => {
	const videoId = url.pathname.split('/').pop();

	return videoId ? `https://player.kick.com/${videoId}` : url.href;
};
