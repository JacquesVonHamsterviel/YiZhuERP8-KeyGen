/* ================= 还原算法（含自写 MD5，零依赖）=================
   本段与 unpack_work/yz_keygen.js / verify_yz.html / Python 参考逐字节一致，勿改。 */
function md5bytes(bytes){
 function rol(n,c){return (n<<c)|(n>>>(32-c));}
 function add(a,b){return (a+b)&0xffffffff;}
 function cmn(q,a,b,x,s,t){return add(rol(add(add(a,q),add(x,t)),s),b);}
 function ff(a,b,c,d,x,s,t){return cmn((b&c)|(~b&d),a,b,x,s,t);}
 function gg(a,b,c,d,x,s,t){return cmn((b&d)|(c&~d),a,b,x,s,t);}
 function hh(a,b,c,d,x,s,t){return cmn(b^c^d,a,b,x,s,t);}
 function ii(a,b,c,d,x,s,t){return cmn(c^(b|~d),a,b,x,s,t);}
 var len=bytes.length,w=bytes.slice();w.push(0x80);
 while(w.length%64!==56)w.push(0);
 var lo=(len*8)>>>0,hi=Math.floor(len/0x20000000)>>>0;
 for(var i=0;i<4;i++)w.push((lo>>>(8*i))&0xff);
 for(var i2=0;i2<4;i2++)w.push((hi>>>(8*i2))&0xff);
 var a=1732584193,b=-271733879,c=-1732584194,d=271733878;
 var S=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21];
 for(var off=0;off<w.length;off+=64){
  var M=new Array(16);
  for(var j=0;j<16;j++)M[j]=w[off+j*4]|(w[off+j*4+1]<<8)|(w[off+j*4+2]<<16)|(w[off+j*4+3]<<24);
  var oa=a,ob=b,oc=c,od=d;
  a=ff(a,b,c,d,M[0],S[0],-680876936);d=ff(d,a,b,c,M[1],S[1],-389564586);
  c=ff(c,d,a,b,M[2],S[2],606105819);b=ff(b,c,d,a,M[3],S[3],-1044525330);
  a=ff(a,b,c,d,M[4],S[0],-176418897);d=ff(d,a,b,c,M[5],S[1],1200080426);
  c=ff(c,d,a,b,M[6],S[2],-1473231341);b=ff(b,c,d,a,M[7],S[3],-45705983);
  a=ff(a,b,c,d,M[8],S[0],1770035416);d=ff(d,a,b,c,M[9],S[1],-1958414417);
  c=ff(c,d,a,b,M[10],S[2],-42063);b=ff(b,c,d,a,M[11],S[3],-1990404162);
  a=ff(a,b,c,d,M[12],S[0],1804603682);d=ff(d,a,b,c,M[13],S[1],-40341101);
  c=ff(c,d,a,b,M[14],S[2],-1502002290);b=ff(b,c,d,a,M[15],S[3],1236535329);
  a=gg(a,b,c,d,M[1],S[4],-165796510);d=gg(d,a,b,c,M[6],S[5],-1069501632);
  c=gg(c,d,a,b,M[11],S[6],643717713);b=gg(b,c,d,a,M[0],S[7],-373897302);
  a=gg(a,b,c,d,M[5],S[4],-701558691);d=gg(d,a,b,c,M[10],S[5],38016083);
  c=gg(c,d,a,b,M[15],S[6],-660478335);b=gg(b,c,d,a,M[4],S[7],-405537848);
  a=gg(a,b,c,d,M[9],S[4],568446438);d=gg(d,a,b,c,M[14],S[5],-1019803690);
  c=gg(c,d,a,b,M[3],S[6],-187363961);b=gg(b,c,d,a,M[8],S[7],1163531501);
  a=gg(a,b,c,d,M[13],S[4],-1444681467);d=gg(d,a,b,c,M[2],S[5],-51403784);
  c=gg(c,d,a,b,M[7],S[6],1735328473);b=gg(b,c,d,a,M[12],S[7],-1926607734);
  a=hh(a,b,c,d,M[5],S[8],-378558);d=hh(d,a,b,c,M[8],S[9],-2022574463);
  c=hh(c,d,a,b,M[11],S[10],1839030562);b=hh(b,c,d,a,M[14],S[11],-35309556);
  a=hh(a,b,c,d,M[1],S[8],-1530992060);d=hh(d,a,b,c,M[4],S[9],1272893353);
  c=hh(c,d,a,b,M[7],S[10],-155497632);b=hh(b,c,d,a,M[10],S[11],-1094730640);
  a=hh(a,b,c,d,M[13],S[8],681279174);d=hh(d,a,b,c,M[0],S[9],-358537222);
  c=hh(c,d,a,b,M[3],S[10],-722521979);b=hh(b,c,d,a,M[6],S[11],76029189);
  a=hh(a,b,c,d,M[9],S[8],-640364487);d=hh(d,a,b,c,M[12],S[9],-421815835);
  c=hh(c,d,a,b,M[15],S[10],530742520);b=hh(b,c,d,a,M[2],S[11],-995338651);
  a=ii(a,b,c,d,M[0],S[12],-198630844);d=ii(d,a,b,c,M[7],S[13],1126891415);
  c=ii(c,d,a,b,M[14],S[14],-1416354905);b=ii(b,c,d,a,M[5],S[15],-57434055);
  a=ii(a,b,c,d,M[12],S[12],1700485571);d=ii(d,a,b,c,M[3],S[13],-1894986606);
  c=ii(c,d,a,b,M[10],S[14],-1051523);b=ii(b,c,d,a,M[1],S[15],-2054922799);
  a=ii(a,b,c,d,M[8],S[12],1873313359);d=ii(d,a,b,c,M[15],S[13],-30611744);
  c=ii(c,d,a,b,M[6],S[14],-1560198380);b=ii(b,c,d,a,M[13],S[15],1309151649);
  a=ii(a,b,c,d,M[4],S[12],-145523070);d=ii(d,a,b,c,M[11],S[13],-1120210379);
  c=ii(c,d,a,b,M[2],S[14],718787259);b=ii(b,c,d,a,M[9],S[15],-343485551);
  a=add(a,oa);b=add(b,ob);c=add(c,oc);d=add(d,od);
 }
 var out=[];[a,b,c,d].forEach(function(x){out.push(x&0xff,(x>>>8)&0xff,(x>>>16)&0xff,(x>>>24)&0xff);});
 return out;
}
function toHex(bytes){var s='';for(var i=0;i<bytes.length;i++)s+=(bytes[i]&0xff).toString(16).padStart(2,'0');return s;}
function ror8(b,n){n&=7;return ((b>>>n)|(b<<(8-n)))&0xff;}
function asciiBytes(str){var o=[];for(var i=0;i<str.length;i++)o.push(str.charCodeAt(i)&0xff);return o;}
/* GBK 编码器：浏览器能 decode 却不能 encode gbk，故遍历所有合法 GBK 双字节
   (高 0x81-0xFE、低 0x40-0xFE 去 0x7F) 用 TextDecoder('gbk') 反解，建 char->[高,低]。
   同一字符有多个 GBK 编码时保留先出现(最小)的那个(如 U+3000→A1A1 而非 A3A0)，与原版 ANSI/
   Python cp936 逐字节一致(已对全部 21791 个 cp936 字符核对,0 差异)。ASCII 仍单字节,故所有既有
   ASCII 用例不变；任意字段(用户名/客户号/安装序号)含中文都能正确取字节。零依赖、自包含。*/
