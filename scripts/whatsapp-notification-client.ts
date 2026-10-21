// Adapt only the embedded chat. Browser permission is requested by a visible
// button in the top-level Taskfloww document, never by a cross-origin iframe.
export function embeddedNotifications(parentOrigin: string) {
  return `<script>(()=>{
    if(window.parent===window)return;
    const origin=${JSON.stringify(parentOrigin)};
    let permission='default',sequence=0;
    const pending=new Map(),notifications=new Map();
    const send=data=>window.parent.postMessage(data,origin);
    class EmbeddedNotification extends EventTarget {
      static get permission(){return permission;}
      static requestPermission(){return new Promise(resolve=>{
        const id='permission-'+(++sequence);pending.set(id,resolve);
        send({type:'taskflow-whatsapp-notification-permission',id});
      });}
      constructor(title,options={}){
        super();this.id='notification-'+(++sequence);this.onclick=null;this.onclose=null;
        notifications.set(this.id,this);
        send({type:'taskflow-whatsapp-notification-show',id:this.id,title:String(title),body:String(options.body||''),tag:String(options.tag||'')});
      }
      close(){send({type:'taskflow-whatsapp-notification-close',id:this.id});notifications.delete(this.id);}
    }
    window.addEventListener('message',event=>{
      if(event.origin!==origin||event.source!==window.parent)return;
      const data=event.data;
      if(data?.type==='taskflow-whatsapp-notification-state'){
        if(['granted','denied','default'].includes(data.permission))permission=data.permission;
        const resolve=pending.get(data.id);if(resolve){pending.delete(data.id);resolve(permission);}
      }
      if(data?.type==='taskflow-whatsapp-notification-click'){
        const notification=notifications.get(data.id);if(notification){const click=new Event('click');notification.onclick?.(click);notification.dispatchEvent(click);}
      }
      if(data?.type==='taskflow-whatsapp-notification-closed'){
        const notification=notifications.get(data.id);if(notification){const close=new Event('close');notification.onclose?.(close);notification.dispatchEvent(close);notifications.delete(data.id);}
      }
    });
    Object.defineProperty(window,'Notification',{value:EmbeddedNotification,configurable:true});
    send({type:'taskflow-whatsapp-notifications-ready'});
  })();</script>`;
}
