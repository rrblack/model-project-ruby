import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="gallery"
export default class extends Controller {
  static targets = ["panel", "button"]

  connect() {
    this.panelTargets.forEach(panel => {
      if (panel.dataset.category === "beauty") {
        panel.classList.remove("opacity-0", "h-0", "overflow-hidden", "pointer-events-none")
        panel.classList.add("opacity-100")
      } else {
        panel.classList.remove("opacity-100")
        panel.classList.add("opacity-0", "h-0", "overflow-hidden", "pointer-events-none")
      }
    })
  }

  show(e) {
    const category = e.currentTarget.dataset.category
    this.panelTargets.forEach(panel => {
      if (panel.dataset.category === category) {
        panel.classList.remove("opacity-0", "h-0", "overflow-hidden", "pointer-events-none")
        panel.classList.add("opacity-100")
      } else {
        panel.classList.remove("opacity-100")
        panel.classList.add("opacity-0", "h-0", "overflow-hidden", "pointer-events-none")
      }
    })
    this.buttonTargets.forEach(button => {
      if (button.dataset.category === category) {
        button.classList.add("bg-white", "text-black")
        button.classList.remove("bg-black", "text-white")
      } else {
        button.classList.remove("bg-white", "text-black")
        button.classList.add("bg-black", "text-white")
      }
    })
  }
}
