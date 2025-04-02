<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type ButtonProps = {
		variant?: 'primary' | 'secondary' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		loading?: boolean;
		className?: string;
		disabled?: boolean;
		type?: HTMLButtonAttributes['type'];
		title: string;
	} & HTMLButtonAttributes;

	let { 
		variant = 'primary',
		size = 'md', 
		loading = false,
		className = '',
		disabled = false,
		type = 'button',
		title = '',
		...rest
	}: ButtonProps = $props();

	const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors rounded focus:outline-none cursor-pointer ';
	
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

	const buttonClasses = [
		baseStyles,
		variantStyles[variant],
		sizeStyles[size],
		loading && 'opacity-75 cursor-wait',
		disabled && 'opacity-50 cursor-not-allowed',
		className
	].filter(Boolean).join(' ');
</script>

<button
	{title}
	{type}
	class={buttonClasses}
	{disabled}
	aria-disabled={disabled || loading}
	{...rest}
	tabindex="0"
>
	{#if loading}
		<span class="mr-2 inline-block animate-spin">⟳</span>
	{/if}
	<slot></slot>
</button>
