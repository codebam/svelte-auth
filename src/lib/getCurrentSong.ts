import type { D1Database } from '@cloudflare/workers-types';

const getCurrentSong = async (db: D1Database | undefined) => {
	if (db) {
		const result = await db.prepare('SELECT url FROM Playlist ORDER BY date DESC LIMIT 1').all();
		return result.results[0].url;
	}
};

export default getCurrentSong;
