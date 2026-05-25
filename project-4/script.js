const input = document.getElementById('colorInput');
const addBtn = document.getElementById('add');
const clearBtn = document.getElementById('clear');
const swatches = document.getElementById('swatches');

function normalize(hex){
  if(!hex) return null;
  hex = hex.trim().toLowerCase();
  if(hex[0]!=='#') hex = '#'+hex;
  if(/^#[0-9a-f]{3}$/.test(hex)) hex = '#'+hex.slice(1).split('').map(c=>c+c).join('');
  if(/^#[0-9a-f]{6}$/.test(hex)) return hex;
  return null;
}

function createSwatch(hex){
  const li = document.createElement('li');
  li.className = 'swatch';
  li.innerHTML = `<div class="color" style="background:${hex}"></div><div class="meta"><span class="code">${hex}</span><small class="hint">Copy</small></div>`;
  li.addEventListener('click', async ()=>{
    try{await navigator.clipboard.writeText(hex); alert(hex + ' copied to clipboard');}
    catch(e){prompt('Copy this color:', hex)}
  });
  return li;
}

function save(){
  const arr = Array.from(swatches.querySelectorAll('.code')).map(s=>s.textContent);
  localStorage.setItem('project4.swatches', JSON.stringify(arr));
}

function load(){
  const raw = localStorage.getItem('project4.swatches');
  if(!raw) return;
  try{JSON.parse(raw).forEach(h=>swatches.appendChild(createSwatch(h)))}catch(e){}
}

addBtn.addEventListener('click', ()=>{
  const val = normalize(input.value);
  if(!val){alert('Enter a valid hex color like #3498db'); return}
  swatches.appendChild(createSwatch(val));
  save(); input.value=''; input.focus();
});

clearBtn.addEventListener('click', ()=>{swatches.innerHTML=''; save();});

input.addEventListener('keydown', (e)=>{ if(e.key==='Enter') addBtn.click(); });

// seed
load();
