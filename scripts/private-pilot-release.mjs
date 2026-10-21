import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Temporary owner-only rollout. Keep the published shell and worker byte-for-byte
// for ordinary browsers, so this private release creates no global update prompt.
export const pilotCookie = 'taskflow_private_pilot';
export const pilotVersion = 'whatsapp-20261021';
export const baselineWorkerHash = '7f2fb62df2da45813dbbfce31b6a97163194dd233ee481609ade42a51c65562f';
const cache = '.private-pilot-baseline';
const output = '.vercel/output';
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
export function pilotRoutes() {
  return [
    { src: '/sw.js', headers:{'cache-control':'private, no-store', vary:'Cookie'}, continue:true },
    // Old workers already exclude /api/* navigation. Activation must not register
    // a new worker until the gateway has verified the exact owner.
    { src: '/api/whatsapp-pilot', dest: '/__server' },
    { src: '/sw.js', missing: [{type:'cookie', key:pilotCookie, value:pilotVersion}],
      dest: '/__private-baseline/sw.js', headers:{'cache-control':'private, no-store', vary:'Cookie'} },
    { src: '/((?!api/|_serverFn/|assets/|__server|__private-baseline/|.*\\.[^/]+$).*)',
      missing: [{type:'cookie', key:pilotCookie, value:pilotVersion}],
      dest: '/__private-baseline/shell.html', headers:{'cache-control':'private, no-store'} },
  ];
}
async function capture() {
  await mkdir(cache, {recursive:true});
  const fetchBytes = async name => {
    const url = new URL(name, 'https://www.taskfloww.com.br/');
    if (url.origin !== 'https://www.taskfloww.com.br') throw new Error('Unexpected baseline origin');
    const response = await fetch(url, {redirect:'error', signal:AbortSignal.timeout(20000)});
    if (!response.ok) throw new Error(`Baseline download failed: ${name} (${response.status})`);
    return Buffer.from(await response.arrayBuffer());
  };
  const worker = await fetchBytes('sw.js');
  if (sha(worker) !== baselineWorkerHash) throw new Error('Public release changed. Review the private rollout before publishing.');
  const shell = await fetchBytes('/');
  const html = shell.toString();
  if (!html.includes('/assets/index-D7VRkjG7.js') || !html.includes('Preparando dados locais'))
    throw new Error('Unexpected baseline shell');
  // Same root shell used by the existing service worker for offline navigation.
  // It contains no authenticated data. All existing hashed assets are preserved.
  const names = new Set([...worker.toString().matchAll(/url:"([^"]+)"/g)].map(m=>m[1]));
  const workbox = worker.toString().match(/"\.\/(workbox-[a-z0-9]+)"/i)?.[1];
  if (!workbox || names.size < 100) throw new Error('Unexpected worker manifest');
  names.delete('/'); names.add(workbox+'.js'); names.add('registerSW.js'); names.add('app-release.json');
  const queue = [...names];
  await Promise.all(Array.from({length:6},async()=>{
    while(queue.length) {
      const name = queue.pop();
      if (!/^(?:assets\/[^/]+|workbox-[a-z0-9]+\.js|registerSW\.js|app-release\.json|taskflow-mark\.png|manifest\.webmanifest)$/.test(name))
        throw new Error('Unexpected baseline asset: '+name);
      const bytes = await fetchBytes(name);
      const dest=path.join(cache,name); await mkdir(path.dirname(dest),{recursive:true}); await writeFile(dest,bytes);
    }
  }));
  await writeFile(path.join(cache,'sw.js'),worker);
  await writeFile(path.join(cache,'shell.html'),shell);
  await writeFile(path.join(cache,'files.json'),JSON.stringify([...names]));
  console.log('Captured the public shell, unchanged worker, and '+names.size+' public assets. No user data.');
}
async function prepare() {
  const worker=await readFile(path.join(cache,'sw.js'));
  if(sha(worker)!==baselineWorkerHash)throw new Error('Baseline worker checksum mismatch');
  const files=JSON.parse(await readFile(path.join(cache,'files.json'),'utf8'));
  for(const name of files){
    // Preserve the original registration script and manifest for existing users.
    const dest=path.join(output,'static',name); await mkdir(path.dirname(dest),{recursive:true});
    await copyFile(path.join(cache,name),dest);
  }
  const baseline=path.join(output,'static/__private-baseline');await mkdir(baseline,{recursive:true});
  await copyFile(path.join(cache,'sw.js'),path.join(baseline,'sw.js'));
  await copyFile(path.join(cache,'shell.html'),path.join(baseline,'shell.html'));
  const configPath=path.join(output,'config.json');
  const config=JSON.parse(await readFile(configPath,'utf8'));
  config.routes=[...pilotRoutes(),...config.routes];
  await writeFile(configPath,JSON.stringify(config,null,2)+'\n');
  console.log('Owner-only rollout prepared; other browsers keep the existing public shell and worker.');
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  if(process.argv[2]==='capture') await capture();
  else if(process.argv[2]==='prepare') await prepare();
  else throw new Error('Use capture or prepare');
}