var GBK_ENC=(function(){var m=Object.create(null);if(typeof TextDecoder==='undefined')return m;
 var dec;try{dec=new TextDecoder('gbk',{fatal:false});}catch(e){return m;}var buf=new Uint8Array(2);
 for(var hi=0x81;hi<=0xFE;hi++)for(var lo=0x40;lo<=0xFE;lo++){if(lo===0x7F)continue;buf[0]=hi;buf[1]=lo;
  var ch=dec.decode(buf);if(ch.length!==1)continue;if(ch.charCodeAt(0)===0xFFFD)continue;if(m[ch]===undefined)m[ch]=(hi<<8)|lo;}
 return m;})();
function gbkBytes(str){var out=[];for(var i=0;i<str.length;i++){var cc=str.charCodeAt(i);
 if(cc<0x80){out.push(cc);continue;}var p=GBK_ENC[str.charAt(i)];
 if(p===undefined)throw new Error('字符 "'+str.charAt(i)+'" (U+'+cc.toString(16).toUpperCase()+') 无法用 GBK 编码');
 out.push((p>>8)&0xff,p&0xff);}return out;}
function encodeBytes(b){var s='';for(var i=0;i<b.length;i++)s+=ror8(b[i],i+1).toString(16).toUpperCase().padStart(2,'0');return s;}
function encodeStr(str){return encodeBytes(gbkBytes(str));}
var MODULE_LETTERS='mjpdruebwynkatqf~!@#$%^&*';
function pad2(n){var s=String(parseInt(n,10));return s.length<2?('0'+s):s;}
/* salt 源：按字段奇偶取该字段 GBK 编码的首/末【字节】(不是字符)；空字段跳过但仍占序号。
   MBCS 原版按 ANSI 字节串索引，ASCII 时字节=字符，中文客户号/安装序号须取单个 GBK 字节。*/
