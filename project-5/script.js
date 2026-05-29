const billEl = document.getElementById('bill');
const tipEl = document.getElementById('tip');
const peopleEl = document.getElementById('people');
const calcBtn = document.getElementById('calc');
const resetBtn = document.getElementById('reset');
const tipAmountEl = document.getElementById('tipAmount');
const perPersonEl = document.getElementById('perPerson');

function formatMoney(n){
  return '$' + Number(n).toFixed(2);
}

function calculate(){
  const bill = parseFloat(billEl.value) || 0;
  const tipPct = parseFloat(tipEl.value) || 0;
  const people = Math.max(1, parseInt(peopleEl.value) || 1);
  const tipAmount = bill * (tipPct/100);
  const total = bill + tipAmount;
  const perPerson = total / people;
  tipAmountEl.textContent = formatMoney(tipAmount);
  perPersonEl.textContent = formatMoney(perPerson);
}

calcBtn.addEventListener('click', (e)=>{ e.preventDefault(); calculate(); });
resetBtn.addEventListener('click', ()=>{ billEl.value=''; tipEl.value='15'; peopleEl.value='1'; tipAmountEl.textContent='—'; perPersonEl.textContent='—'; });

// keyboard: Enter on fields triggers calculate
[billEl, tipEl, peopleEl].forEach(el=>el.addEventListener('keydown',(e)=>{ if(e.key==='Enter'){ e.preventDefault(); calculate(); }}));

// seed example
billEl.placeholder = 'e.g. 42.50';
