'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tag = text => `<p class="eyebrow">${esc(text)}</p>`;
const projects = [
 {id:'hino',name:'Hino LMS',type:'Digital platform · Learning',summary:'From an initial learning need to a platform serving a dealer network.',metrics:[['2,000+','platform users'],['38','dealers'],['60+','WBT productions coordinated']],context:'Adapt learning and certification processes for Hino’s dealer network in Mexico, then support the platform as its requirements evolved.',role:'Founder and digital delivery lead. Originated the approximately MXN 1.4M initial engagement and coordinated requirements, roadmap, specialist teams, QA and client communication.',team:'Backend, frontend, native mobile, instructional content and QA specialists, working with training, business and IT stakeholders.',delivery:'The documented roadmap evolved through core LMS functionality, certification matrices, reporting, UX/UI, a loyalty programme and ongoing support.',outcome:'A learning platform supporting 2,000+ users across 38 dealers. Recovery and ongoing quality work also form part of the Hino/Edenred operational story.',tags:['TEAM','CLIENT','DELIVERY','SYSTEMS'],note:'The platform was implemented with specialist developers. This case describes Axel’s delivery and product/operational coordination, not sole authorship of the code.'},
 {id:'kpmg',name:'KPMG communications',type:'Creative operations · Enterprise',summary:'Connect specialists, review cycles and stakeholders across recurring communication work.',metrics:[['ClickUp','hands-on delivery management'],['Multi-format','video, animation and communications']],context:'Coordinate recurring enterprise communication work, including newscasts, event materials and institutional content.',role:'Lead multidisciplinary delivery and quality coordination. KPMG-facing work is delivered under the Editech brand.',team:'Design, video editing, VFX, animation, programming, QA and copywriting, working with internal communications and business stakeholders.',delivery:'Translate the brief into assigned work, review cycles, approvals and coordinated delivery. Keep decisions and dependencies visible in ClickUp.',outcome:'Recurring corporate communications and creative deliverables coordinated through stakeholder review and quality control.',tags:['TEAM','CLIENT','DELIVERY'],note:'Volume, turnaround improvements and financial impact are not quantified here because verified measurements are not available.'},
 {id:'kia',name:'Kia MKT Ownership',type:'Content production · Quality',summary:'Take a multi-format content package through production and brand review.',metrics:[['2','base videos'],['5','video cuts'],['3 + 2','animated + static infographics']],context:'Coordinate the July 2026 MKT Ownership content package, combining video and infographic formats.',role:'Project and quality coordination across production, revisions and client/brand acceptance.',team:'Video, animation, design and QA specialists, in dialogue with the client and branding stakeholders.',delivery:'Keep related deliverables aligned through review, revisions, quality checks and approval.',outcome:'A coordinated package spanning base videos, cuts and animated/static infographics, with legal and branding acceptance in the documented work.',tags:['TEAM','CLIENT','DELIVERY'],note:'Figures describe this package’s scope, not the total volume of all Kia work.'},
 {id:'edenred',name:'Edenred Training',type:'Learning technology · Operations',summary:'Connect client priorities, specialist teams and continuity for a learning platform.',metrics:[['5,000+','platform users'],['Web + mobile','delivery environment']],context:'Support enterprise learning-platform operations and coordinate recovery, requests and continuing improvements.',role:'Platform delivery and operations coordination: prioritize issues, connect specialists, structure verification and keep stakeholders informed.',team:'Backend, frontend, native mobile and QA specialists, with client learning and technology stakeholders.',delivery:'Track requirements, access, reporting, support priorities, QA/UAT and releases. Historical work included Heroku Postgres and content delivery through S3/CloudFront.',outcome:'Operational support for a platform serving 5,000+ users. The combined Hino/Edenred recovery case involved restoring service and strengthening follow-up.',tags:['TEAM','CLIENT','DELIVERY','SYSTEMS'],note:'Architecture is a historical reconstruction. Heroku Postgres was retired in June 2026; the current replacement database is not claimed here.'},
 {id:'teojama',name:'Teojama LMS',type:'Deployment · Test readiness',summary:'Bring deployment, SCORM content and user workflows into a testable release.',metrics:[['SCORM','ZIP content workflow'],['Android','test APK'],['AWS','client-owned environment']],context:'Coordinate an LMS deployment on the client’s AWS environment and prepare functional validation.',role:'Requirements, technical coordination, deployment follow-up and acceptance-test readiness.',team:'Development and QA specialists, working with the client’s platform and training needs.',delivery:'Document login, user/group management, SCORM ZIP upload, progress and score tracking, and an organized test guide.',outcome:'Documented test workflows, backend availability and an Android test APK. Public production adoption and user volumes are not asserted.',tags:['TEAM','CLIENT','DELIVERY','SYSTEMS'],note:'This case demonstrates deployment and validation work; it is not represented as a quantified production rollout.'},
 {id:'costco',name:'Costco client delivery',type:'Client ownership · Creative delivery',summary:'An initial assignment grew into a broader relationship across location-related work.',metrics:[['12','location-related projects'],['1','initial renovation-proposal video']],context:'Support legal and real estate stakeholders with visual and communication materials for location-related needs.',role:'Client and creative delivery leadership across proposals, scope, pricing, negotiation, specialist coordination, QA and delivery.',team:'Creative and production specialists working with Costco’s legal/real estate stakeholders.',delivery:'Translate requests into viable work packages and manage reviews and commitments across audiovisual, interactive, presentation and print formats.',outcome:'The engagement expanded from one initial assignment to 12 location-related projects. The work demonstrates continuity of client ownership and delivery.',tags:['TEAM','CLIENT','DELIVERY'],note:'The project count is documented; a specific causal attribution or revenue figure is not invented.'},
 {id:'mazda',name:'Mazda technical learning',type:'Instructional production · Automotive',summary:'Connect technical material, instructional planning and specialist review.',metrics:[['5','courses in the programme scope'],['Technical','measurement and automotive content']],context:'Coordinate a technical training-content programme, including material for audiences without a technical specialization.',role:'Project coordination across instructional planning, source material, stakeholder follow-up and review.',team:'Instructional design, content and production specialists, with subject-matter and training stakeholders.',delivery:'Coordinate course planning and technical-script review, including measurement-related material that requires precise terminology and reliable references.',outcome:'Work spans proposal, instructional planning and technical-content execution. Completion of all five courses is not asserted.',tags:['TEAM','CLIENT','DELIVERY'],note:'The five-course figure describes programme scope, not a claim that all five were delivered.'},
 {id:'cph',name:'Cine Para Huevones',type:'Storytelling · Independent media',summary:'An authored film project built around a point of view, narrative and audience.',metrics:[['24','long-form episodes'],['Short-form','next editorial stage']],context:'Turn film analysis and cultural references into accessible, engaging media with a distinct editorial voice.',role:'Creator, producer and strategy: concept, scripting, narrative structure, creative direction and publishing.',team:'A personal creative practice connecting storytelling, audiovisual production and audience communication.',delivery:'Long-form episodes for YouTube/Spotify, followed by work on short videos for TikTok, Reels and Shorts.',outcome:'A first stage of 24 long-form episodes, with an evolving short-form editorial approach.',tags:['DELIVERY','STORYTELLING'],note:'This is an independent editorial project. It is separate from client work and is not given unverified audience or revenue metrics.'}
];
const recovery = {id:'recovery',name:'Platform recovery',type:'Incident recovery · Client confidence',summary:'Restore two learning environments through coordinated engineering, QA and client decisions.',metrics:[['14','days to restore service'],['2','learning platforms'],['2,000+ / 5,000+','Hino / Edenred platform users']],context:'Restore Hino and Edenred learning operations and bring client communication, issue priorities and specialist work into one recovery path.',role:'Delivery and operational coordination: align priorities, organize specialist follow-through, structure verification and keep clients informed.',team:'Engineering, QA and client learning/IT stakeholders, connected through explicit owners and verification.',delivery:'Prioritize incidents, coordinate fixes and tests, validate access and learning workflows, and maintain follow-up after restoration.',outcome:'Service restoration within 14 days, followed by strengthened QA and operational follow-up. User figures describe the respective platform populations, not measured individuals affected by the incident.',tags:['TEAM','CLIENT','DELIVERY','SYSTEMS'],note:'A documented operational intervention across Hino and Edenred, not an additional client or a claim of sole technical authorship.'};
projects.push(recovery);
const coverPath = p => 'assets/'+p.id+'-concept-v11.webp';
const galleryProjects = projects.filter(p=>p.id!=='cph');

