'use strict';
// A single geometry and SVG source for the interactive map and its downloadable view.
function teamMapCount(value){const n=Number(value);return Number.isInteger(n)&&n>0&&n<=500?n:0;}
function teamMapColor(area){return ({Engineering:'#2e557c',Experience:'#b94a40',Content:'#ad7d37',Learning:'#e7c84f','Enablement / Training':'#e7c84f',Production:'#ba703f',Quality:'#4f6c45',People:'#ebe9df',Data:'#3b887f'})[area]||'#2e4850';}
function teamMapMix(a,b,weight){return '#'+[1,3,5].map(i=>Math.round(parseInt(a.slice(i,i+2),16)*weight+parseInt(b.slice(i,i+2),16)*(1-weight)).toString(16).padStart(2,'0')).join('');}
function teamMapLabel(name){const words=name.split(' ');if(name.length<16)return [name];const mid=Math.ceil(words.length/2);return [words.slice(0,mid).join(' '),words.slice(mid).join(' ')];}
function teamMapNodes(people,counts){
 const max=Math.max(1,...people.map(p=>teamMapCount(counts[p.id]))),any=people.some(p=>teamMapCount(counts[p.id])>0);
 return people.map((p,i)=>{const a=-Math.PI/2+i*Math.PI*2/people.length,n=teamMapCount(counts[p.id]);return {p,i,x:450+Math.cos(a)*335,y:390+Math.sin(a)*325,n,r:any?(n?38+27*Math.sqrt(n/max):38):55};});
}
function teamMapSVG(people,counts,selectedPerson,download=false){
 const nodes=teamMapNodes(people,counts),escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const lines=nodes.map(n=>`<path class="cloud-connection" fill="none" stroke="#85bad0" stroke-opacity="${download?.3:1}" stroke-width="1.2" d="M450 390 Q${(450+n.x)/2} ${390+(n.y-390)*.25} ${n.x} ${n.y}"/>`).join('');
 const circles=nodes.map(({p,i,x,y,n,r})=>{
  const color=teamMapColor(p.area),selected=i===selectedPerson,dark=['#ebe9df','#ad7d37','#e7c84f'].includes(color),fill=selected?color:teamMapMix(color,'#13232d',.25),stroke=selected?color:teamMapMix(color,'#a6b3b7',.7),text=selected&&dark?'#0b131b':'#f5f1e8',words=teamMapLabel(p.name);
  return `<g style="--node-color:${color};--node-ink:${text}" class="cloud-node ${selected?'selected':''}"${download?'':` role="button" tabindex="0" aria-label="${escape(p.name)}${n?', '+n+' collaborators':''}" aria-pressed="${selected}" data-person="${i}"`} transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="${r.toFixed(1)}" fill="${fill}" stroke="${stroke}" stroke-width="${selected?3:1}"/><text fill="${text}" font-family="Arial, sans-serif" font-size="11" font-weight="500" text-anchor="middle">${words.map((w,k)=>`<tspan x="0" y="${(k-(words.length-1)/2)*16}">${escape(w)}</tspan>`).join('')}${n?`<tspan x="0" dy="18" font-size="10">${n}</tspan>`:''}</text></g>`;
 }).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" class="network-desktop" viewBox="0 0 900 790"${download?' x="0" y="160" width="900" height="790" role="img"':' role="group"'} aria-label="${download?'Configured team map':'Interactive collaboration map. Select a specialty to see how Axel works with it.'}">${lines}${circles}<g class="axel-node" transform="translate(450 390)"><circle r="78" fill="#fa746c"/><text y="0" fill="#0b131b" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="25" letter-spacing="-1.5">AXEL</text><text y="24" class="small" fill="#0b131b" text-anchor="middle" font-family="monospace" font-size="8" letter-spacing=".64">CONNECT / ALIGN / DELIVER</text></g></svg>`;
}
function teamMapExportSVG(people,counts,selectedPerson){
 return `<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="2040" viewBox="0 0 900 1020"><title>Axel Cruz — configured team map</title><rect width="900" height="1020" fill="#0b131b"/><text x="40" y="35" fill="#fa746c" font-family="monospace" font-size="11" letter-spacing="1.5">AXEL CRUZ / TEAM</text><g fill="#f5f1e8" font-family="Arial, sans-serif" font-size="42" font-weight="700" letter-spacing="-1.7"><text x="40" y="87">Many disciplines.</text><text x="40" y="132">A shared direction.</text></g>${teamMapSVG(people,counts,selectedPerson,true)}<path d="M40 967H860" stroke="#49636e" stroke-width="1"/><text x="40" y="992" fill="#acc5d1" font-family="monospace" font-size="10">YOUR TEAM CONFIGURATION / ${people.length} SPECIALTIES</text></svg>`;
}
