/* ============================================================
   RouteClaim v2 – main.js
   MapLibre GL · OSRM routing · Actividades · GPS real
   ============================================================ */

const COLORS=['#7a9968','#2e6b7e','#7aa8bc','#c0604a','#d4a843','#5a8a6a','#3a6a8a','#8a6a4a','#6a4a8a','#c87060','#4a9a8a','#9a7a4a'];
const FLAGS=['🏴󠁥󠁳󠁶󠁣󠁿','🇪🇸','🇺🇸','🇬🇧','🇫🇷','🇩🇪','🇮🇹','🇵🇹','🇲🇽','🇧🇷','🇦🇷','🇨🇴','🇯🇵','🇦🇺','🇳🇱','🇸🇪','🇨🇭','🇵🇱','🏴‍☠️','🚀','🦁','⛰️','🌊','🔥'];
const DISC={running:'🏃',bicicleta:'🚴',trekking:'🥾',todas:'⚡'};

/* ── RUTAS: waypoints [lng,lat] – OSRM los convierte en trazado real ── */
const RUTAS=[
  {id:1,nombre:"Vía Verde del Serpis",tipo:"bicicleta",km:"45 km",dif:"facil",ciudad:"Gandía – Alcoi",
   desc:"Antiguo trazado ferroviario entre naranjos y el valle del Serpis. Perfecta para cicloturismo familiar.",
   img:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Via_Verde_del_Serpis.jpg/640px-Via_Verde_del_Serpis.jpg",
   waypoints:[[-0.176,38.967],[-0.246,38.906],[-0.320,38.844],[-0.399,38.781],[-0.470,38.721]]},
  {id:2,nombre:"Puentes Colgantes de Chulilla",tipo:"trekking",km:"9 km",dif:"media",ciudad:"Chulilla, Valencia",
   desc:"Sendero espectacular por el cañón del Turia con puentes colgantes sobre el vacío.",img:null,
   waypoints:[[-0.882,39.663],[-0.893,39.651],[-0.902,39.642],[-0.911,39.632]]},
  {id:3,nombre:"Parque Natural Turia – Ruta Roja",tipo:"running",km:"12 km",dif:"media",ciudad:"Valencia",
   desc:"Ruta circular por el Parque Natural del Turia. Pinar mediterráneo y cauce del río.",img:null,
   waypoints:[[-0.682,39.546],[-0.714,39.528],[-0.721,39.516],[-0.695,39.496],[-0.682,39.503],[-0.682,39.546]]},
  {id:4,nombre:"Forat de Bernia",tipo:"trekking",km:"9 km",dif:"media",ciudad:"Serra de Bernia, Alicante",
   desc:"La Catedral del senderismo valenciano. Vistas panorámicas del litoral desde el agujero natural.",img:null,
   waypoints:[[-0.043,38.671],[-0.056,38.683],[-0.068,38.695],[-0.057,38.692],[-0.043,38.677]]},
  {id:5,nombre:"Vía Verde Ojos Negros",tipo:"bicicleta",km:"80 km",dif:"facil",ciudad:"Valencia – Barracas",
   desc:"La vía verde más larga de España. Paisajes únicos entre la costa y el interior.",img:null,
   waypoints:[[-0.419,39.472],[-0.557,39.588],[-0.695,39.703],[-0.833,39.819],[-0.970,39.934],[-1.074,40.021]]},
  {id:6,nombre:"Marjal de Pego – Oliva",tipo:"bicicleta",km:"18 km",dif:"facil",ciudad:"Pego – Oliva",
   desc:"Humedales, arrozales y avifauna mediterránea única en el Parque Natural.",img:null,
   waypoints:[[-0.113,38.850],[-0.087,38.883],[-0.060,38.916],[-0.038,38.944]]},
  {id:7,nombre:"Sierra Calderona – Cumbres",tipo:"trekking",km:"14 km",dif:"dificil",ciudad:"Serra, Valencia",
   desc:"Ascenso al punto más alto de la Sierra Calderona. Vistas 360° sobre Valencia y el Mediterráneo.",img:null,
   waypoints:[[-0.416,39.712],[-0.432,39.740],[-0.446,39.762],[-0.416,39.712]]},
  {id:8,nombre:"Paseo Ribera del Xúquer",tipo:"running",km:"7 km",dif:"facil",ciudad:"Alzira – Sueca",
   desc:"Ruta llana junto al río Xúquer. Naranjos y el paisaje inconfundible de la Ribera.",img:null,
   waypoints:[[-0.431,39.152],[-0.398,39.185],[-0.365,39.218],[-0.351,39.232]]},
  {id:9,nombre:"Montanejos – Barranco del Mijares",tipo:"trekking",km:"10 km",dif:"media",ciudad:"Montanejos, Castellón",
   desc:"Piscinas naturales de agua termal rodeadas de acantilados en el Barranco del Mijares.",img:null,
   waypoints:[[-0.548,40.006],[-0.558,39.979],[-0.568,39.958],[-0.548,39.925]]},
  {id:10,nombre:"Coll de Rates – Costa Blanca",tipo:"bicicleta",km:"35 km",dif:"dificil",ciudad:"Callosa d'en Sarrià",
   desc:"Puerto de montaña favorito de los ciclistas profesionales. Vistas espectaculares al Mediterráneo.",img:null,
   waypoints:[[-0.023,38.642],[-0.071,38.689],[-0.119,38.736],[-0.167,38.782],[-0.171,38.790]]},
  {id:11,nombre:"Running Malvarrosa – Port Saplaya",tipo:"running",km:"8 km",dif:"facil",ciudad:"Valencia costa",
   desc:"Paseo Marítimo de la Malvarrosa. Plano, rápido y con vistas al Mediterráneo.",img:null,
   waypoints:[[-0.331,39.482],[-0.320,39.516],[-0.308,39.549],[-0.300,39.576]]},
  {id:12,nombre:"Penyagolosa – Cima",tipo:"trekking",km:"16 km",dif:"dificil",ciudad:"Vistabella del Maestrat",
   desc:"El techo de la Comunitat (1.813 m). Bosques centenarios y vistas hasta el mar.",img:null,
   waypoints:[[-0.352,40.216],[-0.361,40.243],[-0.362,40.249],[-0.349,40.232],[-0.352,40.216]]}
];

