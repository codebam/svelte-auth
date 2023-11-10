declare global {
	namespace App {
		interface Platform {
			env?: {
				DB: D1Namespace;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
