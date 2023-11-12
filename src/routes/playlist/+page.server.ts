import { redirect } from '@sveltejs/kit';
import tryLogin from '$lib/tryLogin';

export const actions = {
	add: async (event) => {
		if (await tryLogin(event.cookies.get('session'), event.platform?.env?.DB)) {
			const session = JSON.parse(event.cookies.get('session'));
			const email = session.email;
			const formdata = await event.request.formData();
			const v = new URL(formdata.get('url')).searchParams.get('v');
			await event.platform?.env?.DB.prepare('INSERT INTO Playlist VALUES (?, ?, ?, ?)')
				.bind(crypto.randomUUID(), email, v, Math.floor(new Date().getTime()))
				.all();
		}
		throw redirect(303, '/');
	},
	remove: async (event) => {
		if (await tryLogin(event.cookies.get('session'), event.platform?.env?.DB)) {
			const formdata = await event.request.formData();
			const id = formdata.get('id');
			await event.platform?.env?.DB.prepare('DELETE FROM Playlist WHERE id=?').bind(id).all();
		}
		throw redirect(303, '/');
	}
};