const people = [
 ['Backend developers','Engineering','Connect functional needs, service behaviour, integration dependencies and acceptance.', 'hino'],
 ['Frontend developers','Engineering','Connect interface requirements, implementation, testing and release readiness.','hino'],
 ['UX/UI designers','Experience','Translate user and business needs into clear interfaces and actionable implementation work.','hino'],
 ['Content creators','Content','Connect the brief, source material, narrative, review and final use.','kpmg'],
 ['Video editors','Production','Align editorial intent, versions, review cycles and delivery requirements.','kia'],
 ['Audio specialists','Production','Coordinate sound-related production requirements and integration with the final piece.','kpmg'],
 ['Instructional designers','Enablement / Training','Connect learning goals, source content, technical review and course production.','mazda'],
 ['Preproduction','Production','Make needs, inputs, responsibilities and approvals visible before production.','kia'],
 ['Scriptwriters','Content','Connect the message, audience and narrative with stakeholder review.','kpmg'],
 ['Branding specialists','Experience','Align the creative work with brand requirements and approval.','kia'],
 ['iOS developers','Engineering','Connect native-app requirements, platform dependencies, QA and release follow-up.','hino'],
 ['Android developers','Engineering','Coordinate native-app requirements, test builds and validation.','teojama'],
 ['Web developers','Engineering','Connect website scope, CMS/content, integration, testing and launch.','hino'],
 ['Metrics & analytics','Data','Connect data definitions, reporting needs and questions that inform decisions.','hino'],
 ['QA specialists','Quality','Connect requirements with test criteria, issue priorities, UAT and acceptance.','edenred'],
 ['HR & Talent','People','Support hiring with role context, CV review, assessments and interviews.','kpmg'],
 ['Animation & VFX','Production','Connect visual intent, specialist work, technical requirements and review.','kpmg'],
 ['Enablement & training','Enablement / Training','Connect learning goals, curricula, practice, platform readiness and reporting with training and business stakeholders.','hino']
].map((x,i)=>({id:'specialty-'+i,name:x[0],area:x[1],detail:x[2],case:x[3]}));
const testimonials = [
 {name:'Frida',company:'TOM',focus:'QA, clarity of priorities and collaboration with delivery.'},
 {name:'Jal',company:'TOM',focus:'A concrete example of working together and making a difficult delivery clearer.'},
 {name:'Ingrid',company:'TOM',focus:'Briefs, feedback and the conditions for good creative work.'},
 {name:'Jon',company:'TOM',focus:'Specialist coordination, creative judgement and review cycles.'},
 {name:'Esther',company:'TOM',focus:'Technical collaboration, requirements and decisions across teams.'},
 {name:'Alonso',company:'Fentec',focus:'Engineering partnership, dependencies and responsible commitments.'},
 {name:'Ander',company:'Fentec',focus:'A specific contribution to collaboration, clarity or quality.'},
 {name:'Necro',company:'Fentec',focus:'A specific example of shared work and follow-through.'},
 {name:'Edwin',company:'TOCA',focus:'People, onboarding, operational growth and team readiness.'}
];
const stakeholders = [
 {name:'Product & projects',title:'A decision others can work from.',question:'What are we trying to achieve, what has priority and what does acceptance mean?',contribution:'Connect product, program and project managers with requirements, dependencies, estimates and a delivery path.'},
 {name:'IT & CRM',title:'Make the integration understandable.',question:'What needs to connect, what inputs are required and who owns each dependency?',contribution:'Work with IT managers, CRM teams and specialists to clarify interfaces, access, validation and technical commitments.'},
 {name:'Enablement & training',title:'Connect learning to operation.',question:'Who needs to learn what, how will they access it and how will progress be reported?',contribution:'Connect training needs with content, platform workflows, certification and reporting.'},
 {name:'Comms & marketing',title:'Protect the message through delivery.',question:'Who is the audience, what should the piece accomplish and who approves it?',contribution:'Connect internal communications, marketing and production through briefs, review cycles, brand requirements and delivery.'},
 {name:'Sales & aftersales',title:'Turn a business need into usable work.',question:'What does the team need to do differently, and which deliverable supports that?',contribution:'Work with sales and automotive aftersales managers, including Hino’s aftersales leadership, on training and digital needs.'},
 {name:'Legal & real estate',title:'Make the material fit the decision.',question:'What information must a reviewer validate, in which format and by when?',contribution:'Coordinate location-related materials with Costco’s legal/real estate stakeholders.'},
 {name:'HR & Talent',title:'Help define the specialist need.',question:'What does the project need from this role, and what evidence would help assess it?',contribution:'Contribute role context, CV review, assessments and interviews in partnership with HR.'}
];
const deliveryStageColors=['#a8c183','#e7c84f','#b94a40','#85bace','#4f6c45','#ebe9df','#a3d5c3','#e7c84f'];
const stages = [
 {name:'Understand',title:'Start with the need.',text:'Make the intended outcome, audience and constraints explicit before planning production.',owner:'Client, project lead and relevant specialists.',output:'A brief with the goal, inputs, stakeholders and open questions.',gate:'The need is clear enough to estimate and define.'},
 {name:'Define',title:'Make the commitment visible.',text:'Turn the brief into scope, estimates, responsibilities, dependencies and acceptance criteria.',owner:'Axel with specialists, leadership and the client.',output:'Delivery plan, scope, estimate and required approvals.',gate:'The relevant owners agree on scope and conditions.'},
 {name:'Create',title:'Give specialists the context.',text:'Connect creative direction, content and design work to the agreed goal and review process.',owner:'Design, content, instructional and audiovisual specialists as relevant.',output:'Drafts, designs, scripts or production material.',gate:'Review and approval are sufficiently complete to continue.'},
 {name:'Build',title:'Connect the workstreams.',text:'Coordinate implementation, specialist dependencies, versions and changes.',owner:'Engineering and/or production teams, supported by project coordination.',output:'A build or produced deliverable ready for verification.',gate:'The agreed work is ready to test or review.'},
 {name:'Verify',title:'Check against the need.',text:'Prioritize issues, coordinate QA/UAT and compare the result with the agreed acceptance criteria.',owner:'QA, specialists, project lead and client reviewers.',output:'Test results, issue resolution and review decisions.',gate:'Acceptance criteria and required approvals are satisfied.'},
 {name:'Release',title:'Deliver with ownership.',text:'Coordinate acceptance, delivery or launch and the transfer to operational responsibility.',owner:'Client, project lead and the people responsible for release/operation.',output:'Accepted delivery, release and handover information.',gate:'Release responsibilities and support arrangements are clear.'},
 {name:'Improve',title:'Follow through after launch.',text:'Track incidents, feedback and agreed improvements. Use reporting to inform next priorities.',owner:'Client, operations, specialists and project lead.',output:'Support priorities, reporting and the next agreed work.',gate:'Changes enter an explicit prioritization and approval process.'},
 {name:'Grow',title:'Turn trust into the next opportunity.',text:'Connect what the delivery revealed with a useful next business opportunity: a new phase, another team or an adjacent client need.',owner:'Client, account or sales lead, Axel and relevant specialists.',output:'A qualified opportunity and a scoped proposal with effort, cost and business value made explicit.',gate:'The client confirms the need; leadership and specialists validate the commercial and delivery conditions.'}
];
const systemData = {
 hino:{name:'Hino LMS',metric:'2,000+ USERS / 38 DEALERS',snapshot:'DOCUMENTED PROJECT VIEW / WEB, NATIVE MOBILE AND AWS',outcome:'A platform evolved from an initial LMS engagement into certification, reporting, UX improvements and continuing operations.',views:{
  user:[['Learners','Dealer network','Access training and certification workflows.'],['Web / mobile','User channels','Coordinate consistent platform requirements across web, iOS and Android.'],['Learning content','60+ WBT','Connect instructional production with access and progress requirements.'],['Certification','Matrices','Coordinate certification logic and stakeholder acceptance.'],['Reporting','Progress / decisions','Connect reporting requirements with business and training questions.'],['Support','Continuity','Track incidents, improvements and the next priorities.']],
  architecture:[['Web interface','React','Frontend specialists implemented the web experience; Axel coordinated requirements and delivery.'],['Native apps','Swift / Java','iOS and Android specialists implemented the apps; coordination included dependencies, testing and releases.'],['Application / API','Python / Django','Backend specialists implemented the platform logic and REST services.'],['Infrastructure','AWS EC2 / RDS','Documented application/database environment. Detailed configuration and credentials are not shown.'],['Content storage','S3 / CloudFront','Documented content storage and distribution, including origin-access controls.'],['QA / operations','Acceptance / support','Coordination of verification, releases and operational follow-through.']],
  ownership:[['Client alignment','Business / training / IT','Clarify requirements, approvals and the intended result.'],['Roadmap','Evolution','Coordinate work from MVP and core LMS to certification, reporting, UX and support.'],['Specialist teams','Distributed delivery','Connect engineering, content and QA workstreams.'],['Change control','Scope / estimates','Document the request, impact, quotation, implementation date and execution.'],['Verification','QA / UAT','Coordinate tests, issue priorities and acceptance.'],['Continuity','After launch','Maintain client communication and operational follow-up.']]}},
 edenred:{name:'Edenred Training',metric:'5,000+ PLATFORM USERS',snapshot:'HISTORICAL PROJECT VIEW / HEROKU POSTGRES RETIRED JUNE 2026; CURRENT REPLACEMENT NOT ASSERTED',outcome:'Platform operations, incident prioritization and specialist coordination supporting a 5,000+ user learning environment.',views:{
  user:[['Learners','Access','Connect users with the training platform.'],['Web / mobile','Channels','Coordinate requirements and issue follow-up across the supported environment.'],['Training content','Learning','Connect content needs with platform availability.'],['Progress','Reporting','Coordinate learning progress and reporting requests.'],['Requests','Client priorities','Make support and enhancement needs explicit.'],['Support / release','Continuity','Coordinate verification and operational follow-through.']],
  architecture:[['Interfaces','React / native apps','Web, Swift/iOS and Java/Android are part of the documented delivery stack.'],['Application / API','Python / Django','Backend specialists implement application and REST-service behaviour.'],['Database','Historical Heroku Postgres','Documented historical service, retired in June 2026. The current replacement is not identified here.'],['Content storage','S3','Documented storage for training content.'],['Distribution','CloudFront / access','Documented content-delivery work included a five-minute access token; implementation details are not reconstructed beyond the evidence.'],['Verification','QA / support','Delivery coordination connects issue priorities, tests and releases.']],
  ownership:[['Client requests','Prioritization','Translate business and learning requests into work and decisions.'],['Incident recovery','Coordination','Align engineering, QA and client communication around recovery.'],['Access / reporting','Requirements','Coordinate access and reporting needs without taking sole credit for implementation.'],['Specialist teams','Dependencies','Make blockers and ownership visible.'],['QA / UAT','Validation','Coordinate tests and acceptance follow-up.'],['Continuity','Operation','Maintain support and enhancement follow-through.']]}},
 teojama:{name:'Teojama LMS',metric:'AWS / SCORM / ANDROID TEST APK',snapshot:'DEPLOYMENT AND TEST-READINESS VIEW / PRODUCTION ADOPTION NOT QUANTIFIED',outcome:'Deployment tracking and functional test preparation across login, groups, SCORM, progress and score workflows.',views:{
  user:[['Access','Login','Validate the entry workflow.'],['Users / groups','Administration','Prepare user and group-management tests.'],['Course upload','SCORM ZIP','Validate content-upload and course workflows.'],['Learning activity','Playback','Connect content behaviour with the platform tests.'],['Progress / score','Tracking','Validate progress and grading requirements.'],['Acceptance','Test guide','Give reviewers an organized functional test path.']],
  architecture:[['Web access','Own domain','Documented client-domain work and entry workflow.'],['Android app','Test APK','A test build supports mobile validation.'],['Backend service','Service availability','Backend/service availability was part of deployment follow-up; exact infrastructure topology is not asserted.'],['Client environment','AWS','Deployment on the client’s own AWS environment.'],['Content delivery','CloudFront / OAC','Documented distribution and origin-access-control configuration work.'],['Content / tracking','SCORM / scores','User/group management, upload, progress and score workflows are part of the test scope.']],
  ownership:[['Requirements','Test scope','Make functional requirements and acceptance work visible.'],['Deployment','Coordination','Track environment readiness with specialists.'],['Content','SCORM ZIP','Coordinate upload and content-validation follow-up.'],['Mobile','Android testing','Connect test-build availability to the validation plan.'],['Verification','Progress / score','Organize tests across the key workflows.'],['Readiness','Client test guide','Prepare a usable acceptance-test path.']]}}
};

