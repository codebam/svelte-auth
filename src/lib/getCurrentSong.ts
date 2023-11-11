const getCurrentSong = async (event) => {
	const result = await event.platform.env.DB.prepare('SELECT url FROM Playlist').all();
	return result.results[result.results.length - 1].url;
};

export default getCurrentSong;
