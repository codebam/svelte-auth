export default {
	scheduled: async (request, env, ctx) => {
		const result = await env.PLAYLIST_DB.prepare('SELECT id FROM Playlist').all();
		const { success } = await env.PLAYLIST_DB.prepare('DELETE FROM Playlist WHERE id=?')
			.bind(result.results[result.results.length - 1].id)
			.all();
		return new Response('ok');
	}
};
