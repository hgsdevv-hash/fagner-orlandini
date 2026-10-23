// Abertura: espera a logo se montar, passa a faixa amarela e libera a página
const intro = document.getElementById('intro');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function done() {
  intro.classList.add('is-gone');
  document.body.classList.remove('is-loading');
  document.body.classList.add('is-ready');
}

if (reduce || sessionStorage.getItem('fo-intro')) {
  done();
} else {
  setTimeout(() => {
    intro.classList.add('is-out');
    setTimeout(done, 1000);
  }, 2600);
  try { sessionStorage.setItem('fo-intro', '1'); } catch (e) {}
}

// Revela blocos ao rolar
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.section__head, .card, .steps li, .gallery figure, .split__shirt, .about > *')
  .forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
    io.observe(el);
  });