const DEMOS=[
  {id:'demo1',username:'VeloClaimer',email:'demo@test.com',password:'demo123',color:'#c0604a',flag:'🇪🇸',disciplina:'bicicleta',puntos:540,rutas:[1,5,10],actividades:[]},
  {id:'demo2',username:'TrailKing',email:'trail@test.com',password:'demo123',color:'#7aa8bc',flag:'🏴󠁥󠁳󠁶󠁣󠁿',disciplina:'trekking',puntos:420,rutas:[2,4,7,12],actividades:[]},
  {id:'demo3',username:'MaratonCV',email:'mara@test.com',password:'demo123',color:'#d4a843',flag:'🇪🇸',disciplina:'running',puntos:310,rutas:[3,8,11],actividades:[]}
];

/* ── STATE ── */
let CU=null,MAP=null,MINIMAP=null;
let gpsOn=false,gpsWatch=null,gpsMark=null;
let selColor=COLORS[0],selFlag=FLAGS[0],rutaFilt='todas',modalRutaId=null,toastT=null;
let rutas=[],users=[],mapOk=false;

/* Actividad activa */
let activeRutaId=null,   /* id de la ruta en curso */
    activeStart=null,    /* timestamp inicio */
    activeTimer=null,    /* setInterval del cronómetro */
    activeElapsed=0,     /* segundos transcurridos */
    trackPts=[];         /* puntos GPS grabados durante la ruta */

/* ── STORAGE ── */
function save(){
  try{
    const rs=rutas.map(r=>({id:r.id,conquistador_id:r.conquistador_id,tiempo_record:r.tiempo_record,pts:r.pts||null}));
    localStorage.setItem('rc_u4',JSON.stringify(users));
    localStorage.setItem('rc_r4',JSON.stringify(rs));
    if(CU)localStorage.setItem('rc_s4',CU.id);
  }catch(e){}
}
function load(){
  ['rc2_users','rc2_rutas','rc2_session','rc_u3','rc_r3','rc_s3'].forEach(k=>{try{localStorage.removeItem(k);}catch(e){}});
  rutas=RUTAS.map(r=>({...r,conquistador_id:null,tiempo_record:null,pts:null}));
  users=JSON.parse(JSON.stringify(DEMOS));
  try{
    const us=localStorage.getItem('rc_u4');
    const rs=localStorage.getItem('rc_r4');
    if(us)users=JSON.parse(us);
    if(rs){
      JSON.parse(rs).forEach(s=>{
        const r=rutas.find(x=>x.id===s.id);
        if(r){r.conquistador_id=s.conquistador_id;r.tiempo_record=s.tiempo_record;if(s.pts)r.pts=s.pts;}
      });
    }else{
      DEMOS.forEach(p=>p.rutas.forEach(rid=>{
        const r=rutas.find(x=>x.id===rid);
        if(r){r.conquistador_id=p.id;r.tiempo_record=Math.floor(Math.random()*3600)+600;}
      }));
      save();
    }
    /* Asegurar campo actividades */
    users.forEach(u=>{if(!u.actividades)u.actividades=[];});
  }catch(e){
    rutas=RUTAS.map(r=>({...r,conquistador_id:null,tiempo_record:null,pts:null}));
    users=JSON.parse(JSON.stringify(DEMOS));
  }
}

/* ── AUTH ── */
function switchAuthTab(t){
  document.querySelectorAll('.auth-tab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.auth-tab')[t==='login'?0:1].classList.add('active');
  document.getElementById('form-'+t).classList.add('active');
}
function doLogin(){
  const e=document.getElementById('login-email').value.trim();
  const p=document.getElementById('login-pass').value;
  const err=document.getElementById('login-error');
  const u=users.find(x=>x.email===e&&x.password===p);
  if(!u){err.style.display='block';return;}err.style.display='none';go(u);
}
function doRegistro(){
  const username=document.getElementById('reg-username').value.trim();
  const email=document.getElementById('reg-email').value.trim();
  const pass=document.getElementById('reg-pass').value;
  const disc=document.getElementById('reg-disc').value;
  const err=document.getElementById('reg-error');
  if(!username||!email||!pass){err.textContent='Completa todos los campos.';err.style.display='block';return;}
  if(users.find(u=>u.email===email)){err.textContent='Email ya registrado.';err.style.display='block';return;}
  if(users.find(u=>u.username.toLowerCase()===username.toLowerCase())){err.textContent='Usuario ya existe.';err.style.display='block';return;}
  if(pass.length<6){err.textContent='Mínimo 6 caracteres.';err.style.display='block';return;}
  err.style.display='none';
  const nu={id:'u'+Date.now(),username,email,password:pass,color:selColor,flag:selFlag,disciplina:disc,puntos:0,rutas:[],actividades:[]};
  users.push(nu);save();go(nu);
}
function go(u){
  CU=u;save();
  document.getElementById('landing').style.display='none';
  const aw=document.getElementById('app-wrapper');
  aw.style.display='flex';aw.style.flexDirection='column';
  document.body.classList.add('app-mode');
  boot();
}
function doLogout(){
  stopRuta();
  CU=null;gpsStop();mapOk=false;gpsMark=null;
  if(MAP){MAP.remove();MAP=null;}
  if(MINIMAP){MINIMAP.remove();MINIMAP=null;}
  try{localStorage.removeItem('rc_s4');}catch(e){}
  document.getElementById('app-wrapper').style.display='none';
  document.getElementById('landing').style.display='block';
  document.body.classList.remove('app-mode');
  window.scrollTo(0,0);
}

/* ── BOOT ── */
function boot(){
  navBar();renderRutas();renderRanking();renderPerfil();
  tab('mapa');
  requestAnimationFrame(()=>requestAnimationFrame(initMap));
}
function navBar(){
  const av=document.getElementById('nav-avatar-el');
  av.textContent=CU.username[0].toUpperCase();
  av.style.borderColor=CU.color;av.style.color=CU.color;av.style.background=CU.color+'22';
  document.getElementById('nav-username-el').textContent=CU.username;
  document.getElementById('hud-rutas').textContent=(CU.rutas||[]).length;
  document.getElementById('legend-own-dot').style.background=CU.color;
}

