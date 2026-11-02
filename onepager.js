'use strict';
// Stage controls and their moving diagram remain in sync in the compact layout.
(()=>{
 function syncDelivery(index){
  const workspace=document.querySelector('.delivery-workspace');
  if(!workspace)return;
  workspace.style.setProperty('--delivery-accent',deliveryStageColors[index]);
  if(!window.matchMedia('(max-width:700px)').matches)return;
  const controls=document.querySelector('#delivery-stages'),button=controls.querySelector('[data-stage="'+index+'"]');
  const behavior=energyReduced.matches?'instant':'smooth';
  if(button)controls.scrollTo({left:button.offsetLeft-(controls.clientWidth-button.offsetWidth)/2,behavior});
  const diagram=document.querySelector('#delivery-visual');
  const svg=diagram.querySelector('svg');
  if(svg)diagram.scrollTo({left:(85+index*835/7)*svg.getBoundingClientRect().width/1000-diagram.clientWidth/2,behavior});
 }
 window.addEventListener('command-stage',e=>syncDelivery(e.detail.index));
 syncDelivery(0);
})();
