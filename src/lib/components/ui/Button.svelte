<script>
  /** @type {{ href?: string, variant?: 'primary'|'outline'|'ghost'|'light', size?: 'sm'|'md'|'lg', class?: string, onclick?: () => void, children?: import('svelte').Snippet }} */
  let {
    href = '',
    variant = 'primary',
    size = 'md',
    class: className = '',
    onclick,
    children,
  } = $props();

  const base =
    'inline-flex items-center justify-center font-accent font-medium tracking-widest uppercase transition-all duration-300 rounded-full';

  const variants = {
    primary: 'bg-terra text-warm-white hover:bg-terra-dark',
    outline: 'border border-terra text-terra hover:bg-terra hover:text-warm-white',
    ghost: 'text-terra hover:text-terra-dark underline-offset-4 hover:underline',
    light: 'bg-warm-white text-dark hover:bg-cream',
  };

  const sizes = {
    sm: 'text-xs px-5 py-2.5',
    md: 'text-sm px-7 py-3.5',
    lg: 'text-sm px-9 py-4',
  };
</script>

{#if href}
  <a href={href} class="{base} {variants[variant]} {sizes[size]} {className}">
    {@render children?.()}
  </a>
{:else}
  <button {onclick} class="{base} {variants[variant]} {sizes[size]} {className}">
    {@render children?.()}
  </button>
{/if}
