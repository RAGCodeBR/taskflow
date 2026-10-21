import {describe,it,expect} from 'vitest';
import {pilotRoutes,pilotCookie,pilotVersion} from '../../scripts/private-pilot-release.mjs';

describe('silent owner pilot routing',()=>{
  const routes=pilotRoutes();
  const match=(url:string,cookie='')=>routes.find(route=>route.dest&&new RegExp('^'+route.src+'$').test(url)&&
    (!route.missing||!cookie.includes(`${pilotCookie}=${pilotVersion}`)))?.dest;
  it('keeps ordinary navigation and the exact public worker on the baseline',()=>{
    for(const url of ['/','/auth','/clients','/tasks/kanban','/dashboard','/whatsapp'])
      expect(match(url)).toBe('/__private-baseline/shell.html');
    expect(match('/sw.js')).toBe('/__private-baseline/sw.js');
  });
  it('does not intercept APIs, hashed assets or the worker library',()=>{
    for(const url of ['/api/example','/_serverFn/example','/assets/index-abc.js','/workbox-ee9d8b34.js','/app-release.json'])
      expect(match(url)).toBeUndefined();
    expect(match('/api/whatsapp-pilot')).toBe('/__server');
  });
  it('lets only an opted-in browser receive the new application and worker',()=>{
    const optedIn=`${pilotCookie}=${pilotVersion}`;
    expect(match('/sw.js',optedIn)).toBeUndefined();
    expect(match('/whatsapp',optedIn)).toBeUndefined();
    expect(match('/sw.js',`${pilotCookie}=wrong-version`)).toBe('/__private-baseline/sw.js');
  });
});