function pickBytes(fields){var out=[];for(var i=0;i<fields.length;i++){var f=fields[i];
 if(f===''||f===null||f===undefined)continue;var b=gbkBytes(f);out.push((i%2===0)?b[0]:b[b.length-1]);}return out;}
function cstr(c){return (typeof c==='string')?c:String(c);}
function cint(c){var n=parseInt(cstr(c),10);return isNaN(n)?0:n;}
function normModules(m){var arr=[];if(!m)return arr;
 for(var k in m)if(Object.prototype.hasOwnProperty.call(m,k))arr.push([parseInt(k,10),m[k]]);
 arr.sort(function(a,b){return a[0]-b[0];});return arr;}
/* opts.count=数字 → 产品人数授权；opts.modules={idx:人数} → 分模块；都无 → 默认 */
function generate(customer,user,install,opts){
 opts=opts||{};var flags='11';var userblock=encodeStr(user);
 var product=(opts.count!==undefined&&opts.count!==null&&opts.count!=='');
 var f1,f2,f3,i;
 var items=normModules(opts.modules);var mask=0;              /* f2 两种模式都用模块位掩码 */
 for(i=0;i<items.length;i++)mask=(mask|(1<<(31-items[i][0])))>>>0;
 f2=('0000000'+mask.toString(16)).slice(-8);
 if(product){f1=pad2(opts.count);f3=null;}                    /* 产品模式无 f3 */
 else{var total=0;
  for(i=0;i<items.length;i++)total+=cint(items[i][1]);f1=pad2(total);f3='';
  for(i=0;i<items.length;i++)f3+=MODULE_LETTERS.charAt(items[i][0])+cstr(items[i][1]);}
 var flagsfield='@@@'+flags,userfield='%%%'+userblock;
 var fields=product?[customer,f1,f2,flagsfield,userfield]:[customer,f1,f2,f3,flagsfield,userfield];
 var body=fields.join('');
 var h1=toHex(md5bytes(gbkBytes(body+encodeBytes(pickBytes(fields)))).slice(0,4));
 var inst=(install===''||install==null)?h1:install;   /* 空安装序号用 h1 顶替（原版行为） */
 var ss2=pickBytes(fields.concat([h1,inst]));
 var h2=toHex(md5bytes(gbkBytes(body+h1+inst+encodeBytes(ss2))).slice(4,8));
 return {serial:fields.concat([h1]).join('-'),pw:h2};
}
/* ================= UI ================= */
/* 25 个模块（名称, 三字母码），顺序=模块索引，与原版 listview 一致 */
var MODULES=[
 ["订单采购","DCS"],["进销存","JSK"],["应收应付","YSF"],["票据资金","PJM"],
 ["会计总账","KJS"],["报表生成","RGS"],["生产管理","SGM"],["客户关系","CRM"],
 ["工资","GZS"],["资产","ZCS"],["物料需求","SXM"],["生产成本","SCM"],
 ["工单工艺","GYS"],["决策支持","JCA"],["财务报表平台","CWB"],["销售","COP"],
 ["采购","PUR"],["存货","INV"],["物流包","WLB"],["财务包","FIB"],
 ["系统包","SYS"],["基础包","BAS"],["检验管理","QMS"],["服务管理","RMA"],["行政办公","OAS"]
];
var productMode=false;
function renderModules(){
 var h='';
 for(var i=0;i<MODULES.length;i++){
   h+='<div class="mod"><label title="'+MODULES[i][0]+'('+MODULES[i][1]+')">'+
      '<input type="checkbox" id="mchk'+i+'" autocomplete="off" onclick="onModuleToggle()">'+MODULES[i][0]+'('+MODULES[i][1]+')</label>'+
      '<input type="text" class="mcnt" id="mcnt'+i+'" value="00" maxlength="3" autocomplete="off" title="人数上限 99（整数）"></div>';
 }
 document.getElementById('modlist').innerHTML=h;
}
function collectModules(){
 var m={};
 for(var i=0;i<MODULES.length;i++){
   if(document.getElementById('mchk'+i).checked){
     m[i]=document.getElementById('mcnt'+i).value;   // 人数用单元格原始文本（默认"00"）
   }
 }
 return m;
}
function selectModuleMode(){
 productMode=false;
 document.getElementById('rbDiv').checked=true;
 var uc=document.getElementById('uc');uc.disabled=true;uc.value='';
 document.getElementById('modlist').classList.remove('dim');
 document.getElementById('warn').textContent=
   '分模块人数授权：勾选左侧模块并填“人数”，再点“生成序列号”（不勾任何模块＝默认序列号）。';
}
function enterProductMode(){
 productMode=true;
 document.getElementById('rbProd').checked=true;
 var uc=document.getElementById('uc');uc.disabled=false;uc.focus();
 document.getElementById('modlist').classList.remove('dim');   // 产品模式仍用勾选模块决定 f2 位掩码
 document.getElementById('warn').textContent='产品人数授权：填“设定用户数”；左侧勾选的模块仍决定授权范围（人数列此模式下不参与）。';
}
/* 左侧“软件模块”全选/全不选（不改变授权模式单选钮） */
function toggleAllModules(on){
 for(var i=0;i<MODULES.length;i++){document.getElementById('mchk'+i).checked=on;}
 updateChkAll();
 document.getElementById('warn').textContent=on?'已全选模块。':'已取消全选。';
}
/* 人数校验：非负整数（纯数字，允许前导零如"00"/"05"）。用于上限/整数提示，仅提示不阻断。*/
function isCountInt(s){return /^\d+$/.test(String(s).trim());}
/* 表头“人数”主输入框：改它则把下面所有模块的人数单元格同步成同一个值 */
function setAllModuleCounts(v){
 for(var i=0;i<MODULES.length;i++){
   var cn=document.getElementById('mcnt'+i);
   if(cn)cn.value=v;
 }
}
/* 勾/取消单个模块时只同步表头全选框（模式由上方单选钮决定，不在此切换） */
function onModuleToggle(){ updateChkAll(); }
function updateChkAll(){
 var all=true,none=true;
 for(var i=0;i<MODULES.length;i++){
   if(document.getElementById('mchk'+i).checked)none=false;else all=false;
 }
 var ca=document.getElementById('chkAll');
 if(ca){ca.checked=all;ca.indeterminate=(!all&&!none);}
 updateMask();
}
/* 模块列表“灰色蒙版”：未勾选任何模块时给列表盖一层灰（纯视觉，不阻断点击）。*/
function updateMask(){
 var none=true;
 for(var i=0;i<MODULES.length;i++){if(document.getElementById('mchk'+i).checked){none=false;break;}}
 var w=document.getElementById('listWrap');
 if(w)w.classList.toggle('masked',none);
}
/* 使用期限设定：仅界面开关，注册日期/授权天数不参与序列号计算 */
function togglePeriod(on){
 document.getElementById('regdate').disabled=!on;
 document.getElementById('days').disabled=!on;
 document.getElementById('warn').textContent=on
   ? '“使用期限设定”已启用（提示：注册日期/授权天数经插桩确认不影响序列号，纯展示）。'
   : '';
}
function onGenerate(){
 var user=document.getElementById('user').value;
 var customer=document.getElementById('customer').value;
 var install=document.getElementById('install').value;
 var uc=document.getElementById('uc').value;
 var warn=document.getElementById('warn');
 warn.style.color='';warn.textContent='';
 var issues=[];   /* 人数上限/整数校验——仅提示，不阻止生成 */
 var r;
 try{
   if(productMode){
     if(uc===''||isNaN(parseInt(uc,10))){
       warn.textContent='产品人数授权模式下请在“设定用户数”填一个数字（人数）。';return;
     }
     if(!isCountInt(uc)) issues.push('“设定用户数”应为整数（已按 '+parseInt(uc,10)+' 计算）');
     else if(parseInt(uc,10)>9999) issues.push('“设定用户数”超过上限 9999');
     r=generate(customer,user,install,{count:uc,modules:collectModules()});
   }else{
     var bad=[];   /* 只校验已勾选(参与序列号)的模块人数 */
     for(var i=0;i<MODULES.length;i++){
       if(document.getElementById('mchk'+i).checked){
         var v=document.getElementById('mcnt'+i).value;
         if(!isCountInt(v)) bad.push(MODULES[i][1]+'(非整数)');
         else if(parseInt(v,10)>99) bad.push(MODULES[i][1]+'(>99)');
       }
     }
     if(bad.length) issues.push('模块人数应为 0–99 的整数：'+bad.join('、'));
     r=generate(customer,user,install,{modules:collectModules()});
   }
 }catch(e){
   /* 唯一可能：某字段含 GBK 无法表示的字符（如生僻/非中日字符）。中文按 GBK 正常处理。*/
   warn.textContent=(e&&e.message)?e.message:'生成失败：输入含无法编码的字符。';
   return;
 }
 document.getElementById('serial').value=r.serial;
 document.getElementById('pw').value=r.pw;
 if(issues.length) warn.textContent='⚠ '+issues.join('；')+'（已照常生成，仅提示）';
}
function copyEl(id){
 var el=document.getElementById(id);el.select();
 try{document.execCommand('copy');}catch(e){}
 if(navigator.clipboard)navigator.clipboard.writeText(el.value).catch(function(){});
}
/* 关闭按钮：关闭当前窗口。注意浏览器安全策略——若本页不是由脚本 window.open 打开，
   window.close() 会被拒绝（控制台提示 "Scripts may close only the windows that were
   opened by them."）。此时给出提示请手动关闭；Electron/HTA/脚本打开的窗口可正常关闭。*/
