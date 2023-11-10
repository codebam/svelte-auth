declare global {
	namespace App {
		interface Platform {
			env?: {
				DB: D1Database;
				DATA_DB: D1Database;
				PLAYLIST_DB: D1Database;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
