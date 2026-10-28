'use strict';
// Shared journey and illustrations react to actual visitor selections.
const chapterData=[
 {id:'team',n:'01',name:'TEAM',purpose:'Working together',next:'CLIENT',caption:'YOU’VE MET THE PEOPLE. NEXT: THE CLIENT RELATIONSHIP.'},
 {id:'client',n:'02',name:'CLIENT',purpose:'Building trust',next:'DELIVERY',caption:'FROM THE NEED AND THE PROMISE TO THE WORK IT TAKES.'},
 {id:'delivery',n:'03',name:'DELIVERY',purpose:'Making it happen',next:'SYSTEMS',caption:'YOU’VE SEEN THE HANDOFFS. NOW EXPLORE THE CONNECTIONS.'},
 {id:'systems',n:'04',name:'SYSTEMS',purpose:'Connecting the pieces',next:null,caption:'A SHARED DIRECTION STARTS WITH A CONVERSATION.'}
];
function syncJourney(page){
 document.body.dataset.chapter=page;
 if(page!=='home')requestAnimationFrame(renderSystemWires);
 if(page==='delivery'&&$('#creative-detail').open)document.querySelectorAll('.art-stage img').forEach(img=>{img.loading='eager';img.decode().catch(()=>{});});
}
chapterData.forEach(function(c){
 const nav=$('#'+c.id+' .journey-nav');if(!nav)return;nav.dataset.journeyCaption=c.caption;
 const next=nav.querySelector('.next');
 if(next){const nextChapter=chapterData.find(function(x){return x.name===c.next;});next.innerHTML='CONTINUE TO '+c.next+' <span>'+nextChapter.n+' ↗</span>';}
 if(c.id==='systems'){const a=document.createElement('a');a.className='next';a.href='mailto:axelcruzmachado@gmail.com';a.innerHTML='LET’S TALK ABOUT YOUR TEAM <span>↗</span>';nav.append(a);}
});
window.addEventListener('command-route',e=>syncJourney(e.detail.page));
syncJourney(location.hash.slice(1).split('/')[0]||'home');
function stateEnter(selector){const el=$(selector);if(!el)return;el.classList.remove('state-enter');void el.offsetWidth;el.classList.add('state-enter');}
let previousDeliveryIndex=0;
function deliveryVisual(index){
 const colors=deliveryStageColors;
 const out=$('#delivery-visual');
 let svg='<svg viewBox="0 0 1000 190" role="group" aria-label="Select a delivery stage, or advance with the moving card"><defs><linearGradient id="handoff-line"><stop stop-color="#2e79b8"/><stop offset="1" stop-color="#fa746c"/></linearGradient></defs><path d="M85 112H920" stroke="#85bad044" stroke-width="1" fill="none"/>';
 for(let i=0;i<stages.length;i++){const x=85+i*(835/(stages.length-1));svg+='<g class="delivery-stop" role="button" tabindex="0" aria-label="'+stages[i].name+' stage" aria-pressed="'+(i===index)+'" data-stage="'+i+'"><rect x="'+(x-48)+'" y="88" width="96" height="83" rx="8" fill="transparent"/><circle cx="'+x+'" cy="112" r="'+(i===index?13:5)+'" fill="'+(i<=index?colors[i]:'#2b424f')+'"/><text x="'+x+'" y="155" text-anchor="middle" fill="'+(i===index?'#f5f1e8':'#9bb6c5')+'" font-family="IBM Plex Mono,monospace" font-size="11">'+stages[i].name.toUpperCase()+'</text></g>';}

 const center=85+index*(835/(stages.length-1)),previousCenter=85+previousDeliveryIndex*(835/(stages.length-1));previousDeliveryIndex=index;
 svg+='<g class="delivery-moving-card" data-stage-next role="button" tabindex="0" aria-label="Continue to '+stages[(index+1)%stages.length].name+'" transform="translate('+center+' 0)">'+(!energyReduced.matches?'<animateTransform attributeName="transform" type="translate" from="'+previousCenter+' 0" to="'+center+' 0" dur=".65s" fill="freeze"/>':'')+'<rect x="-64" y="25" width="128" height="55" rx="4" fill="'+colors[index]+'"/><path d="M-43 43h50m-50 9h55m-55 9h40m49-17 7 7-7 7" stroke="#13232d" stroke-width="2" fill="none"/><path d="M0 80v19" stroke="'+colors[index]+'" stroke-width="1.5"/></g><text x="965" y="31" text-anchor="end" fill="#91acbb" font-family="IBM Plex Mono,monospace" font-size="8">ONE DELIVERABLE / EXPLORABLE HANDOFF</text></svg>';
 out.innerHTML=svg;
 stateEnter('#delivery-detail');
}
window.addEventListener('command-stage',e=>deliveryVisual(e.detail.index));
deliveryVisual(0);
function stakeholderVisual(index){
 const a=-Math.PI/2+index*Math.PI*2/7,x=250+Math.cos(a)*175,y=250+Math.sin(a)*175;
 $('#stakeholder-visual').innerHTML='<svg viewBox="0 0 500 500"><circle class="meeting-ring" cx="250" cy="250" r="175"/><circle class="meeting-ring inner" cx="250" cy="250" r="115"/><path class="meeting-connection" d="M250 250L'+x+' '+y+'"/><circle class="meeting-core" cx="250" cy="250" r="59"/><text x="250" y="248" text-anchor="middle" class="meeting-axel">AXEL</text><text x="250" y="268" text-anchor="middle" class="meeting-align">CONNECT / ALIGN</text></svg>';
 stateEnter('#stakeholder-detail');
}
window.addEventListener('command-stakeholder',e=>stakeholderVisual(e.detail.index));stakeholderVisual(0);
function renderSystemWires(){
 const board=$('#architecture');if(!board||$('#work').hidden)return;
 board.querySelector('.system-wires')?.remove();
 const nodes=[...board.querySelectorAll('[data-node]')];if(nodes.length!==6)return;
 const r=board.getBoundingClientRect(),points=nodes.map(function(el){const b=el.getBoundingClientRect();return {x:b.x-r.x,y:b.y-r.y,w:b.width,h:b.height};});
 const links=systemView==='architecture'?(system==='hino'?[[0,2],[1,2],[2,3],[2,4],[5,2]]:system==='edenred'?[[0,1],[1,2],[1,3],[3,4],[4,0],[5,1]]:[[0,2],[1,2],[2,3],[2,5],[4,5]]):[[0,1],[1,2],[2,3],[3,4],[4,5]];
 let lines='';
 links.forEach(function(edge,k){
  const a=points[edge[0]],b=points[edge[1]],sameRow=Math.abs(a.y-b.y)<10;
  let x1,y1,x2,y2,d;
  if(sameRow&&Math.abs(a.x-b.x)>a.w*1.5){x1=a.x+a.w/2;y1=a.y;x2=b.x+b.w/2;y2=b.y;const lane=Math.min(a.y,b.y)-14-(k%2)*7;d='M'+x1+' '+y1+' V'+lane+' H'+x2+' V'+y2;}
  else if(sameRow){const right=b.x>a.x;x1=a.x+(right?a.w:0);y1=a.y+a.h/2;x2=b.x+(right?0:b.w);y2=b.y+b.h/2;const bend=(x1+x2)/2;d='M'+x1+' '+y1+' C'+bend+' '+y1+' '+bend+' '+y2+' '+x2+' '+y2;}
  else{x1=a.x+a.w/2;y1=a.y+a.h;x2=b.x+b.w/2;y2=b.y;const middle=(y1+y2)/2;d='M'+x1+' '+y1+' C'+x1+' '+middle+' '+x2+' '+middle+' '+x2+' '+y2;}
  const selected=edge.includes(systemNode),verify=systemView==='architecture'&&edge[0]===5;
  lines+='<path id="system-edge-'+k+'" class="system-wire'+(selected?' selected':'')+(verify?' verify':'')+'" d="'+d+'"/>';
  if(selected&&!energyReduced.matches)lines+='<circle class="system-packet" r="3"><animateMotion dur="2.8s" repeatCount="indefinite" path="'+d+'"/></circle>';
 });
 board.insertAdjacentHTML('afterbegin','<svg class="system-wires" viewBox="0 0 '+r.width+' '+r.height+'" aria-hidden="true">'+lines+'</svg>');
 stateEnter('#architecture-detail');
}
window.addEventListener('command-system',()=>requestAnimationFrame(renderSystemWires));
const architectureResize=new ResizeObserver(()=>{if(!$('#work').hidden)requestAnimationFrame(renderSystemWires);});
architectureResize.observe($('#architecture'));
window.addEventListener('resize',()=>{if(!$('#work').hidden)requestAnimationFrame(renderSystemWires);});
energyReduced.addEventListener('change',()=>{deliveryVisual(previousDeliveryIndex);if(!$('#work').hidden)renderSystemWires();if(specialtyModal.open&&activeArea)startSpecialtyEnergy(activeArea,null);});
// Small finite transitions on evidence updates, no automatic carousel movement.
$('#testimonial-prev').addEventListener('click',()=>stateEnter('#testimonial-copy'));
$('#testimonial-next').addEventListener('click',()=>stateEnter('#testimonial-copy'));
$('#people-network').addEventListener('click',()=>stateEnter('#network-detail'));
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopSpecialtyEnergy();else if(specialtyModal.open&&activeArea)startSpecialtyEnergy(activeArea,null);});