// Routing: two experiences — HOME and a continuous TEAM → CLIENT → DELIVERY → SYSTEMS page.
const workChapters=['team','client','delivery','systems'];
let previousPage='',previousExperience='',clientScroll=0,caseReturnChapter='client',caseReturnFocus=null;
let navigationTarget='',navigationDeadline=0,chapterFrame=0;
function setNavigationChapter(page){
 document.body.dataset.chapter=page;
 $$('[data-nav]').forEach(a=>{if(a.dataset.nav===page)a.setAttribute('aria-current',page==='home'?'page':'location');else a.removeAttribute('aria-current');});
 $('#route-label').textContent='PM / '+page.toUpperCase();
}
function motionIsReduced(){return document.documentElement.classList.contains('reduce-motion')||matchMedia('(prefers-reduced-motion: reduce)').matches;}
const disclosureRoutes={'team/hiring':'hiring-detail','team/voices':'team-voices','client/stakeholders':'stakeholder-detail-fold','delivery/change':'change-detail','delivery/creative':'creative-detail','systems/analytics':'analytics-detail'};
function scrollToChapter(page,behavior,detail){
 if(page==='home'){window.scrollTo({top:0,behavior});return;}
 const foldId=disclosureRoutes[page+'/'+detail],fold=foldId?$('#'+foldId):null;
 if(fold)fold.open=true;
 const target=fold||$('#'+page);if(!target)return;
 navigationTarget=target.id;navigationDeadline=performance.now()+1800;
 target.scrollIntoView({block:'start',behavior});
}
function route({intent='history',force=false,restoreCase=false}={}){
 const [raw='home',projectId,perspective]=location.hash.slice(1).split('/');
 const page=raw==='work'?'team':['home',...workChapters].includes(raw)?raw:'home';
 const experience=page==='home'?'home':'work';
 const project=(page==='client'||(page==='delivery'&&projectId==='cph'))?projects.find(x=>x.id===projectId):null;
 const modal=$('#project-modal'),closingCase=modal.open&&!project,entering=experience!==previousExperience;
 const oldChapter=document.body.dataset.chapter;
 if(closingCase)modal.close();
 $('#home').hidden=experience!=='home';$('#work').hidden=experience!=='work';
 document.body.dataset.experience=experience;
 $('#client-index').hidden=false;$('#project-detail').hidden=!project;
 document.title='Axel Cruz — '+(project?project.name:experience==='home'?'Senior Digital Project & Program Manager':'Teams, Clients, Delivery & Systems');
 if(page==='systems'&&systemData[projectId]){system=projectId;systemNode=0;if(['user','architecture','ownership'].includes(perspective))systemView=perspective;renderSystem();}
 const nextKey=page+(projectId?'/'+projectId:'')+(perspective?'/'+perspective:'');
 if(project){
  if(!modal.open){
   window.scrollTo({top:window.scrollY,behavior:'instant'});navigationTarget='';
   if(entering)scrollToChapter(page,'instant');
   clientScroll=window.scrollY;caseReturnChapter=entering?page:workChapters.includes(oldChapter)?oldChapter:page;caseReturnFocus=document.activeElement;
  }
  renderProject(project);if(!modal.open)modal.showModal();
 }else if(force||nextKey!==previousPage||entering||closingCase){
  if(closingCase&&experience==='work'&&(restoreCase||intent==='history')){
   navigationTarget='';window.scrollTo({top:clientScroll,behavior:'instant'});
   if(caseReturnFocus&&document.contains(caseReturnFocus))caseReturnFocus.focus({preventScroll:true});
  }else{
   scrollToChapter(page,intent==='link'&&!entering&&!motionIsReduced()?'smooth':'instant',projectId);
   if(previousPage)$('#main').focus({preventScroll:true});
  }
 }
 setNavigationChapter(page);previousPage=nextKey;previousExperience=experience;
 window.dispatchEvent(new CustomEvent('command-route',{detail:{page,experience,projectId,project:!!project}}));
}
function closeProject(){history.replaceState(null,'','#'+caseReturnChapter);route({restoreCase:true});}
$('#close-project').addEventListener('click',closeProject);
$('#project-modal').addEventListener('cancel',e=>{e.preventDefault();closeProject();});
$('#project-modal').addEventListener('click',e=>{if(e.target===$('#project-modal'))closeProject();});
window.addEventListener('hashchange',()=>route({intent:'history'}));
document.addEventListener('click',e=>{
 if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 const link=e.target.closest('a[href^="#"]');if(!link)return;
 const hash=link.getAttribute('href'),raw=hash.slice(1).split('/')[0];
 if(!['home','work',...workChapters].includes(raw))return;
 e.preventDefault();if(location.hash!==hash)history.pushState(null,'',hash);
 route({intent:'link',force:true});
});
function syncVisibleChapter(){
 chapterFrame=0;if($('#work').hidden||$('#project-modal').open)return;
 const boundary=$('.topbar').getBoundingClientRect().height+35;
 if(navigationTarget){const y=$('#'+navigationTarget)?.getBoundingClientRect().top;if(Math.abs(y-boundary)<40||performance.now()>navigationDeadline)navigationTarget='';else return;}
 let active='team';for(const id of workChapters){if($('#'+id).getBoundingClientRect().top<=boundary+70)active=id;}
 setNavigationChapter(active);
}
window.addEventListener('scroll',()=>{if(!chapterFrame)chapterFrame=requestAnimationFrame(syncVisibleChapter);},{passive:true});
new ResizeObserver(()=>{document.documentElement.style.setProperty('--header-height',$('.topbar').getBoundingClientRect().height+'px');}).observe($('.topbar'));
$('.skip').addEventListener('click',e=>{e.preventDefault();$('#main').focus({preventScroll:true});$('#main').scrollIntoView({block:'start'});});
// End navigation.
function projectLink(id){return '#client/'+id;}
function renderProject(p){
 $('#project-detail').innerHTML=`<button type="button" class="back-link" data-close-case>← BACK TO THE EXPERIENCE</button><div class="project-detail-header"><div>${tag(p.type)}<h2 id="project-modal-title">${esc(p.name)}</h2><p>${esc(p.summary)}</p><div class="case-tags">${p.tags.map(x=>`<span>${esc(x)}</span>`).join('')}</div></div>${projectArtwork(p)}</div><div class="project-metrics">${p.metrics.map(x=>`<div><strong>${esc(x[0])}</strong><span>${esc(x[1])}</span></div>`).join('')}</div><div class="case-body"><article><h2>The need.</h2><p>${esc(p.context)}</p></article><article><h2>My responsibility.</h2><p>${esc(p.role)}</p></article><article><h2>The people.</h2><p>${esc(p.team)}</p></article><article><h2>The delivery.</h2><p>${esc(p.delivery)}</p></article><article><h2>The result.</h2><p>${esc(p.outcome)}</p></article></div><section class="case-gallery" aria-label="Illustrated project views">${[1,2,3].map((n)=>`<figure><img src="assets/${p.id}-view-${n}.svg" alt="${esc(p.name)}: ${n===1?'project relationships':n===2?'delivery progression':'documented evidence'}" width="640" height="420" loading="lazy"><figcaption>${n===1?'The connections':n===2?'The progression':'The evidence'}</figcaption></figure>`).join('')}</section><p class="project-note">${esc(p.note)}</p><div class="project-next"><a class="button primary" href="${systemData[p.id]?'#systems/'+p.id:'#delivery'}">${systemData[p.id]?'EXPLORE THE SYSTEM':'EXPLORE DELIVERY'} ↗</a><a class="button" href="#team">MEET THE TEAM CONNECTIONS ↗</a><button type="button" class="button" data-copy-case="${p.id}">COPY CASE LINK ↗</button></div>`;
}
const projectSkills={hino:'Enablement & Training · Digital Platforms · Product Roadmaps · Engineering Coordination · QA/UAT',kpmg:'Creative Operations · Cross-functional Teams · Content Production · Stakeholders',kia:'Video Production · Branding · Review Cycles · Quality',edenred:'Enablement & Training · Platform Operations · Incident Coordination · Learning Technology · Client Delivery',teojama:'Learning Implementation · Deployment · SCORM · Acceptance Testing · Technical Coordination',costco:'Client Ownership · Proposals · Scope · Negotiation · Creative Delivery',mazda:'Training Delivery · Instructional Design · Technical Content · Stakeholder Review',recovery:'Incident Coordination · QA/UAT · Client Communication · Platform Operations',cph:'Storytelling · Creative Direction · Scripting · Production'};
$('#project-grid').innerHTML=galleryProjects.map(p=>`<a class="project-card" href="${projectLink(p.id)}"><div class="project-cover">${projectArtwork(p)}<div class="project-ribbon" aria-label="${esc(projectSkills[p.id])}"><span>${esc(projectSkills[p.id])} · <span aria-hidden="true">${esc(projectSkills[p.id])} · </span></span></div></div><p class="project-type">${esc(p.type)}</p><h2>${esc(p.name)}</h2><p>${esc(p.summary)}</p><span class="card-link">EXPLORE THE PROJECT ↗</span></a>`).join('');

