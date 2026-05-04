<script>
  import Hero from '$lib/components/sections/Hero.svelte';
  import About from '$lib/components/sections/About.svelte';
  import Services from '$lib/components/sections/Services.svelte';
  import Philosophy from '$lib/components/sections/Philosophy.svelte';
  import Testimonials from '$lib/components/sections/Testimonials.svelte';
  import Contact from '$lib/components/sections/Contact.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
</script>

<svelte:head>
  <title>ARCTERAPIAS — Psicologia Clínica</title>
</svelte:head>

<main>
  <Hero />
  <About />
  <Services />
  <Philosophy />
  <Testimonials />
  <Contact />
  <Footer />
</main>
