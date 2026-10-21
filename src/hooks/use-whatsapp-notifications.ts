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
        const notice=new Notification(data.title.slice(0,180),{body:data.body.slice(0,400),tag:data.tag.slice(0,180),icon:'/taskflow-mark.png'});
        activeNotices.set(data.id,notice);
        notice.onclick=()=>{window.focus();frame.current?.contentWindow?.postMessage({type:'taskflow-whatsapp-notification-click',id:data.id},origin);notice.close();};
        notice.onclose=()=>{activeNotices.delete(data.id);frame.current?.contentWindow?.postMessage({type:'taskflow-whatsapp-notification-closed',id:data.id},origin);};
      }
    };
    const focus=()=>sync();
    window.addEventListener('message',receive);window.addEventListener('focus',focus);
    return()=>{window.removeEventListener('message',receive);window.removeEventListener('focus',focus);activeNotices.forEach(n=>n.close());activeNotices.clear();};
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
