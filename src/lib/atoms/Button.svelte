<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type ButtonVariant = 'primary' | 'secondary' | 'outline';
	type ButtonSize = 'sm' | 'md' | 'lg';

	interface $$Props {
		variant?: ButtonVariant;
		size?: ButtonSize;
		loading?: boolean;
		className?: string;
		disabled?: boolean;
		type?: HTMLButtonAttributes['type'];
		title: string
	}

	export let variant: ButtonVariant = 'primary';
	export let size: ButtonSize = 'md';
	export let loading = false;
	export let className = '';
	export let disabled = false;
	export let type: HTMLButtonAttributes['type'] = 'button';
	export let title = '';
	const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors rounded focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ';
	
	const variantStyles = {
		primary: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500',
		secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
		outline: 'border-2 border-teal-500 text-teal-500 hover:bg-teal-50 focus:ring-teal-500'
	};

	const sizeStyles = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	};

	$: buttonClasses = [
		baseStyles,
		variantStyles[variant],
		sizeStyles[size],
		loading && 'opacity-75 cursor-wait',
		disabled && 'opacity-50 cursor-not-allowed',
		className
	].filter(Boolean).join(' ');
</script>

<button
	title={title}
	{type}
	class={buttonClasses}
	{disabled}
	aria-disabled={disabled || loading}
	{...$$restProps}
>
	{#if loading}
		<span class="mr-2 inline-block animate-spin">⟳</span>
	{/if}
	<slot />
</button>
