'use strict';
// Shared, uncapped geometry for the live map and its fitted PNG export.
function teamMapCount(value){const n=Number(value);return Number.isSafeInteger(n)&&n>0?n:0;}
function teamMapColor(area){return ({Engineering:'#2e557c',Experience:'#b94a40',Content:'#ad7d37',Learning:'#e7c84f','Enablement / Training':'#e7c84f',Production:'#ba703f',Quality:'#4f6c45',People:'#ebe9df',Data:'#3b887f'})[area]||'#2e4850';}
function teamMapMix(a,b,weight){return '#'+[1,3,5].map(i=>Math.round(parseInt(a.slice(i,i+2),16)*weight+parseInt(b.slice(i,i+2),16)*(1-weight)).toString(16).padStart(2,'0')).join('');}
function teamMapLabel(name){const words=name.split(' ');if(name.length<16)return [name];const mid=Math.ceil(words.length/2);return [words.slice(0,mid).join(' '),words.slice(mid).join(' ')];}
function teamMapEscape(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function teamMapNodes(people,counts){
 const nodes=people.map((p,i)=>{const a=-Math.PI/2+i*Math.PI*2/people.length,n=teamMapCount(counts[p.id]),x=450+Math.cos(a)*335,y=390+Math.sin(a)*325;return {p,i,x,y,ax:x,ay:y,n,r:n?48+22*Math.sqrt(n):55};});
 if(!nodes.some(n=>n.n))return nodes;
 // Larger circles have more inertia. Neighbours move aside instead of being scaled down.
 for(let pass=0;pass<28;pass++){
  for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
   const a=nodes[i],b=nodes[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1,overlap=a.r+b.r+12-d;
   if(overlap<=0)continue;
   const weight=b.r*b.r/(a.r*a.r+b.r*b.r),push=overlap*.72,ux=dx/d,uy=dy/d;
   a.x-=ux*push*weight;a.y-=uy*push*weight;b.x+=ux*push*(1-weight);b.y+=uy*push*(1-weight);
  }
  for(const n of nodes){const spring=.035/(1+n.n*.05);n.x+=(n.ax-n.x)*spring;n.y+=(n.ay-n.y)*spring;}
 }
 return nodes;
}
function teamMapBounds(nodes){
 const xs=nodes.flatMap(n=>[n.x-n.r,n.x+n.r]),ys=nodes.flatMap(n=>[n.y-n.r,n.y+n.r]);
 const left=Math.min(0,...xs),top=Math.min(0,...ys),right=Math.max(900,...xs),bottom=Math.max(790,...ys),pad=Math.max(28,(right-left)*.025);
 return [left-pad,top-pad,right-left+pad*2,bottom-top+pad*2];
}
function teamMapSVG(people,counts,selectedPerson,download=false){
 const nodes=teamMapNodes(people,counts),escape=teamMapEscape;
 const lines=nodes.map(n=>`<path class="cloud-connection" data-team-link="${n.i}" fill="none" stroke="#85bad0" stroke-opacity=".3" stroke-width="1.2" d="M450 390 Q${(450+n.x)/2} ${390+(n.y-390)*.25} ${n.x} ${n.y}"/>`).join('');
 const circles=[...nodes].sort((a,b)=>(a.i===selectedPerson)-(b.i===selectedPerson)||b.r-a.r).map(({p,i,x,y,n,r})=>{
  const color=teamMapColor(p.area),selected=i===selectedPerson,dark=['#ebe9df','#ad7d37','#e7c84f'].includes(color),fill=selected?color:teamMapMix(color,'#13232d',n?.55:.25),stroke=selected?color:teamMapMix(color,'#a6b3b7',.7),ink=selected&&dark?'#0b131b':'#f5f1e8',words=teamMapLabel(p.name),size=download?Math.min(68,13+Math.sqrt(r)*.7):Math.min(68,17+Math.max(0,Math.sqrt(r)-Math.sqrt(55))*2);
  return `<g style="--node-color:${color};--node-ink:${ink}" class="cloud-node ${selected?'selected':''}"${download?'':` role="button" tabindex="0" aria-label="${escape(p.name)}${n?', '+n.toLocaleString('en')+' configured collaborators':''}" aria-pressed="${selected}" data-person="${i}"`} transform="translate(${x.toFixed(2)} ${y.toFixed(2)})"><circle r="${r.toFixed(2)}" style="fill:${fill};stroke:${stroke}" stroke-width="${selected?3:1}"/><text style="fill:${ink};font-size:${size.toFixed(2)}px" font-family="Arial, sans-serif" font-weight="500" text-anchor="middle">${words.map((w,k)=>`<tspan x="0" y="${(k-(words.length-1)/2)*size*1.12}">${escape(w)}</tspan>`).join('')}${n?`<tspan x="0" dy="${size*1.4}" font-size="${size*.7}">${n.toLocaleString('en')}</tspan>`:''}</text></g>`;
 }).join('');
 const box=download?teamMapBounds(nodes).join(' '):'0 0 900 790';
 return `<svg xmlns="http://www.w3.org/2000/svg" class="network-desktop" viewBox="${box}"${download?' x="20" y="157" width="860" height="620" role="img"':' role="group"'} aria-label="${download?'Configured team map':'Interactive collaboration map. Select a specialty to see how Axel works with it.'}">${lines}${circles}<g class="axel-node" transform="translate(450 390)"><circle r="78" fill="#fa746c"/><text y="0" fill="#0b131b" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="25" letter-spacing="-1.5">AXEL</text><text y="24" class="small" fill="#0b131b" text-anchor="middle" font-family="monospace" font-size="8" letter-spacing=".64">CONNECT / ALIGN / DELIVER</text></g></svg>`;
}
function teamMapExportSVG(people,counts,selectedPerson){
 const legend=people.map((p,i)=>`<text x="${40+Math.floor(i/6)*285}" y="${808+i%6*27}" fill="#dbe5df" font-family="Arial, sans-serif" font-size="10">${teamMapEscape(p.name)}<tspan x="${40+Math.floor(i/6)*285}" dy="12" fill="#e7c84f" font-size="9">${teamMapCount(counts[p.id]).toLocaleString('en')} configured collaborators</tspan></text>`).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="2040" viewBox="0 0 900 1020"><title>Axel Cruz — configured team map</title><rect width="900" height="1020" fill="#0b131b"/><text x="40" y="35" fill="#fa746c" font-family="monospace" font-size="11" letter-spacing="1.5">AXEL CRUZ / TEAM</text><g fill="#f5f1e8" font-family="Arial, sans-serif" font-size="42" font-weight="700" letter-spacing="-1.7"><text x="40" y="87">Many disciplines.</text><text x="40" y="132">A shared direction.</text></g>${teamMapSVG(people,counts,selectedPerson,true)}${legend}<path d="M40 980H860" stroke="#49636e"/><text x="40" y="1000" fill="#acc5d1" font-family="monospace" font-size="9">YOUR TEAM EXPLORATION / ${people.length} SPECIALTIES</text></svg>`;
}
