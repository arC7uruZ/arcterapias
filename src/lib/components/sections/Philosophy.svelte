<script>
  import { onMount } from 'svelte';

  /** @type {HTMLElement | undefined} */
  let sectionRef = $state();

  const pillars = [
    {
      number: '01',
      title: 'Escuta Ativa',
      text: 'Cada sessão começa com presença total. Ouço não só as palavras, mas o que está por baixo delas.',
    },
    {
      number: '02',
      title: 'Sem Julgamentos',
      text: 'Um espaço livre para você ser quem é. A terapia floresce onde há segurança e acolhimento genuíno.',
    },
    {
      number: '03',
      title: 'Ciência + Humanidade',
      text: 'Técnicas baseadas em evidências, aplicadas com sensibilidade e respeito pela singularidade de cada pessoa.',
    },
  ];

  const quoteFirst = '"A terapia não é um luxo — é um ato de'.split(' ');
  const quoteSecond = 'coragem e de cuidado consigo mesmo."'.split(' ');

  onMount(() => {
    /** @type {(() => void) | undefined} */
    let cleanup;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.from('.philosophy-quote span', {
        opacity: 0, y: 30, stagger: 0.04, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.philosophy-quote', start: 'top 80%', once: true },
      });

      gsap.from('.pillar-line', {
        scaleX: 0, duration: 1.2, stagger: 0.15, ease: 'power3.inOut',
        transformOrigin: 'left center',
        scrollTrigger: { trigger: '.pillars-container', start: 'top 78%', once: true },
      });

      gsap.from('.pillar-item', {
        y: 60, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.pillars-container', start: 'top 78%', once: true },
      });

      gsap.to('.philosophy-visual', {
        y: -60, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef, start: 'top bottom', end: 'bottom top', scrub: 1.5,
        },
      });

      cleanup = () => ScrollTrigger.getAll().forEach((t) => t.kill());
    })();

    return () => cleanup?.();
  });
</script>

<section bind:this={sectionRef} id="abordagem" class="relative overflow-hidden bg-cream py-28 lg:py-36">
  <!-- Elemento visual com parallax -->
  <div class="philosophy-visual pointer-events-none absolute right-0 top-0 hidden h-full w-1/3 lg:block">
    <div class="absolute right-0 top-1/4 h-[600px] w-[600px] translate-x-1/2 rounded-full border border-terra/12"></div>
    <div class="absolute right-0 top-1/3 h-[400px] w-[400px] translate-x-1/3 rounded-full border border-terra/8"></div>
    <div class="absolute right-16 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-terra/40"></div>
    <div class="absolute right-32 top-[40%] h-2 w-2 rounded-full bg-sage/50"></div>
  </div>

  <div class="mx-auto max-w-7xl px-6 lg:px-12">
    <div class="mb-12 flex items-center gap-3">
      <span class="h-px w-10 bg-terra"></span>
      <span class="font-accent text-xs font-semibold tracking-[0.2em] text-terra uppercase">Minha Abordagem</span>
    </div>

    <!-- Frase de impacto com palavras animadas -->
    <div class="philosophy-quote mb-20 max-w-3xl">
      <blockquote class="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.15] text-dark">
        {#each quoteFirst as word}
          <span class="inline-block">{word}&nbsp;</span>
        {/each}
        {#each quoteSecond as word}
          <span class="inline-block font-semibold italic text-terra">{word}&nbsp;</span>
        {/each}
      </blockquote>
      <p class="mt-4 font-accent text-sm tracking-wider text-dark/40">— Dra. Ana Rodrigues</p>
    </div>

    <!-- Pilares -->
    <div class="pillars-container grid gap-10 lg:grid-cols-3">
      {#each pillars as pillar}
        <div class="pillar-item">
          <div class="pillar-line mb-6 h-px origin-left bg-terra/40"></div>
          <div class="flex items-start gap-4">
            <span class="font-display text-5xl font-light text-terra/20">{pillar.number}</span>
            <div>
              <h3 class="font-display text-xl font-semibold text-dark">{pillar.title}</h3>
              <p class="mt-2 font-body text-sm leading-relaxed text-dark/60">{pillar.text}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- CTA central -->
    <div class="mt-20 flex flex-col items-center gap-6 text-center">
      <p class="font-display text-2xl font-light text-dark/70">Pronta para dar o primeiro passo?</p>
      <a
        href="#contato"
        class="inline-flex items-center gap-3 rounded-full bg-terra px-9 py-4 font-accent text-sm font-medium tracking-widest text-warm-white uppercase transition-all hover:bg-terra-dark hover:gap-4"
      >
        Agende sua consulta <span>→</span>
      </a>
    </div>
  </div>
</section>
