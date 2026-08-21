(() => {
  const sections=[...document.querySelectorAll('[data-chapter]')];
  const bg=document.querySelector('.ambient-bg');
  const pill=document.querySelector('.cv-pill');
  const rail=document.querySelector('.phrase-rail');
  const artSection=document.querySelector('#art');
  const artAssets=[...document.querySelectorAll('.art-asset')];
  const techAssets=[...document.querySelectorAll('.tech-asset')];
  const mountains=document.querySelector('.mountains');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const colors=[[246,241,232],[244,236,221],[213,224,221],[13,27,42],[6,8,13]];
  const mix=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t));
  const colorAt=p=>{const s=clamp(p,0,.9999)*(colors.length-1),i=Math.floor(s),t=s-i;return mix(colors[i],colors[Math.min(i+1,colors.length-1)],t)};
  const smoothstep=t=>t*t*(3-2*t);

  /*
    Four hero ART elements receive a stronger vertical parallax pass.
    Their total travel stays the same, but their timing is intentionally
    staggered so they do not feel like one synchronized animation.

    Skull moves first and quickly.
    Flowers follow shortly after.
    Blocks begin later and travel over a longer window.
    Stack enters last, creating a second wave of depth through the paragraph.

    yVh = total additional travel, expressed as viewport-height percentage.
    Positive values travel down; negative values travel up.
  */
  const artHeroMotion={
    'art-skull':      {start:.47,end:.61,yVh:34},
    'art-bg-flowers': {start:.52,end:.67,yVh:-38},
    'art-bg-blocks':  {start:.56,end:.76,yVh:-33},
    'art-stack':      {start:.61,end:.79,yVh:27}
  };

  const heroYOffset=(el,local)=>{
    if(innerWidth<1500 || innerHeight<800) return 0;
    const key=Object.keys(artHeroMotion).find(cls=>el.classList.contains(cls));
    if(!key) return 0;
    const cfg=artHeroMotion[key];
    const t=clamp((local-cfg.start)/(cfg.end-cfg.start),0,1);
    return innerHeight*(cfg.yVh/100)*smoothstep(t);
  };

  const phrases=['art','tech','strategy'].map(key=>({
    key,
    node:document.querySelector(`.source-statement[data-key="${key}"]`),
    home:document.querySelector(`.statement-home[data-home="${key}"]`),
    slot:document.querySelector(`.phrase-slot[data-slot="${key}"]`),
    docked:false
  }));
  const sep1=document.querySelector('[data-sep="art-tech"]');
  const sep2=document.querySelector('[data-sep="tech-strategy"]');
  let current='intro',transitioning=false;

  const relocate=(moves)=>{
    if(!moves.length) return;
    const mutate=()=>moves.forEach(({item,toDock})=>{
      (toDock?item.slot:item.home).appendChild(item.node);
      item.docked=toDock;
    });
    if(!reduced && document.startViewTransition && !transitioning){
      transitioning=true;
      const vt=document.startViewTransition(mutate);
      vt.finished.finally(()=>{transitioning=false;updateDocking(true)});
    }else mutate();
  };

  const updateSeparators=()=>{
    sep1.classList.toggle('visible',phrases[0].docked&&phrases[1].docked);
    sep2.classList.toggle('visible',phrases[1].docked&&phrases[2].docked);
  };

  const updateDocking=(force=false)=>{
    if(transitioning&&!force) return;
    const railRect=rail.getBoundingClientRect();
    const dockY=railRect.top+railRect.height+5;
    const hysteresis=54;
    const moves=[];
    phrases.forEach(item=>{
      const homeRect=item.home.getBoundingClientRect();
      const wantDock=item.docked ? homeRect.top<dockY+hysteresis : homeRect.top<=dockY;
      if(wantDock!==item.docked) moves.push({item,toDock:wantDock});
    });
    relocate(moves);
    updateSeparators();
  };

  const observer=new IntersectionObserver(entries=>{
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(!visible)return;
    current=visible.target.dataset.chapter;
    document.body.classList.toggle('dark-chapter',current==='strategy'||current==='outcome');
    document.body.classList.toggle('final-chapter',current==='outcome');
    pill.classList.toggle('visible',current!=='intro');
  },{threshold:[.35,.55,.7]});
  sections.forEach(s=>observer.observe(s));

  const applyParallax=(els,section,xFactor,strongArt=false)=>{
    if(!section)return;
    const r=section.getBoundingClientRect();
    const local=(innerHeight-r.top)/(innerHeight+r.height);
    els.forEach((el,i)=>{
      const depth=parseFloat(el.dataset.depth||'.1');
      const baseY=(local-.5)*innerHeight*depth*1.1;
      const extraY=strongArt?heroYOffset(el,local):0;
      const x=Math.sin((local+i*.17)*Math.PI)*innerWidth*depth*xFactor*(i%2?1:-1);
      el.style.transform=`translate3d(${x}px,${baseY+extraY}px,0)`;
    });
  };

  let ticking=false;
  const onScroll=()=>{
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(()=>{
      const max=document.documentElement.scrollHeight-innerHeight;
      const p=max?scrollY/max:0;
      const c=colorAt(p);
      bg.style.backgroundColor=`rgb(${c.join(',')})`;
      updateDocking();

      if(!reduced){
        applyParallax(artAssets,artSection,.035,true);
        applyParallax(techAssets,document.querySelector('#technology'),.018,false);

        if(mountains){
          const r=document.querySelector('#strategy').getBoundingClientRect();
          const local=(innerHeight-r.top)/(innerHeight+r.height);
          mountains.style.transform=`translate3d(0,${(local-.5)*18}px,0) scale(${1.005+local*.008})`;
        }
      }
      ticking=false;
    });
  };

  addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',onScroll,{passive:true});
  onScroll();
})();
