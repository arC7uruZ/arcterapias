<script>
  import { onMount } from 'svelte';
  import BrainIcon from '$lib/components/icons/BrainIcon.svelte';
  import HeartIcon from '$lib/components/icons/HeartIcon.svelte';
  import LeafIcon from '$lib/components/icons/LeafIcon.svelte';
  import UsersIcon from '$lib/components/icons/UsersIcon.svelte';
  import ShieldIcon from '$lib/components/icons/ShieldIcon.svelte';

  /** @type {HTMLElement | undefined} */
  let sectionRef = $state();

  const services = [
    {
      Icon: BrainIcon,
      title: 'Terapia Individual',
      description:
        'Sessões personalizadas voltadas ao seu crescimento emocional, autoconhecimento e resolução de conflitos internos com técnicas comprovadas.',
      highlight: true,
    },
    {
      Icon: HeartIcon,
      title: 'Ansiedade & Depressão',
      description:
        'Tratamento especializado para transtornos de ansiedade e depressão, com protocolos estruturados da TCC e acompanhamento contínuo.',
      highlight: false,
    },
    {
      Icon: UsersIcon,
      title: 'Terapia de Casal',
      description:
        'Mediação de conflitos e fortalecimento do vínculo afetivo, ajudando casais a construir comunicação saudável e conexão genuína.',
      highlight: false,
    },
    {
      Icon: LeafIcon,
      title: 'Burnout & Estresse',
      description:
        'Intervenções focadas na recuperação de esgotamento profissional, reequilíbrio emocional e reconstrução de limites saudáveis.',
      highlight: false,
    },
    {
      Icon: ShieldIcon,
      title: 'Trauma & TEPT',
      description:
        'Abordagem cuidadosa e especializada para o processamento de experiências traumáticas, com técnicas seguras e evidência científica.',
      highlight: false,
    },
    {
      Icon: BrainIcon,
      title: 'Desenvolvimento Pessoal',
      description:
        'Processo terapêutico voltado para quem busca maior clareza, propósito de vida, autoestima e realização pessoal e profissional.',
      highlight: false,
    },
  ];

  onMount(() => {
    /** @type {(() => void) | undefined} */
    let cleanup;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.from('.services-header', {
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef, start: 'top 75%', once: true },
      });

      gsap.from('.service-card', {
        y: 70, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-grid', start: 'top 78%', once: true },
      });

      cleanup = () => ScrollTrigger.getAll().forEach((t) => t.kill());
    })();

    return () => cleanup?.();
  });
</script>

<section bind:this={sectionRef} id="servicos" class="bg-dark py-28 lg:py-36">
  <div class="mx-auto max-w-7xl px-6 lg:px-12">
    <!-- Header -->
    <div class="services-header mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div class="mb-5 flex items-center gap-3">
          <span class="h-px w-10 bg-terra"></span>
          <span class="font-accent text-xs font-semibold tracking-[0.2em] text-terra uppercase">Especialidades</span>
        </div>
        <h2 class="font-display text-[clamp(2.4rem,5vw,3.8rem)] font-light leading-[1.05] text-warm-white">
          Como posso<br />
          <em class="font-semibold italic text-terra">te ajudar</em>
        </h2>
      </div>
      <p class="max-w-sm font-body text-base leading-relaxed text-muted-light lg:text-right">
        Cada jornada terapêutica é única. Ofereço diferentes modalidades para atender às suas
        necessidades específicas.
      </p>
    </div>

    <!-- Grid -->
    <div class="services-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {#each services as service}
        {@const Icon = service.Icon}
        <article
          class="service-card group relative overflow-hidden rounded-2xl p-8 transition-all duration-500"
        >
          {#if service.highlight}
            <div class="absolute inset-0 bg-terra"></div>
            <div class="absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-terra-dark/50"></div>
          {:else}
            <div class="absolute inset-0 bg-dark-soft transition-colors duration-500 group-hover:bg-dark-soft/80"></div>
            <div class="absolute inset-0 rounded-2xl border border-white/5 transition-colors duration-500 group-hover:border-terra/30"></div>
          {/if}

          <div class="relative z-10 flex h-full flex-col gap-5">
            <!-- Ícone -->
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl {service.highlight ? 'bg-terra-dark' : 'bg-white/8'}"
            >
              <Icon
                size={22}
                class={service.highlight ? 'text-warm-white' : 'text-terra'}
              />
            </div>

            <!-- Texto -->
            <div class="flex-1">
              <h3 class="font-display text-xl font-semibold text-warm-white">
                {service.title}
              </h3>
              <p class="mt-3 font-body text-sm leading-relaxed {service.highlight ? 'text-warm-white/75' : 'text-muted-light'}">
                {service.description}
              </p>
            </div>

            <!-- Seta -->
            <div
              class="flex items-center gap-2 font-accent text-xs font-semibold tracking-wider uppercase transition-all duration-300 group-hover:gap-3 {service.highlight ? 'text-warm-white' : 'text-terra'}"
            >
              Saiba mais <span>→</span>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
