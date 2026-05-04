<script>
  import { onMount } from 'svelte';

  let scrolled = $state(false);
  let menuOpen = $state(false);

  const navLinks = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Abordagem', href: '#abordagem' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Contato', href: '#contato' },
  ];

  onMount(() => {
    const handler = () => {
      scrolled = window.scrollY > 60;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  });

  function closeMenu() {
    menuOpen = false;
  }
</script>

<header
  class="fixed top-0 right-0 left-0 z-50 transition-all duration-500"
  class:scrolled
>
  <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
    <!-- Logo -->
    <a href="/" class="group flex items-center gap-2">
      <span class="font-display text-2xl font-semibold tracking-wider text-dark transition-colors group-hover:text-terra">
        ARC<span class="text-terra">TERAPIAS</span>
      </span>
    </a>

    <!-- Desktop links -->
    <ul class="hidden items-center gap-8 lg:flex">
      {#each navLinks as link}
        <li>
          <a
            href={link.href}
            class="font-accent text-sm font-medium tracking-widest text-dark/70 uppercase transition-colors hover:text-terra"
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <!-- CTA -->
    <a
      href="#contato"
      class="hidden rounded-full border border-terra px-6 py-2.5 font-accent text-sm font-medium tracking-widest text-terra uppercase transition-all hover:bg-terra hover:text-warm-white lg:block"
    >
      Agendar
    </a>

    <!-- Hamburger -->
    <button
      class="flex flex-col items-center justify-center gap-1.5 lg:hidden"
      onclick={() => (menuOpen = !menuOpen)}
      aria-label="Menu"
    >
      <span
        class="block h-0.5 w-6 bg-dark transition-all duration-300"
        class:rotate-45={menuOpen}
        class:translate-y-2={menuOpen}
      ></span>
      <span
        class="block h-0.5 w-6 bg-dark transition-all duration-300"
        class:opacity-0={menuOpen}
      ></span>
      <span
        class="block h-0.5 w-6 bg-dark transition-all duration-300"
        class:-rotate-45={menuOpen}
        class:-translate-y-2={menuOpen}
      ></span>
    </button>
  </nav>

  <!-- Mobile menu -->
  {#if menuOpen}
    <div class="border-t border-cream-dark bg-warm-white/95 px-6 py-8 backdrop-blur-md lg:hidden">
      <ul class="flex flex-col gap-6">
        {#each navLinks as link}
          <li>
            <a
              href={link.href}
              onclick={closeMenu}
              class="font-accent text-base font-medium tracking-widest text-dark/80 uppercase transition-colors hover:text-terra"
            >
              {link.label}
            </a>
          </li>
        {/each}
        <li>
          <a
            href="#contato"
            onclick={closeMenu}
            class="inline-block rounded-full bg-terra px-6 py-3 font-accent text-sm font-medium tracking-widest text-warm-white uppercase"
          >
            Agendar Consulta
          </a>
        </li>
      </ul>
    </div>
  {/if}
</header>

<style>
  header {
    background-color: transparent;
  }

  header.scrolled {
    background-color: color-mix(in srgb, var(--color-warm-white) 92%, transparent);
    backdrop-filter: blur(12px);
    box-shadow: 0 1px 0 color-mix(in srgb, var(--color-dark) 8%, transparent);
  }
</style>
