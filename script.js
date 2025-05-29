document.addEventListener('DOMContentLoaded', () => {
    /* === MENU MOBILE === */
    const menuToggle = document.getElementById('menu-toggle');
    const menuLinks = document.querySelector('.menu-links');
    const navLinksForMenu = document.querySelectorAll('.menu-links .nav-link');

    if (menuToggle && menuLinks) {
        menuToggle.addEventListener('click', () => {
            menuLinks.classList.toggle('show-menu');
            menuToggle.innerHTML = menuLinks.classList.contains('show-menu')
                ? '<i class="ri-close-line"></i>'
                : '<i class="ri-menu-3-line"></i>';
        });

        navLinksForMenu.forEach(link => {
            // Apenas fechar se for um link interno (href começando com #)
            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', () => {
                    if (menuLinks.classList.contains('show-menu')) {
                        menuLinks.classList.remove('show-menu');
                        menuToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
                    }
                });
            }
        });
    }

    /* === MUDAR BACKGROUND DO HEADER AO ROLAR === */
    const header = document.getElementById('header');
    if (header) {
        function scrollHeader() {
            if (window.scrollY >= 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }
        window.addEventListener('scroll', scrollHeader);
        scrollHeader(); // Executa uma vez ao carregar para definir o estado inicial
    }
    
    /* === SCROLL LENTO PERSONALIZADO PARA NAV-LINKS === */
    const internalNavLinks = document.querySelectorAll('.nav-link-js');

    internalNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.getElementById('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 10; // -10 para um pequeno espaço

                // Parâmetros para o scroll
                const startPosition = window.pageYOffset;
                const distance = offsetPosition - startPosition;
                const duration = 1000; // Duração em milissegundos

                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                // Função de easing (quadrática para suavidade no início e fim)
                function easeInOutQuad(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        });
    });

    /* === LINK ATIVO NA NAVEGAÇÃO CONFORME SCROLL === */
    const sections = document.querySelectorAll('section[id]');
    function scrollActive() {
        const scrollY = window.pageYOffset;
        const headerHeight = header ? header.offsetHeight : 70;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerHeight - 50; // Ajuste de offset maior
            const sectionId = current.getAttribute('id');
            // Seleciona o link correspondente
            const link = document.querySelector(`.menu-links a[href*='#${sectionId}'], .logo[href*='#${sectionId}']`);

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.menu-links a, .logo').forEach(l => l.classList.remove('active-link'));
                    link.classList.add('active-link');
                }
            }
        });
        
        // Se estiver no topo, e nenhum outro link estiver ativo, ativa o 'Início'
        const atTop = scrollY < sections[0].offsetTop - headerHeight - 50;
        if (atTop) {
            document.querySelectorAll('.menu-links a, .logo').forEach(l => l.classList.remove('active-link'));
            const homeLink = document.querySelector('.menu-links a[href="#inicio"], .logo[href="#inicio"]');
            if(homeLink) homeLink.classList.add('active-link');
        }
    }
    window.addEventListener('scroll', scrollActive);
    scrollActive(); // Executa ao carregar

    /* === BOTÃO VOLTAR AO TOPO === */
    const scrollUpButton = document.getElementById('scroll-up');
    if (scrollUpButton) {
        function showScrollUp() {
            if (window.scrollY >= 350) {
                scrollUpButton.classList.add('show-scroll');
            } else {
                scrollUpButton.classList.remove('show-scroll');
            }
        }
        window.addEventListener('scroll', showScrollUp);
        showScrollUp(); // Executa ao carregar
    }

    /* === ANO ATUAL NO RODAPÉ === */
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    /* === ANIMAÇÕES AO ROLAR (SCROLL REVEAL) === */
    const animatedSections = document.querySelectorAll('.animated-section, .prato-dia-card');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.10
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animar apenas uma vez
            }
        });
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    animatedSections.forEach(el => {
        // Adicionar a classe base para a animação se ela não for uma seção principal
        if (!el.classList.contains('section') && !el.classList.contains('animated-section')) {
            el.classList.add('animated-section');
        }
        sectionObserver.observe(el);
    });

    /* === ANIMAÇÃO DE ENTRADA DOS ELEMENTOS DO HERO === */
    const heroTitle = document.querySelector('.hero-content .hero-title');
    const heroSubtitle = document.querySelector('.hero-content .hero-subtitle');
    const heroButton = document.querySelector('.hero-banner .btn-primary');

    // Adiciona a classe 'loaded' para iniciar as animações CSS
    if (heroTitle) heroTitle.classList.add('loaded');
    if (heroSubtitle) heroSubtitle.classList.add('loaded');
    if (heroButton) heroButton.classList.add('loaded');
});
