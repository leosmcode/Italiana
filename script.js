document.addEventListener("DOMContentLoaded", () => {
  // Loading Screen
  const loadingScreen = document.getElementById("loading-screen")
  const body = document.body

  // Add loading class to body
  body.classList.add("loading")

  // Hide loading screen after 2.5 seconds
  setTimeout(() => {
    loadingScreen.classList.add("hidden")
    body.classList.remove("loading")

    // Remove loading screen from DOM after transition
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.remove()
      }
    }, 500)
  }, 2500)

  /* === MENU MOBILE === */
  const menuToggle = document.getElementById("menu-toggle")
  const menuLinks = document.querySelector(".menu-links")
  const navLinksForMenu = document.querySelectorAll(".menu-links .nav-link")

  if (menuToggle && menuLinks) {
    menuToggle.addEventListener("click", () => {
      menuLinks.classList.toggle("show-menu")
      menuToggle.innerHTML = menuLinks.classList.contains("show-menu")
        ? '<i class="ri-close-line"></i>'
        : '<i class="ri-menu-3-line"></i>'
    })

    navLinksForMenu.forEach((link) => {
      if (link.getAttribute("href").startsWith("#")) {
        link.addEventListener("click", () => {
          if (menuLinks.classList.contains("show-menu")) {
            menuLinks.classList.remove("show-menu")
            menuToggle.innerHTML = '<i class="ri-menu-3-line"></i>'
          }
        })
      }
    })
  }

  /* === HEADER SCROLL EFFECT === */
  const header = document.getElementById("header")
  if (header) {
    function scrollHeader() {
      if (window.scrollY >= 50) {
        header.classList.add("header-scrolled")
      } else {
        header.classList.remove("header-scrolled")
      }
    }
    window.addEventListener("scroll", scrollHeader)
    scrollHeader()
  }

  /* === SMOOTH SCROLL === */
  const internalNavLinks = document.querySelectorAll(".nav-link-js")

  internalNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerOffset = document.getElementById("header").offsetHeight
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset - 10

        const startPosition = window.pageYOffset
        const distance = offsetPosition - startPosition
        const duration = 1000

        let startTime = null

        function animation(currentTime) {
          if (startTime === null) startTime = currentTime
          const timeElapsed = currentTime - startTime
          const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
          window.scrollTo(0, run)
          if (timeElapsed < duration) requestAnimationFrame(animation)
        }

        function easeInOutQuad(t, b, c, d) {
          t /= d / 2
          if (t < 1) return (c / 2) * t * t + b
          t--
          return (-c / 2) * (t * (t - 2) - 1) + b
        }

        requestAnimationFrame(animation)
      }
    })
  })

  /* === ACTIVE NAVIGATION === */
  const sections = document.querySelectorAll("section[id]")
  function scrollActive() {
    const scrollY = window.pageYOffset
    const headerHeight = header ? header.offsetHeight : 70

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight
      const sectionTop = current.offsetTop - headerHeight - 50
      const sectionId = current.getAttribute("id")
      const link = document.querySelector(`.menu-links a[href*='#${sectionId}'], .logo[href*='#${sectionId}']`)

      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll(".menu-links a, .logo").forEach((l) => l.classList.remove("active-link"))
          link.classList.add("active-link")
        }
      }
    })

    const atTop = scrollY < sections[0].offsetTop - headerHeight - 50
    if (atTop) {
      document.querySelectorAll(".menu-links a, .logo").forEach((l) => l.classList.remove("active-link"))
      const homeLink = document.querySelector('.menu-links a[href="#inicio"], .logo[href="#inicio"]')
      if (homeLink) homeLink.classList.add("active-link")
    }
  }
  window.addEventListener("scroll", scrollActive)
  scrollActive()

  /* === SCROLL TO TOP BUTTON === */
  const scrollUpButton = document.getElementById("scroll-up")
  if (scrollUpButton) {
    function showScrollUp() {
      if (window.scrollY >= 350) {
        scrollUpButton.classList.add("show-scroll")
      } else {
        scrollUpButton.classList.remove("show-scroll")
      }
    }
    window.addEventListener("scroll", showScrollUp)
    showScrollUp()

    scrollUpButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  /* === CURRENT YEAR === */
  const currentYearSpan = document.getElementById("current-year")
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear()
  }

  /* === SCROLL ANIMATIONS === */
  const animatedSections = document.querySelectorAll(".animated-section, .prato-dia-card")
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible")
        observer.unobserve(entry.target)
      }
    })
  }

  const sectionObserver = new IntersectionObserver(observerCallback, observerOptions)
  animatedSections.forEach((el) => {
    if (!el.classList.contains("section") && !el.classList.contains("animated-section")) {
      el.classList.add("animated-section")
    }
    sectionObserver.observe(el)
  })

  /* === HERO ANIMATIONS === */
  const heroTitle = document.querySelector(".hero-content .hero-title")
  const heroSubtitle = document.querySelector(".hero-content .hero-subtitle")
  const heroButtons = document.querySelector(".hero-buttons")

  if (heroTitle) heroTitle.classList.add("loaded")
  if (heroSubtitle) heroSubtitle.classList.add("loaded")
  if (heroButtons) heroButtons.classList.add("loaded")

  /* === PARALLAX EFFECT === */
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".floating-element")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  })
})
