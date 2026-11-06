(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const calm=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;

$$('.pic img').forEach(i=>{const on=()=>i.classList.add('ld');if(i.complete&&i.naturalWidth)on();else{i.addEventListener('load',on,{once:true});i.addEventListener('error',on,{once:true})}});

const nav=$('.nav'),top=$('.top');
const sc=()=>{if(!nav)return;const lim=top?top.offsetHeight-nav.offsetHeight:4;nav.classList.toggle('solid',scrollY>lim)};
addEventListener('scroll',sc,{passive:true});addEventListener('resize',sc);sc();

const mb=$('.mbtn'),menu=$('#menu');
if(mb&&menu){
 const set=o=>{mb.setAttribute('aria-expanded',o);mb.textContent=o?'Close':'Menu';document.documentElement.style.overflow=o?'hidden':'';nav.classList.toggle('mo',o);
  if(o){menu.hidden=false;requestAnimationFrame(()=>menu.classList.add('on'))}else{menu.classList.remove('on');setTimeout(()=>{if(mb.getAttribute('aria-expanded')==='false')menu.hidden=true},250)}};
 mb.addEventListener('click',()=>set(mb.getAttribute('aria-expanded')!=='true'));
 addEventListener('keydown',e=>{if(e.key==='Escape'&&mb.getAttribute('aria-expanded')==='true')set(false)});
 addEventListener('pageshow',()=>set(false));
}

if('IntersectionObserver' in window){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
 const groups=new Map();
 $$('.rv').forEach(el=>{const p=el.parentElement;const n=groups.get(p)||0;groups.set(p,n+1);el.style.transitionDelay=Math.min(n,5)*60+'ms';io.observe(el)});
}else $$('.rv').forEach(e=>e.classList.add('in'));

const its=$$('.it');
its.forEach(it=>{const b=$('.ib',it);b.addEventListener('click',()=>{const on=!it.classList.contains('on');
 its.forEach(o=>{if(o!==it&&o.classList.contains('on')){o.classList.remove('on');$('.ib',o).setAttribute('aria-expanded','false')}});
 it.classList.toggle('on',on);b.setAttribute('aria-expanded',on)})});

const qs=$$('.q'),qc=$('#qc');
if(qs.length&&qc){let qi=0;const go=d=>{qs[qi].classList.remove('on');qi=(qi+d+qs.length)%qs.length;qs[qi].classList.add('on');qc.textContent=`${qi+1} / ${qs.length}`};
 $('#qp').addEventListener('click',()=>go(-1));$('#qn').addEventListener('click',()=>go(1))}

const sent=$('#sent'),pop=$('#pop');
if(sent&&pop){
 const O={
  amt:[[100000,'$100,000'],[250000,'$250,000'],[500000,'$500,000'],[1000000,'$1,000,000'],[2500000,'$2,500,000']],
  type:[['fix-and-flip','fix and flip','fix and flips'],['new-construction','new build','new builds'],['rental','rental','rentals'],['rental-portfolio','rental portfolio','rental portfolios'],['remodel','remodel','remodels'],['business-loan','business loan','business loans'],['line-of-credit','line of credit','lines of credit'],['bridge-loan','bridge loan','bridge loans']],
  when:[['week','this week'],['month','this month'],['later','when I find the deal']]};
 const st={amt:1,type:0,when:0};let cur=null;
 const toks=$$('.tok',sent);
 const render=()=>{
  toks.forEach(t=>{const k=t.dataset.k;t.firstElementChild.textContent=O[k][st[k]][1]});
  const t=O.type[st.type],w=O.when[st.when][0];
  const a=$('#ans');
  a.textContent='';const b=document.createElement('b');b.textContent='Yes.';a.append(b,' '+(w==='later'?`Send it over when you have it. We fund ${t[2]} up to 100%, and we can close in as little as 2 days.`:w==='month'?`This month is easy. We fund ${t[2]} up to 100%, with no minimum credit score.`:`We fund ${t[2]} up to 100%, and we can close in as little as 2 days.`));
  $('#go').href=`apply.html?amount=${O.amt[st.amt][0]}&type=${t[0]}&when=${w}`;
 };
 const close=back=>{if(!cur)return;pop.classList.remove('on');cur.setAttribute('aria-expanded','false');const t=cur;cur=null;setTimeout(()=>{if(!cur)pop.hidden=true},180);if(back)t.focus()};
 const open=t=>{close();cur=t;const k=t.dataset.k;pop.textContent='';
  O[k].forEach((o,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('role','option');b.setAttribute('aria-selected',i===st[k]);b.textContent=k==='amt'?o[1]:o[1].charAt(0).toUpperCase()+o[1].slice(1);b.onclick=()=>{st[k]=i;render();close(true)};pop.append(b)});
  pop.hidden=false;t.setAttribute('aria-expanded','true');
  if(!matchMedia('(max-width:860px)').matches){const r=t.getBoundingClientRect();pop.style.left=Math.min(r.left+scrollX,innerWidth-270)+'px';pop.style.top=(r.bottom+scrollY+12)+'px'}
  requestAnimationFrame(()=>{pop.classList.add('on');($('[aria-selected=true]',pop)||pop.firstChild).focus({preventScroll:true})})};
 toks.forEach(t=>t.addEventListener('click',e=>{e.stopPropagation();cur===t?close():open(t)}));
 document.addEventListener('click',e=>{if(cur&&!pop.contains(e.target))close()});
 addEventListener('keydown',e=>{if(e.key==='Escape')close(true)});
 addEventListener('resize',()=>close());
 $$('.use').forEach(u=>u.addEventListener('click',()=>{const i=+u.dataset.t;if(!O.type[i])return;st.type=i;render();scrollTo({top:0,behavior:calm()?'auto':'smooth'})}));
 render();
}

$$('form[data-form]').forEach(f=>{
 f.addEventListener('submit',e=>{e.preventDefault();if(f.website&&f.website.value)return;
  const rules={name:v=>v.trim().length>1,phone:v=>/^[+()\-.\s\d]{7,20}$/.test(v.trim()),email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())};
  let first=null;Object.entries(rules).forEach(([n,fn])=>{const el=f.elements[n];if(!el)return;const ok=fn(el.value);el.closest('.f').classList.toggle('bad',!ok);if(!ok&&!first)first=el});
  if(first){first.focus();return}
  f.classList.add('sent');f.scrollIntoView({block:'center',behavior:calm()?'auto':'smooth'})});
 $$('input',f).forEach(i=>i.addEventListener('input',()=>{const g=i.closest('.f');g&&g.classList.remove('bad')}));
});
})();
(()=>{
const deck=document.getElementById('deck');if(!deck)return;
const sec=deck.closest('.lsec'),cards=[...deck.children],n=cards.length,dots=[...sec.querySelectorAll('.dd')],pair=sec.querySelector('.pair');
const list=pair.dataset.list.split('|').map(x=>x.split('~')),pb=document.getElementById('pb'),ps=document.getElementById('ps');
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
let i=0,busy=false;
const lay=()=>cards.forEach((c,k)=>{const d=(k-i+n)%n;c.dataset.d=d;c.setAttribute('aria-hidden',d?'true':'false')});
const text=()=>{pair.classList.add('out');setTimeout(()=>{pb.textContent=list[i][0];ps.textContent=list[i][1];pair.classList.remove('out')},calm?0:220)};
const marks=()=>dots.forEach((d,k)=>{d.classList.remove("on","past");d.removeAttribute('aria-current');void d.offsetWidth;if(k<i)d.classList.add("past");if(k===i){d.classList.add('on');d.setAttribute('aria-current','true')}});
const go=(to,fly)=>{if(busy||to===i)return;const top=cards[i];to=(to+n)%n;
 if(fly&&!calm){busy=true;top.classList.remove('drag');top.style.transform='';top.classList.add('fly');
  setTimeout(()=>{top.classList.add('snap');top.classList.remove('fly');i=to;lay();requestAnimationFrame(()=>requestAnimationFrame(()=>{top.classList.remove('snap');busy=false}))},480)}
 else{i=to;lay()}
 text();marks()};
lay();marks();
dots.forEach((d,k)=>d.addEventListener('click',()=>go(k,k===(i+1)%n)));
dots.forEach(d=>d.querySelector('b').addEventListener('animationend',()=>{if(d.classList.contains('on'))go(i+1,true)}));
const hold=on=>sec.classList.toggle('hold',on);
let seen=false,hov=false,foc=false;const sync=()=>hold(!seen||hov||foc||document.hidden);
if('IntersectionObserver' in window)new IntersectionObserver(es=>{seen=es[0].isIntersecting;sync()},{threshold:.35}).observe(deck);else seen=true;
if(matchMedia('(hover:hover) and (pointer:fine)').matches){deck.addEventListener('pointerenter',()=>{hov=true;sync()});deck.addEventListener('pointerleave',()=>{hov=false;sync()})}
sec.addEventListener('focusin',()=>{foc=true;sync()});sec.addEventListener('focusout',()=>{foc=false;sync()});
document.addEventListener('visibilitychange',sync);sync();
let x0=0,t0=0,dx=0,id=null;
deck.addEventListener('pointerdown',e=>{if(busy||e.button>0)return;id=e.pointerId;x0=e.clientX;t0=performance.now();dx=0;cards[i].classList.add('drag');hold(true)});
deck.addEventListener('pointermove',e=>{if(e.pointerId!==id)return;dx=e.clientX-x0;if(Math.abs(dx)>6&&!deck.hasPointerCapture(id))deck.setPointerCapture(id);cards[i].style.transform=`translateX(${dx}px) rotate(${dx/40}deg)`});
const up=e=>{if(e.pointerId!==id)return;id=null;const c=cards[i],v=Math.abs(dx)/(performance.now()-t0);c.classList.remove('drag');
 if(Math.abs(dx)>90||(v>.11&&Math.abs(dx)>20)){if(dx<0)go(i+1,true);else{c.style.transform='';go(i-1,false)}}else c.style.transform='';sync()};
deck.addEventListener('pointerup',up);deck.addEventListener('pointercancel',up);
})();
(()=>{
const f=document.getElementById('apf');if(!f)return;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const panes=$$('.pane',f),steps=$$('#stepper li'),back=$('#back'),next=$('#next'),send=$('#send'),prog=$('#prog'),ferr=$('#ferr'),fin=$('#fin');
const t0=Date.now();let cur=0,dirty=false,done=false;
const shown=el=>!el.closest('[hidden]');
const money=v=>v.replace(/[^\d]/g,'').slice(0,11);
$$('[data-money]',f).forEach(i=>i.addEventListener('input',()=>{const d=money(i.value);i.value=d?'$'+(+d).toLocaleString('en-US'):''}));
const today=new Date();$('#today').textContent=today.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
const iso=d=>{const z=new Date(d.getTime()-d.getTimezoneOffset()*6e4);return z.toISOString().slice(0,10)};
$('#close_date').min=iso(today);
const co=$('#has_co');co.addEventListener('change',()=>{$$('#co,[data-co]',f).forEach(e=>e.hidden=!co.checked)});
const q=new URLSearchParams(location.search),amt=q.get('amount');
if(amt&&/^\d{4,9}$/.test(amt))$('#amount').value='$'+(+amt).toLocaleString('en-US');
const TY={'fix-and-flip':['Purchase and rehab'],'remodel':['Rehab'],'bridge-loan':['Bridge loan'],'line-of-credit':['Line of credit']};
const NM={'new-construction':'New construction','rental':'Rental','rental-portfolio':'Rental portfolio','business-loan':'Business loan'};
const ty=q.get('type');
if(ty&&TY[ty])TY[ty].forEach(v=>{const c=$$('input[name=purpose]',f).find(x=>x.value===v);if(c)c.checked=true});
else if(ty&&NM[ty]){$$('input[name=purpose]',f).find(x=>x.value==='Other').checked=true;$('#purpose_other').value=NM[ty]}
const wh=q.get('when');if(wh==='week'||wh==='month'){const d=new Date();d.setDate(d.getDate()+(wh==='week'?7:30));$('#close_date').value=iso(d)}
const R={email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),tel:v=>/^[+()\-.\s\d]{7,20}$/.test(v)};
const check=p=>{let first=null;const bad=(el,box)=>{box.classList.add('bad');if(!first)first=el};
 $$('.f,[data-req]',p).forEach(g=>g.classList.remove('bad'));
 $$('input,select,textarea',p).filter(el=>el.closest('.f')&&shown(el)).forEach(el=>{const v=el.value.trim(),g=el.closest('.f');
  if(el.required&&!v)return bad(el,g);if(!v)return;
  if(el.type==='email'&&!R.email(v))return bad(el,g);
  if(el.type==='tel'&&!R.tel(v))return bad(el,g);
  if(el.type==='number'&&(!/^\d+$/.test(v)||+v<+(el.min||0)||(el.max&&+v>+el.max)))return bad(el,g);
  if(el.hasAttribute('data-money')&&el.required&&!(+money(v)>0))return bad(el,g)});
 $$('[data-req]',p).filter(shown).forEach(g=>{const ins=$$('input',g);if(!ins.some(i=>i.checked))bad(ins[0],g)});
 if(first){first.focus({preventScroll:true});first.closest('.f,[data-req]').scrollIntoView({block:'center',behavior:calm?'auto':'smooth'})}
 return !first};
const val=n=>{const els=$$(`[name="${n}"]`,f);if(!els.length)return'';if(els[0].type==='checkbox'||els[0].type==='radio')return els.filter(e=>e.checked).map(e=>e.value).join(', ');return els[0].value.trim()};
const review=()=>{const dl=$('#rev');dl.textContent='';
 [['Loan',val('purpose')],['Amount',val('amount')],['Close by',val('close_date')?new Date(val('close_date')+'T12:00').toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}):''],['Property',val('prop_address')],['Type',val('prop_type')],['Guarantor',val('g_name')],['Email',val('g_email')],['Phone',val('g_cell')],['Co-guarantor',co.checked?val('c_name'):'None']]
 .forEach(([k,v])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=k;dd.textContent=v||'Not given';dl.append(dt,dd)})};
