const stage = document.getElementById('stage')
const countInput = document.getElementById('count')

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    spawnShapes(btn.dataset.shape, +countInput.value || 1)
  })
})

stage.addEventListener('click', e => {
  const el = e.target.closest('.shape')
  if (!el) return
  document.querySelectorAll('.shape.selected').forEach(s => s.classList.remove('selected'))
  el.classList.add('selected')
})

stage.addEventListener('dblclick', e => {
  const el = e.target.closest('.shape')
  if (!el) return
  el.remove()
})

function spawnShapes(type, n) {
  const rect = stage.getBoundingClientRect()
  for (let i = 0; i < n; i++) {
    const el = createShape(type)
    const size = rand(30, 180)
    setShapeSize(el, type, size)
    stage.appendChild(el)
    const w = el.offsetWidth, h = el.offsetHeight
    const x = rand(0, Math.max(0, rect.width - w))
    const y = rand(0, Math.max(0, rect.height - h))
    el.style.left = `${x}px`
    el.style.top = `${y}px`
  }
}

function createShape(type) {
  const el = document.createElement('div')
  el.className = `shape ${type}`
  return el
}

function setShapeSize(el, type, size) {
  if (type === 'square' || type === 'circle') {
    el.style.width = `${size}px`
    el.style.height = `${size}px`
  } else if (type === 'triangle') {
    const base = Math.round(size * 1.2)
    const height = Math.round(size * 1.5)
    el.style.borderLeftWidth = `${Math.round(base / 2)}px`
    el.style.borderRightWidth = `${Math.round(base / 2)}px`
    el.style.borderBottomWidth = `${height}px`
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
