import { redirect } from '@sveltejs/kit';

export const actions = {
	redirect: async (event) => {
		throw redirect(303, '/success');
	}
};
