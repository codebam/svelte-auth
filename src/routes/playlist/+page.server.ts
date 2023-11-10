import { redirect } from '@sveltejs/kit';
import tryLogin from '$lib/tryLogin';

export const actions = {
	add: async (event) => {
		if (await tryLogin(event.cookies.get('session') ?? '', event.platform?.env?.DB)) {
			const session = JSON.parse(event.cookies.get('session'));
			const email = session.email;
			const formdata = await event.request.formData();
			await event.platform?.env?.PLAYLIST_DB.prepare('INSERT INTO Playlist VALUES (?, ?, ?)')
				.bind(crypto.randomUUID(), email, formdata.get('url'))
				.all();
			throw redirect(303, '/');
		}
	}
};
