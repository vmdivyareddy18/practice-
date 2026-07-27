const entries = [
    {time:'2020', title:'Project start', desc:'Initial idea and planning.'},
    {time:'2021', title:'Prototype', desc:'Built a working prototype.'},
    {time:'2022', title:'Launch', desc:'Public launch and feedback.'},
    {time:'2023', title:'Iteration', desc:'Improved interactions and accessibility.'}
];

entries.push({time:'2024', title:'Maintenance', desc:'Ongoing improvements and bug fixes.'});

function formatTime(t){
    // simple human-friendly formatting for demo
    if(/^[0-9]{4}$/.test(t)) return t;
    return String(t);
}

const container = document.getElementById('timeline');
function render() {
    entries.forEach(e => {
        const el = document.createElement('article');
        el.className = 'timeline-item fade-in';
        el.tabIndex = 0;
        el.setAttribute('role','article');
        el.innerHTML = `<span class="timeline-marker" aria-hidden="true"></span><h3>${e.title} <time datetime="${e.time}" style="float:right;color:var(--muted)">${formatTime(e.time)}</time></h3><p>${e.desc}</p>`;
        container.appendChild(el);
    });
}

function observeInView() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.timeline-item').forEach(n => n.classList.add('in-view'));
        return;
    }
    const obs = new IntersectionObserver((items, observer) => {
        items.forEach(i => {
            if (i.isIntersecting) { i.target.classList.add('in-view'); observer.unobserve(i.target); }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.timeline-item').forEach(n => obs.observe(n));
}

document.addEventListener('DOMContentLoaded', () => { render(); observeInView(); });
