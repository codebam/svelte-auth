const tryLogin = async (session_cookie: string, DB: D1Database) => {
	const { email, password } = JSON.parse(session_cookie);
	const results = await DB.prepare('SELECT password FROM Users WHERE id=?').bind(email).all();
	if (results.results[0].password === password) {
		return true;
	}
	return false;
};

export default tryLogin;