/* 最大化/还原：把窗口铺满视口（本地网页无法真的最大化 OS 窗口，用页内铺满作等价反馈）；
   再点还原。图标在 □(最大化) 与 ❐(还原) 间切换。*/
/* 最大化/还原（按钮点击与拖拽贴靠都调它）。keepPos=true：还原后不回旧位（拖拽还原时
   由调用方按光标重新定位）。铺满前记住当前位置，还原时取回。*/
function setMaximized(on,keepPos){
 var win=document.querySelector('.win'),btn=document.querySelector('.capbtn.max');
 if(on){
   if(document.body.classList.contains('maxed'))return;
   win._sPos=win.style.position;win._sL=win.style.left;win._sT=win.style.top;win._sM=win.style.margin;
   document.body.classList.add('maxed');
   win.style.position='fixed';win.style.left='0';win.style.top='0';win.style.margin='0';
   if(btn){btn.innerHTML='❐';btn.title='向下还原';}
 }else{
   if(!document.body.classList.contains('maxed'))return;
   document.body.classList.remove('maxed');
   if(!keepPos){win.style.position=win._sPos||'';win.style.left=win._sL||'';win.style.top=win._sT||'';win.style.margin=win._sM||'';}
   if(btn){btn.innerHTML='□';btn.title='最大化';}
 }
}
function toggleMaximize(){ setMaximized(!document.body.classList.contains('maxed')); }
/* 拖动标题栏移动窗口 + Windows 式贴靠：
   · 拖动时把鼠标顶到浏览器视口顶部边缘 → 显示铺满预览，松手即最大化；
   · 最大化状态下按住标题栏往下拖 → 还原为原尺寸并跟随光标（光标横向比例保持不变）。
   pointer 事件（鼠标/触摸通用）+ setPointerCapture；点标题栏三个按钮不触发拖动。*/
