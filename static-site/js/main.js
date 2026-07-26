// ===== Slideshow (Ken Burns crossfade, one instance per [data-slideshow]) =====
document.querySelectorAll("[data-slideshow]").forEach(section => {
  const slides = section.querySelectorAll(".slide")
  if (slides.length < 2) return
  let current = 0
  setInterval(() => {
    const outgoing = slides[current]
    // Freeze the outgoing slide's transform so it doesn't snap back during the fade
    outgoing.style.transform = getComputedStyle(outgoing).transform
    outgoing.classList.remove("active")
    current = (current + 1) % slides.length
    slides[current].style.transform = ""
    slides[current].classList.add("active")
  }, 7500)
})

// ===== Gallery (tab switching + masonry row spans) =====
const gallery = document.querySelector("[data-gallery]")
if (gallery) {
  const panels = gallery.querySelectorAll("[data-gallery-panel]")
  const buttons = gallery.querySelectorAll("[data-gallery-button]")

  function setSpans(panel) {
    if (window.innerWidth < 768) return
    const rowHeight = 10
    const gap = 12
    const colWidth = panel.offsetWidth / 3
    panel.querySelectorAll("img").forEach(img => {
      const applySpan = () => {
        const spans = Math.ceil((img.naturalHeight / img.naturalWidth * colWidth + gap) / (rowHeight + gap))
        img.style.gridRowEnd = `span ${spans}`
      }
      if (img.complete && img.naturalHeight > 0) {
        applySpan()
      } else {
        img.addEventListener("load", applySpan, { once: true })
      }
    })
  }

  function show(category) {
    panels.forEach(panel => {
      if (panel.dataset.category === category) {
        panel.classList.remove("opacity-0", "h-0", "overflow-hidden", "pointer-events-none")
        panel.classList.add("opacity-100")
        requestAnimationFrame(() => setSpans(panel))
      } else {
        panel.classList.remove("opacity-100")
        panel.classList.add("opacity-0", "h-0", "overflow-hidden", "pointer-events-none")
      }
    })
    buttons.forEach(button => {
      if (button.dataset.category === category) {
        button.classList.add("bg-white", "text-black")
        button.classList.remove("bg-black", "text-white")
      } else {
        button.classList.remove("bg-white", "text-black")
        button.classList.add("bg-black", "text-white")
      }
    })
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => show(button.dataset.category))
  })

  show("beauty")
}

// ===== Mobile nav toggle =====
const navToggle = document.querySelector("[data-nav-toggle]")
const navMenu = document.querySelector("[data-nav-menu]")
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = !navMenu.classList.toggle("hidden")
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false")
  })
  // Close the menu when a link is tapped (mobile)
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        navMenu.classList.add("hidden")
        navToggle.setAttribute("aria-expanded", "false")
      }
    })
  })
}

// ===== Open all <details> accordions by default on desktop =====
if (window.innerWidth >= 768) {
  document.querySelectorAll("details").forEach(d => { d.open = true })
}

// ===== Auto-updating copyright year =====
const year = document.getElementById("year")
if (year) year.textContent = new Date().getFullYear()
