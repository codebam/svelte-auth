import { redirect } from '@sveltejs/kit';

export const load = (event) => {
	event.cookies.delete('session');
	throw redirect(303, '/');
};