function toast(text){$('#toast').textContent=text;$('#toast').hidden=false;setTimeout(()=>$('#toast').hidden=true,2600);}
document.addEventListener('click',async e=>{if(e.target.closest('[data-close-case]')){closeProject();return;}const b=e.target.closest('[data-copy-case]');if(!b)return;try{await navigator.clipboard.writeText(location.origin+location.pathname+projectLink(b.dataset.copyCase));toast('Case link copied.');}catch{toast('Copy the case URL from your address bar.');}});

// Testimonials are requested evidence, not invented endorsements.
let testimonialIndex=0;
function renderTestimonial(){const t=testimonials[testimonialIndex];$('#testimonial-company').textContent=t.company+' / COLLABORATOR VOICE';$('#testimonial-index').textContent=String(testimonialIndex+1).padStart(2,'0')+' / 09';$('#testimonial-copy').innerHTML=`<span class="pending">TESTIMONIAL PENDING / PRIVATE REVIEW SLOT</span>${esc(t.focus)}`;$('#testimonial-person').innerHTML=esc(t.name)+`<small>Role and publishable wording to be confirmed</small>`;}
$('#testimonial-prev').addEventListener('click',()=>{testimonialIndex=(testimonialIndex+8)%9;renderTestimonial();});$('#testimonial-next').addEventListener('click',()=>{testimonialIndex=(testimonialIndex+1)%9;renderTestimonial();});

