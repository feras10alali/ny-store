import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types.js';
import { db } from '$lib/server/db/index.js';
import { user } from '$lib/server/db/schema.js';
import { Argon2id } from 'oslo/password';
import { z } from 'zod';
import { lucia } from '$lib/server/auth.js';

export const load = async (event) => {
	if (event.locals.session) {
		redirect(307, '/profile');
	}
};

export const actions: Actions = {
	default: async (event) => {
		let formData = await event.request.formData();

		let res = z
			.object({
				email: z.string().email(),
				password: z.string().min(3)
			})
			.safeParse({
				email: formData.get('email'),
				password: formData.get('password')
			});
		console.log(res);
		if (!res.success) {
			return fail(400, {
				success: false
			});
		}
		const { data } = res;

		try {
			let u = await db.query.user.findFirst({
				where({ email }, { eq }) {
					return eq(email, data.email as string);
				}
			});

			if (!u) {
				return fail(400, {
					success: false
				});
			}
			let match = await new Argon2id().verify(u.hashedPassword, data.password);
			if (!match) {
				return fail(400, {
					success: false
				});
			}
			const session = await lucia.createSession(u.id, {});
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
		redirect(302, '/profile');
	}
};
