import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="slideshow"
export default class extends Controller {
  connect() {
    this.slides = this.element.querySelectorAll(".slide")
    this.current = 0
    this.timer = setInterval(() => this.advance(), 7500 )
  }
  advance(){
    const outgoing = this.slides[this.current]
    const computed = getComputedStyle(outgoing).transform
    outgoing.style.transform = computed
    outgoing.classList.remove("active")
    this.current = (this.current + 1) % this.slides.length
    this.slides[this.current].style.transform = "" 
    this.slides[this.current].classList.add("active")
  }
  disconnect(){
    clearInterval(this.timer)
  }
}
