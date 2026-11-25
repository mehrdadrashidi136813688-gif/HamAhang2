/* Hamahang v6 - Nishapur light UI, bugfixes + favorites/requests + toast */
const APP_VERSION = '1.3 (6)';
const cats=[
{id:'dance',icon:'💃',name:'کلاس رقص',desc:'مردان، زنان و زوج‌ها',group:'کلاس رقص',image:'cat-dance.jpg'},
{id:'dj',icon:'🎧',name:'دی‌جی‌های مطرح',desc:'موسیقی، نور و سرگرمی',group:'دی‌جی',image:'cat-dj.jpg'},
{id:'camera',icon:'📷',name:'عکاسی و فیلمبرداری',desc:'ثبت لحظه‌های مراسم',group:'عکاسی',image:'cat-camera.jpg'},
{id:'venue',icon:'🏛️',name:'تالار و باغ تالار',desc:'فضای برگزاری مراسم',group:'تالار',image:'cat-venue.jpg'},
{id:'garden',icon:'🌳',name:'باغ و فضای جشن',desc:'فضای باز و باغ',group:'باغ',image:'cat-decor.jpg'},
{id:'makeup',icon:'💄',name:'آرایش عروس و داماد',desc:'آرایش و اصلاح',group:'آرایش',image:'cat-makeup.jpg'},
{id:'car',icon:'🚘',name:'گل‌آرایی ماشین عروس',desc:'خودرو و تزئین',group:'ماشین',image:'cat-car.jpg'},
{id:'decor',icon:'💍',name:'چیدمان سفره عقد',desc:'گل، شمع و دکور',group:'دکور',image:'cat-decor.jpg'},
{id:'singer',icon:'🎤',name:'خوانندگان و گروه‌ها',desc:'اجرای زنده',group:'خواننده',image:'cat-singer.jpg'},
{id:'musician',icon:'🎻',name:'نوازندگان',desc:'گروه‌های موسیقی',group:'نوازنده',image:'cat-violin.jpg'},
{id:'lesson',icon:'🎹',name:'تدریس خصوصی',desc:'موسیقی و رقص',group:'تدریس خصوصی',image:'cat-lesson.jpg'},
{id:'band',icon:'🎸',name:'تشکیل گروه',desc:'همکاری هنری',group:'تشکیل گروه',image:'cat-band.jpg'},
{id:'share',icon:'🎵',name:'اشتراک‌گذاری',desc:'آهنگ و اجرا',group:'اشتراک‌گذاری',image:'cat-share.jpg'},
{id:'acting',icon:'🎭',name:'گریم و بازیگری',desc:'هنرهای نمایشی',group:'گریم',image:'cat-acting.jpg'},
{id:'flower',icon:'💐',name:'گل‌فروشی و گل‌آرایی',desc:'دسته‌گل و دیزاین',group:'گل و گل‌آرایی',image:'cat-decor.jpg'},
{id:'video',icon:'🎥',name:'فیلمبردار',desc:'فیلم و تدوین مراسم',group:'فیلمبرداری',image:'home-hero.jpg'},
{id:'food',icon:'🍽️',name:'پذیرایی',desc:'غذا و پذیرایی مراسم',group:'پذیرایی',image:'cat-venue.jpg'},
{id:'cake',icon:'🎂',name:'کیک و شیرینی',desc:'کیک، شیرینی و دسر',group:'کیک و شیرینی',image:'cat-more.jpg'},
{id:'dress',icon:'👗',name:'پوشاک زنانه و مردانه',desc:'لباس عروس، مجلسی و دامادی',group:'لباس',image:'home-hero-nishapur.jpg'},
{id:'tailor',icon:'🧵',name:'خیاط و مزون',desc:'دوخت و اصلاح لباس مراسم',group:'خیاطی',image:'cat-more.jpg'},
{id:'invite',icon:'💌',name:'کارت دعوت',desc:'دعوت‌نامه چاپی و دیجیتال',group:'دعوت',image:'cat-more.jpg'},
{id:'other',icon:'✨',name:'خدمات بیشتر',desc:'خدمات تکمیلی مراسم',group:'سایر',image:'cat-more.jpg'}
];
const seedProviders=[
{id:1,name:'آتلیه نمونه عروس',category:'عکاسی',city:'نیشابور',phone:'',description:'عکاسی و فیلم مراسم، پکیج‌های چندساعته و آلبوم.',price:8000000,status:'approved',demo:true},
{id:2,name:'گل‌آرایی رز',category:'گل و گل‌آرایی',city:'نیشابور',phone:'',description:'دیزاین میز، جایگاه و دسته‌گل عروس.',price:12000000,status:'approved',demo:true},
{id:3,name:'تالار نمونه نیشابور',category:'تالار',city:'نیشابور',phone:'',description:'تالار پذیرایی با چند پکیج ظرفیت.',price:150000000,status:'approved',demo:true},
{id:4,name:'دی‌جی تست',category:'دی‌جی',city:'نیشابور',phone:'',description:'نور، صدا و اجرای مراسم.',price:10000000,status:'approved',demo:true},
{id:5,name:'مزون عروس شیک',category:'لباس',city:'نیشابور',phone:'',description:'لباس عروس، مجلسی و آماده‌سازی استایل.',price:25000000,status:'approved',demo:true},
{id:6,name:'فیلمبرداری خاطره',category:'فیلمبرداری',city:'نیشابور',phone:'',description:'فیلمبرداری حرفه‌ای + تدوین و تیزر.',price:9000000,status:'approved',demo:true}
];
const get=(k,d)=>{try{const v=JSON.parse(localStorage.getItem('hamahang_'+k));return v??d}catch{return d}};
const put=(k,v)=>{try{localStorage.setItem('hamahang_'+k,JSON.stringify(v))}catch{}};
let providers=get('providers',seedProviders),profile=get('profile',null),eventData=get('event',null),favorites=get('favorites',[]),requests=get('requests',[]);
let homaBalance=get('homaBalance',2.4),homaClaimed=get('homaClaimed',[]),homaTransactions=get('homaTransactions',[]);
let currentGroup=null;