(function(){
 var win=document.querySelector('.win'),bar=document.querySelector('.titlebar');
 if(!win||!bar)return;
 var dragging=false,fromMax=false,offX=0,offY=0,grabX=0,grabY=0,maxedW=0,willMax=false;
 var SNAP=6,hint=null;
 function showHint(on){
   if(on){if(!hint){hint=document.createElement('div');hint.className='snaphint';document.body.appendChild(hint);}hint.style.display='block';}
   else if(hint){hint.style.display='none';}
 }
 function isMobile(){return window.matchMedia&&window.matchMedia('(max-width:700px)').matches;}
 bar.addEventListener('pointerdown',function(e){
   if(e.button!==0&&e.pointerType==='mouse')return;      /* 仅主键 */
   if(e.target.closest('.btns'))return;                  /* 标题栏按钮不拖动 */
   if(isMobile())return;                                 /* 移动端窗口铺满，不拖动/贴靠 */
   grabX=e.clientX;grabY=e.clientY;willMax=false;
   dragging=true;document.body.classList.add('dragging');
   try{bar.setPointerCapture(e.pointerId);}catch(_){}
   if(document.body.classList.contains('maxed')){
     fromMax=true;maxedW=win.offsetWidth;                /* 先不还原，真正拖动后再还原到光标下 */
   }else{
     fromMax=false;
     var r=win.getBoundingClientRect();
     win.style.position='fixed';win.style.margin='0';
     win.style.left=r.left+'px';win.style.top=r.top+'px';
     offX=e.clientX-r.left;offY=e.clientY-r.top;
   }
   e.preventDefault();
 });
 bar.addEventListener('pointermove',function(e){
   if(!dragging)return;
   if(fromMax){                                          /* 最大化状态下拖动 → 还原并跟随光标 */
     if(Math.abs(e.clientX-grabX)+Math.abs(e.clientY-grabY)<6)return;  /* 移动一点点才还原 */
     setMaximized(false,true);                           /* 还原尺寸但不回旧位，下面按光标定位 */
     var W=win.offsetWidth,fx=maxedW?(grabX/maxedW):0.5;
     offX=fx*W;offY=Math.min(grabY,30);                  /* 光标横向比例不变、贴近标题栏 */
     win.style.position='fixed';win.style.margin='0';
     fromMax=false;
   }
   var w=win.offsetWidth,x=e.clientX-offX,y=e.clientY-offY;
   willMax=(e.clientY<=SNAP);                            /* 鼠标顶到视口顶部 → 预览最大化 */
   showHint(willMax);
   var minL=-(w-120),maxL=window.innerWidth-120;         /* 左右各留 120px 可见 */
   x=Math.max(minL,Math.min(maxL,x));
   y=Math.min(y,Math.max(0,window.innerHeight-32));      /* 拖动中允许上越顶，好让光标能碰顶 */
   win.style.left=x+'px';win.style.top=y+'px';
 });
 function end(e){
   if(!dragging)return;
   dragging=false;document.body.classList.remove('dragging');showHint(false);
   try{bar.releasePointerCapture(e.pointerId);}catch(_){}
   if(willMax){                                          /* 顶到顶部松手 → 最大化 */
     willMax=false;
     if((parseFloat(win.style.top)||0)<0)win.style.top='0px';  /* 记住的还原位保持可见 */
     setMaximized(true);return;
   }
   if((parseFloat(win.style.top)||0)<0)win.style.top='0px';    /* 收尾：标题栏拉回可见区 */
 }
 bar.addEventListener('pointerup',end);
 bar.addEventListener('pointercancel',end);
})();
function closeWindow(){
 window.close();
 setTimeout(function(){
  if(!window.closed){
   document.body.innerHTML='<div style="padding:24px;font:13px/1.7 \'Microsoft YaHei\',sans-serif;color:#555">'
     +'已点击“关闭”。浏览器安全策略可能不允许脚本关闭手动打开的标签页；如未自动关闭，请手动关闭本页。</div>';
  }
 },120);
}
/* ================= 反推验证（从 安装序号+产品序号+验证口令 校验并回填）=================
   原理：序列号自带全部可逆信息——客户号是明文首段；%%%后的 userblock 是 encode(gbk(用户名))，
   ROR 可逆 + 浏览器原生 TextDecoder('gbk') 解码即得用户名；f2 是模块位掩码、f3 是“字母+人数”对。
   合法性 = 用序列号自身字段重算 h1（须等于末段哈希）+ 用 body+h1+安装序号+salt2 重算 h2（须等于验证口令）。
   h1 与安装序号无关、h2 依赖安装序号——正是本按钮需要安装序号的原因。重算比对：解析错只会“判不合法”，
   绝不会误判合法。GBK 解码走浏览器原生，无需第三方库。*/
