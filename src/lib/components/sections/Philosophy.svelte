<script>
    import { onMount } from "svelte";

    /** @type {HTMLElement | undefined} */
    let sectionRef = $state();

    const pillars = [
        {
            number: "01",
            title: "Escuta Ativa",
            text: "Cada sessão começa com presença total. Ouço não só as palavras, mas o que está por baixo delas.",
        },
        {
            number: "02",
            title: "Sem Julgamentos",
            text: "Um espaço livre para você ser quem é. A terapia floresce onde há segurança e acolhimento genuíno.",
        },
        {
            number: "03",
            title: "Ciência + Humanidade",
            text: "Técnicas baseadas em evidências, aplicadas com sensibilidade e respeito pela singularidade de cada pessoa.",
        },
    ];

    const quoteFirst = '"A terapia não é um luxo — é um ato de'.split(" ");
    const quoteSecond = 'coragem e de cuidado consigo mesmo."'.split(" ");

    onMount(() => {
        /** @type {(() => void) | undefined} */
        let cleanup;

        (async () => {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            gsap.from(".philosophy-quote span", {
                opacity: 0,
                y: 30,
                stagger: 0.04,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: { trigger: ".philosophy-quote", start: "top 80%", once: true },
            });

            gsap.from(".pillar-line", {
                scaleX: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.inOut",
                transformOrigin: "left center",
                scrollTrigger: { trigger: ".pillars-container", start: "top 78%", once: true },
            });

            gsap.from(".pillar-item", {
                y: 60,
                opacity: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: { trigger: ".pillars-container", start: "top 78%", once: true },
            });

            gsap.to(".philosophy-visual", {
                y: -60,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });

            cleanup = () => ScrollTrigger.getAll().forEach((t) => t.kill());
        })();

        return () => cleanup?.();
    });
</script>

<section bind:this={sectionRef} id="abordagem" class="bg-cream relative overflow-hidden py-28 lg:py-36">
    <!-- Elemento visual com parallax -->
    <div class="philosophy-visual pointer-events-none absolute top-0 right-0 hidden h-full w-1/3 lg:block">
        <div
            class="border-terra/12 absolute top-1/4 right-0 h-[600px] w-[600px] translate-x-1/2 rounded-full border"
        ></div>
        <div
            class="border-terra/8 absolute top-1/3 right-0 h-[400px] w-[400px] translate-x-1/3 rounded-full border"
        ></div>
        <div class="bg-terra/40 absolute top-1/2 right-16 h-3 w-3 -translate-y-1/2 rounded-full"></div>
        <div class="bg-sage/50 absolute top-[40%] right-32 h-2 w-2 rounded-full"></div>
    </div>

    <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="mb-12 flex items-center gap-3">
            <span class="bg-terra h-px w-10"></span>
            <span class="font-accent text-terra text-xs font-semibold tracking-[0.2em] uppercase">Minha Abordagem</span>
        </div>

        <!-- Frase de impacto com palavras animadas -->
        <div class="philosophy-quote mb-20 max-w-3xl">
            <blockquote class="font-display text-dark text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.15] font-light">
                {#each quoteFirst as word}
                    <span class="inline-block">{word}&nbsp;</span>
                {/each}
                {#each quoteSecond as word}
                    <span class="text-terra inline-block font-semibold italic">{word}&nbsp;</span>
                {/each}
            </blockquote>
            <p class="font-accent text-dark/40 mt-4 text-sm tracking-wider">— Dra. Ana Rodrigues</p>
        </div>

        <!-- Pilares -->
        <div class="pillars-container grid gap-10 lg:grid-cols-3">
            {#each pillars as pillar}
                <div class="pillar-item">
                    <div class="pillar-line bg-terra/40 mb-6 h-px origin-left"></div>
                    <div class="flex items-start gap-4">
                        <span class="font-display text-terra/20 text-5xl font-light">{pillar.number}</span>
                        <div>
                            <h3 class="font-display text-dark text-xl font-semibold">{pillar.title}</h3>
                            <p class="font-body text-dark/60 mt-2 text-sm leading-relaxed">{pillar.text}</p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- CTA central -->
        <div class="mt-20 flex flex-col items-center gap-6 text-center">
            <p class="font-display text-dark/70 text-2xl font-light">Pronta para dar o primeiro passo?</p>
            <a
                href="#contato"
                class="bg-terra font-accent text-warm-white hover:bg-terra-dark inline-flex items-center gap-3 rounded-full px-9 py-4 text-sm font-medium tracking-widest uppercase transition-all hover:gap-4"
            >
                Agende sua consulta <span>→</span>
            </a>
        </div>
    </div>
</section>
