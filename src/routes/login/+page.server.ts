import { redirect } from '@sveltejs/kit';

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
		const { success } = await event.platform?.env.DB.prepare('INSERT INTO Users VALUES (?, ?)')
			.bind(email, password)
			.all();
		if (success) {
			throw redirect(303, '/');
		}
	}
};
