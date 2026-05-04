<script>
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Abordagem', href: '#abordagem' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Contato', href: '#contato' },
  ];
</script>

<footer class="bg-dark py-16">
  <div class="mx-auto max-w-7xl px-6 lg:px-12">
    <div class="grid gap-12 md:grid-cols-3">
      <!-- Brand -->
      <div>
        <span class="font-display text-2xl font-semibold tracking-wider text-warm-white">
          ARC<span class="text-terra">TERAPIAS</span>
        </span>
        <p class="mt-4 font-body text-sm leading-relaxed text-muted-light">
          Cuidando da sua saúde mental com ética, técnica e profundo respeito pela sua história.
        </p>
      </div>

      <!-- Links -->
      <div>
        <h4 class="font-accent text-xs font-semibold tracking-widest text-terra uppercase">
          Navegação
        </h4>
        <ul class="mt-4 space-y-3">
          {#each navLinks as link}
            <li>
              <a
                href={link.href}
                class="font-accent text-sm text-muted-light transition-colors hover:text-warm-white"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="font-accent text-xs font-semibold tracking-widest text-terra uppercase">
          Contato
        </h4>
        <ul class="mt-4 space-y-3 font-body text-sm text-muted-light">
          <li>contato@arcterapias.com.br</li>
          <li>(11) 99999-0000</li>
          <li>Seg — Sex: 8h às 20h</li>
          <li>São Paulo, SP</li>
        </ul>
      </div>
    </div>

    <div class="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
      <p class="font-accent text-xs text-muted">
        © {currentYear} ARCTERAPIAS. Todos os direitos reservados.
      </p>
      <p class="font-accent text-xs text-muted">CRP 00/000000</p>
    </div>
  </div>
</footer>
