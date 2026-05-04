<script>
    import { onMount } from "svelte";

    /** @type {HTMLElement | undefined} */
    let sectionRef = $state();

    let name = $state("");
    let email = $state("");
    let phone = $state("");
    let message = $state("");
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
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            gsap.from(".contact-info > *", {
                x: -60,
                opacity: 0,
                duration: 0.9,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: { trigger: sectionRef, start: "top 72%", once: true },
            });

            gsap.from(".contact-form", {
                x: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: sectionRef, start: "top 72%", once: true },
            });

            cleanup = () => ScrollTrigger.getAll().forEach((t) => t.kill());
        })();

        return () => cleanup?.();
    });

    const contactItems = [
        { icon: "📍", label: "Endereço", value: "Av. Paulista, 1000 — Sala 510\nSão Paulo, SP" },
        { icon: "📞", label: "Telefone / WhatsApp", value: "(11) 99999-0000" },
        { icon: "✉️", label: "E-mail", value: "contato@arcterapias.com.br" },
        { icon: "🕐", label: "Horários", value: "Seg — Sex: 8h às 20h\nSáb: 8h às 14h" },
    ];
</script>

<section bind:this={sectionRef} id="contato" class="bg-dark py-28 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <!-- Informações -->
            <div class="contact-info space-y-8">
                <div>
                    <div class="mb-5 flex items-center gap-3">
                        <span class="bg-terra h-px w-10"></span>
                        <span class="font-accent text-terra text-xs font-semibold tracking-[0.2em] uppercase"
                            >Contato</span
                        >
                    </div>
                    <h2 class="font-display text-warm-white text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.05] font-light">
                        Vamos começar<br />
                        <em class="text-terra font-semibold italic">sua jornada?</em>
                    </h2>
                    <p class="font-body text-muted-light mt-6 text-base leading-relaxed">
                        O primeiro passo pode ser o mais difícil, mas você não precisa dar sozinho. Entre em contato e
                        agende uma consulta inicial gratuita de 20 minutos.
                    </p>
                </div>

                <div class="space-y-4">
                    {#each contactItems as item}
                        <div class="bg-dark-soft flex gap-4 rounded-xl p-5">
                            <span class="text-xl">{item.icon}</span>
                            <div>
                                <p class="font-accent text-terra text-xs font-semibold tracking-wider uppercase">
                                    {item.label}
                                </p>
                                <p class="font-body text-muted-light mt-1 text-sm leading-relaxed whitespace-pre-line">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="border-terra/25 bg-terra/5 rounded-xl border p-5">
                    <p class="font-accent text-terra text-xs font-semibold tracking-wider uppercase">
                        Também atendo online
                    </p>
                    <p class="font-body text-muted-light mt-1 text-sm leading-relaxed">
                        Sessões por videochamada para todo o Brasil, com a mesma qualidade e sigilo do atendimento
                        presencial.
                    </p>
                </div>
            </div>

            <!-- Formulário -->
            <div class="contact-form">
                {#if submitted}
                    <div class="flex h-full flex-col items-center justify-center gap-6 text-center">
                        <div class="bg-terra/15 flex h-20 w-20 items-center justify-center rounded-full">
                            <span class="text-4xl">✓</span>
                        </div>
                        <div>
                            <h3 class="font-display text-warm-white text-3xl font-semibold">Mensagem enviada!</h3>
                            <p class="font-body text-muted-light mt-3 text-base">
                                Obrigada pelo contato. Responderei em até 24 horas para confirmar seu horário.
                            </p>
                        </div>
                        <button
                            onclick={() => (submitted = false)}
                            class="font-accent text-terra text-sm font-medium tracking-wider underline-offset-4 hover:underline"
                        >
                            Enviar nova mensagem
                        </button>
                    </div>
                {:else}
                    <form onsubmit={handleSubmit} class="bg-dark-soft space-y-5 rounded-2xl p-8 lg:p-10">
                        <h3 class="font-display text-warm-white text-2xl font-semibold">Agende sua consulta</h3>
                        <p class="font-body text-muted-light text-sm">
                            Preencha o formulário e entrarei em contato em breve.
                        </p>

                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="space-y-1.5">
                                <label
                                    for="name"
                                    class="font-accent text-muted-light text-xs font-medium tracking-wider uppercase"
                                >
                                    Nome completo *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    bind:value={name}
                                    placeholder="Seu nome"
                                    class="bg-dark font-body text-warm-white placeholder:text-muted/50 focus:border-terra focus:ring-terra/30 w-full rounded-xl border border-white/8 px-4 py-3 text-sm transition-all outline-none focus:ring-1"
                                />
                            </div>

                            <div class="space-y-1.5">
                                <label
                                    for="phone"
                                    class="font-accent text-muted-light text-xs font-medium tracking-wider uppercase"
                                >
                                    Telefone
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    bind:value={phone}
                                    placeholder="(11) 99999-0000"
                                    class="bg-dark font-body text-warm-white placeholder:text-muted/50 focus:border-terra focus:ring-terra/30 w-full rounded-xl border border-white/8 px-4 py-3 text-sm transition-all outline-none focus:ring-1"
                                />
                            </div>
                        </div>

                        <div class="space-y-1.5">
                            <label
                                for="email"
                                class="font-accent text-muted-light text-xs font-medium tracking-wider uppercase"
                            >
                                E-mail *
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                bind:value={email}
                                placeholder="seu@email.com"
                                class="bg-dark font-body text-warm-white placeholder:text-muted/50 focus:border-terra focus:ring-terra/30 w-full rounded-xl border border-white/8 px-4 py-3 text-sm transition-all outline-none focus:ring-1"
                            />
                        </div>

                        <div class="space-y-1.5">
                            <label
                                for="message"
                                class="font-accent text-muted-light text-xs font-medium tracking-wider uppercase"
                            >
                                Mensagem
                            </label>
                            <textarea
                                id="message"
                                rows="4"
                                bind:value={message}
                                placeholder="Conte um pouco sobre o que te traz até aqui..."
                                class="bg-dark font-body text-warm-white placeholder:text-muted/50 focus:border-terra focus:ring-terra/30 w-full resize-none rounded-xl border border-white/8 px-4 py-3 text-sm transition-all outline-none focus:ring-1"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            class="bg-terra font-accent text-warm-white hover:bg-terra-dark flex w-full items-center justify-center gap-3 rounded-xl py-4 text-sm font-semibold tracking-widest uppercase transition-all disabled:opacity-70"
                        >
                            {#if loading}
                                <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    />
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                                Enviando...
                            {:else}
                                Enviar mensagem <span>→</span>
                            {/if}
                        </button>

                        <p class="font-body text-muted text-center text-xs">
                            Suas informações são tratadas com total sigilo e confidencialidade.
                        </p>
                    </form>
                {/if}
            </div>
        </div>
    </div>
</section>
