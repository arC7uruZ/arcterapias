<script>
  import { onMount } from 'svelte';

  /** @type {HTMLElement | undefined} */
  let sectionRef = $state();

  onMount(() => {
    /** @type {(() => void) | undefined} */
    let cleanup;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.from('.about-image', {
        x: -80, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef, start: 'top 75%', once: true },
      });

      gsap.from('.about-content > *', {
        x: 60, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef, start: 'top 70%', once: true },
      });

      // Stats contam ao entrar na tela
      const statEls = document.querySelectorAll('.stat-number');
      statEls.forEach((el) => {
        const htmlEl = /** @type {HTMLElement} */ (el);
        const target = parseInt(htmlEl.dataset['target'] ?? '0', 10);
        ScrollTrigger.create({
          trigger: htmlEl,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(htmlEl, {
              innerText: target,
              duration: 1.8,
              ease: 'power2.out',
              snap: { innerText: 1 },
              onUpdate() {
                htmlEl.innerText = String(Math.round(parseFloat(htmlEl.innerText)));
              },
            });
          },
        });
      });

      cleanup = () => ScrollTrigger.getAll().forEach((t) => t.kill());
    })();

    return () => cleanup?.();
  });
</script>

<section bind:this={sectionRef} id="sobre" class="overflow-hidden bg-warm-white py-28 lg:py-36">
  <div class="mx-auto max-w-7xl px-6 lg:px-12">
    <div class="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
      <!-- Imagem -->
      <div class="about-image relative">
        <div class="absolute -top-6 -left-6 h-full w-full rounded-3xl border border-terra/20"></div>
        <div class="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream-dark">
          <div class="flex h-full w-full items-end justify-center bg-gradient-to-b from-cream to-cream-dark">
            <svg viewBox="0 0 400 500" class="h-[88%] w-auto" fill="none">
              <ellipse cx="200" cy="145" rx="75" ry="75" fill="#c45c2a" opacity="0.3" />
              <path d="M60 500 C60 330 115 290 200 275 C285 290 340 330 340 500Z" fill="#c45c2a" opacity="0.22" />
            </svg>
          </div>
          <div class="absolute right-6 bottom-6 rounded-2xl bg-warm-white/90 px-5 py-4 backdrop-blur-sm">
            <p class="font-accent text-xs font-semibold tracking-widest text-terra uppercase">Psicóloga Clínica</p>
            <p class="font-display text-lg font-semibold text-dark">Dra. Ana Rodrigues</p>
          </div>
        </div>
        <div class="absolute -right-8 top-16 hidden rounded-full bg-terra px-6 py-3 shadow-lg shadow-terra/20 lg:block">
          <p class="font-accent text-xs font-semibold tracking-widest text-warm-white uppercase">+ de 10 anos</p>
        </div>
      </div>

      <!-- Conteúdo -->
      <div class="about-content space-y-7">
        <div class="flex items-center gap-3">
          <span class="h-px w-10 bg-terra"></span>
          <span class="font-accent text-xs font-semibold tracking-[0.2em] text-terra uppercase">Sobre mim</span>
        </div>

        <h2 class="font-display text-[clamp(2.4rem,5vw,3.8rem)] font-light leading-[1.05] text-dark">
          Uma escuta que<br />
          <em class="font-semibold italic text-terra">transforma</em>
        </h2>

        <p class="font-body text-base leading-relaxed text-dark/65">
          Sou psicóloga clínica formada pela USP, com especialização em Terapia
          Cognitivo-Comportamental e mais de dez anos dedicados ao cuidado da saúde mental.
          Acredito que cada pessoa carrega uma história única que merece ser ouvida com profundidade.
        </p>

        <p class="font-body text-base leading-relaxed text-dark/65">
          Trabalho com adultos e adolescentes, oferecendo um espaço acolhedor para o enfrentamento
          de ansiedade, depressão, burnout e questões de autoconhecimento. Meu compromisso é com
          o seu bem-estar integral.
        </p>

        <div class="flex flex-wrap gap-2 pt-2">
          {#each ['Ansiedade', 'Depressão', 'Burnout', 'TCC', 'Autoconhecimento', 'Relacionamentos'] as tag}
            <span class="rounded-full border border-terra/25 px-4 py-1.5 font-accent text-xs tracking-wider text-dark/70">
              {tag}
            </span>
          {/each}
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-6 border-t border-dark/10 pt-8">
          {#each [
            { target: 10, suffix: '+', label: 'Anos de experiência' },
            { target: 500, suffix: '+', label: 'Pacientes atendidos' },
            { target: 98, suffix: '%', label: 'Satisfação relatada' },
          ] as stat}
            <div>
              <p class="font-display text-3xl font-semibold text-terra">
                <span class="stat-number" data-target={stat.target}>0</span>{stat.suffix}
              </p>
              <p class="mt-1 font-accent text-xs tracking-wider text-dark/45 uppercase">{stat.label}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
