<script>
    import { onMount } from "svelte";

    /** @type {HTMLElement | undefined} */
    let sectionRef = $state();

    onMount(() => {
        /** @type {(() => void) | undefined} */
        let cleanup;

        (async () => {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            gsap.from(".about-image", {
                x: -80,
                opacity: 0,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: { trigger: sectionRef, start: "top 75%", once: true },
            });

            gsap.from(".about-content > *", {
                x: 60,
                opacity: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: { trigger: sectionRef, start: "top 70%", once: true },
            });

            // Stats contam ao entrar na tela
            const statEls = document.querySelectorAll(".stat-number");
            statEls.forEach((el) => {
                const htmlEl = /** @type {HTMLElement} */ (el);
                const target = parseInt(htmlEl.dataset["target"] ?? "0", 10);
                ScrollTrigger.create({
                    trigger: htmlEl,
                    start: "top 85%",
                    once: true,
                    onEnter: () => {
                        gsap.to(htmlEl, {
                            innerText: target,
                            duration: 1.8,
                            ease: "power2.out",
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

<section bind:this={sectionRef} id="sobre" class="bg-warm-white overflow-hidden py-28 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <!-- Imagem -->
            <div class="about-image relative">
                <div class="border-terra/20 absolute -top-6 -left-6 h-full w-full rounded-3xl border"></div>
                <div class="bg-cream-dark relative aspect-[3/4] overflow-hidden rounded-2xl">
                    <!-- <div class="from-cream to-cream-dark flex h-full w-full items-end justify-center bg-gradient-to-b"> -->
                    <!--     <svg viewBox="0 0 400 500" class="h-[88%] w-auto" fill="none"> -->
                    <!--         <ellipse cx="200" cy="145" rx="75" ry="75" fill="#c45c2a" opacity="0.3" /> -->
                    <!--         <path -->
                    <!--             d="M60 500 C60 330 115 290 200 275 C285 290 340 330 340 500Z" -->
                    <!--             fill="#c45c2a" -->
                    <!--             opacity="0.22" -->
                    <!--         /> -->
                    <!--     </svg> -->
                    <!-- </div> -->
                    <img src="hero_2.jpg" alt="">
                    <div class="bg-warm-white/90 absolute right-6 bottom-6 rounded-2xl px-5 py-4 backdrop-blur-sm">
                        <p class="font-accent text-terra text-xs font-semibold tracking-widest uppercase">
                            Psicóloga Clínica
                        </p>
                        <p class="font-display text-dark text-lg font-semibold">Dra. Ana Rodrigues</p>
                    </div>
                </div>
                <div
                    class="bg-terra shadow-terra/20 absolute top-16 -right-8 hidden rounded-full px-6 py-3 shadow-lg lg:block"
                >
                    <p class="font-accent text-warm-white text-xs font-semibold tracking-widest uppercase">
                        + de 10 anos
                    </p>
                </div>
            </div>

            <!-- Conteúdo -->
            <div class="about-content space-y-7">
                <div class="flex items-center gap-3">
                    <span class="bg-terra h-px w-10"></span>
                    <span class="font-accent text-terra text-xs font-semibold tracking-[0.2em] uppercase"
                        >Sobre mim</span
                    >
                </div>

                <h2 class="font-display text-dark text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.05] font-light">
                    Uma escuta que<br />
                    <em class="text-terra font-semibold italic">transforma</em>
                </h2>

                <p class="font-body text-dark/65 text-base leading-relaxed">
                    Sou psicóloga clínica formada pela USP, com especialização em Terapia Cognitivo-Comportamental e
                    mais de dez anos dedicados ao cuidado da saúde mental. Acredito que cada pessoa carrega uma história
                    única que merece ser ouvida com profundidade.
                </p>

                <p class="font-body text-dark/65 text-base leading-relaxed">
                    Trabalho com adultos e adolescentes, oferecendo um espaço acolhedor para o enfrentamento de
                    ansiedade, depressão, burnout e questões de autoconhecimento. Meu compromisso é com o seu bem-estar
                    integral.
                </p>

                <div class="flex flex-wrap gap-2 pt-2">
                    {#each ["Ansiedade", "Depressão", "Burnout", "TCC", "Autoconhecimento", "Relacionamentos"] as tag}
                        <span
                            class="border-terra/25 font-accent text-dark/70 rounded-full border px-4 py-1.5 text-xs tracking-wider"
                        >
                            {tag}
                        </span>
                    {/each}
                </div>

                <!-- Stats -->
                <div class="border-dark/10 grid grid-cols-3 gap-6 border-t pt-8">
                    {#each [{ target: 10, suffix: "+", label: "Anos de experiência" }, { target: 500, suffix: "+", label: "Pacientes atendidos" }, { target: 98, suffix: "%", label: "Satisfação relatada" }] as stat}
                        <div>
                            <p class="font-display text-terra text-3xl font-semibold">
                                <span class="stat-number" data-target={stat.target}>0</span>{stat.suffix}
                            </p>
                            <p class="font-accent text-dark/45 mt-1 text-xs tracking-wider uppercase">{stat.label}</p>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>
