const leftEl = document.getElementById('disp-left');
const rightEl = document.getElementById('disp-right');
const grid = document.querySelector('.calc-grid');

let expr = '0';

function render(){
  const m = expr.match(/^(.+ [+\-*/] )(.*)$/);
  if (m && m[2].length > 0){
    leftEl.textContent = m[1];
    rightEl.textContent = m[2];
  } else {
    leftEl.textContent = '';
    rightEl.textContent = expr;
  }
}

function setExpr(v){ expr = v; render(); }

function hasOpAndSecond(){
  const m = expr.match(/^(.+?) ([+\-*/]) (.+)$/);
  return m && m[3] !== '';
}

function evalSafe(s){
  const safe = s.replace(/\s+/g,'');
  if (!safe || /[+\-*/.]$/.test(safe)) return null;
  try{ return Function(`return (${safe})`)(); }catch(e){ return null; }
}

function appendDigit(d){
  if (expr === '0' && d !== '.') expr = '';
  if (d === '.'){
    const lastToken = expr.split(/ [+\-*/] /).pop();
    if (lastToken.includes('.')) return;
  }
  expr += d;
  render();
}

function appendOp(op){
  if (expr === '0') return;

  if (/\s[+\-*/]\s$/.test(expr)){
    expr = expr.slice(0, -3) + ` ${op} `;
    render();
    return;
  }

  if (hasOpAndSecond()){
    const res = evalSafe(expr);
    if (res !== null){
      expr = String(res) + ` ${op} `;
      render();
      return;
    }
  }

  expr += ` ${op} `;
  render();
}

function clearAll(){
  setExpr('0');
}

function backspace(){
  if (expr.length <= 1){ clearAll(); return; }
  expr = expr.slice(0, -1);
  expr = expr.replace(/\s{2,}$/, ' ');
  if (/^\s*[+\-*/]\s*$/.test(expr)) expr = expr.trimEnd();
  if (expr === '' || expr === ' ') expr = '0';
  render();
}

function calc(){
  const res = evalSafe(expr);
  if (res === null) return;
  setExpr(String(res));
}

grid.addEventListener('click', e=>{
  const b = e.target.closest('button');
  if(!b) return;
  const d = b.getAttribute('data-v');
  const op = b.getAttribute('data-op');
  const act = b.getAttribute('data-act');
  if (d !== null) appendDigit(d);
  else if (op !== null) appendOp(op);
  else if (act === 'clear') clearAll();
  else if (act === 'back') backspace();
  else if (act === 'eq') calc();
});

render();
