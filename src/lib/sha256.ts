const sha256 = async (text: string): Promise<string> =>
	crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then((array_buffer) =>
		Array.from(new Uint8Array(array_buffer))
			.map((b) => b.toString(16).padStart(2, '0'))
			.join('')
	);

export default sha256;
