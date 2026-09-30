(function(){
  var t=document.getElementById('navToggle'),d=document.getElementById('navDrawer'),o=document.getElementById('navOverlay');
  if(!t)return;
  function open(){t.classList.add('is-open');d.classList.add('is-open');o.classList.add('is-open');document.body.classList.add('menu-open');t.setAttribute('aria-expanded','true')}
  function close(){t.classList.remove('is-open');d.classList.remove('is-open');o.classList.remove('is-open');document.body.classList.remove('menu-open');t.setAttribute('aria-expanded','false')}
  t.addEventListener('click',function(){d.classList.contains('is-open')?close():open()});
  if(o)o.addEventListener('click',close);
  if(d)d.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
})();
(function(){
  var els=document.querySelectorAll('.reveal');
  if(!els.length)return;
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('visible')});return}
  var io=new IntersectionObserver(function(ents){ents.forEach(function(en){if(en.isIntersecting){en.target.classList.add('visible');io.unobserve(en.target)}})},{threshold:.12,rootMargin:'0px 0px -32px 0px'});
  els.forEach(function(e){io.observe(e)});
})();
(function(){
  var p=new URLSearchParams(location.search);
  var msg={early:'Merci. Demande bien reçue.',feedback:'Merci. Votre avis est arrivé.',audit:'Merci. Demande d’audit reçue.'};
  if(msg[p.get('sent')]){
    var el=document.createElement('div');el.className='toast';el.textContent=msg[p.get('sent')];
    document.body.appendChild(el);requestAnimationFrame(function(){el.classList.add('show')});
    setTimeout(function(){el.classList.remove('show');setTimeout(function(){el.remove()},400)},4800);
    history.replaceState({},'',location.pathname);
  }
})();
(function(){
  var c=document.getElementById('matrix');if(!c)return;
  var ctx=c.getContext('2d'),dpr=Math.min(devicePixelRatio||1,2),w,h,t=0;
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function resize(){var p=c.parentElement;w=p.clientWidth;h=p.clientHeight;c.width=w*dpr;c.height=h*dpr;c.style.width=w+'px';c.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}
  function draw(){
    t+=0.014;ctx.clearRect(0,0,w,h);
    var rows=Math.max(14,Math.floor(h/16)),cols=Math.max(32,Math.floor(w/11)),cw=w/cols,ch=h/rows;
    ctx.font='11px "IBM Plex Mono",monospace';ctx.textAlign='center';ctx.textBaseline='middle';
    var chars='01.:-=+*#%@';
    for(var y=0;y<rows;y++)for(var x=0;x<cols;x++){
      var nx=x/cols,ny=y/rows;
      var v=Math.sin(nx*5.5+t)*.35+Math.sin(ny*4-t*.85)*.28+Math.sin((nx+ny)*4.5+t*.65)*.22+(ny-.4)*.45;
      var idx=Math.max(0,Math.min(chars.length-1,Math.floor(((v+1)/2)*(chars.length-1))));
      ctx.fillStyle='rgba(212,69,26,'+(.08+idx/(chars.length-1)*.42).toFixed(3)+')';
      ctx.fillText(chars[idx],x*cw+cw/2,y*ch+ch/2);
    }
    if(!reduced)requestAnimationFrame(draw);
  }
  resize();addEventListener('resize',resize);draw();
})();
(function(){
  var el=document.getElementById('termType');if(!el)return;
  var lines=[
    {c:'cmd',t:'$ radar status --client "Dupont Transport"'},
    {c:'out',t:'Scanning devis + factures…'},
    {c:'hi',t:'→ 2 devis en attente (j+4, j+11)'},
    {c:'hi',t:'→ 1 facture en retard 18 j · 4 280 €'},
    {c:'ok',t:'Relance facture envoyée · Cerveau planifié lundi 07:00'},
    {c:'out',t:'Priorité semaine : facture #F-2401'}
  ];
  var i=0,j=0,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function tick(){
    if(i>=lines.length){el.innerHTML=el.innerHTML.replace(/<span class="cursor"><\\/span>/,'')+'<span class="cursor"></span>';return}
    var L=lines[i];
    if(j===0){var p=document.createElement('div');p.className=L.c;p.id='tl'+i;el.appendChild(p)}
    var p=document.getElementById('tl'+i);
    if(reduced){p.textContent=L.t;i++;j=0;setTimeout(tick,200);return}
    p.innerHTML=L.t.slice(0,j)+'<span class="cursor"></span>';
    j++;
    if(j>L.t.length){p.textContent=L.t;i++;j=0;setTimeout(tick,380)}
    else setTimeout(tick,22+Math.random()*18)
  }
  setTimeout(tick,600);
})();
