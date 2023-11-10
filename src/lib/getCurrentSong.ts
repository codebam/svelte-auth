const getCurrentSong = async (event) => {
	const result = await event.platform.env.PLAYLIST_DB.prepare('SELECT url FROM Playlist').all();
	console.log(result.results);
	return result.results[result.results.length - 1].url;
};

export default getCurrentSong;
