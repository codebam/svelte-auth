import tryLogin from '$lib/tryLogin';
import getCurrentSong from '$lib/getCurrentSong';

export const load = async (event) => ({
	auth: await tryLogin(event.cookies.get('session'), event.platform?.env?.DB),
	song: await getCurrentSong(event),
	session: event.cookies.get('session')
});
