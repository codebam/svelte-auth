import type { D1Database } from '@cloudflare/workers-types';

const tryLogin = async (session_cookie: string | undefined, DB: D1Database) => {
	if (session_cookie) {
		try {
			const { id, password } = JSON.parse(session_cookie);
			const results = await DB.prepare('SELECT password FROM Users WHERE id=?').bind(id).all();
			if (results.results[0].password === password) {
				return true;
			}
		} catch {
			// return false;
		}
	}
	return false;
};

export default tryLogin;
