import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="gallery"
export default class extends Controller {
  static targets = ["panel"]
  connect() {
    this.panelTargets.forEach(panel => {
      if (panel.dataset.category === "koukoku") {
        panel.classList.remove("opacity-0")
        panel.classList.add("opacity-100")
      } else {
        panel.classList.remove("opacity-100")
        panel.classList.add("opacity-0")
      }
    })
  }
  show(e){
    const category = e.currentTarget.dataset.category
    this.panelTargets.forEach(panel => {
      if (panel.dataset.category === category) {
        panel.classList.remove("opacity-0")
        panel.classList.add("opacity-100")
      } else {
        panel.classList.remove("opacity-100")
        panel.classList.add("opacity-0")
      }
    })
  }
}
