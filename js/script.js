/*
  =========================================
  LOGICA DE INTERACAO (script.js)
  Cliente: Davi Gonçalves Advocacia
  Nicho: Busca e Apreensão e Revisional
  Funcionalidades: Menu mobile, FAQ accordion,
  animações no scroll e cabeçalho fixo.
  =========================================
*/

document.addEventListener('DOMContentLoaded', () => {

  // =========================================
  // 1. ALTERAÇÃO DO HEADER AO ROLAR A PÁGINA
  // =========================================
  // Adiciona a classe 'scrolled' ao cabeçalho quando o usuário rolar
  // mais de 50 pixels para baixo, diminuindo seu tamanho e aplicando sombra.
  const header = document.querySelector('.main-header');
  
  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Executa na inicialização para checar posição atual.


  // =========================================
  // 2. CONTROLE DO MENU HAMBÚRGUER (MOBILE)
  // =========================================
  // Gerencia a abertura e fechamento da gaveta do menu em dispositivos móveis,
  // travando a rolagem do corpo da página (body) enquanto o menu estiver ativo.
  const menuToggle = document.getElementById('menu-toggle-button');
  const menuClose = document.getElementById('menu-close-button');
  const mobileMenu = document.getElementById('mobile-menu-container');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Abre o menu mobile
  const openMenu = () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Impede rolagem de fundo
  };

  // Fecha o menu mobile
  const closeMenu = () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = ''; // Restaura rolagem normal
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', openMenu);
  }

  if (menuClose) {
    menuClose.addEventListener('click', closeMenu);
  }

  // Fecha o menu automaticamente quando um link interno de navegação for clicado
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });


  // =========================================
  // 3. ACCORDION DE PERGUNTAS FREQUENTES (FAQ)
  // =========================================
  // Controla o colapso e expansão suave das perguntas frequentes.
  // Fecha automaticamente os outros itens abertos quando um novo é clicado,
  // mantendo o layout limpo e otimizando a experiência do usuário (UX).
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Fecha todos os outros itens ativos antes de abrir o selecionado
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          otherContent.style.maxHeight = null;
          otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
        }
      });

      // Alterna o estado do item clicado
      if (isOpen) {
        item.classList.remove('active');
        content.style.maxHeight = null;
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        // Define a altura máxima baseada no scrollHeight real do conteúdo para uma animação suave
        content.style.maxHeight = content.scrollHeight + "px";
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });


  // =========================================
  // 4. ANIMAÇÕES DE REVELAÇÃO NO SCROLL
  // =========================================
  // Utiliza a API do Intersection Observer para detectar quando um elemento com
  // a classe '.reveal' entra na janela de visualização do navegador e adiciona
  // a classe '.active' para disparar as transições CSS de fade-in e slide-up.
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    // Configurações básicas de margem e limite para disparo da animação
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Para de observar o elemento após a animação ter sido executada
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null, // Usa a janela do navegador como área de intersecção
      rootMargin: '0px 0px -80px 0px', // Dispara um pouco antes do elemento chegar totalmente à tela
      threshold: 0.1 // Pelo menos 10% do elemento deve estar visível
    });

    // Registra cada elemento no observador
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback: se o navegador for muito antigo e não suportar Intersection Observer,
    // revela todos os elementos de uma vez para evitar conteúdo invisível.
    revealElements.forEach(element => {
      element.classList.add('active');
    });
  }


  // =========================================
  // 5. ATUALIZAR LINK ATIVO NA NAVEGAÇÃO
  // =========================================
  // Monitora a rolagem da página para destacar visualmente qual seção está
  // atualmente ativa na tela, aplicando a classe '.active' no link correspondente.
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNavSection = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // Compensação da altura do cabeçalho fixo
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavSection);

});