function rol8(b,n){n&=7;return ((b<<n)|(b>>>(8-n)))&0xff;}   /* ror8 的逆 */
function decodeUserblock(hex){
 if(typeof hex!=='string'||hex.length%2!==0||!/^[0-9a-fA-F]*$/.test(hex))return null;
 var bytes=[];for(var i=0,k=0;i<hex.length;i+=2,k++)bytes.push(rol8(parseInt(hex.substr(i,2),16),k+1));
 try{return new TextDecoder('gbk',{fatal:false}).decode(new Uint8Array(bytes));}catch(e){return null;}
}
function parseF3(f3){   /* "m3j5" -> [{idx,cnt}]；字母来自 MODULE_LETTERS，人数为其后数字 */
 var out=[],cur=null;
 for(var i=0;i<f3.length;i++){var ch=f3.charAt(i),li=MODULE_LETTERS.indexOf(ch);
  if(li>=0){if(cur)out.push(cur);cur={idx:li,cnt:''};}else if(cur){cur.cnt+=ch;}}
 if(cur)out.push(cur);return out;
}
/* 把 客户号-f1-f2[-f3]-@@@11-%%%userblock-h1 拆开；靠固定标记 "-@@@11-%%%" 锚定，稳。*/
function parseSerial(serial){
 var anchor='-@@@11-%%%',pos=serial.lastIndexOf(anchor);
 if(pos<0)return null;
 var head=serial.slice(0,pos),rest=serial.slice(pos+anchor.length);
 var d=rest.lastIndexOf('-');if(d<0)return null;
 var userblock=rest.slice(0,d),h1=rest.slice(d+1);
 if(!/^[0-9a-fA-F]{8}$/.test(h1))return null;
 var segs=head.split('-');if(segs.length<3)return null;
 var last=segs[segs.length-1],product,customer,f1,f2,f3;
 if(/^[0-9a-f]{8}$/i.test(last)){        /* 末段是 8 位十六进制 → 产品模式(末段=f2，无 f3) */
   product=true;f2=last;f1=segs[segs.length-2];customer=segs.slice(0,segs.length-2).join('-');f3=null;
 }else{                                   /* 否则 → 分模块/默认模式(末段=f3，可能为空串) */
   product=false;f3=last;f2=segs[segs.length-2];f1=segs[segs.length-3];
   customer=segs.slice(0,segs.length-3).join('-');
 }
 if(typeof f2!=='string'||!/^[0-9a-f]{8}$/i.test(f2)||typeof f1!=='string')return null;
 return {customer:customer,f1:f1,f2:f2,f3:f3,userblock:userblock,h1:h1.toLowerCase(),product:product};
}
function onReverse(){
 var warn=document.getElementById('warn');warn.style.color='';
 var serial=document.getElementById('serial').value.trim();
 var pw=document.getElementById('pw').value.trim().toLowerCase();
 var install=document.getElementById('install').value;
 if(!serial){warn.textContent='请先在“产品序号”粘贴要验证的序列号。';return;}
 var P=parseSerial(serial);
 if(!P){warn.textContent='❌ 无法解析产品序号（应形如 客户号-…-@@@11-%%%…-8位哈希）。';return;}
 var flagsfield='@@@11',userfield='%%%'+P.userblock;
 var fields=P.product?[P.customer,P.f1,P.f2,flagsfield,userfield]
                     :[P.customer,P.f1,P.f2,P.f3,flagsfield,userfield];
 var body=fields.join(''),h1c,h2c;
 try{
   h1c=toHex(md5bytes(gbkBytes(body+encodeBytes(pickBytes(fields)))).slice(0,4));
   var inst=(install===''||install==null)?h1c:install;     /* 空安装序号用 h1 顶替（同 generate）*/
   var ss2=pickBytes(fields.concat([h1c,inst]));
   h2c=toHex(md5bytes(gbkBytes(body+h1c+inst+encodeBytes(ss2))).slice(4,8));
 }catch(e){warn.textContent='❌ 序列号含无法用 GBK 编码的字符，无法验证。';return;}
 if(h1c!==P.h1){warn.textContent='❌ 不合法：产品序号自身校验失败（哈希不符，可能被改动或抄错）。';return;}
 if(!pw){warn.textContent='⚠ 产品序号自身校验通过，但未填“验证口令”，无法确认是否与该安装序号匹配。';return;}
 if(h2c!==pw){warn.textContent='❌ 验证口令与「安装序号＋产品序号」不匹配（序列号自洽，但口令/安装序号对不上）。';return;}
 /* 合法 → 回填 */
 var user=decodeUserblock(P.userblock);
 document.getElementById('customer').value=P.customer;
 if(user!=null)document.getElementById('user').value=user;
 for(var i=0;i<MODULES.length;i++){document.getElementById('mchk'+i).checked=false;document.getElementById('mcnt'+i).value='00';}
 document.getElementById('mcntAll').value='00';
 var mask=parseInt(P.f2,16)>>>0;
 for(i=0;i<MODULES.length;i++){if(mask&(1<<(31-i)))document.getElementById('mchk'+i).checked=true;}
 if(P.product){enterProductMode();document.getElementById('uc').value=String(parseInt(P.f1,10));}
 else{selectModuleMode();var pr=parseF3(P.f3||'');
  for(i=0;i<pr.length;i++){var c=document.getElementById('mcnt'+pr[i].idx);if(c)c.value=pr[i].cnt;}}
 updateChkAll();                                           /* 同步表头全选框 + 灰色蒙版 */
 warn.style.color='#0a7a0a';
 warn.textContent='✅ 合法！已回填 授权用户 / 客户号 / 授权模式 / 模块配置'
   +(user==null?'（用户名解码失败，其余已回填）':'（用户名：'+user+'）')+'。';
}
/* 把界面强制复位到“默认模式、无模块勾选”，避免浏览器把上次会话的勾选/人数还原进来
   导致与 exe 默认输出不一致 */
