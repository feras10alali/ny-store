<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Github, Chrome, Meh } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<Card.Root class="w-[400px]">
	<Card.Header>
		<Card.Title>Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="post" class="flex flex-col justify-center items-center w-full gap-4">
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" name="email" type="email" placeholder="m@example.com" required />
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input id="password" type="password" name="password" required />
				</div>
				<Button type="submit" class="w-full">Login</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="/auth/singup" class="underline"> Sign up </a>
			</div>
		</form>
	</Card.Content>
</Card.Root>
