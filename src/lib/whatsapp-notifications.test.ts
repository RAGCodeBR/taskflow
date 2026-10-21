import {describe,it,expect} from 'vitest';
import {runInNewContext} from 'node:vm';
import {embeddedNotifications} from '../../scripts/whatsapp-notification-client';
import {trustedChatEvent} from '../hooks/use-whatsapp-notifications';

describe('embedded notification permission',()=>{
  it('accepts messages only from the configured origin and current frame',()=>{
    const frame={};
    expect(trustedChatEvent({origin:'https://chat.taskfloww.com.br',source:frame},'https://chat.taskfloww.com.br',frame)).toBe(true);
    expect(trustedChatEvent({origin:'https://evil.example',source:frame},'https://chat.taskfloww.com.br',frame)).toBe(false);
    expect(trustedChatEvent({origin:'https://chat.taskfloww.com.br',source:{}},'https://chat.taskfloww.com.br',frame)).toBe(false);
    expect(trustedChatEvent({origin:'https://chat.taskfloww.com.br',source:null},'https://chat.taskfloww.com.br',null)).toBe(false);
  });
  it('delegates permission to the parent and forwards notification clicks without requesting permission inside the frame',async()=>{
    const sent:any[]=[];let receive:(event:any)=>void=()=>{};
    const parent={postMessage:(data:any,origin:string)=>sent.push({data,origin})};
    const window:any={parent,addEventListener:(_type:string,handler:any)=>{receive=handler;}};
    runInNewContext(embeddedNotifications('https://www.taskfloww.com.br').replace(/^<script>|<\/script>$/g,''),{window,EventTarget,Event,Map,Promise,Object,String});
    const permission=window.Notification.requestPermission();
    const id=sent.at(-1).data.id;
    receive({source:parent,origin:'https://evil.example',data:{type:'taskflow-whatsapp-notification-state',id,permission:'granted'}});
    expect(window.Notification.permission).toBe('default');
    receive({source:parent,origin:'https://www.taskfloww.com.br',data:{type:'taskflow-whatsapp-notification-state',id,permission:'granted'}});
    expect(await permission).toBe('granted');
    const notice=new window.Notification('Teste fictício',{body:'Sem enviar mensagem',tag:'fixture'});
    const notificationId=sent.at(-1).data.id;
    let clicked=false;notice.onclick=()=>{clicked=true;};
    receive({source:parent,origin:'https://www.taskfloww.com.br',data:{type:'taskflow-whatsapp-notification-click',id:notificationId}});
    expect(clicked).toBe(true);
    notice.close();expect(sent.at(-1).data.type).toBe('taskflow-whatsapp-notification-close');
    expect(sent.every(message=>message.origin==='https://www.taskfloww.com.br')).toBe(true);
  });
});
