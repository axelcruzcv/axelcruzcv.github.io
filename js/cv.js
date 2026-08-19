(() => {
  const items=[...document.querySelectorAll('.reveal,.reveal-card')];
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){items.forEach(el=>el.classList.add('visible'));return}
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -7% 0px'});
  items.forEach((el,i)=>{if(el.classList.contains('reveal-card'))el.style.transitionDelay=`${(i%5)*55}ms`;io.observe(el)});
})();
