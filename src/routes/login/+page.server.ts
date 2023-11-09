import { fail, redirect } from '@sveltejs/kit';

const sha256 = async (text: string): Promise<string> =>
	crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then((array_buffer) =>
		Array.from(new Uint8Array(array_buffer))
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('')
	);

export const actions = {
	register: async (event) => {
		const data = await event.request.formData();
		const email = data.get('email');
		const password = await sha256(data.get('password')?.toString() ?? '');
		const user = await event.platform?.env.DB.prepare('SELECT * FROM Users WHERE id=?')
			.bind(email)
			.all();
		if (user.results[0]) {
			return {};
		}
		await event.platform?.env.DB.prepare('INSERT INTO Users VALUES (?, ?)')
			.bind(email, password)
			.all();
		event.cookies.set('session', JSON.stringify({ email, password }), { path: '/' });
		throw redirect(303, '/');
	},
	login: async (event) => {
		const data = await event.request.formData();
		const email = data.get('email');
		const password = await sha256(data.get('password')?.toString() ?? '');
		const user = await event.platform?.env.DB.prepare('SELECT * FROM Users WHERE id=?')
			.bind(email)
			.all();
		const db_password = user.results[0].password;
		if (password === db_password) {
			throw redirect(303, '/');
		}
	}
};
