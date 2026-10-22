// Kanban stage/label colors and the conversation wallpaper picker. Injected only by the private chat bridge.
(()=>{
  // Kanban: copy each stage dot color to its column, and each label dot color to its chip.
  const paint=()=>{
    for(const column of document.querySelectorAll('[aria-label="Quadro de atendimento"]>section')){
      const c=column.querySelector(':scope>header span.rounded-full[style]')?.style.background;
      if(c&&column.style.getPropertyValue('--stage')!==c)column.style.setProperty('--stage',c);
    }
    for(const chip of document.querySelectorAll('[aria-label="Quadro de atendimento"] span.rounded-full:has(>span.rounded-full[style])')){
      const c=chip.querySelector(':scope>span[style]')?.style.background;
      if(c&&chip.style.getPropertyValue('--lc')!==c)chip.style.setProperty('--lc',c);
    }
    const marks=unread.all();
    for(const card of document.querySelectorAll('[aria-label="Quadro de atendimento"] article')){
      // Lets the compact stage select sit just left of the hover toolbar. Measured once per card:
      // re-reading layout for every card on every DOM change made the board sluggish.
      if(!card.style.getPropertyValue('--tb-w')){const bar=card.querySelector('[data-no-card-drag].flex');if(bar&&bar.offsetWidth)card.style.setProperty('--tb-w',Math.max(0,bar.offsetWidth-18)+'px');}
      const marked=marks.has(cardName(card));
      if(marked!==card.hasAttribute('data-tf-unread'))card.toggleAttribute('data-tf-unread',marked);
      const any=isUnread(card);
      if(any!==card.hasAttribute('data-tf-any-unread'))card.toggleAttribute('data-tf-any-unread',any);
    }
    filter();
    mentions();
    walls();
    speeds();
  };
  // Audio speed: a 1× / 1,25× / 1,5× / 2× toggle next to each voice message; the choice carries over.
  const RATE='taskflow-chat-audio-rate',RATES=[1,1.25,1.5,2];
  const rate=()=>{try{const r=Number(localStorage.getItem(RATE));return RATES.includes(r)?r:1}catch{return 1}};
  const label=r=>String(r).replace('.',',')+'×';
  const speeds=()=>{
    const r=rate();
    for(const audio of document.querySelectorAll('.cursor-context-menu audio')){
      if(audio.defaultPlaybackRate!==r){audio.defaultPlaybackRate=r;audio.playbackRate=r;}
      const row=audio.parentElement;
      let button=row?.querySelector(':scope>.tf-speed');
      if(row&&!button){
        button=document.createElement('button');button.type='button';button.className='tf-speed';
        button.title='Velocidade do áudio';
        button.onclick=e=>{e.stopPropagation();const next=RATES[(RATES.indexOf(rate())+1)%RATES.length];try{localStorage.setItem(RATE,String(next))}catch{}schedule();};
        row.append(button);
      }
      if(button&&button.textContent!==label(r)){button.textContent=label(r);button.setAttribute('aria-label',`Velocidade do áudio: ${label(r)}. Clique para mudar`);}
    }
  };
  // Media elements reset their rate when a new source loads; reapply on play.
  document.addEventListener('play',e=>{if(e.target instanceof HTMLAudioElement)e.target.playbackRate=rate();},true);
  const cardName=card=>card.getAttribute('aria-label')?.replace(/^Conversa com /,'')||'';
  // Conversations marked as unread by hand, per WhatsApp account, kept in this browser.
  // A mark clears itself the next time that conversation is opened.
  const unread={
    key:()=>'taskflow-chat-unread:'+(session()||''),
    all(){try{return new Set(JSON.parse(localStorage.getItem(this.key())||'[]'))}catch{return new Set()}},
    has(name){return !!name&&this.all().has(name)},
    set(name,on){const names=this.all();if(on)names.add(name);else names.delete(name);try{localStorage.setItem(this.key(),JSON.stringify([...names]))}catch{}schedule();},
  };
  let openChat=null;
  const isUnread=card=>card.hasAttribute('data-tf-unread')||!!card.querySelector('[aria-label$="mensagens não lidas"]');

  // "Só não lidas" filter, next to the other Kanban filters.
  const FILTER='taskflow-chat-only-unread';
  const onlyUnread=()=>{try{return localStorage.getItem(FILTER)==='1'}catch{return false}};
  const filter=()=>{
    document.documentElement.toggleAttribute('data-tf-only-unread',onlyUnread());
    const pin=document.querySelector('button[title^="Guardar os filtros"]');
    if(!pin||!document.querySelector('[aria-label="Quadro de atendimento"]')||pin.parentElement.querySelector(':scope>.tf-unread-filter'))return;
    const button=document.createElement('button');button.type='button';button.className='tf-unread-filter';
    button.innerHTML='<span class="tf-unread-filter-dot"></span>Não lidas';
    button.setAttribute('aria-pressed',String(onlyUnread()));
    button.onclick=()=>{const on=!onlyUnread();try{localStorage.setItem(FILTER,on?'1':'0')}catch{}button.setAttribute('aria-pressed',String(on));schedule();};
    pin.before(button);
  };

  // Right-click menu on Kanban cards: unread mark, open, pin, labels and stage.
  const icon=d=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICONS={
    unread:'<path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12.5"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><circle cx="19" cy="18" r="3" fill="currentColor"/>',
    read:'<path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/>',
    open:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    pin:'<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',
    tag:'<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
  };
  ICONS.archive='<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>';
  // Cards only carry the conversation name; the board API maps it to the jid the archive route needs.
  const jidFor=async name=>{
    const sid=session();
    if(!sid)return null;
    if(!cache.board||Date.now()-cache.boardAt>60_000){
      const response=await fetch(`/api/chat/${encodeURIComponent(sid)}/board`).catch(()=>null);
      if(response?.ok){cache.board=(await response.json()).chats||[];cache.boardAt=Date.now();}
    }
    return cache.board?.find(c=>(c.name||c.notify||c.jid.split('@')[0])===name)?.jid||null;
  };
  const archiveCard=async card=>{
    const jid=await jidFor(cardName(card)),sid=session();
    if(!jid||!sid)return;
    card.style.opacity='.4';
    const response=await fetch(`/api/chat/${encodeURIComponent(sid)}/${encodeURIComponent(jid)}/archive`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({archive:true})}).catch(()=>null);
    if(!response?.ok){card.style.opacity='';return;}
    window.dispatchEvent(new CustomEvent('wa:archived-changed',{detail:{jid,archived:true}}));
  };
  let menu=null;
  const closeMenu=()=>{menu?.remove();menu=null;};
  const item=(label,svg,run,cls='')=>{const b=document.createElement('button');b.type='button';b.setAttribute('role','menuitem');if(cls)b.className=cls;b.innerHTML=(svg?icon(svg):'')+`<span>${label}</span>`;b.onclick=()=>{closeMenu();run();};return b;};
  const openMenu=(card,x,y)=>{
    closeMenu();
    const name=cardName(card),manual=unread.has(name),pinBtn=card.querySelector('button[aria-label^="Fixar"],button[aria-label^="Desafixar"]');
    menu=document.createElement('div');menu.className='tf-ctx';menu.setAttribute('role','menu');menu.setAttribute('aria-label','Ações da conversa');
    menu.append(item(manual?'Marcar como lida':'Marcar como não lida',manual?ICONS.read:ICONS.unread,()=>unread.set(name,!manual),'tf-ctx-unread'));
    menu.append(item('Abrir conversa',ICONS.open,()=>card.querySelector('button[aria-label^="Abrir conversa"]')?.click()));
    if(pinBtn)menu.append(item(pinBtn.getAttribute('aria-pressed')==='true'?'Desafixar da coluna':'Fixar no topo da coluna',ICONS.pin,()=>pinBtn.click()));
    const tagBtn=card.querySelector('button[aria-label^="Etiquetas de"]');
    if(tagBtn)menu.append(item('Etiquetas…',ICONS.tag,()=>tagBtn.click()));
    menu.append(item('Arquivar conversa',ICONS.archive,()=>archiveCard(card)));
    const select=card.querySelector(':scope>select');
    if(select&&select.options.length>1){
      const colors=new Map([...document.querySelectorAll('[aria-label="Quadro de atendimento"]>section')].map(s=>[s.getAttribute('aria-label'),s.style.getPropertyValue('--stage')]));
      const hr=document.createElement('hr'),title=document.createElement('p'),list=document.createElement('div');
      title.textContent='Mover para';list.className='tf-ctx-stages';
      for(const option of select.options){
        const b=item(option.text,'',()=>{
          if(select.value===option.value)return;
          Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set.call(select,option.value);
          select.dispatchEvent(new Event('change',{bubbles:true}));
        });
        const dot=document.createElement('span');dot.className='tf-ctx-dot';dot.style.background=colors.get(option.text)||'var(--muted-foreground)';b.prepend(dot);
        if(select.value===option.value)b.setAttribute('aria-current','true');
        list.append(b);
      }
      menu.append(hr,title,list);
    }
    document.body.append(menu);
    const r=menu.getBoundingClientRect(),left=Math.min(x,innerWidth-r.width-8),top=Math.min(y,innerHeight-r.height-8);
    menu.style.left=Math.max(8,left)+'px';menu.style.top=Math.max(8,top)+'px';
    menu.style.setProperty('--tf-origin',`${left<x?'right':'left'} ${top<y?'bottom':'top'}`);
    menu.querySelector('button')?.focus();
  };
  document.addEventListener('contextmenu',e=>{
    const card=e.target.closest?.('[aria-label="Quadro de atendimento"] article');
    if(!card||e.target.closest('select,input,textarea'))return;
    e.preventDefault();openMenu(card,e.clientX,e.clientY);
  },true);
  document.addEventListener('pointerdown',e=>{if(menu&&!menu.contains(e.target))closeMenu();},true);
  window.addEventListener('keydown',e=>{
    if(!menu)return;
    if(e.key==='Escape'){e.stopPropagation();e.preventDefault();closeMenu();return;}
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){
      e.preventDefault();const items=[...menu.querySelectorAll('button')],i=items.indexOf(document.activeElement);
      items[(i+(e.key==='ArrowDown'?1:-1)+items.length)%items.length]?.focus();
    }
  },true);
  addEventListener('scroll',closeMenu,true);addEventListener('blur',closeMenu);

  // Column reordering: the board only accepts a column dropped on another column's narrow title
  // strip. Accept a drop anywhere on the target column and hand it to that column's header.
  let columnDrag=false,dropColumn=null;
  const markColumn=section=>{if(dropColumn===section)return;dropColumn?.removeAttribute('data-tf-col-drop');dropColumn=section;section?.setAttribute('data-tf-col-drop','');};
  document.addEventListener('dragstart',e=>{columnDrag=!!e.target.closest?.('button[aria-label^="Arrastar coluna"]');},true);
  document.addEventListener('dragend',()=>{columnDrag=false;markColumn(null);},true);
  document.addEventListener('dragover',e=>{
    if(!columnDrag)return;
    const section=e.target.closest?.('[aria-label="Quadro de atendimento"]>section');
    markColumn(section||null);
    if(section&&!e.target.closest('header'))e.preventDefault();
  },true);
  document.addEventListener('drop',e=>{
    if(!columnDrag)return;
    const section=e.target.closest?.('[aria-label="Quadro de atendimento"]>section');
    markColumn(null);
    if(!section||e.target.closest('header'))return;
    e.preventDefault();e.stopPropagation();
    section.querySelector(':scope>header')?.dispatchEvent(new DragEvent('drop',{bubbles:true,cancelable:true,dataTransfer:e.dataTransfer}));
  },true);

  // Click vs drag: the whole card is both draggable and the "open" button, so a 2px wobble while
  // clicking starts a native drag and swallows the click. A short, quick drag counts as a click,
  // and dropping a card onto itself is ignored (the board would otherwise move it to the column end).
  let press=null,lastPos=null;
  document.addEventListener('pointerdown',e=>{
    const card=e.button===0&&!e.target.closest?.('[data-no-card-drag],select')&&e.target.closest?.('[aria-label="Quadro de atendimento"] article');
    press=card?{card,x:e.clientX,y:e.clientY,t:Date.now()}:null;lastPos=null;
  },true);
  document.addEventListener('dragover',e=>{if(press)lastPos={x:e.clientX,y:e.clientY};},true);
  document.addEventListener('drop',e=>{
    if(press&&e.target.closest?.('[aria-label="Quadro de atendimento"] article')===press.card){e.preventDefault();e.stopPropagation();}
  },true);
  document.addEventListener('dragend',e=>{
    if(!press||e.target!==press.card)return;
    const {card,x,y,t}=press,end=lastPos||{x,y};press=null;lastPos=null;
    // The board ignores clicks for 200ms after a drag ends, so open just after that window.
    if(Math.hypot(end.x-x,end.y-y)<10&&Date.now()-t<700)setTimeout(()=>card.querySelector('button[aria-label^="Abrir conversa"]')?.click(),230);
  },true);
  // Card previews: show "@Name" instead of the raw WhatsApp id of a mentioned person.
  // The board only has names, so jids come from the board API and names from the group participants.
  const session=()=>(document.cookie.match(/(?:^|; )sessionId=([^;]+)/)||[])[1];
  const cache={board:null,boardAt:0,people:new Map(),pending:new Set()};
  const load=(key,url,store)=>{
    if(cache.pending.has(key))return;cache.pending.add(key);
    fetch(url).then(r=>r.ok?r.json():null).then(data=>{if(data)store(data);}).catch(()=>{}).finally(()=>{cache.pending.delete(key);schedule();});
  };
  const mentions=()=>{
    const sid=session(),cards=document.querySelectorAll('[aria-label="Quadro de atendimento"] article p.line-clamp-2');
    if(!sid||!cards.length)return;
    const fresh=Date.now()-cache.boardAt<60_000;
    for(const preview of cards){
      const text=preview.firstChild;
      if(!text||text.nodeType!==3||!/@\d{5,20}/.test(text.nodeValue))continue;
      const name=preview.closest('article')?.getAttribute('aria-label')?.replace(/^Conversa com /,'');
      const chat=cache.board?.find(c=>(c.name||c.notify||c.jid.split('@')[0])===name);
      if(!chat){if(!fresh)load('board',`/api/chat/${encodeURIComponent(sid)}/board`,data=>{cache.board=data.chats||[];cache.boardAt=Date.now();});continue;}
      if(!chat.jid.endsWith('@g.us'))continue;
      const people=cache.people.get(chat.jid);
      if(!people){load(chat.jid,`/api/chat/${encodeURIComponent(sid)}/${encodeURIComponent(chat.jid)}/participants`,data=>{
        const names=new Map();for(const p of data.people||[])for(const id of [p.jid,...(p.aliases||[])])names.set(id.split('@')[0].split(':')[0],p.name);
        cache.people.set(chat.jid,names);
      });continue;}
      const next=text.nodeValue.replace(/(^|[^\w@])@(\d{5,20})(?!\d)/g,(full,prefix,id)=>`${prefix}@${people.get(id)||'contato'}`);
      if(next!==text.nodeValue)text.nodeValue=next;
    }
  };
  // Conversation wallpaper, chosen per browser.
  const KEY='taskflow-chat-wallpaper',WALLS=[['liso','Liso'],['pontos','Pontos'],['grade','Grade'],['ondas','Ondas'],['marinho','Marinho'],['aurora','Aurora'],['papel','Papel'],['noite','Noite']];
  const current=()=>{try{return localStorage.getItem(KEY)||'pontos'}catch{return 'pontos'}};
  const walls=()=>{
    const wall=current(),titles=document.querySelectorAll('.backdrop-blur-sm.border-b h3.truncate');
    const name=titles[0]?.textContent||null;
    if(name!==openChat){openChat=name;if(name&&unread.has(name))unread.set(name,false);}
    for(const title of titles){
      const header=title.closest('.border-b'),field=header?.parentElement?.querySelector(':scope>.styled-scrollbar.overflow-y-auto');
      if(field&&(field.dataset.wall||'liso')!==wall){if(wall==='liso')delete field.dataset.wall;else field.dataset.wall=wall;}
      if(header&&!header.querySelector(':scope>.tf-unread-toggle'))header.append(unreadToggle());
      if(header&&!header.querySelector(':scope>.tf-wall-picker'))header.append(picker());
      const toggle=header?.querySelector(':scope>.tf-unread-toggle'),on=unread.has(title.textContent);
      if(toggle&&toggle.getAttribute('aria-pressed')!==String(on)){toggle.setAttribute('aria-pressed',String(on));toggle.lastChild.textContent=on?'Não lida':'Marcar como não lida';}
    }
  };
  const unreadToggle=()=>{
    const button=document.createElement('button');button.type='button';button.className='tf-unread-toggle';button.setAttribute('aria-pressed','false');
    button.title='Destacar esta conversa no topo do quadro até você abri-la de novo';
    button.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12.5"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><circle cx="19" cy="18" r="3" fill="currentColor"/></svg><span>Marcar como não lida</span>';
    button.onclick=()=>{const name=button.parentElement?.querySelector('h3.truncate')?.textContent;if(name)unread.set(name,!unread.has(name));};
    return button;
  };
  const picker=()=>{
    const box=document.createElement('div');box.className='tf-wall-picker';
    const open=document.createElement('button');open.type='button';open.title='Fundo da conversa';open.setAttribute('aria-label','Escolher fundo da conversa');open.setAttribute('aria-expanded','false');
    open.innerHTML='<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.56-2.5 5.56-5.55C21.97 6.01 17.46 2 12 2z"/></svg>';
    const close=()=>{box.querySelector('.tf-wall-menu')?.remove();open.setAttribute('aria-expanded','false');};
    open.onclick=e=>{
      e.stopPropagation();
      if(box.querySelector('.tf-wall-menu'))return close();
      const menu=document.createElement('div');menu.className='tf-wall-menu';menu.setAttribute('role','dialog');menu.setAttribute('aria-label','Fundo da conversa');
      menu.innerHTML='<p>Fundo da conversa</p><div class="tf-wall-grid"></div>';
      for(const [id,name] of WALLS){
        const label=document.createElement('label'),swatch=document.createElement('button');
        swatch.type='button';swatch.setAttribute('aria-label','Fundo '+name);swatch.setAttribute('aria-pressed',String(current()===id));
        if(id!=='liso')swatch.dataset.wall=id;else swatch.style.background='var(--background)';
        swatch.onclick=()=>{try{localStorage.setItem(KEY,id)}catch{}menu.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===swatch)));walls();};
        const caption=document.createElement('span');caption.textContent=name;
        label.append(swatch,caption);menu.lastChild.append(label);
      }
      box.append(menu);open.setAttribute('aria-expanded','true');
      const away=ev=>{if(!box.contains(ev.target)){close();document.removeEventListener('pointerdown',away,true);window.removeEventListener('keydown',esc,true);}};
      const esc=ev=>{if(ev.key==='Escape'){ev.stopPropagation();ev.preventDefault();close();open.focus();document.removeEventListener('pointerdown',away,true);window.removeEventListener('keydown',esc,true);}};
      document.addEventListener('pointerdown',away,true);window.addEventListener('keydown',esc,true);
    };
    box.append(open);return box;
  };
  let queued=false;
  const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;paint();});}};
  new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['style']});
  schedule();
})();
