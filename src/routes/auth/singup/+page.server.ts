import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types.js';
import { z } from 'zod';
import { lucia } from '$lib/server/auth.js';
import { db } from '$lib/server/db/index.js';
import { user } from '$lib/server/db/schema.js';
import { Argon2id } from 'oslo/password';

export const load = async (event) => {
	if (event.locals.session) {
		redirect(307, '/profile');
	}
};
let schema = z.object({
	email: z.string().email(),
	password: z.string().min(3),
	confirm: z.string().min(3)
});
export const actions: Actions = {
	default: async (event) => {
		let formData = await event.request.formData();

		let res = schema.safeParse({
			email: formData.get('email'),
			password: formData.get('password'),
			confirm: formData.get('confirm')
		});
		console.log(res);
		if (!res.success) {
			return fail(400, {
				success: false
			});
		}

		if (res.data.password != res.data.confirm) {
			return fail(400, {
				success: false
			});
		}
		const passwordHash = await new Argon2id().hash(res.data.password);
		const userId = crypto.randomUUID(); // 16 characters long
		console.log(res);
		try {
			await db.insert(user).values({
				id: userId,
				email: res.data.email,
				hashedPassword: passwordHash
			});

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} catch {
			// db error, email taken, etc
			return fail(400, {
				success: false
			});
		}
		redirect(302, '/auth/login');
	}
};