/* ══════════════════════════════
   MAPA – MapLibre GL
══════════════════════════════ */
function routeColor(r){
  if(!r.conquistador_id)return'#3a5a44';
  if(r.conquistador_id===CU.id)return CU.color;
  const o=users.find(u=>u.id===r.conquistador_id);
  return o?o.color:'#5a7a64';
}

function initMap(){
  const el=document.getElementById('map');
  if(!el||el.offsetWidth===0)return;
  if(MAP){MAP.remove();MAP=null;}
  mapOk=false;gpsMark=null;

  MAP=new maplibregl.Map({
    container:'map',
    style:{version:8,
      sources:{base:{type:'raster',
        tiles:['https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
               'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
               'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png'],
        tileSize:256,maxzoom:19,attribution:'© OpenStreetMap © CARTO'}},
      layers:[{id:'bg',type:'background',paint:{'background-color':'#0d1a14'}},
              {id:'bt',type:'raster',source:'base',paint:{'raster-opacity':1}}]},
    center:[-0.4763,39.5699],zoom:7.2,pitch:45,bearing:-8,antialias:true
  });

  MAP.addControl(new maplibregl.NavigationControl(),'top-right');

  MAP.on('load',()=>{
    mapOk=true;
    MAP.addSource('dem',{type:'raster-dem',
      tiles:['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
      tileSize:256,maxzoom:15,encoding:'terrarium'});
    try{MAP.setTerrain({source:'dem',exaggeration:1.6});}catch(e){}

    /* Cargar rutas – primero las que ya tienen pts cacheados, luego pedir OSRM */
    rutas.forEach(r=>{
      if(r.pts&&r.pts.length>1) drawRuta(r);
      else fetchRoute(r);
    });
    MAP.easeTo({pitch:45,bearing:-8,zoom:7.5,duration:1800});
  });

  /* Click abre modal */
  MAP.on('click',e=>{
    const layers=rutas.map(r=>'rl-'+r.id).filter(id=>{try{return!!MAP.getLayer(id);}catch{return false;}});
    if(!layers.length)return;
    const hits=MAP.queryRenderedFeatures(e.point,{layers});
    if(hits.length)openModal(Number(hits[0].properties.rid));
  });
  MAP.on('mousemove',e=>{
    const layers=rutas.map(r=>'rl-'+r.id).filter(id=>{try{return!!MAP.getLayer(id);}catch{return false;}});
    MAP.getCanvas().style.cursor=(layers.length&&MAP.queryRenderedFeatures(e.point,{layers}).length)?'pointer':'';
  });
}

/* ── OSRM: obtener trazado real por carretera/sendero ── */
async function fetchRoute(r){
  try{
    /* OSRM público: foot para trekking/running, cycling para bici */
    const profile=r.tipo==='bicicleta'?'cycling':'foot';
    const coords=r.waypoints.map(p=>p.join(',')).join(';');
    const url=`https://router.project-osrm.org/route/v1/${profile}/${coords}?overview=full&geometries=geojson`;
    const res=await fetch(url);
    if(!res.ok)throw new Error('OSRM error '+res.status);
    const data=await res.json();
    if(data.code==='Ok'&&data.routes[0]){
      r.pts=data.routes[0].geometry.coordinates;
      save();             /* cachear en localStorage */
      drawRuta(r);        /* dibujar con trazado real */
    }else{
      r.pts=r.waypoints;  /* fallback: línea recta entre waypoints */
      drawRuta(r);
    }
  }catch(e){
    r.pts=r.waypoints;    /* sin internet: usar waypoints directos */
    drawRuta(r);
  }
}

function drawRuta(r){
  if(!mapOk||!MAP||!r.pts||r.pts.length<2)return;
  const col=routeColor(r);
  const sid='rs-'+r.id;
  const geo={type:'FeatureCollection',features:[
    {type:'Feature',properties:{rid:r.id,nombre:r.nombre},geometry:{type:'LineString',coordinates:r.pts}},
    {type:'Feature',properties:{rid:r.id,tipo:'ini'},geometry:{type:'Point',coordinates:r.pts[0]}},
    {type:'Feature',properties:{rid:r.id,tipo:'fin'},geometry:{type:'Point',coordinates:r.pts[r.pts.length-1]}}
  ]};

  if(MAP.getSource(sid)){
    MAP.getSource(sid).setData(geo);
    updateRutaStyle(r,col);return;
  }
  MAP.addSource(sid,{type:'geojson',data:geo});

  /* Glow */
  MAP.addLayer({id:'rg-'+r.id,type:'line',source:sid,filter:['==','$type','LineString'],
    layout:{'line-join':'round','line-cap':'round'},
    paint:{'line-color':col,'line-width':16,'line-opacity':0.18,'line-blur':10}});
  /* Línea */
  MAP.addLayer({id:'rl-'+r.id,type:'line',source:sid,filter:['==','$type','LineString'],
    layout:{'line-join':'round','line-cap':'round'},
    paint:{'line-color':col,
      'line-width':['interpolate',['linear'],['zoom'],6,3,10,5,15,9],
      'line-opacity':r.conquistador_id?0.95:0.45,
      'line-dasharray':r.conquistador_id?[1,0]:[3,2]}});
  /* Inicio */
  MAP.addLayer({id:'rd-'+r.id,type:'circle',source:sid,
    filter:['all',['==','$type','Point'],['==',['get','tipo'],'ini']],
    paint:{'circle-radius':['interpolate',['linear'],['zoom'],6,4,12,8],
      'circle-color':'#0d1a14','circle-stroke-color':col,'circle-stroke-width':3}});
  /* Fin */
  MAP.addLayer({id:'rf-'+r.id,type:'circle',source:sid,
    filter:['all',['==','$type','Point'],['==',['get','tipo'],'fin']],
    paint:{'circle-radius':['interpolate',['linear'],['zoom'],6,5,12,10],
      'circle-color':col,'circle-stroke-color':'#0d1a14','circle-stroke-width':2.5,'circle-opacity':0.95}});
}

function updateRutaStyle(r,col){
  const id=r.id;
  if(MAP.getLayer('rg-'+id))MAP.setPaintProperty('rg-'+id,'line-color',col);
  if(MAP.getLayer('rl-'+id)){
    MAP.setPaintProperty('rl-'+id,'line-color',col);
    MAP.setPaintProperty('rl-'+id,'line-opacity',r.conquistador_id?0.95:0.45);
    MAP.setPaintProperty('rl-'+id,'line-dasharray',r.conquistador_id?[1,0]:[3,2]);
  }
  if(MAP.getLayer('rd-'+id))MAP.setPaintProperty('rd-'+id,'circle-stroke-color',col);
  if(MAP.getLayer('rf-'+id))MAP.setPaintProperty('rf-'+id,'circle-color',col);
}
function refreshRuta(id){
  if(!mapOk||!MAP)return;
  const r=rutas.find(x=>x.id===id);if(!r)return;
  const col=routeColor(r);
  updateRutaStyle(r,col);
}

/* ══════════════════════════════
   INICIO / PARADA DE RUTA
══════════════════════════════ */
function startRuta(id){
  if(activeRutaId){toast('Ya tienes una ruta activa. Detén la actual primero.','error');return;}
  const r=rutas.find(x=>x.id===id);
  if(!r)return;
  activeRutaId=id;
  activeStart=Date.now();
  activeElapsed=0;
  trackPts=[];

  /* Cerrar modal y ir al mapa */
  document.getElementById('modal-ruta').classList.remove('open');
  tab('mapa');

  /* Activar GPS automáticamente */
  gpsStart();

  /* Mostrar HUD de ruta activa */
  showActiveHUD(r);

  /* Cronómetro */
  activeTimer=setInterval(()=>{
    activeElapsed=Math.floor((Date.now()-activeStart)/1000);
    const el=document.getElementById('active-timer');
    if(el)el.textContent=fmtTime(activeElapsed);
  },1000);

  toast('🏁 Ruta iniciada: '+r.nombre,'success');

  /* Volar al inicio de la ruta */
  if(MAP&&r.pts&&r.pts.length){
    MAP.flyTo({center:r.pts[0],zoom:14,pitch:55,duration:2000});
  }
}

function stopRuta(conquered=false){
  if(!activeRutaId) return;
  clearInterval(activeTimer); activeTimer=null;
  gpsStop();
  hideActiveHUD();

  const rid     = activeRutaId;
  const r       = rutas.find(x=>x.id===rid);
  const elapsed = activeElapsed || Math.floor((Date.now()-activeStart)/1000);

  if(r && elapsed>5){

    /* 1. CONQUISTAR: asignar color ANTES de cualquier render */
    const yaConquistada = r.conquistador_id===CU.id;
    r.conquistador_id = CU.id;                  /* <── siempre al terminar */
    r.tiempo_record   = (!r.tiempo_record || elapsed<r.tiempo_record) ? elapsed : r.tiempo_record;

    if(!CU.rutas) CU.rutas=[];
    const esNueva = !CU.rutas.includes(rid);
    if(esNueva){
      CU.rutas.push(rid);
      CU.puntos=(CU.puntos||0)+100;
    }

    /* 2. ACTUALIZAR MAPA – el color ya está asignado */
    refreshRuta(rid);

    /* 3. GUARDAR ACTIVIDAD */
    if(!CU.actividades) CU.actividades=[];
    CU.actividades.unshift({
      id        : 'act'+Date.now(),
      ruta_id   : rid,
      ruta_nombre: r.nombre,
      tipo      : r.tipo,
      tiempo_s  : elapsed,
      distancia : r.km,
      fecha     : new Date().toISOString(),
      conquistada: true,
      esNueva
    });

    /* 4. PERSISTIR */
    save();

    /* 5. ACTUALIZAR UI */
    navBar(); renderRutas(); renderRanking(); renderPerfil();

    /* 6. POPUP DE CONQUISTA */
    showConquestPopup(r, elapsed, esNueva);
  }

  activeRutaId=null; activeStart=null; activeElapsed=0; trackPts=[];
}

/* HUD de ruta activa */
function showActiveHUD(r){
  let hud=document.getElementById('active-hud');
  if(!hud){
    hud=document.createElement('div');
    hud.id='active-hud';
    hud.style.cssText=`position:absolute;bottom:4.5rem;left:50%;transform:translateX(-50%);
      background:rgba(13,26,20,.96);border:1px solid var(--olive);border-radius:8px;
      padding:.75rem 1.25rem;display:flex;align-items:center;gap:1rem;
      pointer-events:auto;z-index:25;backdrop-filter:blur(10px);
      font-family:'Barlow Condensed',sans-serif;white-space:nowrap;`;
    document.querySelector('.map-hud').appendChild(hud);
  }
  hud.innerHTML=`
    <div style="display:flex;flex-direction:column;gap:.1rem">
      <div style="font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--text3)">EN RUTA</div>
      <div style="font-size:.82rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--cream);max-width:160px;overflow:hidden;text-overflow:ellipsis">${r.nombre}</div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:.1rem">
      <div style="font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--text3)">TIEMPO</div>
      <div id="active-timer" style="font-family:'Playfair Display',serif;font-size:1.4rem;color:var(--olive);line-height:1">0:00</div>
    </div>
    <button onclick="stopRuta(true)" style="background:var(--rival);color:#fff;border:none;border-radius:4px;
      font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:.75rem;letter-spacing:.1em;
      text-transform:uppercase;padding:.5rem .9rem;cursor:pointer;">⏹ Terminar</button>`;
  hud.style.display='flex';
}
function hideActiveHUD(){
  const hud=document.getElementById('active-hud');
  if(hud)hud.style.display='none';
}

function showConquestPopup(r, elapsed, esNueva){
  /* Popup flotante con animación – distinto al de GPS */
  const popup=document.createElement('div');
  popup.id='conquista-popup-anim';
  popup.style.cssText=`
    position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(.7);
    background:var(--card);border:2px solid ${CU.color};border-radius:12px;
    padding:2rem 2.5rem;text-align:center;z-index:9999;
    pointer-events:auto;width:300px;max-width:90vw;
    transition:transform .35s cubic-bezier(.34,1.56,.64,1),opacity .35s;
    opacity:0;font-family:'Barlow Condensed',sans-serif;`;
  popup.innerHTML=`
    <div style="font-size:3rem;margin-bottom:.75rem">${esNueva?'🏆':'⚡'}</div>
    <div style="font-family:'Playfair Display',serif;font-size:1.6rem;color:${CU.color};margin-bottom:.5rem">
      ${esNueva?'¡Conquistada!':'¡Completada!'}
    </div>
    <div style="font-size:.88rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;
      color:var(--cream);margin-bottom:.35rem;line-height:1.3">${r.nombre}</div>
    <div style="display:flex;justify-content:center;gap:1.5rem;margin:.9rem 0">
      <div>
        <div style="font-family:'Playfair Display',serif;font-size:1.8rem;color:${CU.color};line-height:1">${fmtTime(elapsed)}</div>
        <div style="font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--text3)">Tiempo</div>
      </div>
      <div style="width:1px;background:var(--border)"></div>
      <div>
        <div style="font-family:'Playfair Display',serif;font-size:1.8rem;color:var(--cream);line-height:1">${r.km}</div>
        <div style="font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--text3)">Distancia</div>
      </div>
      ${esNueva?`<div style="width:1px;background:var(--border)"></div>
      <div>
        <div style="font-family:'Playfair Display',serif;font-size:1.8rem;color:${CU.color};line-height:1">+100</div>
        <div style="font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--text3)">Puntos</div>
      </div>`:``}
    </div>
    <div style="display:flex;gap:.5rem;margin-top:1rem">
      <button onclick="this.closest('[id]').remove()" 
        style="flex:1;background:${CU.color};color:#0d1a14;border:none;border-radius:4px;
        font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:.82rem;
        letter-spacing:.1em;text-transform:uppercase;padding:.65rem;cursor:pointer;">
        Ver en mapa
      </button>
      <button onclick="goTab('perfil');this.closest('[id]').remove()"
        style="flex:1;background:var(--bg2);color:var(--cream);border:1px solid var(--border);
        border-radius:4px;font-family:'Barlow Condensed',sans-serif;font-weight:700;
        font-size:.82rem;letter-spacing:.1em;text-transform:uppercase;padding:.65rem;cursor:pointer;">
        Mi perfil
      </button>
    </div>`;
  document.body.appendChild(popup);
  /* Animar entrada */
  requestAnimationFrame(()=>{
    popup.style.transform='translate(-50%,-50%) scale(1)';
    popup.style.opacity='1';
  });
  /* Auto-cerrar tras 8s */
  setTimeout(()=>{
    popup.style.opacity='0';
    popup.style.transform='translate(-50%,-50%) scale(.8)';
    setTimeout(()=>popup.remove(),400);
  },8000);
}

/* ── GPS ── */
function toggleGPS(){gpsOn?gpsStop():gpsStart();}
function gpsStart(){
  if(!navigator.geolocation){toast('GPS no disponible','error');return;}
  gpsOn=true;
  document.getElementById('btn-gps').classList.add('tracking');
  document.getElementById('gps-label').textContent='Detener GPS';
  toast('GPS activado 📍','success');
  navigator.geolocation.getCurrentPosition(
    p=>{mark(p.coords.longitude,p.coords.latitude);MAP.flyTo({center:[p.coords.longitude,p.coords.latitude],zoom:13,pitch:55,duration:2000});},
    ()=>simPos(),{enableHighAccuracy:true,timeout:8000}
  );
  gpsWatch=navigator.geolocation.watchPosition(
    p=>{
      const{longitude:lng,latitude:lat}=p.coords;
      mark(lng,lat);
      if(activeRutaId)trackPts.push([lng,lat]);
    },
    ()=>{},{enableHighAccuracy:true,maximumAge:5000}
  );
}
function simPos(){
  const lng=-0.4763,lat=39.5699;
  mark(lng,lat);MAP.flyTo({center:[lng,lat],zoom:10,pitch:50,duration:2000});
  toast('Modo demo: Valencia 🗺️','success');
  let n=0;const iv=setInterval(()=>{
    if(!gpsOn){clearInterval(iv);return;}
    n++;mark(lng+n*0.0012,lat+n*0.001);
    if(activeRutaId)trackPts.push([lng+n*0.0012,lat+n*0.001]);
    if(n>20)clearInterval(iv);
  },3000);
}
function gpsStop(){
  gpsOn=false;if(gpsWatch)navigator.geolocation.clearWatch(gpsWatch);
  document.getElementById('btn-gps').classList.remove('tracking');
  document.getElementById('gps-label').textContent='Activar GPS';
  if(!activeRutaId)toast('GPS desactivado','error');
}
function mark(lng,lat){
  if(!MAP||!mapOk)return;
  if(gpsMark){gpsMark.setLngLat([lng,lat]);return;}
  const el=document.createElement('div');
  el.style.cssText=`width:16px;height:16px;border-radius:50%;background:${CU.color};border:3px solid #0d1a14;box-shadow:0 0 14px ${CU.color};position:relative;`;
  const ring=document.createElement('div');
  ring.style.cssText=`position:absolute;inset:-8px;border-radius:50%;border:2px solid ${CU.color};opacity:0;animation:gRing 1.8s ease-out infinite;`;
  el.appendChild(ring);
  if(!document.getElementById('gRKF')){const s=document.createElement('style');s.id='gRKF';s.textContent='@keyframes gRing{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.5);opacity:0}}';document.head.appendChild(s);}
  gpsMark=new maplibregl.Marker({element:el,anchor:'center'}).setLngLat([lng,lat]).addTo(MAP);
}

/* ── LISTAS ── */
function filterRutas(f,b){
  rutaFilt=f;
  document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');renderRutas();
}
function renderRutas(){
  let list=[...rutas];
  if(rutaFilt!=='todas'&&rutaFilt!=='libre')list=list.filter(r=>r.tipo===rutaFilt);
  if(rutaFilt==='libre')list=list.filter(r=>!r.conquistador_id);
  const bc={facil:'badge-facil',media:'badge-media',dificil:'badge-dificil'};
  document.getElementById('rutas-list').innerHTML=list.map(r=>{
    const own=r.conquistador_id?users.find(u=>u.id===r.conquistador_id):null;
    const mine=r.conquistador_id===CU.id;
    return `<div class="ruta-card" onclick="openModal(${r.id})">
      ${r.img?`<img class="ruta-img" src="${r.img}" onerror="this.style.display='none'" loading="lazy" alt="${r.nombre}"/>`:`<div class="ruta-img-placeholder">${DISC[r.tipo]}</div>`}
      <div class="ruta-body">
        <div class="ruta-top"><div class="ruta-nombre">${r.nombre}</div><span class="ruta-badge ${bc[r.dif]||'badge-media'}">${r.dif}</span></div>
        <div class="ruta-meta"><span>📍 ${r.ciudad}</span><span>📏 ${r.km}</span><span>${DISC[r.tipo]} ${r.tipo}</span></div>
        <div class="ruta-desc">${r.desc}</div>
        <div class="ruta-conquistador"><span class="conq-dot" style="background:${own?own.color:'var(--text3)'}"></span>${own?(own.flag||'')+' '+own.username+(mine?' (tú)':''):'Sin conquistar'}</div>
      </div></div>`;
  }).join('');
}

function renderRanking(){
  const s=[...users].sort((a,b)=>(b.puntos||0)-(a.puntos||0));
  const M=['🥇','🥈','🥉'],P=['gold','silver','bronze'];
  document.getElementById('ranking-list').innerHTML=s.map((u,i)=>`
    <div class="ranking-row">
      <div class="ranking-pos ${P[i]||''}">${M[i]||i+1}</div>
      <div class="ranking-avatar" style="border-color:${u.color};color:${u.color};background:${u.color}18">${u.username[0].toUpperCase()}</div>
      <div class="ranking-info">
        <div class="ranking-name">${u.flag||''} ${u.username}${u.id===CU.id?' ✦':''}</div>
        <div class="ranking-sub">${(u.rutas||[]).length} rutas · ${DISC[u.disciplina]||''} ${u.disciplina}</div>
      </div>
      <div class="ranking-pts">${u.puntos||0}</div>
    </div>`).join('');
}

/* Genera SVG mini-trazado de la ruta para la tarjeta del perfil */
function buildRutaCard(r,u){
  const col = u.color;
  const act = (u.actividades||[]).filter(a=>a.ruta_id===r.id);
  const mejor = act.length ? Math.min(...act.map(a=>a.tiempo_s)) : r.tiempo_record;
  const veces = act.length;

  /* Mini SVG del trazado */
  const pts = r.pts&&r.pts.length>1 ? r.pts : r.waypoints;
  const lngs=pts.map(p=>p[0]), lats=pts.map(p=>p[1]);
  const minX=Math.min(...lngs), maxX=Math.max(...lngs);
  const minY=Math.min(...lats), maxY=Math.max(...lats);
  const W=100,H=48,pad=6;
  const sx=p=>pad+(p-minX)/(maxX-minX+0.0001)*(W-pad*2);
  const sy=p=>H-pad-(p-minY)/(maxY-minY+0.0001)*(H-pad*2);
  const pathD=pts.map((p,i)=>(i===0?'M':'L')+sx(p[0]).toFixed(1)+' '+sy(p[1]).toFixed(1)).join(' ');

  const bc={facil:'badge-facil',media:'badge-media',dificil:'badge-dificil'}[r.dif]||'badge-media';

  return `<div onclick="openModal(${r.id})" style="
      background:var(--card);border:1px solid ${col}44;border-radius:6px;
      overflow:hidden;cursor:pointer;transition:border-color .2s,transform .2s;margin-bottom:.5rem;"
    onmouseenter="this.style.borderColor='${col}';this.style.transform='translateY(-2px)'"
    onmouseleave="this.style.borderColor='${col}44';this.style.transform=''">

    <!-- Franja de color del usuario arriba -->
    <div style="height:3px;background:${col}"></div>

    <div style="display:flex;align-items:stretch">

      <!-- Mini mapa SVG -->
      <div style="width:100px;flex-shrink:0;background:#0d1a14;display:flex;align-items:center;justify-content:center;padding:4px">
        <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
          <!-- Glow -->
          <path d="${pathD}" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity=".2" filter="url(#glow${r.id})"/>
          <defs><filter id="glow${r.id}"><feGaussianBlur stdDeviation="2"/></filter></defs>
          <!-- Línea -->
          <path d="${pathD}" fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>
          <!-- Punto inicio -->
          <circle cx="${sx(pts[0][0]).toFixed(1)}" cy="${sy(pts[0][1]).toFixed(1)}" r="3" fill="#0d1a14" stroke="${col}" stroke-width="1.5"/>
          <!-- Punto fin -->
          <circle cx="${sx(pts[pts.length-1][0]).toFixed(1)}" cy="${sy(pts[pts.length-1][1]).toFixed(1)}" r="3.5" fill="${col}"/>
        </svg>
      </div>

      <!-- Info -->
      <div style="flex:1;padding:.6rem .75rem;min-width:0">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:.4rem;margin-bottom:.25rem">
          <div style="font-family:var(--fu);font-size:.8rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;line-height:1.2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1">${r.nombre}</div>
          <span class="ruta-badge ${bc}" style="flex-shrink:0;font-size:.58rem">${r.dif}</span>
        </div>
        <div style="font-family:var(--fu);font-size:.65rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--text3);margin-bottom:.35rem">📍 ${r.ciudad} · ${r.km} · ${DISC[r.tipo]} ${r.tipo}</div>
        <div style="display:flex;gap:.75rem;align-items:center">
          ${mejor?`<div style="display:flex;align-items:center;gap:.25rem">
            <span style="font-size:.6rem;color:var(--text3)">⏱</span>
            <span style="font-family:'Playfair Display',serif;font-size:.95rem;color:${col}">${fmtTime(mejor)}</span>
            <span style="font-family:var(--fu);font-size:.58rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--text3)">mejor</span>
          </div>`:''}
          ${veces?`<div style="font-family:var(--fu);font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--text3)">${veces}× completada</div>`:''}
        </div>
      </div>

      <!-- Insignia de conquista -->
      <div style="width:28px;flex-shrink:0;background:${col}10;display:flex;align-items:center;justify-content:center;border-left:1px solid ${col}22">
        <span style="font-size:1rem;transform:rotate(-90deg);display:block">🏴</span>
      </div>

    </div>
  </div>`;
}

function renderPerfil(){
  const u=CU;
  const av=document.getElementById('p-avatar');
  av.textContent=u.username[0].toUpperCase();
  av.style.borderColor=u.color;av.style.color=u.color;av.style.background=u.color+'18';
  document.getElementById('p-flag').textContent=u.flag||'🏴';
  document.getElementById('p-name').textContent=u.username;
  document.getElementById('p-disc').textContent=(DISC[u.disciplina]||'')+' '+u.disciplina;
  const s=[...users].sort((a,b)=>(b.puntos||0)-(a.puntos||0));
  const pos=s.findIndex(x=>x.id===u.id)+1;
  document.getElementById('p-stats').innerHTML=`
    <div class="perfil-stat"><div class="perfil-stat-num">${u.puntos||0}</div><div class="perfil-stat-label">Puntos</div></div>
    <div class="perfil-stat"><div class="perfil-stat-num">${(u.rutas||[]).length}</div><div class="perfil-stat-label">Rutas</div></div>
    <div class="perfil-stat"><div class="perfil-stat-num">#${pos}</div><div class="perfil-stat-label">Ranking</div></div>`;

  /* Rutas conquistadas – tarjetas visuales con mini-trazado */
  const mr=(u.rutas||[]).map(id=>rutas.find(r=>r.id===id)).filter(Boolean);
  document.getElementById('p-rutas-list').innerHTML=mr.length
    ? mr.map(r=>buildRutaCard(r,u)).join('')
    : '<div style="font-size:.84rem;color:var(--text3);padding:.5rem 0">Inicia una ruta y conquístala ⛰️</div>';

  /* Historial de actividades */
  const acts=(u.actividades||[]).slice(0,10);
  const actEl=document.getElementById('p-actividades-list');
  if(actEl){
    actEl.innerHTML=acts.length
      ?acts.map(a=>{
          const d=new Date(a.fecha);
          const fecha=d.toLocaleDateString('es-ES',{day:'2-digit',month:'short'});
          const hora=d.toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'});
          return `<div style="display:flex;align-items:center;gap:.6rem;padding:.5rem .75rem;background:var(--card);border:1px solid var(--border);border-radius:4px;margin-bottom:.3rem">
            <span style="font-size:1.1rem">${DISC[a.tipo]||'🏃'}</span>
            <div style="flex:1;min-width:0">
              <div style="font-family:var(--fu);font-size:.78rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${a.ruta_nombre}</div>
              <div style="font-family:var(--fu);font-size:.62rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--text3)">${fecha} ${hora} · ${a.distancia}</div>
            </div>
            <div style="text-align:right;flex-shrink:0">
              <div style="font-family:'Playfair Display',serif;font-size:1rem;color:var(--olive)">${fmtTime(a.tiempo_s)}</div>
              ${a.conquistada?`<div style="font-family:var(--fu);font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--olive)">CONQUISTADA</div>`:''}
            </div>
          </div>`;
        }).join('')
      :'<div style="font-size:.84rem;color:var(--text3);padding:.4rem 0">Sin actividades aún. ¡Sal a rodar! 🚴</div>';
  }
}

/* ── MODAL ── */
function openModal(id){
  const r=rutas.find(x=>x.id===id);if(!r)return;
  modalRutaId=id;
  const own=r.conquistador_id?users.find(u=>u.id===r.conquistador_id):null;
  document.getElementById('m-nombre').textContent=r.nombre;
  document.getElementById('m-desc').textContent=r.desc;
  document.getElementById('m-meta').innerHTML=`
    <span>📍 ${r.ciudad}</span><span>📏 ${r.km}</span>
    <span>${DISC[r.tipo]} ${r.tipo}</span>
    <span style="color:${own?own.color:'var(--text3)'}">🏴 ${own?own.username:'Sin conquistar'}</span>
    ${r.tiempo_record?`<span>⏱ Récord: ${fmtTime(r.tiempo_record)}</span>`:''}`;

  /* Botón iniciar ruta */
  const btnWrap=document.getElementById('m-btn-wrap');
  if(btnWrap){
    const isActive=activeRutaId===id;
    btnWrap.innerHTML=isActive
      ?`<button onclick="stopRuta(true)" style="width:100%;background:var(--rival);color:#fff;border:none;border-radius:4px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:.95rem;letter-spacing:.1em;text-transform:uppercase;padding:.85rem;cursor:pointer;">⏹ Terminar ruta</button>`
      :`<button onclick="startRuta(${id})" style="width:100%;background:var(--mountain);color:var(--cream);border:1px solid var(--olive);border-radius:4px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:.95rem;letter-spacing:.1em;text-transform:uppercase;padding:.85rem;cursor:pointer;">🏁 Iniciar esta ruta</button>`;
  }

  document.getElementById('modal-ruta').classList.add('open');

  setTimeout(()=>{
    const mm=document.getElementById('m-map');mm.innerHTML='';
    if(MINIMAP){MINIMAP.remove();MINIMAP=null;}
    const col=routeColor(r);
    const pts=r.pts&&r.pts.length>1?r.pts:r.waypoints;
    const lngs=pts.map(c=>c[0]),lats=pts.map(c=>c[1]);
    const bounds=[[Math.min(...lngs)-0.015,Math.min(...lats)-0.015],[Math.max(...lngs)+0.015,Math.max(...lats)+0.015]];
    MINIMAP=new maplibregl.Map({
      container:mm,
      style:{version:8,sources:{b:{type:'raster',tiles:['https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png'],tileSize:256,maxzoom:19}},layers:[{id:'bg',type:'background',paint:{'background-color':'#0d1a14'}},{id:'bt',type:'raster',source:'b'}]},
      bounds,fitBoundsOptions:{padding:28},pitch:35,interactive:false
    });
    MINIMAP.on('load',()=>{
      MINIMAP.addSource('mr',{type:'geojson',data:{type:'FeatureCollection',features:[
        {type:'Feature',properties:{},geometry:{type:'LineString',coordinates:pts}},
        {type:'Feature',properties:{t:'i'},geometry:{type:'Point',coordinates:pts[0]}},
        {type:'Feature',properties:{t:'f'},geometry:{type:'Point',coordinates:pts[pts.length-1]}}
      ]}});
      MINIMAP.addLayer({id:'mg',type:'line',source:'mr',filter:['==','$type','LineString'],layout:{'line-join':'round','line-cap':'round'},paint:{'line-color':col,'line-width':14,'line-opacity':0.22,'line-blur':8}});
      MINIMAP.addLayer({id:'ml',type:'line',source:'mr',filter:['==','$type','LineString'],layout:{'line-join':'round','line-cap':'round'},paint:{'line-color':col,'line-width':5,'line-opacity':0.95}});
      MINIMAP.addLayer({id:'ms',type:'circle',source:'mr',filter:['all',['==','$type','Point'],['==',['get','t'],'i']],paint:{'circle-radius':7,'circle-color':'#0d1a14','circle-stroke-color':col,'circle-stroke-width':3}});
      MINIMAP.addLayer({id:'me',type:'circle',source:'mr',filter:['all',['==','$type','Point'],['==',['get','t'],'f']],paint:{'circle-radius':9,'circle-color':col,'circle-stroke-color':'#0d1a14','circle-stroke-width':2.5}});
      MINIMAP.fitBounds(bounds,{padding:28,duration:600,pitch:35});
    });
  },160);
}
function closeModal(e){
  if(e&&e.target!==document.getElementById('modal-ruta'))return;
  document.getElementById('modal-ruta').classList.remove('open');
  if(MINIMAP)setTimeout(()=>{if(MINIMAP){MINIMAP.remove();MINIMAP=null;}},300);
}
function irAlMapa(){
  document.getElementById('modal-ruta').classList.remove('open');
  const r=rutas.find(x=>x.id===modalRutaId);
  if(r&&MAP){
    const pts=r.pts&&r.pts.length>1?r.pts:r.waypoints;
    const lngs=pts.map(c=>c[0]),lats=pts.map(c=>c[1]);
    MAP.fitBounds([[Math.min(...lngs)-0.01,Math.min(...lats)-0.01],[Math.max(...lngs)+0.01,Math.max(...lats)+0.01]],{padding:70,pitch:45,duration:1600});
  }
  tab('mapa');
}
function fmtTime(s){
  if(!s||s<0)return'0:00';
  const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),x=s%60;
  return h?`${h}h ${String(m).padStart(2,'0')}m`:`${m}:${String(x).padStart(2,'0')}`;
}

