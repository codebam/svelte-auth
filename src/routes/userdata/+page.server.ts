import { redirect } from '@sveltejs/kit';
import tryLogin from '$lib/tryLogin';

export const actions = {
	set: async (event) => {
		if (await tryLogin(event.cookies.get('session') ?? '', event.platform?.env?.DB)) {
			const session = JSON.parse(event.cookies.get('session'));
			const email = session.email;
			const formdata = await event.request.formData();
			try {
				await event.platform?.env?.DATA_DB.prepare('INSERT INTO UserData VALUES (?, ?)')
					.bind(email, formdata.get('userdata'))
					.all();
			} catch {
				await event.platform?.env?.DATA_DB.prepare('UPDATE UserData SET content=? WHERE id=?')
					.bind(formdata.get('userdata'), email)
					.all();
			}
			throw redirect(303, '/');
		}
	}
};
