import { redirect } from '@sveltejs/kit';
import sha256 from '$lib/sha256';

export const actions = {
	register: async (event) => {
		const data = await event.request.formData();
		const email = data.get('email');
		const password = await sha256(data.get('password')?.toString() ?? '');
		if (event.platform && event.platform.env) {
			const { success } = await event.platform.env.DB.prepare('INSERT INTO Users VALUES (?, ?)')
				.bind(email, password)
				.all();
			if (success) {
				event.cookies.set('session', JSON.stringify({ email, password }));
				throw redirect(303, '/');
			}
		}
	},
	login: async (event) => {
		const data = await event.request.formData();
		const email = data.get('email');
		const password = await sha256(data.get('password')?.toString() ?? '');
		const results = await event.platform?.env?.DB.prepare('SELECT password FROM Users WHERE id=?')
			.bind(email)
			.all();
		if (results.results[0].password === password) {
			event.cookies.set('session', JSON.stringify({ email, password }));
			throw redirect(303, '/');
		}
	}
};
