const tryGetUserData = async (session_cookie: string, DB: D1Database, DATA_DB: D1Database) => {
	if (session_cookie) {
		const { email, password } = JSON.parse(session_cookie);
		const results = await DB.prepare('SELECT password FROM Users WHERE id=?').bind(email).all();
		if (results.results[0].password === password) {
			const data = await DATA_DB.prepare('SELECT id, content FROM UserData WHERE email=?')
				.bind(email)
				.all();
			return data.results;
		}
	}
};

export default tryGetUserData;
