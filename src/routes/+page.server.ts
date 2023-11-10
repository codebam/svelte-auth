import tryLogin from '$lib/tryLogin';
import tryGetUserData from '$lib/tryGetUserData';

export const load = async (event) => ({
	auth: await tryLogin(event.cookies.get('session') ?? '', event.platform?.env?.DB),
	userdata: await tryGetUserData(
		event.cookies.get('session') ?? '',
		event.platform?.env?.DB,
		event.platform?.env?.DATA_DB
	)
});