function esc(x){return String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function faNum(n,frac=1){try{return Number(n).toLocaleString('fa-IR',{maximumFractionDigits:frac})}catch{return String(n)}}
function toast(msg){const t=document.getElementById('toast');if(!t){alert(msg);return}t.textContent=msg;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),2600)}

function card(c){return `<button class="category-card cat-${c.id}" style="--cat-image:url('images/${c.image||'cat-more.jpg'}')" onclick="openCategory('${c.group}')"><span class="category-icon">${c.icon}</span><span><b>${c.name}</b><small>${c.desc}</small></span></button>`}
const homeIds=['venue','video','dj','flower','car','dress','camera','makeup','cake'];
function renderHome(){const el=document.getElementById('homeCategories');if(el)el.innerHTML=homeIds.map(id=>{const c=cats.find(x=>x.id===id);return c?card(c):''}).join('')}
function renderAllCats(){const el=document.getElementById('allCategories');if(el)el.innerHTML=cats.map(card).join('')}
renderHome();renderAllCats();

function hideSplash(){const s=document.getElementById('splash');if(s&&!s.classList.contains('hidden'))s.classList.add('hidden')}
setTimeout(hideSplash,6000);

function show(id,fromPop=false,replace=false){
 document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
 const screen=document.getElementById(id);if(screen)screen.classList.add('active');
 document.querySelectorAll('.nav').forEach(n=>n.classList.remove('active'));
 const navIds=['home','search','wallet','profile'];let idx=navIds.indexOf(id);
 if(idx>=0){const navs=document.querySelectorAll('.bottom-nav .nav');if(navs[idx])navs[idx].classList.add('active')}
 if(!fromPop){try{if(replace)history.replaceState({screen:id},'',`#${id}`);else history.pushState({screen:id},'',`#${id}`)}catch{}}
 if(window.HamahangBridge&&HamahangBridge.setScreen)try{HamahangBridge.setScreen(id)}catch{}
 if(id==='profile'){renderProfile();renderFavorites();renderMyRequests()}
 if(id==='planner')renderPlanner();
 if(id==='admin')renderAdmin();
 if(id==='wallet')renderWallet();
 if(id==='search'){renderServiceGallery(document.getElementById('serviceSearchInput')?.value||'')}
 window.scrollTo({top:0,behavior:'smooth'});
}
try{history.replaceState({screen:'home'},'','#home')}catch{}
if(window.HamahangBridge&&HamahangBridge.setScreen)try{HamahangBridge.setScreen('home')}catch{}
window.addEventListener('popstate',e=>{const target=e.state&&e.state.screen?e.state.screen:'home';show(target,true)});