// Counts start unknown. The view only gains quantitative sizes after documented input.
let counts={};try{const raw=JSON.parse(localStorage.getItem('axel-specialist-counts')||'{}');if(raw&&typeof raw==='object'&&!Array.isArray(raw))counts=raw;}catch{}
counts=Object.fromEntries(people.map(p=>[p.id,teamMapCount(counts[p.id])]).filter(([,n])=>n>0));
let selectedPerson=0;
function recordCounts(){try{localStorage.setItem('axel-specialist-counts',JSON.stringify(counts));}catch{}}
function renderNetwork(){
 $('#people-network').innerHTML=teamMapSVG(people,counts,selectedPerson)+`<div class="network-mobile" role="group" aria-label="Specialties">${people.map((p,i)=>{const n=teamMapCount(counts[p.id]);return `<button type="button" data-person="${i}" aria-pressed="${i===selectedPerson}">${esc(p.name)}${n?`<span class="count">${n} recorded collaborators</span>`:''}</button>`;}).join('')}</div>`;
 const p=people[selectedPerson];$('#network-detail').innerHTML=tag(p.area)+`<h3>${esc(p.name)}</h3><p>${esc(p.detail)}</p><a href="${p.id==='specialty-15'?'#team':projectLink(p.case)}">${p.id==='specialty-15'?'People, talent and team readiness':'See related work'} ↗</a>`;
}
$('#people-network').addEventListener('click',e=>{const node=e.target.closest('[data-person]');if(node){selectedPerson=Number(node.dataset.person);renderNetwork();}});
$('#people-network').addEventListener('keydown',e=>{if(!['Enter',' '].includes(e.key))return;const n=e.target.closest('[data-person]');if(n){e.preventDefault();selectedPerson=Number(n.dataset.person);renderNetwork();$('#people-network [data-person="'+selectedPerson+'"]').focus();}});
$('#counts-form').innerHTML=people.map(p=>`<label>${esc(p.name)}<input type="number" min="0" max="500" step="1" data-count="${p.id}" value="${Number(counts[p.id])||''}" inputmode="numeric" placeholder="Not recorded"></label>`).join('');
$('#counts-form').addEventListener('input',e=>{const id=e.target.dataset.count;if(!id)return;const value=e.target.valueAsNumber;if(Number.isInteger(value)&&value>0&&value<=500)counts[id]=value;else delete counts[id];recordCounts();renderNetwork();});
$('#counts-form').addEventListener('submit',e=>e.preventDefault());$('#clear-counts').addEventListener('click',()=>{counts={};recordCounts();$$('[data-count]').forEach(i=>i.value='');renderNetwork();});