function syncMotionControl(){const b=$('#motion-toggle');b.setAttribute('aria-pressed',String(energyReduced.matches));b.disabled=energySystemMotion.matches;b.textContent=energySystemMotion.matches?'SYSTEM: REDUCED MOTION':'REDUCE MOTION';}
$('#motion-toggle').addEventListener('click',()=>{setCommandMotion(!energyReduced.matches);syncMotionControl();});
energySystemMotion.addEventListener('change',syncMotionControl);
syncMotionControl();

specialtyModal.addEventListener('scroll',()=>{if(energyReduced.matches&&activeArea)startSpecialtyEnergy(activeArea,null);});
window.addEventListener('resize',()=>{if(energyReduced.matches&&specialtyModal.open&&activeArea)startSpecialtyEnergy(activeArea,null);});

// Fit actual font metrics to the viewport, keeping both complete words legible.
// COMMAND naturally uses a larger type size because it has fewer letters.
let manifestoFitFrame=0;
function fitManifesto(){
 if($('#home').hidden)return;
 const frame=$('.home-manifesto'),title=$('#home-title'),viewport=document.documentElement.clientWidth;
 frame.style.setProperty('--manifesto-viewport',viewport+'px');
 const available=title.clientWidth-parseFloat(getComputedStyle(title).paddingLeft);
 if(available<=0)return;
 for(const line of title.children){
  const word=line.querySelector('.manifesto-word'),last=line.querySelector('.manifesto-last');
  const width=word.getBoundingClientRect().width,glyph=last.getBoundingClientRect().width;
  if(width<=0||glyph<=0)continue;
  const visibleWidth=width,size=parseFloat(getComputedStyle(line).fontSize);
  line.style.fontSize=(size*available*.975/visibleWidth).toFixed(3)+'px';
 }
}
function scheduleManifestoFit(){cancelAnimationFrame(manifestoFitFrame);manifestoFitFrame=requestAnimationFrame(fitManifesto);}
window.addEventListener('resize',scheduleManifestoFit);
window.addEventListener('command-route',e=>{if(e.detail.page==='home')scheduleManifestoFit();});
if(document.fonts){document.fonts.ready.then(scheduleManifestoFit);document.fonts.addEventListener('loadingdone',scheduleManifestoFit);}
scheduleManifestoFit();
