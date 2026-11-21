(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const phone = '9779851154009';
  const catalog = [
    {slug:'number-plates', name:'Number Plates', category:'Plates', cat:'plates', img:'plate.svg', description:'Custom vehicle number plates for motorcycles, scooters, cars and commercial vehicles. Ask us about the correct size, lettering and finish for your vehicle.', options:['Motorcycle & scooter','Car & jeep','Reflective options','Custom dimensions']},
    {slug:'rubber-stamps', name:'Rubber Stamps',category:'Stamps',cat:'stamps',img:'stamp.svg', description:'Self-inking, traditional, company, address, logo and date stamps for daily professional use.',options:['Self-inking stamps','Company seals','Date stamps','Custom text & logo']},
    {slug:'business-cards',name:'Business Cards',category:'Print & Paper',cat:'print',img:'cards.svg',description:'Visiting cards with your choice of artwork, paper, finish and quantity.',options:['Single & double-sided','Matte or gloss','Premium card stocks','Custom layouts']},
    {slug:'sign-boards',name:'Sign Boards',category:'Signage',cat:'signage',img:'sign.svg',description:'Custom signboards, shop signs and illuminated signage designed around your brand and site.',options:['Shopfront signage','Acrylic & ACP','LED styles','Custom measurement']},
    {slug:'flex-banners',name:'Flex & Banners',category:'Large Format',cat:'outdoor',img:'banner.svg',description:'Banners and flex printing for shops, events, promotions, exhibitions and outdoor displays.',options:['Custom sizes','Event backdrops','Roll-up styles','Outdoor print']},
    {slug:'stickers-labels',name:'Stickers & Labels',category:'Print & Paper',cat:'print',img:'stickers.svg',description:'Printed product labels, decals, die-cut stickers and branding pieces for your packaging or displays.',options:['Paper & vinyl','Die-cut shapes','Packaging labels','Custom quantities']},
    {slug:'brochures-flyers',name:'Flyers & Brochures',category:'Print & Paper',cat:'print',img:'paper.svg',description:'Promotional flyers, brochures, menus, leaflets and paper materials designed for impact.',options:['Flyers & menus','A4 / A5 / custom','Folding choices','Paper options']},
    {slug:'graphic-design',name:'Graphic Design',category:'Design',cat:'design',img:'design.svg',description:'Posters, menus, flyers, logos and production-ready design layouts with precise placement and professional formatting.',options:['Logo & layout','Poster design','Menu design','Print-ready artwork']},
    {slug:'nfc-cards',name:'NFC Visiting Cards',category:'Print & Paper',cat:'print',img:'nfc.svg',description:'Ask about tap-to-share style visiting cards and digital-ready card options.',options:['Custom face design','Brand colours','Digital contact share','Enquire for details']}
  ];
  const $ = (s,p=document) => p.querySelector(s);
  const $$ = (s,p=document) => [...p.querySelectorAll(s)];
  const safeText = text => String(text).replace(/[&<>"']/g,chr=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[chr]));
  const menuBtn = $('#menuBtn'), nav=$('#nav');
  const closeMenu=()=>{ if (!menuBtn) return; nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); menuBtn.setAttribute('aria-label','Open navigation menu'); document.body.classList.remove('menu-open');};
  menuBtn?.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');document.body.classList.toggle('menu-open',open);});
  $$('a',nav || document).forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  window.addEventListener('resize',()=>{if(innerWidth>920)closeMenu();});
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target)}})},{threshold:.06,rootMargin:'0px 0px 80px 0px'});
    $$('.reveal').forEach(el=>obs.observe(el));
  } else $$('.reveal').forEach(el=>el.classList.add('visible'));
  // Catalogue filters + live search, including direct product deep-links.
  const filterBtns=$$('.filter-pill'), cards=$$('.catalog-card'), search=$('#catalogSearch'), count=$('#catalogCount'), empty=$('#emptyState');
  let filter='all';
  const updateCatalog=()=>{
    let countVisible=0;
    cards.forEach(card=>{
      const visible=(filter==='all'||card.dataset.category===filter)&&(!search?.value.trim()||card.dataset.search.includes(search.value.toLowerCase().trim()));
      card.hidden=!visible;
      if(visible)countVisible++;
    });
    if(count)count.textContent=`${countVisible} product${countVisible===1?'':'s'}`;
    if(empty)empty.hidden=countVisible!==0;
  };
  filterBtns.forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;filterBtns.forEach(a=>{a.classList.toggle('active',a===b);a.setAttribute('aria-pressed',String(a===b))});updateCatalog();}));
  search?.addEventListener('input',updateCatalog);
  $('#resetFilters')?.addEventListener('click',()=>{search.value='';filterBtns[0]?.click();updateCatalog();});
  document.addEventListener('keydown',e=>{if(e.key==='/' && search && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();search.focus();}});
  const dialog=$('#productDialog'),modalContent=$('#modalContent');
  function openProduct(slug){
    const p=catalog.find(p=>p.slug===slug);if(!p||!dialog||!modalContent)return;
    const wa=`https://wa.me/${phone}?text=${encodeURIComponent(`Hello Om Shree Art! I'd like a quote for ${p.name}. Please share available options and pricing.`)}`;
    modalContent.innerHTML=`<div class="modal-body"><div class="modal-visual theme-${p.cat}"><img src="assets/${p.img}" alt="Illustrative ${safeText(p.name)} mockup"></div><div class="modal-copy"><div class="overline">CUSTOM PRINTING / ${safeText(p.category)}</div><h2>${safeText(p.name)}</h2><p>${safeText(p.description)}</p><strong>ASK ABOUT</strong><ul>${p.options.map(x=>`<li>${safeText(x)}</li>`).join('')}</ul><a class="btn btn-red" href="${wa}" target="_blank" rel="noopener">Enquire on WhatsApp ↗</a><p class="modal-footnote">Final prices, format and turnaround are confirmed before production. Visual shown is a mockup.</p></div></div>`;
    if(!dialog.open)dialog.showModal();
    try { history.replaceState(null,'',`?item=${encodeURIComponent(slug)}`); } catch (_) { /* preview without an origin */ }
  }
  $$('[data-product]').forEach(b=>b.addEventListener('click',()=>openProduct(b.dataset.product)));
  const closeDialog=()=>{dialog?.close();if(location.search.includes('item=')) { try { history.replaceState(null,'',location.pathname); } catch (_) {} }};
  $('#closeDialog')?.addEventListener('click',closeDialog);
  dialog?.addEventListener('click',e=>{if(e.target===dialog)closeDialog();});
  dialog?.addEventListener('close',()=>{if(location.search.includes('item=')) { try { history.replaceState(null,'',location.pathname); } catch (_) {} }});
  if(dialog){let item=new URLSearchParams(location.search).get('item');if(item && catalog.some(p=>p.slug===item))openProduct(item);}
  const form=$('#quoteForm');
  if(form){
    const preset=new URLSearchParams(location.search).get('service');
    if(preset && [...form.elements.service.options].some(o=>o.value===preset))form.elements.service.value=preset;
    form.addEventListener('submit',e=>{
      e.preventDefault();if(!form.reportValidity())return;
      const data=new FormData(form), service=catalog.find(p=>p.slug===data.get('service'))?.name || 'Other / Custom Project';
      const lines=["Hello Om Shree Art! I'd like to request a printing quote.",'',`Name: ${data.get('name').trim()}`,`Contact: ${data.get('phone').trim()}`,`Service: ${service}`,data.get('quantity').trim()?`Quantity / Size: ${data.get('quantity').trim()}`:null,data.get('details').trim()?`Details: ${data.get('details').trim()}`:null,'','Please confirm pricing and availability.'].filter(Boolean);
      const link=`https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`;
      // Same-tab navigation also works when pop-up windows are blocked.
      window.location.href=link;
    });
  }
})();
