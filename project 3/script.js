const input = document.getElementById('newText');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const list = document.getElementById('list');

function createItem(text){
  const li = document.createElement('li');
  li.className = 'item';
  const span = document.createElement('span');
  span.textContent = text;
  const btn = document.createElement('button');
  btn.textContent = 'Remove';
  btn.addEventListener('click',()=>li.remove());
  li.appendChild(span);li.appendChild(btn);
  return li;
}

addBtn.addEventListener('click',()=>{
  const v = input.value.trim();
  if(!v) return;
  list.appendChild(createItem(v));
  save();
  input.value='';
  input.focus();
});

input.addEventListener('keydown',(e)=>{if(e.key==='Enter') addBtn.click();});

// seed demo data
['Welcome to Project 3','Try adding notes'].forEach(t=>list.appendChild(createItem(t)));

function save(){
  const arr = Array.from(list.querySelectorAll('.item > span')).map(s=>s.textContent);
  localStorage.setItem('project3.notes',JSON.stringify(arr));
}

function load(){
  const raw = localStorage.getItem('project3.notes');
  if(!raw) return;
  try{JSON.parse(raw).forEach(t=>list.appendChild(createItem(t)))}catch(e){}
}

load();

clearBtn.addEventListener('click',()=>{
  list.innerHTML='';
  save();
  input.focus();
});
