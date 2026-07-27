const entries = [
  {time:'2020', title:'Project start', desc:'Initial idea and planning.'},
  {time:'2021', title:'Prototype', desc:'Built a working prototype.'},
  {time:'2022', title:'Launch', desc:'Public launch and feedback.'}
];

const container = document.getElementById('timeline');
function render(){
  entries.forEach(e=>{
    const el = document.createElement('article');
    el.className = 'timeline-item fade-in';
    el.innerHTML = `<span class="timeline-marker" aria-hidden="true"></span><h3>${e.title} <small style="float:right;color:var(--muted)">${e.time}</small></h3><p>${e.desc}</p>`;
    container.appendChild(el);
  });
}

function observeInView(){
  const obs = new IntersectionObserver((items)=>{
    items.forEach(i=>{
      if(i.isIntersecting){i.target.classList.add('in-view');}
    });
  },{threshold:0.15});
  document.querySelectorAll('.timeline-item').forEach(n=>obs.observe(n));
}

document.addEventListener('DOMContentLoaded',()=>{render();observeInView();});
