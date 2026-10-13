// v17 refresh repair: refresh program files without touching IndexedDB records.
const CACHE='comfifoods-bazaar-v17-refresh-1';
const ASSETS=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./icon.svg','./Bazaar-App-Installation-Guide.pdf'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  // Bypass an older HTTP-cache copy when building the new offline cache.
  await cache.addAll(ASSETS.map(path=>new Request(new URL(path,self.registration.scope),{cache:'reload'})));
  await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key.startsWith('comfifoods-bazaar-')&&key!==CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const cached=await cache.match(event.request);
    if(cached)return cached;
    try{return await fetch(event.request)}catch(error){
      if(event.request.mode==='navigate'){
        const page=await cache.match(new URL('./index.html',self.registration.scope).href);
        if(page)return page;
      }
      throw error;
    }
  })());
});
