'use strict';
// Supplied client imagery, framed with a shared code-native service icon system.
const servicePaths={
 platform:'M7 9h34v24H7zM17 41h14M24 33v8M11 14h26',
 learning:'M24 15 5 7v27l19 8 19-8V7l-19 8v27M11 16l7 3m-7 4 7 3m12-7 7-3m-7 10 7-3',
 mobile:'M16 5h16v38H16zM21 37h6M21 10h6',
 video:'M5 12h27v25H5zM32 20l11-6v21l-11-6M16 19l9 6-9 5z',
 message:'M6 8h36v26H23l-9 8v-8H6zM13 16h22M13 23h16',
 team:'M18 8a7 7 0 1 0 0 14 7 7 0 0 0 0-14M4 40v-5c0-7 7-10 14-10s14 3 14 10v5M33 10a6 6 0 0 1 0 12m3 5c6 1 8 4 8 10',
 check:'M24 5 8 11v13c0 10 16 19 16 19s16-9 16-19V11L24 5zM15 24l6 6 13-14',
 scope:'M6 6h36v36H6zM6 17h36M18 17v25M11 11h2m4 0h2M24 25h12m-12 8h8',
 handshake:'m5 27 8-15 10 1 5-2 15 16-9 13-12-5-7-9m8-13-7 10 5 4 6-5 10 10M5 27l10 9m15-5 8 4',
 tool:'M28 8a11 11 0 0 0-13 14L5 32a6 6 0 0 0 8 8l11-11A11 11 0 0 0 40 15l-8 7-7-7 3-7z',
 data:'M7 7v34h35M16 34V23m10 11V12m10 22V18',
 clock:'M18 4h12M24 4v6m12 4 5-5M24 12a15 15 0 1 0 0 30 15 15 0 0 0 0-30M24 18v10l7 4',
 legal:'M24 6v36M12 42h24M7 14h34M12 14 5 29h14l-7-15m24 0-7 15h14l-7-15',
 sales:'M7 39V9m0 30h35M13 31l9-9 7 5 12-15m-10 0h10v10',
 people:'M24 7a8 8 0 1 0 0 16 8 8 0 0 0 0-16M8 42v-6c0-7 7-10 16-10s16 3 16 10v6'
};
function serviceIcon(key){return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+(servicePaths[key]||servicePaths.platform)+'"/></svg>';}
function projectArtwork(p){
 if(p.id==='cph')return '<img src="assets/cph-cover.svg" alt="Cine Para Huevones editorial cover" width="640" height="440">';
 const platform=['edenred','teojama','recovery'].includes(p.id),source=platform?'assets/project-covers/'+p.id+'.svg':'assets/project-photos/'+p.id+'.webp';
 const alt=platform?(p.id==='recovery'?'Illustration of coordinated Hino and Edenred service recovery':'Illustrative platform view for '+p.name):p.name+' client imagery';
 return '<div class="case-art case-art-'+p.id+(platform?' platform-cover':'')+'"><img class="project-photo" src="'+source+'" alt="'+alt+'" width="640" height="440" loading="lazy"></div>';
}
