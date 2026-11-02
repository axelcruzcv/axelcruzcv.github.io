'use strict';
(()=>{
 const host=document.querySelector('#people-network'),header=document.querySelector('.topbar'),editor=document.querySelector('#team .count-editor');
 const layer=document.createElement('div');layer.className='team-map-layer';layer.hidden=true;document.body.append(layer);
 const dock=document.createElement('div');dock.className='team-scale-dock';dock.hidden=true;dock.setAttribute('role','group');dock.setAttribute('aria-label','Configure the growing team');
 dock.innerHTML='<span class="team-scale-label">TEAM <span>MAKE ROOM.</span></span><label class="team-scale-specialty"><span class="team-sr-only">Specialty</span><select id="team-live-specialty">'+people.map((p,i)=>'<option value="'+i+'">'+esc(p.name)+'</option>').join('')+'</select></label><div class="team-scale-number"><button type="button" data-team-step="-1" aria-label="Remove collaborators">−</button><label><span class="team-sr-only">Collaborators in the selected specialty</span><input id="team-live-count" type="number" inputmode="numeric" min="0" step="1" value="0"></label><button type="button" data-team-step="1" aria-label="Add collaborators">+</button></div><button type="button" class="team-dock-export">PNG ↓</button><button type="button" class="team-dock-reset">Reset ↺</button>';
 header.append(dock);
 const choice=dock.querySelector('select'),field=dock.querySelector('input'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let teamVisible=document.body.dataset.chapter==='team',svg=null,current=teamMapNodes(people,{}),frame=0,followFrame=0,holdTimer=0,repeated=false;
 const isReduced=()=>reduced.matches||document.documentElement.classList.contains('reduce-motion');
 const hasCounts=()=>people.some(p=>teamMapCount(counts[p.id])>0);
 function revealMap(){
  if(!teamVisible)return;
  const rect=host.getBoundingClientRect(),edge=header.getBoundingClientRect().bottom;
  if(rect.bottom<edge+40||rect.top>innerHeight-80)host.scrollIntoView({block:'center',behavior:isReduced()?'instant':'smooth'});
 }
 function stopHold(){clearTimeout(holdTimer);holdTimer=0;}
 function position(){
  followFrame=0;if(!svg||layer.hidden)return;
  const source=host.querySelector('svg'),rect=source.getBoundingClientRect();
  svg.style.left=rect.left+'px';svg.style.top=rect.top+'px';svg.style.width=rect.width+'px';svg.style.height=rect.height+'px';
 }
 function follow(){if(!followFrame)followFrame=requestAnimationFrame(position);}
 function paint(nodes){
  if(!svg)return;
  for(const n of nodes){
   const g=svg.querySelector('[data-person="'+n.i+'"]');g.setAttribute('transform','translate('+n.x+' '+n.y+')');g.querySelector('circle').setAttribute('r',n.r);
   const line=svg.querySelector('[data-team-link="'+n.i+'"]');line.setAttribute('d','M450 390 Q'+(450+n.x)/2+' '+(390+(n.y-390)*.25)+' '+n.x+' '+n.y);
  }
 }
 function sync(){
  const growing=teamVisible&&hasCounts(),showDock=teamVisible&&(editor.open||growing);
  dock.hidden=!showDock;document.body.classList.toggle('team-configuring',showDock);document.body.classList.toggle('team-map-expanded',growing);
  choice.value=selectedPerson;dock.style.setProperty('--team-live-color',teamMapColor(people[selectedPerson].area));
  dock.style.setProperty('--team-live-label',teamMapMix(teamMapColor(people[selectedPerson].area),'#f5f1e8',.45));
  if(document.activeElement!==field)field.value=teamMapCount(counts[people[selectedPerson].id]);
  if(frame)cancelAnimationFrame(frame);frame=0;
  const source=host.querySelector('svg');
  if(!growing){
   layer.hidden=true;layer.replaceChildren();svg=null;source.removeAttribute('aria-hidden');source.style.visibility='';current=teamMapNodes(people,counts);return;
  }
  const targets=teamMapNodes(people,counts),from=current.map(n=>({...n}));
  svg=source.cloneNode(true);svg.removeAttribute('aria-hidden');svg.style.visibility='';source.style.visibility='hidden';source.setAttribute('aria-hidden','true');
  layer.replaceChildren(svg);layer.hidden=false;position();
  if(isReduced()){current=targets;paint(current);return;}
  const start=performance.now();
  function animate(now){
   const t=Math.min(1,(now-start)/430),ease=1-Math.pow(1-t,3);
   current=targets.map((n,i)=>({...n,x:from[i].x+(n.x-from[i].x)*ease,y:from[i].y+(n.y-from[i].y)*ease,r:from[i].r+(n.r-from[i].r)*ease}));paint(current);
   if(t<1)frame=requestAnimationFrame(animate);else frame=0;
  }
  paint(from);frame=requestAnimationFrame(animate);
 }
 function reset(){stopHold();repeated=false;resetTeamCounts();field.value='0';}
 function visibility(page){
  const next=page==='team';
  if(teamVisible&&!next){teamVisible=false;reset();}else{teamVisible=next;sync();}
 }
 function change(delta){const id=people[selectedPerson].id,n=teamMapCount(counts[id]);setTeamCount(id,Math.max(0,Math.min(Number.MAX_SAFE_INTEGER,n+delta)));field.value=teamMapCount(counts[id]);revealMap();}
 choice.addEventListener('change',()=>{selectedPerson=Number(choice.value);renderNetwork();revealMap();});
 field.addEventListener('input',()=>{setTeamCount(people[selectedPerson].id,field.valueAsNumber);revealMap();});
 field.addEventListener('change',()=>{field.value=teamMapCount(counts[people[selectedPerson].id]);});
 dock.querySelectorAll('[data-team-step]').forEach(button=>{
  button.addEventListener('click',()=>{if(repeated){repeated=false;return;}change(Number(button.dataset.teamStep));});
  button.addEventListener('pointerdown',e=>{
   if(e.button!==0)return;stopHold();repeated=false;const start=performance.now(),direction=Number(button.dataset.teamStep);
   function repeat(){const elapsed=performance.now()-start,step=elapsed<1200?1:elapsed<2200?5:elapsed<3500?25:100;repeated=true;change(direction*step);holdTimer=setTimeout(repeat,90);}
   holdTimer=setTimeout(repeat,350);
  });
 });
 document.addEventListener('pointerup',stopHold);document.addEventListener('pointercancel',()=>{stopHold();repeated=false;});window.addEventListener('blur',()=>{stopHold();repeated=false;});
 dock.querySelector('.team-dock-reset').addEventListener('click',()=>{reset();(dock.hidden?editor.querySelector('summary'):dock.querySelector('.team-dock-reset')).focus({preventScroll:true});});
 dock.querySelector('.team-dock-export').addEventListener('click',()=>document.querySelector('#download-team').click());
 function selectNode(e){const g=e.target.closest('[data-person]');if(!g)return;selectedPerson=Number(g.dataset.person);renderNetwork();if(e.type==='keydown')svg?.querySelector('[data-person="'+selectedPerson+'"]').focus({preventScroll:true});}
 layer.addEventListener('click',selectNode);layer.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();selectNode(e);}});
 editor.addEventListener('toggle',()=>{
  sync();
  if(editor.open&&teamVisible)requestAnimationFrame(()=>{host.scrollIntoView({block:'center',behavior:isReduced()?'instant':'smooth'});choice.focus({preventScroll:true});});
 });
 window.addEventListener('command-team-map',sync);
 window.addEventListener('command-will-navigate',e=>visibility(e.detail.page));
 window.addEventListener('command-chapter',e=>visibility(e.detail.page));
 window.addEventListener('scroll',follow,{passive:true});window.addEventListener('resize',follow);
 new ResizeObserver(follow).observe(header);new ResizeObserver(follow).observe(host);
 reduced.addEventListener('change',sync);sync();
})();
