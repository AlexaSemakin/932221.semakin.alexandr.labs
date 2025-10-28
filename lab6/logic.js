const root = document.body
const tabs = document.querySelectorAll('.tab')

tabs.forEach(b => b.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'))
  b.classList.add('active')
  root.className = b.dataset.mode
}))
