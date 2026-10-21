import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { canUseLocalWhatsApp } from '@/lib/whatsapp-local-access';
import { resolveWhatsAppPilotConfig } from '@/lib/whatsapp-pilot-config';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/api/whatsapp-pilot')({ component: ActivatePrivateChat });
function ActivatePrivateChat() {
  const {user,isAdmin,loading}=useAuth();
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const config=resolveWhatsAppPilotConfig(import.meta.env);
  const allowed=canUseLocalWhatsApp(user,isAdmin,config.enabled);
  async function activate(){
    setBusy(true);setError('');
    try{
      const {data}=await supabase.auth.getSession();
      const response=await fetch(`${config.origin}/__taskflow/activate`,{
        method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({accessToken:data.session?.access_token}),
      });
      if(!response.ok)throw new Error('Não foi possível validar seu acesso privado.');
      // Only this browser, after server-side owner verification. Keep all cached
      // files, task drafts and offline data; never clear caches or localStorage.
      if('serviceWorker' in navigator){
        const registrations=await navigator.serviceWorker.getRegistrations();
        for(const registration of registrations)
          if(registration.scope===`${location.origin}/`)await registration.unregister();
      }
      location.assign('/whatsapp');
    }catch(failure){setError((failure as Error).message);setBusy(false);}
  }
  return <main className="grid min-h-screen place-items-center bg-background p-6 text-foreground">
    <section className="w-full max-w-md space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
      <h1 className="text-xl font-semibold">WhatsApp no Taskfloww</h1>
      {loading?<p>Verificando seu acesso…</p>:allowed?<>
        <p className="text-sm text-muted-foreground">Ative o chat privado neste navegador. Seus dados e tarefas offline serão preservados.</p>
        <Button disabled={busy} onClick={()=>void activate()}>{busy?'Ativando…':'Abrir meu WhatsApp'}</Button>
      </>:<p role="alert">Este acesso está reservado ao titular autorizado. Entre no Taskfloww com sua conta para continuar.</p>}
      {error&&<p role="alert" className="text-sm text-destructive">{error}</p>}
      <a className="block text-sm underline" href="/auth">Voltar ao Taskfloww</a>
    </section>
  </main>;
}
