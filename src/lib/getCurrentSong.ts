import type { D1Database } from '@cloudflare/workers-types';

const getCurrentSong = async (db: D1Database | undefined) => {
	if (db) {
		const result = await db
			.prepare('SELECT id, url FROM Playlist ORDER BY date DESC LIMIT 1')
			.all();
		try {
			return { id: result.results[0].id, url: result.results[0].url };
		} catch {
			return { id: '', url: '' };
		}
	}
};

export default getCurrentSong;
