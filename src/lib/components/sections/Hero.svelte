<script>
  import { onMount } from 'svelte';
  import Button from '$lib/components/ui/Button.svelte';

  /** @type {HTMLElement | undefined} */
  let heroRef = $state();

  onMount(() => {
    /** @type {(() => void) | undefined} */
    let cleanup;

    (async () => {
      const { gsap } = await import('gsap');

      const tl = gsap.timeline({ delay: 0.2 });

      tl.from('.hero-label', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' })
        .from(
          '.hero-line',
          { opacity: 0, y: 80, duration: 0.9, stagger: 0.12, ease: 'power4.out' },
          '-=0.3',
        )
        .from('.hero-body', { opacity: 0, y: 32, duration: 0.7, ease: 'power2.out' }, '-=0.5')
        .from('.hero-cta', { opacity: 0, y: 24, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.4')
        .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.2');

      gsap.to('.blob-1', {
        x: 40, y: -30, rotation: 20, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
      gsap.to('.blob-2', {
        x: -35, y: 40, rotation: -15, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2,
      });
      gsap.to('.blob-3', {
        x: 20, y: 30, rotation: 10, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1,
      });
      gsap.to('.blob-4', {
        x: -25, y: -20, rotation: -8, duration: 13, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3,
      });
      gsap.to('.scroll-dot', {
        y: 10, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });

      cleanup = () => {
        tl.kill();
        gsap.killTweensOf('.blob-1,.blob-2,.blob-3,.blob-4,.scroll-dot');
      };
    })();

    return () => cleanup?.();
  });
</script>

<section
  bind:this={heroRef}
  id="inicio"
  class="relative flex min-h-screen items-center overflow-hidden bg-cream pt-24"
>
  <!-- Grain overlay -->
  <div class="grain-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.03]"></div>

  <!-- Blobs flutuantes -->
  <div class="blob-1 absolute top-[8%] right-[5%] h-80 w-80 rounded-full bg-terra/10 blur-3xl will-change-transform"></div>
  <div class="blob-2 absolute bottom-[10%] left-[3%] h-96 w-96 rounded-full bg-sage/10 blur-3xl will-change-transform"></div>
  <div class="blob-3 absolute top-[40%] right-[20%] h-48 w-48 rounded-full bg-rose/15 blur-2xl will-change-transform"></div>
  <div class="blob-4 absolute top-[20%] left-[25%] h-32 w-32 rounded-full bg-terra/8 blur-2xl will-change-transform"></div>

  <!-- Círculo decorativo -->
  <div class="absolute top-1/2 right-[8%] hidden -translate-y-1/2 lg:block">
    <div class="relative h-[500px] w-[500px]">
      <div class="absolute inset-0 rounded-full border border-terra/20"></div>
      <div class="absolute inset-8 rounded-full border border-terra/10"></div>
      <div class="absolute inset-16 overflow-hidden rounded-full bg-cream-dark">
        <div class="flex h-full w-full items-end justify-center">
          <svg viewBox="0 0 300 380" class="h-[90%] w-auto" fill="none">
            <ellipse cx="150" cy="100" rx="55" ry="55" fill="#c45c2a" opacity="0.25" />
            <path d="M60 380 C60 260 90 230 150 220 C210 230 240 260 240 380Z" fill="#c45c2a" opacity="0.18" />
          </svg>
        </div>
      </div>
      <div class="absolute bottom-10 left-0 rounded-2xl bg-warm-white px-5 py-3 shadow-lg shadow-dark/5">
        <p class="font-accent text-xs font-semibold tracking-widest text-terra uppercase">CRP 00/00000</p>
        <p class="font-body text-sm text-dark/70">Dra. Ana Rodrigues</p>
      </div>
    </div>
  </div>

  <!-- Conteúdo principal -->
  <div class="relative z-20 mx-auto w-full max-w-7xl px-6 lg:px-12">
    <div class="max-w-2xl">
      <!-- Label -->
      <div class="hero-label mb-8 flex items-center gap-3">
        <span class="h-px w-12 bg-terra"></span>
        <span class="font-accent text-xs font-semibold tracking-[0.2em] text-terra uppercase">
          Psicologia Clínica
        </span>
      </div>

      <!-- Título -->
      <h1>
        <span class="hero-line block font-display text-[clamp(3.5rem,8vw,6.5rem)] font-light leading-[0.95] text-dark">
          Cuidando da
        </span>
        <span class="hero-line block font-display text-[clamp(3.5rem,8vw,6.5rem)] font-light leading-[0.95] text-dark">
          sua
          <em class="relative font-semibold italic text-terra not-italic">
            saúde
            <svg class="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
              <path d="M0 6 Q50 1 100 5 Q150 9 200 4" stroke="#c45c2a" stroke-width="2" fill="none" opacity="0.6" />
            </svg>
          </em>
        </span>
        <span class="hero-line block font-display text-[clamp(3.5rem,8vw,6.5rem)] font-light leading-[0.95] text-dark">
          mental.
        </span>
      </h1>

      <p class="hero-body mt-8 max-w-md font-body text-lg leading-relaxed text-dark/65">
        Um espaço seguro para você se encontrar, compreender suas emoções e construir uma vida
        com mais equilíbrio e autenticidade.
      </p>

      <div class="hero-cta mt-10 flex flex-wrap items-center gap-4">
        <Button href="#contato" variant="primary" size="lg">
          Agende sua Consulta
        </Button>
        <a
          href="#sobre"
          class="font-accent text-sm font-medium tracking-widest text-dark/60 uppercase transition-colors hover:text-terra"
        >
          Conheça mais →
        </a>
      </div>

      <!-- Stats -->
      <div class="hero-cta mt-16 flex gap-10 border-t border-dark/10 pt-8">
        {#each [{ n: '10+', label: 'Anos de experiência' }, { n: '500+', label: 'Vidas transformadas' }, { n: 'TCC', label: 'Abordagem' }] as stat}
          <div>
            <p class="font-display text-3xl font-semibold text-terra">{stat.n}</p>
            <p class="font-accent text-xs tracking-wider text-dark/50 uppercase">{stat.label}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Indicador de scroll -->
  <div class="hero-scroll absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
    <span class="font-accent text-[10px] tracking-[0.2em] text-dark/30 uppercase">Scroll</span>
    <div class="h-10 w-5 rounded-full border border-dark/20 p-1">
      <div class="scroll-dot mx-auto h-1.5 w-1.5 rounded-full bg-terra"></div>
    </div>
  </div>
</section>

<style>
  .grain-overlay {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 200px 200px;
  }
</style>
