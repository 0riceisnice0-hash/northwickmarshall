import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png','.txt':'text/plain'};
http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    const pathname=decodeURIComponent(url.pathname).replace(/^\/northwickmarshall(?=\/|$)/,'');
    const path=resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
    if(!path.startsWith(root+sep)){res.writeHead(403);res.end();return;}
    const body=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream'});res.end(body);
  }catch{res.writeHead(404,{'Content-Type':'text/html'});res.end(await readFile(resolve(root,'404.html')));}
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173/northwickmarshall/'));