function selectStakeholder(i){
 const s=stakeholders[i],icons=['scope','platform','learning','message','sales','legal','people'],short=['Product','IT / CRM','Training','Comms','Sales','Legal','HR'],colors=['#85bad0','#bba3e3','#e7c84f','#fa746c','#a8c183','#c7856b','#ebe9df'];
 $('#stakeholder-detail-fold').style.setProperty('--stakeholder-color',colors[i]);
 $('#stakeholder-controls').innerHTML=stakeholders.map((x,k)=>{const a=-Math.PI/2+k*Math.PI*2/7;return `<button type="button" data-stakeholder="${k}" aria-label="${esc(x.name)}" aria-pressed="${k===i}" style="--seat-x:${50+Math.cos(a)*35}%;--seat-y:${50+Math.sin(a)*35}%">${serviceIcon(icons[k])}<span>${short[k]}</span></button>`;}).join('');
 $('#stakeholder-detail').innerHTML=`<p class="stakeholder-seat">${String(i+1).padStart(2,'0')} / ${esc(s.name)}</p><h3>${esc(s.title)}</h3><div class="conversation-question"><span>THE QUESTION</span><p>${esc(s.question)}</p></div><div class="conversation-response"><span>HOW I CONNECT THE WORK</span><p>${esc(s.contribution)}</p></div>`;
 window.dispatchEvent(new CustomEvent('command-stakeholder',{detail:{index:i}}));
}
$('#stakeholder-controls').addEventListener('click',e=>{const b=e.target.closest('[data-stakeholder]');if(b)selectStakeholder(Number(b.dataset.stakeholder));});
let activeStage=0;
function selectStage(i){activeStage=i;const s=stages[i];$('#delivery-stages').innerHTML=stages.map((x,k)=>`<button type="button" data-stage="${k}" aria-pressed="${i===k}" style="--stage-color:${deliveryStageColors[k]};--stage-ink:${[2,4].includes(k)?'#f5f1e8':'#0b131b'}"><span>${String(k+1).padStart(2,'0')}</span>${esc(x.name)}</button>`).join('');$('#delivery-detail').innerHTML=`<div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div><dl class="definition-list"><dt>People</dt><dd>${esc(s.owner)}</dd><dt>Output</dt><dd>${esc(s.output)}</dd><dt>Gate to continue</dt><dd>${esc(s.gate)}</dd></dl>`;window.dispatchEvent(new CustomEvent('command-stage',{detail:{index:i}}));}
$('#delivery-stages').addEventListener('click',e=>{const b=e.target.closest('[data-stage]');if(b)selectStage(Number(b.dataset.stage));});
$('#delivery-visual').addEventListener('click',e=>{const b=e.target.closest('[data-stage],[data-stage-next]');if(b)selectStage(b.hasAttribute('data-stage-next')?(activeStage+1)%stages.length:Number(b.dataset.stage));});
$('#delivery-visual').addEventListener('keydown',e=>{if(!['Enter',' '].includes(e.key))return;const b=e.target.closest('[data-stage],[data-stage-next]');if(!b)return;e.preventDefault();const next=b.hasAttribute('data-stage-next');selectStage(next?(activeStage+1)%stages.length:Number(b.dataset.stage));$('#delivery-visual '+(next?'[data-stage-next]':'[data-stage="'+activeStage+'"]')).focus();});
let system='hino' ,systemView='user',systemNode=0;
function renderSystem(){const s=systemData[system],nodes=s.views[systemView];$('.system-workspace').dataset.platform=system;$$('[data-system]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.system===system)));$$('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===systemView)));$('#system-name').textContent=s.name;$('#system-metric').textContent=s.metric;$('#system-snapshot').textContent=s.snapshot;$('#architecture').innerHTML=nodes.map((n,i)=>`<button type="button" class="system-node" data-node="${i}" aria-pressed="${i===systemNode}"><small class="system-node-number">${String(i+1).padStart(2,'0')}</small>${esc(n[0])}<span>${esc(n[1])}</span><i class="node-port" aria-hidden="true"></i></button>`).join('');const n=nodes[systemNode];$('#architecture-detail').innerHTML=tag(systemView==='ownership'?'AXEL’S RESPONSIBILITY':systemView==='architecture'?'SYSTEM RELATIONSHIP':'USER NEED')+`<h3>${esc(n[0])}</h3><p>${esc(n[2])}</p>`;$('#system-outcome').innerHTML=`<strong>What the system supports.</strong> ${esc(s.outcome)} <a href="${projectLink(system)}">Open the case ↗</a>`;window.dispatchEvent(new CustomEvent('command-system',{detail:{system,view:systemView,node:systemNode}}));}
$$('[data-system]').forEach(b=>b.addEventListener('click',()=>{system=b.dataset.system;systemNode=0;renderSystem();}));$$('[data-view]').forEach(b=>b.addEventListener('click',()=>{systemView=b.dataset.view;systemNode=0;renderSystem();}));$('#architecture').addEventListener('click',e=>{const b=e.target.closest('[data-node]');if(b){systemNode=Number(b.dataset.node);renderSystem();}});
const cohorts={all:{total:200,done:148,pass:120,label:'All learners'},onboarding:{total:80,done:72,pass:64,label:'Onboarding'},technical:{total:120,done:76,pass:56,label:'Technical training'}};
function selectCohort(key){
 const c=cohorts[key],rate=c.done/c.total*100,passRate=c.pass/c.done*100,reach=c.pass/c.total*100;
 const question=key==='onboarding'?'What supports stronger completion?':key==='technical'?'Where does the learning path lose people?':'Which cohort needs a closer look?';
 const decision=key==='onboarding'?'Inspect assessment outcomes and access conditions before applying the same approach elsewhere.':key==='technical'?'Inspect access, content difficulty, available time and user feedback before attributing the result to motivation.':'Compare cohorts before choosing an intervention. The overall figure hides different experiences.';
 $('.analytics-lab').dataset.cohort=key;
 $$('[data-cohort]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.cohort===key)));
 $('#analytics-output').innerHTML=`<div class="analytics-topline"><div class="analytics-stat">${Math.round(rate)}<span>%</span><small>completion · ${esc(c.label)}</small></div><div class="assessment-stat"><strong>${Math.round(passRate)}%</strong><span>passed among<br>completed learners</span></div></div><div class="learning-funnel" aria-label="${c.total} assigned, ${c.done} completed, ${c.pass} passed">${[['Assigned',c.total,100,'assigned'],['Completed',c.done,rate,'completed'],['Passed',c.pass,reach,'passed']].map(([label,value,width,type])=>`<div class="funnel-step ${type}"><span>${label}</span><div><i style="--bar-width:${width}%"></i></div><strong>${value}</strong></div>`).join('')}</div><div class="analytics-decision"><span>THE QUESTION TO INVESTIGATE</span><h3>${question}</h3><p>${decision}</p></div><p class="analytics-definition"><b>Completion:</b> ${c.done} / ${c.total} assigned. <b>Assessment:</b> ${c.pass} / ${c.done} completed.<br>Completion alone does not demonstrate competence or explain a cause.</p>`;
 if(typeof stateEnter==='function')stateEnter('#analytics-output');
}
$('#cohort-controls').addEventListener('click',e=>{const b=e.target.closest('[data-cohort]');if(b)selectCohort(b.dataset.cohort);});

// Optional genuine on-device inference; unsupported browsers explicitly use a curated matcher.
// No remote model endpoint, API key or model download is triggered by this application.
let localAIAvailable=false;
const aiOptions={expectedInputs:[{type:'text',languages:['en']}],expectedOutputs:[{type:'text',languages:['en']}]};
async function checkAI(){try{if(typeof globalThis.LanguageModel==='undefined')throw Error('Not supported');const availability=await globalThis.LanguageModel.availability(aiOptions);localAIAvailable=availability==='available';}catch{localAIAvailable=false;}if($('#ai-switch-label'))$('#ai-switch-label').hidden=!localAIAvailable;if($('#ai-status'))$('#ai-status').textContent=localAIAvailable?'Optional on-device AI is ready in this browser. Your brief is processed locally; no cloud model is called.':'Guided mode: curated keyword matching, not generative AI. On-device AI is unavailable in this browser. Your brief stays in this page.';window.dispatchEvent(new CustomEvent('axel-ai-ready'));}
renderTestimonial();renderNetwork();selectStakeholder(0);selectStage(0);renderSystem();selectCohort('all');route();checkAI();
