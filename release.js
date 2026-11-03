'use strict';
(()=>{
 const button=document.querySelector('#site-motion');
 function sync(){const reduced=energyReduced.matches;button.setAttribute('aria-pressed',String(reduced));button.textContent=reduced?'Motion reduced':'Motion on';button.title=reduced?'Enable animations':'Reduce animations';}
 button.addEventListener('click',()=>setCommandMotion(!energyReduced.matches));
 energyReduced.addEventListener('change',sync);sync();
})();

// Use the site's existing GA4 connection; send interaction names and case IDs only.
(()=>{
 function emit(name,params={}){if(typeof window.gtag==='function')window.gtag('event',name,{...params,send_to:'G-WQ5RT0GT5M'});}
 let inCV=false;
 function route(detail){
  if(detail.experience==='cv'&&!inCV)emit('cv_view');
  inCV=detail.experience==='cv';
  if(detail.caseId)emit('case_open',{case_id:detail.caseId});
 }
 window.addEventListener('command-route',event=>route(event.detail));
 route({experience:document.body.dataset.experience});
 document.addEventListener('click',event=>{
  const target=event.target.closest('a,button');if(!target)return;
  if(target.id==='launch-game')emit('pm_game_open');
  if(target.matches('a[href^="mailto:"]'))emit('contact_click');
  if(target.matches('a[download]')){
   const name=target.getAttribute('download')||'';
   emit('download_click',{asset:name==='Axel_Cruz_Professional_CV.pdf'?'cv':name==='Axel_Cruz_Team.png'?'team_map':'team_reminder'});
  }
 });
})();