function resetState(){
 productMode=false;
 var rd0=document.getElementById('rbDiv'); if(rd0)rd0.checked=true;
 var rp0=document.getElementById('rbProd'); if(rp0)rp0.checked=false;
 var ca=document.getElementById('chkAll'); if(ca){ca.checked=false;ca.indeterminate=false;}
 var ma=document.getElementById('mcntAll'); if(ma)ma.value='00';
 for(var i=0;i<MODULES.length;i++){
   var ck=document.getElementById('mchk'+i); if(ck)ck.checked=false;
   var cn=document.getElementById('mcnt'+i); if(cn)cn.value='00';
 }
 updateMask();                                          /* 复位后无勾选 → 列表上灰色蒙版 */
 var uc=document.getElementById('uc'); if(uc){uc.value='';uc.disabled=true;}
 document.getElementById('modlist').classList.remove('dim');
 var cp=document.getElementById('chkPeriod'); if(cp)cp.checked=false;
 var rgd=document.getElementById('regdate'); if(rgd)rgd.disabled=true;
 var dys=document.getElementById('days'); if(dys){dys.value='';dys.disabled=true;}
 document.getElementById('serial').value='';
 document.getElementById('pw').value='';
 var wn=document.getElementById('warn');wn.style.color='';wn.textContent='当前：默认模式（未勾模块、未启用人数）。';
}
/* 初始化：注册日期默认今天（date 输入，禁用；不参与计算） */
(function(){
 renderModules();
 var d=new Date();
 document.getElementById('regdate').value=d.getFullYear()+'-'+
   String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
 resetState();
 document.getElementById('user').focus();
 document.addEventListener('keydown',function(e){if(e.key==='Enter')onGenerate();});
})();
/* 浏览器前进/后退 bfcache 恢复时也复位 */
window.addEventListener('pageshow',function(){renderModules();resetState();});
