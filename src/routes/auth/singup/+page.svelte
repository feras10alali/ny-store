<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Github, Chrome } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<Card.Root class="w-[400px]">
	<Card.Header>
		<Card.Title>Signup</Card.Title>
		<Card.Description>create new client</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="post" class="flex flex-col justify-center items-center w-full gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input name="email" id="email" type="email" placeholder="m@example.com" required />
			</div>
			<div class="grid gap-2">
				<Label for="password">Password</Label>
				<Input name="password" id="password" type="password" required />
			</div>
			<div class="grid gap-2">
				<Label for="password">Confirm password</Label>
				<Input name="confirm" id="password" type="password" required />
			</div>
			<Button type="submit" class="w-full">Signup</Button>
		</form>
	</Card.Content>
</Card.Root>
