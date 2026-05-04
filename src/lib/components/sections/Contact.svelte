<script>
  import { onMount } from 'svelte';

  /** @type {HTMLElement | undefined} */
  let sectionRef = $state();

  let name = $state('');
  let email = $state('');
  let phone = $state('');
  let message = $state('');
  let submitted = $state(false);
  let loading = $state(false);

  /** @param {SubmitEvent} e */
  async function handleSubmit(e) {
    e.preventDefault();
    loading = true;
    await new Promise((r) => setTimeout(r, 1200));
    loading = false;
    submitted = true;
  }

  onMount(() => {
    /** @type {(() => void) | undefined} */
    let cleanup;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.from('.contact-info > *', {
        x: -60, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef, start: 'top 72%', once: true },
      });

      gsap.from('.contact-form', {
        x: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef, start: 'top 72%', once: true },
      });

      cleanup = () => ScrollTrigger.getAll().forEach((t) => t.kill());
    })();

    return () => cleanup?.();
  });

  const contactItems = [
    { icon: '📍', label: 'Endereço', value: 'Av. Paulista, 1000 — Sala 510\nSão Paulo, SP' },
    { icon: '📞', label: 'Telefone / WhatsApp', value: '(11) 99999-0000' },
    { icon: '✉️', label: 'E-mail', value: 'contato@arcterapias.com.br' },
    { icon: '🕐', label: 'Horários', value: 'Seg — Sex: 8h às 20h\nSáb: 8h às 14h' },
  ];
</script>

<section bind:this={sectionRef} id="contato" class="bg-dark py-28 lg:py-36">
  <div class="mx-auto max-w-7xl px-6 lg:px-12">
    <div class="grid gap-16 lg:grid-cols-2 lg:gap-24">
      <!-- Informações -->
      <div class="contact-info space-y-8">
        <div>
          <div class="mb-5 flex items-center gap-3">
            <span class="h-px w-10 bg-terra"></span>
            <span class="font-accent text-xs font-semibold tracking-[0.2em] text-terra uppercase">Contato</span>
          </div>
          <h2 class="font-display text-[clamp(2.4rem,5vw,3.8rem)] font-light leading-[1.05] text-warm-white">
            Vamos começar<br />
            <em class="font-semibold italic text-terra">sua jornada?</em>
          </h2>
          <p class="mt-6 font-body text-base leading-relaxed text-muted-light">
            O primeiro passo pode ser o mais difícil, mas você não precisa dar sozinho. Entre em
            contato e agende uma consulta inicial gratuita de 20 minutos.
          </p>
        </div>

        <div class="space-y-4">
          {#each contactItems as item}
            <div class="flex gap-4 rounded-xl bg-dark-soft p-5">
              <span class="text-xl">{item.icon}</span>
              <div>
                <p class="font-accent text-xs font-semibold tracking-wider text-terra uppercase">{item.label}</p>
                <p class="mt-1 whitespace-pre-line font-body text-sm leading-relaxed text-muted-light">{item.value}</p>
              </div>
            </div>
          {/each}
        </div>

        <div class="rounded-xl border border-terra/25 bg-terra/5 p-5">
          <p class="font-accent text-xs font-semibold tracking-wider text-terra uppercase">Também atendo online</p>
          <p class="mt-1 font-body text-sm leading-relaxed text-muted-light">
            Sessões por videochamada para todo o Brasil, com a mesma qualidade e sigilo do atendimento presencial.
          </p>
        </div>
      </div>

      <!-- Formulário -->
      <div class="contact-form">
        {#if submitted}
          <div class="flex h-full flex-col items-center justify-center gap-6 text-center">
            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-terra/15">
              <span class="text-4xl">✓</span>
            </div>
            <div>
              <h3 class="font-display text-3xl font-semibold text-warm-white">Mensagem enviada!</h3>
              <p class="mt-3 font-body text-base text-muted-light">
                Obrigada pelo contato. Responderei em até 24 horas para confirmar seu horário.
              </p>
            </div>
            <button
              onclick={() => (submitted = false)}
              class="font-accent text-sm font-medium tracking-wider text-terra underline-offset-4 hover:underline"
            >
              Enviar nova mensagem
            </button>
          </div>
        {:else}
          <form onsubmit={handleSubmit} class="space-y-5 rounded-2xl bg-dark-soft p-8 lg:p-10">
            <h3 class="font-display text-2xl font-semibold text-warm-white">Agende sua consulta</h3>
            <p class="font-body text-sm text-muted-light">Preencha o formulário e entrarei em contato em breve.</p>

            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-1.5">
                <label for="name" class="font-accent text-xs font-medium tracking-wider text-muted-light uppercase">
                  Nome completo *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  bind:value={name}
                  placeholder="Seu nome"
                  class="w-full rounded-xl border border-white/8 bg-dark px-4 py-3 font-body text-sm text-warm-white placeholder:text-muted/50 outline-none transition-all focus:border-terra focus:ring-1 focus:ring-terra/30"
                />
              </div>

              <div class="space-y-1.5">
                <label for="phone" class="font-accent text-xs font-medium tracking-wider text-muted-light uppercase">
                  Telefone
                </label>
                <input
                  id="phone"
                  type="tel"
                  bind:value={phone}
                  placeholder="(11) 99999-0000"
                  class="w-full rounded-xl border border-white/8 bg-dark px-4 py-3 font-body text-sm text-warm-white placeholder:text-muted/50 outline-none transition-all focus:border-terra focus:ring-1 focus:ring-terra/30"
                />
              </div>
            </div>

            <div class="space-y-1.5">
              <label for="email" class="font-accent text-xs font-medium tracking-wider text-muted-light uppercase">
                E-mail *
              </label>
              <input
                id="email"
                type="email"
                required
                bind:value={email}
                placeholder="seu@email.com"
                class="w-full rounded-xl border border-white/8 bg-dark px-4 py-3 font-body text-sm text-warm-white placeholder:text-muted/50 outline-none transition-all focus:border-terra focus:ring-1 focus:ring-terra/30"
              />
            </div>

            <div class="space-y-1.5">
              <label for="message" class="font-accent text-xs font-medium tracking-wider text-muted-light uppercase">
                Mensagem
              </label>
              <textarea
                id="message"
                rows="4"
                bind:value={message}
                placeholder="Conte um pouco sobre o que te traz até aqui..."
                class="w-full resize-none rounded-xl border border-white/8 bg-dark px-4 py-3 font-body text-sm text-warm-white placeholder:text-muted/50 outline-none transition-all focus:border-terra focus:ring-1 focus:ring-terra/30"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              class="flex w-full items-center justify-center gap-3 rounded-xl bg-terra py-4 font-accent text-sm font-semibold tracking-widest text-warm-white uppercase transition-all hover:bg-terra-dark disabled:opacity-70"
            >
              {#if loading}
                <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Enviando...
              {:else}
                Enviar mensagem <span>→</span>
              {/if}
            </button>

            <p class="text-center font-body text-xs text-muted">
              Suas informações são tratadas com total sigilo e confidencialidade.
            </p>
          </form>
        {/if}
      </div>
    </div>
  </div>
</section>
