const input = document.getElementById('newText');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const list = document.getElementById('list');
const countEl = document.getElementById('count');

function createItem(text) {
    const li = document.createElement('li');
    li.className = 'item';
    const span = document.createElement('span');
        span.textContent = text; 
    const time = document.createElement('small');
    time.style.marginLeft = '12px';
    time.style.color = '#666';
    time.textContent = new Date().toLocaleTimeString();
        const btn = document.createElement('button'); 
        btn.textContent = 'Remove'; 
        btn.addEventListener('click', () => { li.remove(); save(); updateCount(); });
        span.addEventListener('dblclick', () => {
            const val = span.textContent; 
            const inp = document.createElement('input'); 
            inp.value = val; 
            span.replaceWith(inp); 
            inp.focus(); 
            inp.addEventListener('blur', () => { span.textContent = inp.value; inp.replaceWith(span); save(); });
        });
    const left = document.createElement('div');
    left.style.display = 'flex';
    left.style.alignItems = 'center';
    left.appendChild(span); left.appendChild(time);
    li.appendChild(left); li.appendChild(btn);
    return li;
}

addBtn.addEventListener('click', () => {
    const v = input.value.trim();
    if (!v) return;
    const it = createItem(v);
    it.classList.add('added');
    list.appendChild(it);
    setTimeout(()=>it.classList.remove('added'),20);
    save();
    input.value = '';
    input.focus();
});

input.addEventListener('keydown', (e) => { if (e.key === 'Enter') addBtn.click(); });

// seed demo data
['Welcome to Project 3', 'Try adding notes'].forEach(t => list.appendChild(createItem(t)));

function save() {
    const arr = Array.from(list.querySelectorAll('.item > span')).map(s => s.textContent);
    localStorage.setItem('project3.notes', JSON.stringify(arr));
}

function load() {
    const raw = localStorage.getItem('project3.notes');
    if (!raw) return;
    try { JSON.parse(raw).forEach(t => list.appendChild(createItem(t))) } catch (e) { }
}

load();

function updateCount() {
    countEl.textContent = list.querySelectorAll('.item').length;
}
const origCreate = createItem;
createItem = function (text) {
    const el = origCreate(text);
    // ensure count updates when items change
    el.querySelector('button').addEventListener('click', () => setTimeout(updateCount, 0));
    return el;
}
updateCount();

clearBtn.addEventListener('click', () => {
    list.innerHTML = '';
    save();
    input.focus();
});
