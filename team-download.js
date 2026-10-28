'use strict';
$('#counts-form').addEventListener('input',()=>{$('#team-download-status').textContent='';});
$('#clear-counts').addEventListener('click',()=>{$('#team-download-status').textContent='';});
$('#download-team').addEventListener('click',async()=>{
 const button=$('#download-team'),status=$('#team-download-status');let sourceURL='',downloadURL='';
 button.disabled=true;status.textContent='Preparing your team…';
 try{
  const svg=teamMapExportSVG(people,counts,selectedPerson),source=new Blob([svg],{type:'image/svg+xml;charset=utf-8'});
  sourceURL=URL.createObjectURL(source);
  const picture=new Image();await new Promise((resolve,reject)=>{picture.onload=resolve;picture.onerror=()=>reject(Error('Team image could not be rendered'));picture.src=sourceURL;});
  const canvas=document.createElement('canvas');canvas.width=1800;canvas.height=2040;
  const ctx=canvas.getContext('2d');if(!ctx)throw Error('Image export is unavailable');ctx.drawImage(picture,0,0,canvas.width,canvas.height);
  const png=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!png)throw Error('PNG export is unavailable');
  downloadURL=URL.createObjectURL(png);const link=document.createElement('a');link.href=downloadURL;link.download='Axel_Cruz_Team.png';document.body.append(link);link.click();link.remove();
  status.textContent='Your team PNG is ready.';
 }catch{status.textContent='Couldn’t prepare the PNG. Please try again.';}
 finally{if(sourceURL)URL.revokeObjectURL(sourceURL);if(downloadURL)setTimeout(()=>URL.revokeObjectURL(downloadURL),60000);button.disabled=false;}
});
