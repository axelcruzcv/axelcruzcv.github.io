'use strict';
// Details remain native: keyboard, touch and no-JS behaviour stay predictable.
(()=>{
 document.querySelectorAll('.compact-fold').forEach(fold=>fold.addEventListener('toggle',()=>{
  if(!fold.open)return;
  if(fold.id==='creative-detail')fold.querySelectorAll('.art-asset').forEach(img=>{img.loading='eager';});
  if(fold.id==='analytics-detail')requestAnimationFrame(()=>window.dispatchEvent(new Event('resize')));
 }));
})();
