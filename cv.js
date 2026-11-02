'use strict';
(()=>{
 const page=document.querySelector('#cv');
 const lenses={
  all:{color:'#8dbdc1',tint:'#dce8e3',value:'15+',label:'concurrent projects',text:'Teams of up to 25 specialists, connected across creative, digital and learning delivery.',link:'#team',cta:'Meet the teams'},
  creative:{color:'#b94a40',tint:'#f0d9cf',value:'Cross-functional.',label:'creative delivery',text:'Video, animation, content and learning production, connected through briefs, review cycles and stakeholder decisions.',link:'#cv/case/kpmg',cta:'See creative delivery'},
  platforms:{color:'#2e557c',tint:'#d8e5e8',value:'14 days.',label:'documented platform recovery',text:'Hino and Edenred: engineering, QA, access validation and client communication brought into one recovery path.',link:'#cv/case/recovery',cta:'Open the recovery case'},
  client:{color:'#ad7d37',tint:'#f2e6bf',value:'~MXN 1.4M',label:'initial Hino LMS engagement',text:'From discovery and the commercial proposal to specialist delivery, continuing support and platform evolution.',link:'#cv/case/hino',cta:'Explore the engagement'},
  learning:{color:'#4f6c45',tint:'#e0e8d2',value:'38 dealers.',label:'Hino learning ecosystem',text:'Web, iOS and Android, certification workflows, reporting and 60+ WBT productions coordinated with specialists.',link:'#cv/case/hino',cta:'See the learning platform'}
 };
 function setLens(key){
  const lens=lenses[key];if(!lens)return;
  page.dataset.lens=key;page.style.setProperty('--cv-accent',lens.color);page.style.setProperty('--cv-tint',lens.tint);
  page.querySelectorAll('[data-cv-lens]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.cvLens===key)));
  page.querySelectorAll('[data-cv-areas]').forEach(f=>f.classList.toggle('is-match',key!=='all'&&f.dataset.cvAreas.split(' ').includes(key)));
  const proof=page.querySelector('#cv-focus-proof');
  proof.innerHTML='<strong>'+lens.value+'</strong><span>'+lens.label+'</span><p>'+lens.text+'</p><a href="'+lens.link+'">'+lens.cta+' ↗</a>';
  proof.classList.remove('cv-proof-enter');void proof.offsetWidth;proof.classList.add('cv-proof-enter');
 }
 page.querySelector('#cv-lenses').addEventListener('click',e=>{const b=e.target.closest('[data-cv-lens]');if(b)setLens(b.dataset.cvLens);});
 const groups=[
  {name:'Project delivery',scope:'HANDS-ON TOOLS',tools:[
   ['ClickUp','Manage recurring KPMG delivery with assigned specialists, priorities, review cycles and stakeholder follow-up.'],
   ['Asana','Plan work, assign owners and follow schedules, dependencies and deliverables.'],
   ['Jira','Structure project work, issues and specialist follow-through around the delivery need.'],
   ['Notion','Organize project context, documentation, decisions and follow-up.'],
   ['Excel / Sheets','Keep estimates, budgets, capacity, dependencies and operational reporting clear.'],
   ['PowerPoint / Workspace','Prepare client materials and shared documentation that support a decision.']]},
  {name:'Creative & CMS',scope:'CREATIVE PRACTICE & PROJECT DELIVERY',tools:[
   ['Adobe Creative Cloud','Hands-on creative work, particularly Photoshop and Premiere Pro; production knowledge supports useful specialist feedback.'],
   ['WordPress','Website and CMS project delivery, connecting content, user experience, implementation and launch.'],
   ['Shopify','Commerce website delivery, connecting the content and user experience with specialist implementation.']]},
  {name:'Platforms',scope:'TECHNICAL COORDINATION WITH SPECIALISTS',tools:[
   ['AWS','Coordinate platform work involving EC2, RDS, S3 and CloudFront with technical specialists.'],
   ['Django / REST','Connect backend requirements, integration dependencies, specialist implementation and acceptance.'],
   ['React','Coordinate frontend requirements, UX/UI handoffs, implementation, QA and releases.'],
   ['PostgreSQL','Connect platform data requirements, operational priorities and verification with specialists.'],
   ['Web / iOS / Android','Coordinate requirements, dependencies, test builds and release readiness across user channels.'],
   ['SCORM','Coordinate learning-content uploads, progress and score tracking, testing and LMS acceptance.']]},
  {name:'AI workflows',scope:'AI-ASSISTED WORK · HUMAN VALIDATION',tools:[
   ['ChatGPT','Use AI for research, planning, documentation and review. Validate the information and keep professional judgment accountable.']]}
 ];
 let groupIndex=0,toolIndex=0;
 function renderTools(){
  const group=groups[groupIndex],tool=group.tools[toolIndex];
  page.querySelector('#cv-tool-groups').innerHTML=groups.map((g,i)=>'<button type="button" data-cv-group="'+i+'" aria-pressed="'+(i===groupIndex)+'">'+g.name+'</button>').join('');
  page.querySelector('#cv-tool-options').innerHTML=group.tools.map((t,i)=>'<button type="button" data-cv-tool="'+i+'" aria-pressed="'+(i===toolIndex)+'">'+t[0]+'</button>').join('');
  page.querySelector('#cv-tool-detail').innerHTML='<p class="cv-tool-scope">'+group.scope+'</p><h3>'+tool[0]+'</h3><p>'+tool[1]+'</p>';
 }
 page.querySelector('#cv-tool-groups').addEventListener('click',e=>{const b=e.target.closest('[data-cv-group]');if(!b)return;groupIndex=Number(b.dataset.cvGroup);toolIndex=0;renderTools();page.querySelector('[data-cv-group="'+groupIndex+'"]').focus({preventScroll:true});});
 page.querySelector('#cv-tool-options').addEventListener('click',e=>{const b=e.target.closest('[data-cv-tool]');if(!b)return;toolIndex=Number(b.dataset.cvTool);renderTools();page.querySelector('[data-cv-tool="'+toolIndex+'"]').focus({preventScroll:true});});
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)entry.target.classList.toggle('is-current',entry.isIntersecting);},{rootMargin:'-15% 0px -35% 0px',threshold:0});
 page.querySelectorAll('.cv-job').forEach(job=>observer.observe(job));
 setLens('all');renderTools();
})();