const serviceOptions=[
 {label:'همه',group:'__all',icon:'✨',image:'cat-more.jpg',desc:'نمایش همه خدمات'},
 {label:'تالار',group:'تالار',icon:'🏛️',image:'cat-venue.jpg',desc:'تالار و باغ تالار'},
 {label:'فیلم‌بردار',group:'فیلمبرداری',icon:'🎥',image:'cat-camera.jpg',desc:'عکاسی و فیلم مراسم'},
 {label:'دی‌جی',group:'دی‌جی',icon:'🎧',image:'cat-dj.jpg',desc:'موسیقی، نور و اجرا'},
 {label:'خیاط',group:'خیاطی',icon:'🧵',image:'cat-more.jpg',desc:'دوخت و اصلاح لباس'},
 {label:'دسته‌گل',group:'گل و گل‌آرایی',icon:'💐',image:'cat-decor.jpg',desc:'دسته‌گل عروس'},
 {label:'گل‌آرایی ماشین',group:'ماشین',icon:'🚘',image:'cat-car.jpg',desc:'تزئین ماشین عروس'},
 {label:'پوشاک',group:'لباس',icon:'👗',image:'home-hero-nishapur.jpg',desc:'زنانه و مردانه'},
 {label:'آرایشگاه',group:'آرایش',icon:'💄',image:'cat-makeup.jpg',desc:'آرایش عروس و داماد'},
 {label:'کیک و شیرینی',group:'کیک و شیرینی',icon:'🎂',image:'cat-more.jpg',desc:'کیک و دسر مراسم'}
];
function renderChips(active=''){
 const box=document.getElementById('serviceChips');if(!box)return;
 box.innerHTML=serviceOptions.map(x=>`<button class="service-chip ${x.label===active?'selected':''}" onclick="selectServiceChip('${x.label}')">${x.icon||''} ${x.label}</button>`).join('');
}
renderChips();
function renderServiceGallery(filter=''){
 const gallery=document.getElementById('serviceGallery');if(!gallery)return;
 const q=(filter||'').trim().toLowerCase();
 const items=serviceOptions.filter(x=>x.group!=='__all'&&(!q||(x.label+x.desc+x.group).toLowerCase().includes(q)));
 gallery.innerHTML=items.length?items.map(x=>`<button class="service-card" onclick="${x.group==='لباس'?"show('clothing')":`openCategory('${x.group}')`}"><img src="images/${x.image}" alt="" loading="lazy"><span><b>${x.label}</b><small>${x.desc}</small></span><i>‹</i></button>`).join(''):'<div class="empty-state">خدمتی با این نام پیدا نشد. عبارت دیگری را امتحان کن.</div>';
 document.getElementById('serviceResultsTitle').textContent=q?`نتایج «${filter.trim()}»`:'خدمات پیشنهادی';
 document.getElementById('serviceResultsKicker').textContent=q?'جستجو':'ویترین هماهنگ';
 // providers matching
 const sp=document.getElementById('searchProviders');
 if(sp){
  const plist=providers.filter(p=>p.status==='approved'&&(!q||(p.name+' '+p.category+' '+p.city+' '+(p.description||'')).toLowerCase().includes(q))).slice(0,6);
  sp.innerHTML=plist.length?plist.map(providerCard).join(''):'<div class="empty-state">همکاری برای این جستجو ثبت نشده. <br><button class="action-btn" onclick="show(\'providerRegister\')">ثبت همکار</button></div>';
 }
}
function resetServiceGallery(){const i=document.getElementById('serviceSearchInput');if(i)i.value='';renderChips();renderServiceGallery('')}
function selectServiceChip(label){
 if(label==='همه'){renderChips('همه');resetServiceGallery();return}
 renderChips(label);
 if(label==='پوشاک'){show('clothing');return}
 const item=serviceOptions.find(x=>x.label===label);if(!item)return;
 document.getElementById('serviceResultsTitle').textContent=item.label;
 document.getElementById('serviceResultsKicker').textContent='خدمات انتخاب‌شده';
 const g=document.getElementById('serviceGallery');
 g.innerHTML=`<button class="service-card selected-service" onclick="openCategory('${item.group}')"><img src="images/${item.image}" alt=""><span><b>${item.label}</b><small>${item.desc} · مشاهده جزئیات و ارائه‌دهندگان</small></span><i>‹</i></button>`;
 const sp=document.getElementById('searchProviders');
 if(sp){const plist=providers.filter(p=>p.status==='approved'&&p.category===item.group);sp.innerHTML=plist.length?plist.map(providerCard).join(''):`<div class="empty-state">هنوز ارائه‌دهنده‌ای در «${item.label}» ثبت نشده.<br><button class="action-btn" onclick="show('providerRegister')">ثبت همکار</button></div>`}
}
function searchServicePage(){renderServiceGallery(document.getElementById('serviceSearchInput').value)}
function showClothingGroup(kind){
 const box=document.getElementById('clothingSubcategories');
 const women=[['لباس عروس','👰🏻','home-hero-nishapur.jpg'],['تاج و نیم‌تاج','👑','cat-more.jpg'],['لباس مجلسی مهمانان','👗','cat-dance.jpg']];
 const men=[['کت و شلوار','🤵🏻','home-hero-nishapur.jpg'],['پیراهن مردانه','👔','cat-more.jpg'],['کروات و پاپیون','🎀','cat-more.jpg'],['کفش و اکسسوری','👞','cat-more.jpg']];
 const list=kind==='women'?women:men;
 box.innerHTML=`<div class="clothing-subtitle">${kind==='women'?'پوشاک زنانه':'پوشاک مردانه'} — ${list.length} مدل</div>`+list.map(x=>`<button class="service-card" onclick="openClothingItem('${x[0]}','${kind}')"><img src="images/${x[2]}" alt="" loading="lazy"><span><b>${x[0]}</b><small>مشاهده مدل‌ها و خدمات مرتبط در نیشابور</small></span><i>‹</i></button>`).join('');
 box.scrollIntoView({behavior:'smooth',block:'start'});
}
function openClothingItem(name,kind){
 document.getElementById('detailHead').innerHTML=`<span class="category-icon">${kind==='women'?'👗':'🤵🏻'}</span><div><h1>${esc(name)}</h1><p>نمونه‌کارها و خدمات ${esc(name)} در نیشابور</p></div>`;
 document.getElementById('providerResults').innerHTML=`<div class="empty-state"><div class="empty-icon">✨</div><b>ویترین این بخش آماده تکمیل است</b><p>با ثبت مزون‌ها و فروشندگان همکار، مدل‌ها و نمونه‌کارهای این بخش نمایش داده می‌شوند.</p><button class="action-btn" onclick="show('providerRegister')">ثبت همکار</button></div>`;
 currentGroup='لباس';show('categoryDetail');
}
function openCategory(group){
 if(group==='لباس'){show('clothing');return}
 const c=cats.find(x=>x.group===group);if(!c){toast('این دسته پیدا نشد');return}
 currentGroup=group;
 document.getElementById('detailHead').innerHTML=`<span class="category-icon">${c.icon}</span><div><h1>${c.name}</h1><p>${c.desc} · صفحه اختصاصی این دسته در نیشابور</p></div>`;
 renderProviders(group);show('categoryDetail');
}
function providerCard(p){
 const fav=favorites.includes(p.id);
 return `<article class="provider-card"><div class="provider-avatar">${esc((p.name||'ه').slice(0,1))}</div><div class="provider-info"><b>${esc(p.name)}</b><small>${esc(p.city||'نیشابور')} · ${esc(p.category)}</small><p>${esc(p.description||'خدمات مراسم')}</p><strong>${p.price?Number(p.price).toLocaleString('fa-IR')+' تومان پایه':'برای قیمت تماس بگیرید'}</strong><div class="provider-actions"><button onclick="toggleFavorite(${p.id})">${fav?'♥ ذخیره‌شده':'♡ علاقه‌مندی'}</button><button class="primary" onclick="requestBooking(${p.id})">درخواست رزرو</button></div></div></article>`;
}
function renderProviders(group){
 const list=providers.filter(p=>p.status==='approved'&&p.category===group);
 const el=document.getElementById('providerResults');
 el.innerHTML=list.length?list.map(providerCard).join(''):`<div class="empty-state"><div class="empty-icon">🔎</div><b>ارائه‌دهنده‌ای در این دسته ثبت نشده</b><p>اولین همکار این حوزه باش یا بعداً دوباره سر بزن.</p><button class="action-btn" onclick="show('providerRegister')">ثبت همکار</button></div>`;
}
function toggleCategoryFilter(){toast('در نسخه نمایشی همه نمونه‌ها مربوط به نیشابور است. فیلتر شهر در نسخه آنلاین فعال می‌شود.')}
function saveProfile(){
 let name=document.getElementById('userName').value.trim(),phone=document.getElementById('userPhone').value.trim();
 if(!name||!phone){toast('نام و شماره موبایل را وارد کن');return}
 if(!/^09\d{9}$/.test(phone)){toast('شماره موبایل معتبر وارد کن (مثل 09150000000)');return}
 profile={name,phone};put('profile',profile);renderProfile();renderHoma();toast('پروفایل ذخیره شد ✓');
}
function renderProfile(){
 if(profile){
  document.getElementById('userName').value=profile.name||'';
  document.getElementById('userPhone').value=profile.phone||'';
  document.getElementById('profileTitle').textContent='سلام، '+profile.name;
  document.getElementById('myProfileSummary').innerHTML=`<b>${esc(profile.name)}</b><p>${esc(profile.phone)}</p><p>علاقه‌مندی‌ها: ${faNum(favorites.length,0)} مورد • درخواست‌ها: ${faNum(requests.length,0)} مورد</p>`;
 }
}
function renderFavorites(){
 const el=document.getElementById('myFavorites');if(!el)return;
 const list=providers.filter(p=>favorites.includes(p.id));
 el.innerHTML=list.length?list.map(providerCard).join(''):'<div class="empty-state">هنوز چیزی ذخیره نکردی. از صفحه هر خدمت روی ♡ بزن.</div>';
}
function renderMyRequests(){
 const el=document.getElementById('myRequests');if(!el)return;
 el.innerHTML=requests.length?requests.slice().reverse().map((r,i)=>`<div>📩 <span>${esc(r.provider)} · ${esc(r.when||'')} · ${esc(r.status||'')}</span><b>›</b></div>`).join(''):'<div class="empty-state">درخواستی ثبت نشده است.</div>';
}
function saveEvent(){
 const title=document.getElementById('eventTitle').value.trim();
 if(!title){toast('عنوان مراسم را وارد کن');return}
 eventData={title,date:document.getElementById('eventDate').value,city:document.getElementById('eventCity').value.trim()||'نیشابور',budget:document.getElementById('eventBudget').value.trim(),tasks:get('tasks',{})};
 put('event',eventData);renderPlanner();renderHoma();toast('برنامه مراسم ذخیره شد ✓');
}
const tasksList=['انتخاب تاریخ و محل مراسم','تعیین بودجه','رزرو تالار یا باغ','انتخاب عکاس و فیلمبردار','انتخاب گل‌آرایی و دکور','هماهنگی موسیقی','انتخاب لباس','کیک و پذیرایی','ارسال دعوت‌نامه'];
function renderPlanner(){
 if(eventData){
  document.getElementById('eventTitle').value=eventData.title||'';
  document.getElementById('eventDate').value=eventData.date||'';
  document.getElementById('eventCity').value=eventData.city||'نیشابور';
  document.getElementById('eventBudget').value=eventData.budget||'';
 }
 let taskState=get('tasks',{});
 const done=Object.values(taskState).filter(Boolean).length;
 const pct=Math.round(done/tasksList.length*100);
 const pp=document.getElementById('plannerProgress');
 if(pp)pp.textContent=done?`پیشرفت: ${faNum(pct,0)}٪ (${faNum(done,0)} از ${faNum(tasksList.length,0)})`:'چک‌لیست را تیک بزن تا پیشرفت ذخیره شود';
 document.getElementById('eventChecklist').innerHTML=tasksList.map((t,i)=>`<div class="check-row"><label><input type="checkbox" ${taskState[i]?'checked':''} onchange="checkTask(${i},this.checked)"> ${t}</label></div>`).join('');
}
function checkTask(i,v){let t=get('tasks',{});t[i]=v;put('tasks',t);renderPlanner()}
function submitProvider(){
 let name=document.getElementById('providerName').value.trim(),category=document.getElementById('providerCategory').value,city=document.getElementById('providerCity').value.trim()||'نیشابور',phone=document.getElementById('providerPhone').value.trim(),desc=document.getElementById('providerDescription').value.trim(),price=document.getElementById('providerPrice').value.trim();
 if(!name||!phone||!category){toast('نام، دسته و شماره تماس را کامل کن');return}
 if(!/^09\d{9}$/.test(phone)){toast('شماره تماس معتبر وارد کن');return}
 let item={id:Date.now(),name,category,city,phone,description:desc,price:price||'',status:'pending',demo:false};
 providers.push(item);put('providers',providers);toast('درخواست همکاری ثبت شد و در پنل مدیر قرار گرفت ✓');show('partner');
 ['providerName','providerCity','providerPhone','providerDescription','providerPrice'].forEach(id=>{const e=document.getElementById(id);if(e)e.value=''});
}
function renderAdmin(){
 let pending=providers.filter(p=>p.status==='pending');
 document.getElementById('adminProviders').innerHTML=pending.length?pending.map(p=>`<div class="admin-row"><div><b>${esc(p.name)}</b><small>${esc(p.category)} · ${esc(p.city)} · ${esc(p.phone)}</small><p>${esc(p.description||'')}</p></div><div><button class="approve" onclick="approveProvider(${p.id})">تأیید</button><button class="reject" onclick="rejectProvider(${p.id})">رد</button></div></div>`).join(''):'<div class="empty-state">درخواست بررسی‌نشده‌ای وجود ندارد.</div>';
 document.getElementById('adminStats').innerHTML=`<div class="stat"><b>${faNum(providers.length,0)}</b><small>همکاران ثبت‌شده</small></div><div class="stat"><b>${faNum(providers.filter(p=>p.status==='approved').length,0)}</b><small>تأییدشده</small></div><div class="stat"><b>${faNum(providers.filter(p=>p.status==='pending').length,0)}</b><small>در انتظار</small></div><div class="stat"><b>${eventData?'۱':'۰'}</b><small>مراسم ذخیره‌شده</small></div>`;
}
function approveProvider(id){providers=providers.map(p=>p.id===id?{...p,status:'approved'}:p);put('providers',providers);renderAdmin();toast('همکار تأیید شد ✓')}
function rejectProvider(id){providers=providers.map(p=>p.id===id?{...p,status:'rejected'}:p);put('providers',providers);renderAdmin()}
function toggleFavorite(id){
 favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];
 put('favorites',favorites);
 if(currentGroup)renderProviders(currentGroup);
 renderHoma();
 toast(favorites.includes(id)?'به علاقه‌مندی‌ها اضافه شد ♥':'از علاقه‌مندی‌ها حذف شد');
}
function requestBooking(id){
 let p=providers.find(x=>x.id===id);if(!p)return;
 requests.push({providerId:id,provider:p.name,created:new Date().toISOString(),when:new Date().toLocaleDateString('fa-IR'),status:'درخواست آزمایشی'});
 put('requests',requests);
 toast(`درخواست برای «${p.name}» ثبت شد ✓`);
}
function missionComplete(id){if(id==='profile')return !!profile;if(id==='event')return !!eventData;if(id==='favorite')return favorites.length>0;return false}
function missionAction(id){if(missionComplete(id)){claimHoma(id);return}if(id==='profile')show('profile');else if(id==='event')show('planner');else show('search')}
function claimHoma(id){
 if(!missionComplete(id)){missionAction(id);return}
 if(homaClaimed.includes(id)){toast('پاداش این فعالیت قبلاً دریافت شده');return}
 homaClaimed.push(id);homaBalance=+(homaBalance+0.1).toFixed(2);
 homaTransactions.unshift({title:'پاداش فعالیت',amount:0.1,when:new Date().toLocaleDateString('fa-IR')});
 put('homaClaimed',homaClaimed);put('homaBalance',homaBalance);put('homaTransactions',homaTransactions);
 renderHoma();toast('۰٫۱ هما اضافه شد ✓');
}
function renderHoma(){
 const balance=Number(homaBalance||0),equiv=Math.round(balance*1000000),progress=Math.min(100,Math.round(balance/3*100));
 const hb=document.getElementById('homeHomaBalance');if(hb)hb.textContent=faNum(balance)+' هما';
 document.getElementById('homaBalance').textContent=faNum(balance);
 document.getElementById('homaEquivalent').textContent=equiv.toLocaleString('fa-IR')+' تومان اعتبار خدمات (نمایشی)';
 document.getElementById('homaProgressText').textContent=faNum(progress,0)+'٪';
 document.getElementById('homaProgressBar').style.width=progress+'%';
 const missions=[{id:'profile',icon:'👤',title:'تکمیل پروفایل',desc:'نام و شماره تماس را ذخیره کن',done:missionComplete('profile')},{id:'event',icon:'📅',title:'ثبت برنامه مراسم',desc:'عنوان مراسم را ثبت کن',done:missionComplete('event')},{id:'favorite',icon:'♥',title:'ذخیره یک خدمت',desc:'روی ♡ یک ارائه‌دهنده بزن',done:missionComplete('favorite')}];
 document.getElementById('homaMissions').innerHTML=missions.map(m=>`<div class="mission"><div class="mission-icon">${m.icon}</div><div class="mission-body"><b>${m.title}</b><small>${m.done?'فعالیت تکمیل شده':'+'+m.desc}</small></div><button class="${homaClaimed.includes(m.id)?'claimed':''}" onclick="missionAction('${m.id}')">${homaClaimed.includes(m.id)?'دریافت شد':m.done?'دریافت ۰٫۱ هما':'انجام فعالیت'}</button></div>`).join('');
}
function renderWallet(){renderHoma();document.getElementById('walletTransactions').innerHTML=homaTransactions.length?homaTransactions.map(x=>`<div>◈ <span>${esc(x.title)} · ${esc(x.when)}</span><b>+${faNum(x.amount)} هما</b></div>`).join(''):'<div class="empty-state">هنوز پاداشی ثبت نشده است.</div>'}
// init selects + gallery
document.getElementById('providerCategory').innerHTML=cats.map(c=>`<option value="${c.group}">${c.name}</option>`).join('');
renderServiceGallery('');renderHoma();
console.log('Hamahang '+APP_VERSION);
