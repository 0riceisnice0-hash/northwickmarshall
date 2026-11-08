import {readFile,readdir,access} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
const root=resolve('dist');
const pages=(await readdir(root)).filter(f=>f.endsWith('.html'));
const errors=[];
for(const page of pages){
 const html=await readFile(resolve(root,page),'utf8');
 if((html.match(/<h1[ >]/g)||[]).length!==1)errors.push(`${page}: expected one main heading`);
 if(!html.includes('name="robots" content="noindex,nofollow"'))errors.push(`${page}: missing prototype noindex`);
 for(const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)){
  const target=match[1];if(/^(https?:|mailto:|tel:|data:)/.test(target))continue;
  try{await access(resolve(dirname(resolve(root,page)),target));}catch{errors.push(`${page}: missing ${target}`);}
 }
 for(const img of html.matchAll(/<img\b[^>]*>/g))if(!/alt="[^"]*"/.test(img[0]))errors.push(`${page}: missing image alt text`);
 if(/href="#"|href="tel:.*(?:0000|1234)|<i>|<em>/.test(html))errors.push(`${page}: unexpected placeholder link or italic`);
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`Checked ${pages.length} pages: links, assets, headings, image alternatives and prototype metadata pass`);
