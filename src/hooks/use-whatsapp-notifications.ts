import {useCallback,useEffect,useRef,useState,type RefObject} from 'react';

export function trustedChatEvent(event:{origin:string;source:unknown},origin:string,source:unknown){
  return Boolean(source)&&event.origin===origin&&event.source===source;
}
export function useWhatsAppNotifications(frame:RefObject<HTMLIFrameElement|null>,origin:string,enabled:boolean){
  const [requestId,setRequestId]=useState<string|null>(null);
  const [blocked,setBlocked]=useState(false);
  const notices=useRef(new Map<string,Notification>());
  const sync=useCallback((id?:string)=>{
    frame.current?.contentWindow?.postMessage({type:'taskflow-whatsapp-notification-state',id,
      permission:typeof Notification==='undefined'?'denied':Notification.permission},origin);
  },[frame,origin]);
  useEffect(()=>{
    if(!enabled)return;
    const activeNotices=notices.current;
    // While the tab is in the background, alternate its title so a new message is noticed among other tabs.
    let flashTimer:ReturnType<typeof setInterval>|undefined,baseTitle='',unseen=0;
    const stopFlash=()=>{if(flashTimer===undefined)return;clearInterval(flashTimer);flashTimer=undefined;document.title=baseTitle;unseen=0;};
    const flashTitle=()=>{
      unseen++;
      if(flashTimer!==undefined)return;
      baseTitle=document.title;let on=false;
      flashTimer=setInterval(()=>{on=!on;document.title=on?`(${unseen}) Nova mensagem no WhatsApp`:baseTitle;},1000);
    };
    const seen=()=>{if(document.visibilityState==='visible'&&document.hasFocus())stopFlash();};
    const receive=(event:MessageEvent)=>{
      if(!trustedChatEvent(event,origin,frame.current?.contentWindow))return;
      const data=event.data;
      if(data?.type==='taskflow-whatsapp-notifications-ready'){sync();return;}
      if(typeof data?.id!=='string'||data.id.length>100)return;
      if(data.type==='taskflow-whatsapp-notification-permission'){
        if(typeof Notification==='undefined'||Notification.permission==='denied'){
          setBlocked(true);sync(data.id);
        }else if(Notification.permission==='granted')sync(data.id);
        else setRequestId(data.id);
      }
      if(data.type==='taskflow-whatsapp-notification-close'){
        activeNotices.get(data.id)?.close();activeNotices.delete(data.id);
      }
      if(data.type==='taskflow-whatsapp-notification-show'&&typeof Notification!=='undefined'&&Notification.permission==='granted'){
        if(typeof data.title!=='string'||typeof data.body!=='string'||typeof data.tag!=='string')return;
        if(activeNotices.size>=20){const first=activeNotices.keys().next().value;if(first){activeNotices.get(first)?.close();activeNotices.delete(first);}}
        // requireInteraction keeps it on screen until clicked or dismissed; renotify alerts again for the same conversation.
        const options={body:data.body.slice(0,400),tag:data.tag.slice(0,180),icon:'/taskflow-mark.png',
          requireInteraction:data.requireInteraction===true,renotify:data.renotify===true&&!!data.tag};
        const notice=new Notification(data.title.slice(0,180),options as NotificationOptions);
        activeNotices.set(data.id,notice);
        if(document.visibilityState!=='visible'||!document.hasFocus())flashTitle();
        notice.onclick=()=>{window.focus();stopFlash();frame.current?.contentWindow?.postMessage({type:'taskflow-whatsapp-notification-click',id:data.id},origin);notice.close();};
        notice.onclose=()=>{activeNotices.delete(data.id);frame.current?.contentWindow?.postMessage({type:'taskflow-whatsapp-notification-closed',id:data.id},origin);};
      }
    };
    const focus=()=>{sync();seen();};
    window.addEventListener('message',receive);window.addEventListener('focus',focus);document.addEventListener('visibilitychange',seen);
    return()=>{window.removeEventListener('message',receive);window.removeEventListener('focus',focus);document.removeEventListener('visibilitychange',seen);stopFlash();activeNotices.forEach(n=>n.close());activeNotices.clear();};
  },[enabled,frame,origin,sync]);
  const allow=async()=>{
    const id=requestId;if(!id)return;
    try{const result=await Notification.requestPermission();setBlocked(result==='denied');}
    catch{setBlocked(true);}
    sync(id);setRequestId(null);
  };
  const dismiss=()=>{if(requestId)sync(requestId);setRequestId(null);setBlocked(false);};
  return {requestId,blocked,allow,dismiss,sync};
}