const show=i=>{panes[cur].hidden=true;cur=i;panes[cur].hidden=false;
 steps.forEach((s,k)=>{if(k===cur)s.setAttribute('aria-current','step');else s.removeAttribute('aria-current');s.classList.toggle('past',k<cur)});
 if(cur===panes.length-1)review();
 prog.textContent=`Step ${cur+1} of ${panes.length}`;back.hidden=cur===0;next.hidden=cur===panes.length-1;send.hidden=!next.hidden;ferr.hidden=true;
 f.scrollIntoView({block:'start',behavior:calm?'auto':'smooth'});const h=$('h2',panes[cur]);h.tabIndex=-1;h.focus({preventScroll:true})};
next.addEventListener('click',()=>{if(check(panes[cur]))show(cur+1)});
back.addEventListener('click',()=>show(cur-1));
steps.forEach((s,k)=>s.addEventListener('click',()=>{if(k<cur)show(k)}));
f.addEventListener('input',e=>{dirty=true;const g=e.target.closest('.f,[data-req]');if(g)g.classList.remove('bad')});
f.addEventListener('change',e=>{const g=e.target.closest('[data-req]');if(g)g.classList.remove('bad')});
addEventListener('beforeunload',e=>{if(dirty&&!done){e.preventDefault();e.returnValue=''}});
f.addEventListener('submit',async e=>{e.preventDefault();if(cur!==panes.length-1||!check(panes[cur]))return;
 if(f.website.value)return;
 const norm=s=>s.normalize('NFD').toLowerCase().replace(/[^a-z]/g,'');
 if(norm(val('signature'))!==norm(val('g_name'))){const g=$('#signature').closest('.f');g.classList.add('bad');$('.er',g).textContent='Type your name exactly as you wrote it: '+val('g_name');$('#signature').focus();return}
 const data={};new Set($$('[name]',f).map(e=>e.name)).forEach(n=>{if(n==='website')return;const el=$(`[name="${n}"]`,f);if(!shown(el))return;data[n]=val(n)});
 data.has_co=co.checked?'Yes':'No';data.website=f.website.value;data.elapsed=Date.now()-t0;
 const url=f.dataset.endpoint;ferr.hidden=true;send.disabled=true;send.textContent='Sending...';
 const fail=m=>{ferr.textContent=m;ferr.hidden=false;send.disabled=false;send.textContent='Send my application'};
 if(!url)return fail('Preview only: this form is not connected to the Google Sheet yet.');
 try{const r=await fetch(url,{method:'POST',body:JSON.stringify(data)});const j=await r.json();
  if(!j.ok)return fail(j.error||'Something went wrong. Please call us at (571) 245-3045.');
  done=true;$$('.pane,.nav2,.prog',f).forEach(x=>x.hidden=true);fin.hidden=false;fin.focus();f.scrollIntoView({block:'start'})}
 catch(_){fail('We could not send it. Check your connection and try again, or call us at (571) 245-3045.')}});
})();
