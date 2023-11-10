import tryLogin from '$lib/tryLogin';

export const load = (event) => ({
	auth: tryLogin(event.cookies.get('session') ?? '', event.platform?.env?.DB)
});
