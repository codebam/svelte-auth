const getCurrentSong = async (event) => {
	const result = await event.platform.env.DB.prepare(
		'SELECT url FROM Playlist ORDER BY id DESC LIMIT 1'
	).all();
	return result.results[0].url;
};

export default getCurrentSong;
