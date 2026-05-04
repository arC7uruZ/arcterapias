<script>
    import { onMount } from "svelte";
    import Button from "$lib/components/ui/Button.svelte";

    /** @type {HTMLElement | undefined} */
    let heroRef = $state();

    onMount(() => {
        /** @type {(() => void) | undefined} */
        let cleanup;

        (async () => {
            const { gsap } = await import("gsap");

            const tl = gsap.timeline({ delay: 0.2 });

            tl.from(".hero-label", { opacity: 0, y: 24, duration: 0.7, ease: "power3.out" })
                .from(".hero-line", { opacity: 0, y: 80, duration: 0.9, stagger: 0.12, ease: "power4.out" }, "-=0.3")
                .from(".hero-body", { opacity: 0, y: 32, duration: 0.7, ease: "power2.out" }, "-=0.5")
                .from(".hero-cta", { opacity: 0, y: 24, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4")
                .from(".hero-scroll", { opacity: 0, duration: 0.6 }, "-=0.2");

            gsap.to(".blob-1", {
                x: 40,
                y: -30,
                rotation: 20,
                duration: 9,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
            gsap.to(".blob-2", {
                x: -35,
                y: 40,
                rotation: -15,
                duration: 11,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 2,
            });
            gsap.to(".blob-3", {
                x: 20,
                y: 30,
                rotation: 10,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1,
            });
            gsap.to(".blob-4", {
                x: -25,
                y: -20,
                rotation: -8,
                duration: 13,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 3,
            });
            gsap.to(".scroll-dot", {
                y: 10,
                duration: 1.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            cleanup = () => {
                tl.kill();
                gsap.killTweensOf(".blob-1,.blob-2,.blob-3,.blob-4,.scroll-dot");
            };
        })();

        return () => cleanup?.();
    });
</script>

<section bind:this={heroRef} id="inicio" class="bg-cream relative flex min-h-screen items-center overflow-hidden pt-24">
    <!-- Grain overlay -->
    <div class="grain-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.03]"></div>

    <!-- Blobs flutuantes -->
    <div
        class="blob-1 bg-terra/10 absolute top-[8%] right-[5%] h-80 w-80 rounded-full blur-3xl will-change-transform"
    ></div>
    <div
        class="blob-2 bg-sage/10 absolute bottom-[10%] left-[3%] h-96 w-96 rounded-full blur-3xl will-change-transform"
    ></div>
    <div
        class="blob-3 bg-rose/15 absolute top-[40%] right-[20%] h-48 w-48 rounded-full blur-2xl will-change-transform"
    ></div>
    <div
        class="blob-4 bg-terra/8 absolute top-[20%] left-[25%] h-32 w-32 rounded-full blur-2xl will-change-transform"
    ></div>

    <!-- Círculo decorativo -->
    <div class="absolute top-1/2 right-[8%] hidden -translate-y-1/2 lg:block">
        <div class="relative h-[500px] w-[500px]">
            <div class="border-terra/20 absolute inset-0 rounded-full border"></div>
            <div class="border-terra/10 absolute inset-8 rounded-full border"></div>
            <div class="bg-cream-dark absolute inset-16 overflow-hidden rounded-full">
                <div class="flex h-full w-full items-end justify-center">
                    <svg viewBox="0 0 300 380" class="h-[90%] w-auto" fill="none">
                        <ellipse cx="150" cy="100" rx="55" ry="55" fill="#c45c2a" opacity="0.25" />
                        <path
                            d="M60 380 C60 260 90 230 150 220 C210 230 240 260 240 380Z"
                            fill="#c45c2a"
                            opacity="0.18"
                        />
                    </svg>
                </div>
            </div>
            <div class="bg-warm-white shadow-dark/5 absolute bottom-10 left-0 rounded-2xl px-5 py-3 shadow-lg">
                <p class="font-accent text-terra text-xs font-semibold tracking-widest uppercase">CRP 00/00000</p>
                <p class="font-body text-dark/70 text-sm">Dra. Ana Rodrigues</p>
            </div>
        </div>
    </div>

    <!-- Conteúdo principal -->
    <div class="relative z-20 mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div class="max-w-2xl">
            <!-- Label -->
            <div class="hero-label mb-8 flex items-center gap-3">
                <span class="bg-terra h-px w-12"></span>
                <span class="font-accent text-terra text-xs font-semibold tracking-[0.2em] uppercase">
                    Psicologia Clínica
                </span>
            </div>

            <!-- Título -->
            <h1>
                <span
                    class="hero-line font-display text-dark block text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.95] font-light"
                >
                    Cuidando da
                </span>
                <span
                    class="hero-line font-display text-dark block text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.95] font-light"
                >
                    sua
                    <em class="text-terra relative font-semibold italic not-italic">
                        saúde
                        <svg
                            class="absolute -bottom-2 left-0 w-full"
                            height="8"
                            viewBox="0 0 200 8"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 6 Q50 1 100 5 Q150 9 200 4"
                                stroke="#c45c2a"
                                stroke-width="2"
                                fill="none"
                                opacity="0.6"
                            />
                        </svg>
                    </em>
                </span>
                <span
                    class="hero-line font-display text-dark block text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.95] font-light"
                >
                    mental.
                </span>
            </h1>

            <p class="hero-body font-body text-dark/65 mt-8 max-w-md text-lg leading-relaxed">
                Um espaço seguro para você se encontrar, compreender suas emoções e construir uma vida com mais
                equilíbrio e autenticidade.
            </p>

            <div class="hero-cta mt-10 flex flex-wrap items-center gap-4">
                <Button href="#contato" variant="primary" size="lg">Agende sua Consulta</Button>
                <a
                    href="#sobre"
                    class="font-accent text-dark/60 hover:text-terra text-sm font-medium tracking-widest uppercase transition-colors"
                >
                    Conheça mais →
                </a>
            </div>

            <!-- Stats -->
            <div class="hero-cta border-dark/10 mt-16 flex gap-10 border-t pt-8">
                {#each [{ n: "10+", label: "Anos de experiência" }, { n: "500+", label: "Vidas transformadas" }, { n: "TCC", label: "Abordagem" }] as stat}
                    <div>
                        <p class="font-display text-terra text-3xl font-semibold">{stat.n}</p>
                        <p class="font-accent text-dark/50 text-xs tracking-wider uppercase">{stat.label}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <!-- Indicador de scroll -->
    <div class="hero-scroll absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span class="font-accent text-dark/30 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div class="border-dark/20 h-10 w-5 rounded-full border p-1">
            <div class="scroll-dot bg-terra mx-auto h-1.5 w-1.5 rounded-full"></div>
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
