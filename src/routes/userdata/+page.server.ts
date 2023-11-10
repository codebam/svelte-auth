import { redirect } from '@sveltejs/kit';
import tryLogin from '$lib/tryLogin';

export const actions = {
	set: async (event) => {
		if (await tryLogin(event.cookies.get('session') ?? '', event.platform?.env?.DB)) {
			const session = JSON.parse(event.cookies.get('session'));
			const email = session.email;
			const formdata = await event.request.formData();
			await event.platform?.env?.DATA_DB.prepare('INSERT INTO UserData VALUES (?, ?, ?)')
				.bind(crypto.randomUUID(), email, formdata.get('userdata'))
				.all();
			throw redirect(303, '/');
		}
	},
	delete: async (event) => {
		if (await tryLogin(event.cookies.get('session') ?? '', event.platform?.env?.DB)) {
			const session = JSON.parse(event.cookies.get('session'));
			const email = session.email;
			const formdata = await event.request.formData();
			await event.platform?.env?.DATA_DB.prepare('DELETE FROM UserData WHERE id=? AND email=?')
				.bind(formdata.get('id'), email)
				.all();
			throw redirect(303, '/');
		}
	}
};
