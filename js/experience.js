(() => {
  const sections=[...document.querySelectorAll('[data-chapter]')];
  const bg=document.querySelector('.ambient-bg');
  const pill=document.querySelector('.cv-pill');
  const rail=document.querySelector('.phrase-rail');
  const artSection=document.querySelector('#art');
  const strategySection=document.querySelector('#strategy');
  const artAssets=[...document.querySelectorAll('.art-asset')];
  const techAssets=[...document.querySelectorAll('.tech-asset')];
  const mountains=document.querySelector('.mountains');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const colors=[[246,241,232],[244,236,221],[213,224,221],[13,27,42],[6,8,13]];
  const mix=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t));
  const colorAt=p=>{const s=clamp(p,0,.9999)*(colors.length-1),i=Math.floor(s),t=s-i;return mix(colors[i],colors[Math.min(i+1,colors.length-1)],t)};
  const smootherstep=t=>t*t*t*(t*(t*6-15)+10);

  /*
    Four hero ART elements receive a long, subtle secondary parallax pass.
    Instead of quick independent bursts, each layer now drifts across a much
    broader portion of the ART chapter, with only a light stagger between them.
    This creates a slower cinematic sweep while preserving depth.

    yVh = total additional travel, expressed as viewport-height percentage.
    Positive values travel down; negative values travel up.
  */
  const artHeroMotion={
    'art-skull':      {start:.47,end:.82,yVh:22},
    'art-bg-flowers': {start:.49,end:.85,yVh:-24},
    'art-bg-blocks':  {start:.51,end:.88,yVh:-21},
    'art-stack':      {start:.53,end:.90,yVh:18}
  };

  const heroYOffset=(el,local)=>{
    if(innerWidth<1500 || innerHeight<800) return 0;
    const key=Object.keys(artHeroMotion).find(cls=>el.classList.contains(cls));
    if(!key) return 0;
    const cfg=artHeroMotion[key];
    const t=clamp((local-cfg.start)/(cfg.end-cfg.start),0,1);
    return innerHeight*(cfg.yVh/100)*smootherstep(t);
  };

  /*
    BUSINESS STRATEGY uses the supplied foreground mountain cutout as a second
    depth plane. The two layers only drift by a handful of pixels across the
    chapter: a restrained lateral helicopter glide rather than an obvious
    animation. The near ridge moves slightly farther than the distant range.
  */
  let mountainForeground=null;
  if(mountains&&strategySection){
    mountainForeground=document.createElement('img');
    mountainForeground.src='assets/strategy/mountains-foreground.webp';
    mountainForeground.alt='';
    mountainForeground.setAttribute('aria-hidden','true');
    mountainForeground.decoding='async';
    mountainForeground.style.cssText='position:absolute;z-index:0;inset:-2%;width:104%;height:104%;object-fit:cover;object-position:center 58%;pointer-events:none;will-change:transform;';
    mountains.insertAdjacentElement('afterend',mountainForeground);
  }

  const applyMountainParallax=()=>{
    if(!mountains||!strategySection)return;
    const r=strategySection.getBoundingClientRect();
    const local=clamp((innerHeight-r.top)/(innerHeight+r.height),0,1);
    const sweep=smootherstep(local)-.5;

    /* distant range: almost imperceptible camera drift */
    const farX=sweep*-8;
    const farY=sweep*6;
    const farScale=1.014+local*.0025;
    const farRotate=sweep*.045;
    mountains.style.transform=`translate3d(${farX}px,${farY}px,0) scale(${farScale}) rotate(${farRotate}deg)`;

    /* foreground ridge: just enough differential travel to create real depth */
    if(mountainForeground){
      const nearX=sweep*14;
      const nearY=sweep*9;
      const nearScale=1.018+local*.0035;
      const nearRotate=sweep*.07;
      mountainForeground.style.transform=`translate3d(${nearX}px,${nearY}px,0) scale(${nearScale}) rotate(${nearRotate}deg)`;
    }
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
        applyMountainParallax();
      }
      ticking=false;
    });
  };

  addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',onScroll,{passive:true});
  onScroll();
})();
