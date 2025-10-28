const list = document.getElementById('list')
const out = document.getElementById('out')
document.getElementById('add').addEventListener('click', () => addRow())
document.getElementById('save').addEventListener('click', () => save())

function addRow(name = '', value = '') {
  const row = document.createElement('div')
  row.className = 'row'
  row.innerHTML = `
    <input class="name" type="text" value="${name}">
    <input class="val" type="text" value="${value}">
    <div class="actions">
      <button data-act="up">↑</button>
      <button data-act="down">↓</button>
      <button data-act="del">x</button>
    </div>
  `
  list.appendChild(row)
}

list.addEventListener('click', e => {
  const btn = e.target.closest('button[data-act]')
  if (!btn) return
  const row = btn.closest('.row')
  if (!row) return
  const act = btn.dataset.act
  if (act === 'del') row.remove()
  else if (act === 'up' && row.previousElementSibling) row.parentNode.insertBefore(row, row.previousElementSibling)
  else if (act === 'down' && row.nextElementSibling) row.parentNode.insertBefore(row.nextElementSibling, row)
})

function save() {
  const data = [...list.querySelectorAll('.row')].map(r => ({
    [r.querySelector('.name').value.trim()]: r.querySelector('.val').value
  }))
  out.textContent = JSON.stringify(data, null, 2)
}

;[['Первый','123'],['Второй','456'],['Третий','789'],['Четвертый','012']].forEach(([n,v])=>addRow(n,v))
