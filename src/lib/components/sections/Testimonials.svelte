<script>
    import { onMount } from "svelte";

    /** @type {HTMLElement | undefined} */
    let sectionRef = $state();

    let activeIndex = $state(0);

    const testimonials = [
        {
            quote: "A terapia com a Dra. Ana mudou completamente a minha relação comigo mesma. Aprendi a ouvir o que sinto sem me julgar. É um trabalho profundo e transformador.",
            name: "Mariana S.",
            role: "Designer, 32 anos",
            initials: "MS",
        },
        {
            quote: "Depois de anos sofrendo com ansiedade, finalmente encontrei um espaço onde me sinto seguro para falar. Os resultados superaram minhas expectativas.",
            name: "Carlos M.",
            role: "Engenheiro, 41 anos",
            initials: "CM",
        },
        {
            quote: "Passava por um burnout severo e não sabia como sair. A abordagem da Dra. Ana foi essencial para eu reconstruir minha vida com mais equilíbrio e saúde.",
            name: "Beatriz L.",
            role: "Gerente de Projetos, 38 anos",
            initials: "BL",
        },
        {
            quote: "Recomendo sem hesitar. A Dra. Ana tem uma capacidade incrível de acolher sem julgar e ajudar a encontrar clareza nos momentos mais difíceis da vida.",
            name: "Rafael T.",
            role: "Professor, 29 anos",
            initials: "RT",
        },
    ];

    function next() {
        activeIndex = (activeIndex + 1) % testimonials.length;
    }

    function prev() {
        activeIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    }

    onMount(() => {
        /** @type {(() => void) | undefined} */
        let cleanup;

        (async () => {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            gsap.from(".testimonials-header", {
                y: 50,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: sectionRef, start: "top 75%", once: true },
            });

            gsap.from(".testimonials-track", {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: sectionRef, start: "top 65%", once: true },
            });

            gsap.from(".testimonials-dots", {
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                scrollTrigger: { trigger: sectionRef, start: "top 65%", once: true },
            });

            cleanup = () => ScrollTrigger.getAll().forEach((t) => t.kill());
        })();

        return () => cleanup?.();
    });
</script>

<section bind:this={sectionRef} id="depoimentos" class="bg-cream-dark overflow-hidden py-28 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <!-- Header -->
        <div class="testimonials-header mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
                <div class="mb-5 flex items-center gap-3">
                    <span class="bg-terra h-px w-10"></span>
                    <span class="font-accent text-terra text-xs font-semibold tracking-[0.2em] uppercase"
                        >Depoimentos</span
                    >
                </div>
                <h2 class="font-display text-dark text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.05] font-light">
                    O que dizem quem<br />
                    <em class="text-terra font-semibold italic">passou por aqui</em>
                </h2>
            </div>

            <!-- Controles desktop -->
            <div class="hidden items-center gap-3 lg:flex">
                <button
                    onclick={prev}
                    class="border-dark/20 text-dark/60 hover:border-terra hover:text-terra flex h-12 w-12 items-center justify-center rounded-full border transition-all"
                    aria-label="Anterior">←</button
                >
                <button
                    onclick={next}
                    class="bg-terra text-warm-white hover:bg-terra-dark flex h-12 w-12 items-center justify-center rounded-full transition-all"
                    aria-label="Próximo">→</button
                >
            </div>
        </div>

        <!-- Slider -->
        <div class="testimonials-track relative overflow-hidden">
            <div
                class="testimonials-flex flex gap-6 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                style="transform: translateX(calc(-{activeIndex} * var(--slide-size)))"
            >
                {#each testimonials as t, i}
                    <article
                        class="w-full shrink-0 rounded-2xl p-8 transition-all duration-500 sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]
              {i === activeIndex ? 'bg-dark' : 'bg-warm-white'}"
                    >
                        <div
                            class="font-display mb-6 text-6xl leading-none font-bold
                {i === activeIndex ? 'text-terra' : 'text-terra/20'}"
                        >
                            "
                        </div>

                        <p
                            class="font-body text-base leading-relaxed
                {i === activeIndex ? 'text-warm-white/85' : 'text-dark/70'}"
                        >
                            {t.quote}
                        </p>

                        <div class="mt-8 flex items-center gap-4">
                            <!-- Avatar -->
                            <div
                                class="font-accent flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold
                  {i === activeIndex ? 'bg-terra text-warm-white' : 'bg-cream text-terra'}"
                            >
                                {t.initials}
                            </div>

                            <div>
                                <p
                                    class="font-accent text-sm font-semibold tracking-wide
                    {i === activeIndex ? 'text-warm-white' : 'text-dark'}"
                                >
                                    {t.name}
                                </p>
                                <p
                                    class="font-body text-xs
                    {i === activeIndex ? 'text-muted-light' : 'text-muted'}"
                                >
                                    {t.role}
                                </p>
                            </div>

                            <!-- Estrelas -->
                            <div class="ml-auto flex gap-0.5">
                                {#each Array(5) as _}
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        class={i === activeIndex ? "text-terra" : "text-terra/40"}
                                    >
                                        <path
                                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                        />
                                    </svg>
                                {/each}
                            </div>
                        </div>
                    </article>
                {/each}
            </div>
        </div>

        <!-- Indicadores e controles mobile -->
        <div class="testimonials-dots mt-8 flex items-center justify-between">
            <div class="flex gap-2">
                {#each testimonials as _, i}
                    <button
                        onclick={() => (activeIndex = i)}
                        class="h-1.5 rounded-full transition-all duration-300
              {i === activeIndex ? 'bg-terra w-8' : 'bg-dark/20 w-1.5'}"
                        aria-label="Depoimento {i + 1}"
                    ></button>
                {/each}
            </div>

            <div class="flex items-center gap-3 lg:hidden">
                <button
                    onclick={prev}
                    class="border-dark/20 text-dark/60 hover:border-terra hover:text-terra flex h-10 w-10 items-center justify-center rounded-full border text-sm transition-all"
                    >←</button
                >
                <button
                    onclick={next}
                    class="bg-terra text-warm-white hover:bg-terra-dark flex h-10 w-10 items-center justify-center rounded-full text-sm transition-all"
                    >→</button
                >
            </div>
        </div>
    </div>
</section>

<style>
    .testimonials-flex {
        --slide-size: calc(100% + 24px);
    }
    @media (min-width: 640px) {
        .testimonials-flex {
            --slide-size: calc(50% + 12px);
        }
    }
    @media (min-width: 1024px) {
        .testimonials-flex {
            --slide-size: calc(100% / 3 + 8px);
        }
    }
</style>
