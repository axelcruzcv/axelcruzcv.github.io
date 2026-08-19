(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a.page-link').forEach(link=>{
    link.addEventListener('click',e=>{
      const url=link.href;
      if(!url || reduced) return;
      e.preventDefault();
      document.body.classList.add('page-leave');
      sessionStorage.setItem('axel-transition','1');
      setTimeout(()=>location.href=url,590);
    });
  });
  if(sessionStorage.getItem('axel-transition')){
    sessionStorage.removeItem('axel-transition');
    document.documentElement.animate(
      [{opacity:.2,filter:'blur(3px)'},{opacity:1,filter:'blur(0)'}],
      {duration:420,easing:'cubic-bezier(.2,.7,.2,1)'}
    );
  }
})();