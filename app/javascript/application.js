// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import AOS from "aos"

AOS.init({
  startEvent: "turbo:load",
  once: true,
  offset: 0
})

// Enable browser's native scroll restoration (like Next.js)
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'auto';
}