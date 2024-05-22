import { z } from 'zod';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { Argon2id } from 'oslo/password';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
	default: async (ev) => {
		if (!ev.locals.user || !ev.locals.session) {
			return redirect(303, '/auth/login');
		}
		let formData = await ev.request.formData();

		let res = z
			.object({
				old: z.string(),
				current: z.string().min(3),
				currentConfirm: z.string().min(3)
			})
			.refine(({ current, currentConfirm }) => current === currentConfirm, {
				path: ['currentConfirm'],
				message: "passwords don't match "
			})
			.safeParse({
				old: formData.get('old'),
				current: formData.get('current'),
				currentConfirm: formData.get('current-confirm')
			});

		if (!res.success) {
			return fail(400, {
				success: false,
				error: res.error
			});
		}

		const { data } = res;

		let u = await db.query.user.findFirst({
			where(fields, operators) {
				return operators.eq(fields.id, ev.locals.user!.id);
			}
		});
		console.log('first');

		if (!u) {
			redirect(303, '/auth/logout');
		}
		console.log('second');

		let match = await new Argon2id().verify(u!.hashedPassword, data.old);

		if (!match) {
			return fail(400, {
				success: false,
				error: [{ path: 'old', message: 'wrong password' }]
			});
		}

		let hash = await new Argon2id().hash(data.current);

		await db
			.update(user)
			.set({
				hashedPassword: hash
			})
			.where(eq(user.id, ev.locals.user.id));
		redirect(303, '/auth/logout');
	}
};