/* ── TABS ── */
function tab(t){
  ['mapa','rutas','ranking','perfil'].forEach(x=>{
    document.getElementById('screen-'+x).classList.toggle('active',x===t);
    document.getElementById('tab-'+x).classList.toggle('active',x===t);
  });
  if(t==='mapa')setTimeout(()=>{if(MAP)MAP.resize();},120);
  if(t==='perfil')renderPerfil();
  if(t==='ranking')renderRanking();
}
function goTab(t){tab(t);}

/* ── TOAST ── */
function toast(msg,type='success'){
  const t=document.getElementById('toast');
  t.textContent=msg;t.className='toast '+type+' show';
  if(toastT)clearTimeout(toastT);
  toastT=setTimeout(()=>t.classList.remove('show'),3000);
}
function showToast(m,t){toast(m,t);}

/* ── PICKERS ── */
function initPickers(){
  ['color-picker','flag-picker'].forEach(id=>document.getElementById(id)&&(document.getElementById(id).innerHTML=''));
  COLORS.forEach(c=>{
    const d=document.createElement('div');
    d.className='color-opt'+(c===selColor?' selected':'');
    d.style.background=c;
    d.onclick=()=>{selColor=c;document.querySelectorAll('.color-opt').forEach(x=>x.classList.remove('selected'));d.classList.add('selected');};
    document.getElementById('color-picker')?.appendChild(d);
  });
  FLAGS.forEach(f=>{
    const d=document.createElement('div');
    d.className='flag-opt'+(f===selFlag?' selected':'');
    d.textContent=f;
    d.onclick=()=>{selFlag=f;document.querySelectorAll('.flag-opt').forEach(x=>x.classList.remove('selected'));d.classList.add('selected');};
    document.getElementById('flag-picker')?.appendChild(d);
  });
}

/* ── LANDING ── */
function initLanding(){
  const burger=document.getElementById('burger');
  const menu=document.getElementById('mobileMenu');
  if(!burger)return;
  burger.addEventListener('click',()=>{
    menu.classList.toggle('open');
    const s=burger.querySelectorAll('span');
    if(menu.classList.contains('open')){s[0].style.transform='rotate(45deg) translate(5px,5px)';s[1].style.opacity='0';s[2].style.transform='rotate(-45deg) translate(5px,-5px)';}
    else s.forEach(x=>{x.style.transform='';x.style.opacity='';});
  });
  document.querySelectorAll('.mob-link').forEach(l=>l.addEventListener('click',()=>{
    menu.classList.remove('open');
    burger.querySelectorAll('span').forEach(x=>{x.style.transform='';x.style.opacity='';});
  }));
  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:0.1});
  document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));
}

/* ── ARRANQUE ── */
document.addEventListener('DOMContentLoaded',()=>{
  load();initPickers();initLanding();
  try{
    const sid=localStorage.getItem('rc_s4');
    if(sid){const u=users.find(x=>x.id===sid);if(u)go(u);}
  }catch(e){}
});
