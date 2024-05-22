import { DrizzleMySQLAdapter } from '@lucia-auth/adapter-drizzle';
import { redirect } from '@sveltejs/kit';
import { Lucia } from 'lucia';
import { db } from './db';
import { session, user } from './db/schema';
import { dev } from '$app/environment';
const adapter = new DrizzleMySQLAdapter(db, session, user);
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev,
			sameSite: 'strict'
		}
	},
	getUserAttributes(user) {
		return {
			isAdmin: user.isAdmin,
			stripeCustomerId: user.stripeCustomerId
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		UserId: number;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}
interface DatabaseUserAttributes {
	isAdmin: boolean;
	stripeCustomerId: string | null | undefined;
}

export function ensureAdmin(locals: App.Locals) {
	if (!locals.user || !locals.session) {
		redirect(303, '/auth/login');
	}

	if (!locals.user.isAdmin) {
		redirect(303, '/');
	}
}
