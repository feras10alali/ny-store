<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">Modify password</Card.Title>
		<Card.Description><Button href="/auth/logout">Logout</Button></Card.Description>
	</Card.Header>
	<Card.Content>
		<form class="grid gap-4" method="post">
			<div class="grid gap-2">
				<Label for="password">Old Password</Label>
				<Input id="password" type="password" name="old" />
			</div>
			<div class="grid gap-2">
				<Label for="password">New Password</Label>
				<Input id="password" type="password" name="current" />
			</div>
			<div class="grid gap-2">
				<Label for="password">Conirm new password</Label>
				<Input id="password" type="password" name="current-confirm" />
			</div>

			<Button type="submit" class="w-full">Modify</Button>
		</form>
	</Card.Content>
</Card.Root>
