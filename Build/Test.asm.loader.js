function createUnityInstance(e,t,r){function n(e,r){if(!n.aborted&&t.showBanner)return"error"==r&&(n.aborted=!0),t.showBanner(e,r);switch(r){case"error":console.error(e);break;case"warning":console.warn(e);break;default:console.log(e)}}function i(e){var t=e.reason||e.error,r=t?t.toString():e.message||e.reason||"",n=t&&t.stack?t.stack.toString():"";if(n.startsWith(r)&&(n=n.substring(r.length)),r+="\n"+n.trim(),r&&h.stackTraceRegExp&&h.stackTraceRegExp.test(r)){var i=e.filename||t&&(t.fileName||t.sourceURL)||"",o=e.lineno||t&&(t.lineNumber||t.line)||0;a(r,i,o)}}function o(e){e.preventDefault()}function a(e,t,r){if(h.startupErrorHandler)return void h.startupErrorHandler(e,t,r);if(!(h.errorHandler&&h.errorHandler(e,t,r)||(console.log("Invoking error handler due to\n"+e),"function"==typeof dump&&dump("Invoking error handler due to\n"+e),e.indexOf("UnknownError")!=-1||e.indexOf("Program terminated with exit(0)")!=-1||a.didShowErrorMessage))){var e="An error occurred running the Unity content on this page. See your browser JavaScript console for more info. The error was:\n"+e;e.indexOf("DISABLE_EXCEPTION_CATCHING")!=-1?e="An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project WebGL player settings to be able to catch the exception or see the stack trace.":e.indexOf("Cannot enlarge memory arrays")!=-1?e="Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings.":e.indexOf("Invalid array buffer length")==-1&&e.indexOf("Invalid typed array length")==-1&&e.indexOf("out of memory")==-1&&e.indexOf("could not allocate memory")==-1||(e="The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."),alert(e),a.didShowErrorMessage=!0}}function s(e,t){if("symbolsUrl"!=e){var n=h.downloadProgress[e];n||(n=h.downloadProgress[e]={started:!1,finished:!1,lengthComputable:!1,total:0,loaded:0}),"object"!=typeof t||"progress"!=t.type&&"load"!=t.type||(n.started||(n.started=!0,n.lengthComputable=t.lengthComputable,n.total=t.total),n.loaded=t.loaded,"load"==t.type&&(n.finished=!0));var i=0,o=0,a=0,s=0,l=0;for(var e in h.downloadProgress){var n=h.downloadProgress[e];if(!n.started)return 0;a++,n.lengthComputable?(i+=n.loaded,o+=n.total,s++):n.finished||l++}var d=a?(a-l-(o?s*(o-i)/o:0))/a:0;r(.9*d)}}function l(e,t,r){for(var n in v)if(v[n].hasUnityMarker(e)){t&&console.log('You can reduce startup time if you configure your web server to add "Content-Encoding: '+n+'" response header when serving "'+t+'" file.');var i=v[n];if(!i.worker){var o=URL.createObjectURL(new Blob(["this.require = ",i.require.toString(),"; this.decompress = ",i.decompress.toString(),"; this.onmessage = ",function(e){var t={id:e.data.id,decompressed:this.decompress(e.data.compressed)};postMessage(t,t.decompressed?[t.decompressed.buffer]:[])}.toString(),"; postMessage({ ready: true });"],{type:"application/javascript"}));i.worker=new Worker(o),i.worker.onmessage=function(e){return e.data.ready?void URL.revokeObjectURL(o):(this.callbacks[e.data.id](e.data.decompressed),void delete this.callbacks[e.data.id])},i.worker.callbacks={},i.worker.nextCallbackId=0}var a=i.worker.nextCallbackId++;return i.worker.callbacks[a]=r,void i.worker.postMessage({id:a,compressed:e},[e.buffer])}r(e)}function d(e){return new Promise(function(t,r){s(e);var i=new XMLHttpRequest;i.open("GET",h[e]),i.responseType="arraybuffer",i.addEventListener("progress",function(t){s(e,t)}),i.addEventListener("load",function(r){s(e,r),l(new Uint8Array(i.response),h[e],t)}),i.addEventListener("error",function(t){var r="Failed to download file "+h[e];"file:"==location.protocol?n(r+". Loading web pages via a file:// URL without a web server is not supported by this browser. Please use a local development web server to host Unity content, or use the Unity Build and Run option.","error"):console.error(r)}),i.send()})}function f(){return d("frameworkUrl").then(function(e){var t=URL.createObjectURL(new Blob([e],{type:"application/javascript"}));return new Promise(function(e,r){var i=document.createElement("script");i.src=t,i.onload=function(){if("undefined"==typeof unityFramework||!unityFramework){var r=[["br","br"],["gz","gzip"]];for(var o in r){var a=r[o];if(h.frameworkUrl.endsWith("."+a[0])){var s="Unable to parse "+h.frameworkUrl+"!";if("file:"==location.protocol)return void n(s+" Loading pre-compressed (brotli or gzip) content via a file:// URL without a web server is not supported by this browser. Please use a local development web server to host compressed Unity content, or use the Unity Build and Run option.","error");if(s+=' This can happen if build compression was enabled but web server hosting the content was misconfigured to not serve the file with HTTP Response Header "Content-Encoding: '+a[1]+'" present. Check browser Console and Devtools Network tab to debug.',"br"==a[0]&&"http:"==location.protocol){var l=["localhost","127.0.0.1"].indexOf(location.hostname)!=-1?"":"Migrate your server to use HTTPS.";s=/Firefox/.test(navigator.userAgent)?"Unable to parse "+h.frameworkUrl+'!<br>If using custom web server, verify that web server is sending .br files with HTTP Response Header "Content-Encoding: br". Brotli compression may not be supported in Firefox over HTTP connections. '+l+' See <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1670675">https://bugzilla.mozilla.org/show_bug.cgi?id=1670675</a> for more information.':"Unable to parse "+h.frameworkUrl+'!<br>If using custom web server, verify that web server is sending .br files with HTTP Response Header "Content-Encoding: br". Brotli compression may not be supported over HTTP connections. Migrate your server to use HTTPS.'}return void n(s,"error")}}n("Unable to parse "+h.frameworkUrl+"! The file is corrupt, or compression was misconfigured? (check Content-Encoding HTTP Response Header on web server)","error")}var d=unityFramework;unityFramework=null,i.onload=null,URL.revokeObjectURL(t),e(d)},i.onerror=function(e){n("Unable to load file "+h.frameworkUrl+"! Check that the file exists on the remote server. (also check browser Console and Devtools Network tab to debug)","error")},document.body.appendChild(i),h.deinitializers.push(function(){document.body.removeChild(i)})})})}function u(){return d("codeUrl").then(function(e){var t=URL.createObjectURL(new Blob([e],{type:"application/javascript"}));return new Promise(function(e,r){var n=document.createElement("script");n.src=t,n.onload=function(){delete n.onload,URL.revokeObjectURL(t),e()},document.body.appendChild(n),h.deinitializers.push(function(){document.body.removeChild(n)})})})}function c(){Promise.all([f(),u()]).then(function(e){e[0](h)}),h.memoryInitializerRequest={addEventListener:function(e,t){"load"==e&&(h.memoryInitializerRequest.useRequest=t)}},d("memoryUrl").then(function(e){h.memoryInitializerRequest.status=200,h.memoryInitializerRequest.response=e,h.memoryInitializerRequest.useRequest&&h.memoryInitializerRequest.useRequest()});var e=d("dataUrl");h.preRun.push(function(){h.addRunDependency("dataUrl"),e.then(function(e){var t=new DataView(e.buffer,e.byteOffset,e.byteLength),r=0,n="UnityWebData1.0\0";if(!String.fromCharCode.apply(null,e.subarray(r,r+n.length))==n)throw"unknown data format";r+=n.length;var i=t.getUint32(r,!0);for(r+=4;r<i;){var o=t.getUint32(r,!0);r+=4;var a=t.getUint32(r,!0);r+=4;var s=t.getUint32(r,!0);r+=4;var l=String.fromCharCode.apply(null,e.subarray(r,r+s));r+=s;for(var d=0,f=l.indexOf("/",d)+1;f>0;d=f,f=l.indexOf("/",d)+1)h.FS_createPath(l.substring(0,d),l.substring(d,f-1),!0,!0);h.FS_createDataFile(l,null,e.subarray(o,o+a),!0,!0,!0)}h.removeRunDependency("dataUrl")})})}r=r||function(){};var h={canvas:e,webglContextAttributes:{preserveDrawingBuffer:!1},TOTAL_MEMORY:268435456,streamingAssetsUrl:"StreamingAssets",downloadProgress:{},deinitializers:[],intervals:{},setInterval:function(e,t){var r=window.setInterval(e,t);return this.intervals[r]=!0,r},clearInterval:function(e){delete this.intervals[e],window.clearInterval(e)},preRun:[],postRun:[],print:function(e){console.log(e)},printErr:function(e){console.error(e),"string"==typeof e&&e.indexOf("wasm streaming compile failed")!=-1&&(e.toLowerCase().indexOf("mime")!=-1?n('HTTP Response Header "Content-Type" configured incorrectly on the server for file '+h.codeUrl+' , should be "application/wasm". Startup time performance will suffer.',"warning"):n('WebAssembly streaming compilation failed! This can happen for example if "Content-Encoding" HTTP header is incorrectly enabled on the server for file '+h.codeUrl+", but the file is not pre-compressed on disk (or vice versa). Check the Network tab in browser Devtools to debug server header configuration.","warning"))},locateFile:function(e){return e},disabledCanvasEvents:["contextmenu","dragstart"]};for(var b in t)h[b]=t[b];h.streamingAssetsUrl=new URL(h.streamingAssetsUrl,document.URL).href;var m=h.disabledCanvasEvents.slice();m.forEach(function(t){e.addEventListener(t,o)}),window.addEventListener("error",i),window.addEventListener("unhandledrejection",i);var g="",w="";document.addEventListener("webkitfullscreenchange",function(t){var r=document.webkitCurrentFullScreenElement;r===e?e.style.width&&(g=e.style.width,w=e.style.height,e.style.width="100%",e.style.height="100%"):g&&(e.style.width=g,e.style.height=w,g="",w="")});var p={Module:h,SetFullscreen:function(){return h.SetFullscreen?h.SetFullscreen.apply(h,arguments):void h.print("Failed to set Fullscreen mode: Player not loaded yet.")},SendMessage:function(){return h.SendMessage?h.SendMessage.apply(h,arguments):void h.print("Failed to execute SendMessage: Player not loaded yet.")},Quit:function(){return new Promise(function(t,r){h.shouldQuit=!0,h.onQuit=t,m.forEach(function(t){e.removeEventListener(t,o)}),window.removeEventListener("error",i),window.removeEventListener("unhandledrejection",i)})}};h.SystemInfo=function(){function e(e,t,r){return e=RegExp(e,"i").exec(t),e&&e[r]}for(var t,r,n,i,o,a,s=navigator.userAgent+" ",l=[["Firefox","Firefox"],["OPR","Opera"],["Edg","Edge"],["SamsungBrowser","Samsung Browser"],["Trident","Internet Explorer"],["MSIE","Internet Explorer"],["Chrome","Chrome"],["CriOS","Chrome on iOS Safari"],["FxiOS","Firefox on iOS Safari"],["Safari","Safari"]],d=0;d<l.length;++d)if(r=e(l[d][0]+"[/ ](.*?)[ \\)]",s,1)){t=l[d][1];break}"Safari"==t&&(r=e("Version/(.*?) ",s,1)),"Internet Explorer"==t&&(r=e("rv:(.*?)\\)? ",s,1)||r);for(var f=[["Windows (.*?)[;)]","Windows"],["Android ([0-9_.]+)","Android"],["iPhone OS ([0-9_.]+)","iPhoneOS"],["iPad.*? OS ([0-9_.]+)","iPadOS"],["FreeBSD( )","FreeBSD"],["OpenBSD( )","OpenBSD"],["Linux|X11()","Linux"],["Mac OS X ([0-9_.]+)","macOS"],["bot|google|baidu|bing|msn|teoma|slurp|yandex","Search Bot"]],u=0;u<f.length;++u)if(i=e(f[u][0],s,1)){n=f[u][1],i=i.replace(/_/g,".");break}var c={"NT 5.0":"2000","NT 5.1":"XP","NT 5.2":"Server 2003","NT 6.0":"Vista","NT 6.1":"7","NT 6.2":"8","NT 6.3":"8.1","NT 10.0":"10"};i=c[i]||i,o=document.createElement("canvas"),o&&(gl=o.getContext("webgl2"),glVersion=gl?2:0,gl||(gl=o&&o.getContext("webgl"))&&(glVersion=1),gl&&(a=gl.getExtension("WEBGL_debug_renderer_info")&&gl.getParameter(37446)||gl.getParameter(7937)));var h="undefined"!=typeof SharedArrayBuffer,b="object"==typeof WebAssembly&&"function"==typeof WebAssembly.compile;return{width:screen.width,height:screen.height,userAgent:s.trim(),browser:t||"Unknown browser",browserVersion:r||"Unknown version",mobile:/Mobile|Android|iP(ad|hone)/.test(navigator.appVersion),os:n||"Unknown OS",osVersion:i||"Unknown OS Version",gpu:a||"Unknown GPU",language:navigator.userLanguage||navigator.language,hasWebGL:glVersion,hasCursorLock:!!document.body.requestPointerLock,hasFullscreen:!!document.body.requestFullscreen||!!document.body.webkitRequestFullscreen,hasThreads:h,hasWasm:b,hasWasmThreads:!1}}(),h.abortHandler=function(e){return a(e,"",0),!0},Error.stackTraceLimit=Math.max(Error.stackTraceLimit||0,50);var v={gzip:{require:function(e){var t={"inflate.js":function(e,t,r){"use strict";function n(e){if(!(this instanceof n))return new n(e);this.options=s.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&t.windowBits>=0&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(t.windowBits>=0&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),t.windowBits>15&&t.windowBits<48&&0===(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new u,this.strm.avail_out=0;var r=a.inflateInit2(this.strm,t.windowBits);if(r!==d.Z_OK)throw new Error(f[r]);this.header=new c,a.inflateGetHeader(this.strm,this.header)}function i(e,t){var r=new n(t);if(r.push(e,!0),r.err)throw r.msg||f[r.err];return r.result}function o(e,t){return t=t||{},t.raw=!0,i(e,t)}var a=e("./zlib/inflate"),s=e("./utils/common"),l=e("./utils/strings"),d=e("./zlib/constants"),f=e("./zlib/messages"),u=e("./zlib/zstream"),c=e("./zlib/gzheader"),h=Object.prototype.toString;n.prototype.push=function(e,t){var r,n,i,o,f,u,c=this.strm,b=this.options.chunkSize,m=this.options.dictionary,g=!1;if(this.ended)return!1;n=t===~~t?t:t===!0?d.Z_FINISH:d.Z_NO_FLUSH,"string"==typeof e?c.input=l.binstring2buf(e):"[object ArrayBuffer]"===h.call(e)?c.input=new Uint8Array(e):c.input=e,c.next_in=0,c.avail_in=c.input.length;do{if(0===c.avail_out&&(c.output=new s.Buf8(b),c.next_out=0,c.avail_out=b),r=a.inflate(c,d.Z_NO_FLUSH),r===d.Z_NEED_DICT&&m&&(u="string"==typeof m?l.string2buf(m):"[object ArrayBuffer]"===h.call(m)?new Uint8Array(m):m,r=a.inflateSetDictionary(this.strm,u)),r===d.Z_BUF_ERROR&&g===!0&&(r=d.Z_OK,g=!1),r!==d.Z_STREAM_END&&r!==d.Z_OK)return this.onEnd(r),this.ended=!0,!1;c.next_out&&(0!==c.avail_out&&r!==d.Z_STREAM_END&&(0!==c.avail_in||n!==d.Z_FINISH&&n!==d.Z_SYNC_FLUSH)||("string"===this.options.to?(i=l.utf8border(c.output,c.next_out),o=c.next_out-i,f=l.buf2string(c.output,i),c.next_out=o,c.avail_out=b-o,o&&s.arraySet(c.output,c.output,i,o,0),this.onData(f)):this.onData(s.shrinkBuf(c.output,c.next_out)))),0===c.avail_in&&0===c.avail_out&&(g=!0)}while((c.avail_in>0||0===c.avail_out)&&r!==d.Z_STREAM_END);return r===d.Z_STREAM_END&&(n=d.Z_FINISH),n===d.Z_FINISH?(r=a.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===d.Z_OK):n!==d.Z_SYNC_FLUSH||(this.onEnd(d.Z_OK),c.avail_out=0,!0)},n.prototype.onData=function(e){this.chunks.push(e)},n.prototype.onEnd=function(e){e===d.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=s.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Inflate=n,r.inflate=i,r.inflateRaw=o,r.ungzip=i},"utils/common.js":function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)return void e.set(t.subarray(r,r+n),i);for(var o=0;o<n;o++)e[i+o]=t[r+o]},flattenChunks:function(e){var t,r,n,i,o,a;for(n=0,t=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),i=0,t=0,r=e.length;t<r;t++)o=e[t],a.set(o,i),i+=o.length;return a}},o={arraySet:function(e,t,r,n,i){for(var o=0;o<n;o++)e[i+o]=t[r+o]},flattenChunks:function(e){return[].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,o))},r.setTyped(n)},"utils/strings.js":function(e,t,r){"use strict";function n(e,t){if(t<65537&&(e.subarray&&a||!e.subarray&&o))return String.fromCharCode.apply(null,i.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}var i=e("./common"),o=!0,a=!0;try{String.fromCharCode.apply(null,[0])}catch(e){o=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){a=!1}for(var s=new i.Buf8(256),l=0;l<256;l++)s[l]=l>=252?6:l>=248?5:l>=240?4:l>=224?3:l>=192?2:1;s[254]=s[254]=1,r.string2buf=function(e){var t,r,n,o,a,s=e.length,l=0;for(o=0;o<s;o++)r=e.charCodeAt(o),55296===(64512&r)&&o+1<s&&(n=e.charCodeAt(o+1),56320===(64512&n)&&(r=65536+(r-55296<<10)+(n-56320),o++)),l+=r<128?1:r<2048?2:r<65536?3:4;for(t=new i.Buf8(l),a=0,o=0;a<l;o++)r=e.charCodeAt(o),55296===(64512&r)&&o+1<s&&(n=e.charCodeAt(o+1),56320===(64512&n)&&(r=65536+(r-55296<<10)+(n-56320),o++)),r<128?t[a++]=r:r<2048?(t[a++]=192|r>>>6,t[a++]=128|63&r):r<65536?(t[a++]=224|r>>>12,t[a++]=128|r>>>6&63,t[a++]=128|63&r):(t[a++]=240|r>>>18,t[a++]=128|r>>>12&63,t[a++]=128|r>>>6&63,t[a++]=128|63&r);return t},r.buf2binstring=function(e){return n(e,e.length)},r.binstring2buf=function(e){for(var t=new i.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,i,o,a,l=t||e.length,d=new Array(2*l);for(i=0,r=0;r<l;)if(o=e[r++],o<128)d[i++]=o;else if(a=s[o],a>4)d[i++]=65533,r+=a-1;else{for(o&=2===a?31:3===a?15:7;a>1&&r<l;)o=o<<6|63&e[r++],a--;a>1?d[i++]=65533:o<65536?d[i++]=o:(o-=65536,d[i++]=55296|o>>10&1023,d[i++]=56320|1023&o)}return n(d,i)},r.utf8border=function(e,t){var r;for(t=t||e.length,t>e.length&&(t=e.length),r=t-1;r>=0&&128===(192&e[r]);)r--;return r<0?t:0===r?t:r+s[e[r]]>t?r:t}},"zlib/inflate.js":function(e,t,r){"use strict";function n(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function i(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new p.Buf16(320),this.work=new p.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function o(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=Z,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new p.Buf32(me),t.distcode=t.distdyn=new p.Buf32(ge),t.sane=1,t.back=-1,L):B}function a(e){var t;return e&&e.state?(t=e.state,t.wsize=0,t.whave=0,t.wnext=0,o(e)):B}function s(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=(t>>4)+1,t<48&&(t&=15)),t&&(t<8||t>15)?B:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,a(e))):B}function l(e,t){var r,n;return e?(n=new i,e.state=n,n.window=null,r=s(e,t),r!==L&&(e.state=null),r):B}function d(e){return l(e,pe)}function f(e){if(ve){var t;for(g=new p.Buf32(512),w=new p.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(_(S,e.lens,0,288,g,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;_(E,e.lens,0,32,w,0,e.work,{bits:5}),ve=!1}e.lencode=g,e.lenbits=9,e.distcode=w,e.distbits=5}function u(e,t,r,n){var i,o=e.state;return null===o.window&&(o.wsize=1<<o.wbits,o.wnext=0,o.whave=0,o.window=new p.Buf8(o.wsize)),n>=o.wsize?(p.arraySet(o.window,t,r-o.wsize,o.wsize,0),o.wnext=0,o.whave=o.wsize):(i=o.wsize-o.wnext,i>n&&(i=n),p.arraySet(o.window,t,r-n,i,o.wnext),n-=i,n?(p.arraySet(o.window,t,r-n,n,0),o.wnext=n,o.whave=o.wsize):(o.wnext+=i,o.wnext===o.wsize&&(o.wnext=0),o.whave<o.wsize&&(o.whave+=i))),0}function c(e,t){var r,i,o,a,s,l,d,c,h,b,m,g,w,me,ge,we,pe,ve,ke,ye,_e,xe,Se,Ee,Ue=0,Re=new p.Buf8(4),Ce=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return B;r=e.state,r.mode===V&&(r.mode=Y),s=e.next_out,o=e.output,d=e.avail_out,a=e.next_in,i=e.input,l=e.avail_in,c=r.hold,h=r.bits,b=l,m=d,xe=L;e:for(;;)switch(r.mode){case Z:if(0===r.wrap){r.mode=Y;break}for(;h<16;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}if(2&r.wrap&&35615===c){r.check=0,Re[0]=255&c,Re[1]=c>>>8&255,r.check=k(r.check,Re,2,0),c=0,h=0,r.mode=P;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&c)<<8)+(c>>8))%31){e.msg="incorrect header check",r.mode=ce;break}if((15&c)!==F){e.msg="unknown compression method",r.mode=ce;break}if(c>>>=4,h-=4,_e=(15&c)+8,0===r.wbits)r.wbits=_e;else if(_e>r.wbits){e.msg="invalid window size",r.mode=ce;break}r.dmax=1<<_e,e.adler=r.check=1,r.mode=512&c?q:V,c=0,h=0;break;case P:for(;h<16;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}if(r.flags=c,(255&r.flags)!==F){e.msg="unknown compression method",r.mode=ce;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=ce;break}r.head&&(r.head.text=c>>8&1),512&r.flags&&(Re[0]=255&c,Re[1]=c>>>8&255,r.check=k(r.check,Re,2,0)),c=0,h=0,r.mode=N;case N:for(;h<32;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}r.head&&(r.head.time=c),512&r.flags&&(Re[0]=255&c,Re[1]=c>>>8&255,Re[2]=c>>>16&255,Re[3]=c>>>24&255,r.check=k(r.check,Re,4,0)),c=0,h=0,r.mode=H;case H:for(;h<16;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}r.head&&(r.head.xflags=255&c,r.head.os=c>>8),512&r.flags&&(Re[0]=255&c,Re[1]=c>>>8&255,r.check=k(r.check,Re,2,0)),c=0,h=0,r.mode=j;case j:if(1024&r.flags){for(;h<16;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}r.length=c,r.head&&(r.head.extra_len=c),512&r.flags&&(Re[0]=255&c,Re[1]=c>>>8&255,r.check=k(r.check,Re,2,0)),c=0,h=0}else r.head&&(r.head.extra=null);r.mode=D;case D:if(1024&r.flags&&(g=r.length,g>l&&(g=l),g&&(r.head&&(_e=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),p.arraySet(r.head.extra,i,a,g,_e)),512&r.flags&&(r.check=k(r.check,i,g,a)),l-=g,a+=g,r.length-=g),r.length))break e;r.length=0,r.mode=M;case M:if(2048&r.flags){if(0===l)break e;g=0;do _e=i[a+g++],r.head&&_e&&r.length<65536&&(r.head.name+=String.fromCharCode(_e));while(_e&&g<l);if(512&r.flags&&(r.check=k(r.check,i,g,a)),l-=g,a+=g,_e)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=W;case W:if(4096&r.flags){if(0===l)break e;g=0;do _e=i[a+g++],r.head&&_e&&r.length<65536&&(r.head.comment+=String.fromCharCode(_e));while(_e&&g<l);if(512&r.flags&&(r.check=k(r.check,i,g,a)),l-=g,a+=g,_e)break e}else r.head&&(r.head.comment=null);r.mode=G;case G:if(512&r.flags){for(;h<16;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}if(c!==(65535&r.check)){e.msg="header crc mismatch",r.mode=ce;break}c=0,h=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=V;break;case q:for(;h<32;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}e.adler=r.check=n(c),c=0,h=0,r.mode=K;case K:if(0===r.havedict)return e.next_out=s,e.avail_out=d,e.next_in=a,e.avail_in=l,r.hold=c,r.bits=h,O;e.adler=r.check=1,r.mode=V;case V:if(t===R||t===C)break e;case Y:if(r.last){c>>>=7&h,h-=7&h,r.mode=de;break}for(;h<3;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}switch(r.last=1&c,c>>>=1,h-=1,3&c){case 0:r.mode=X;break;case 1:if(f(r),r.mode=re,t===C){c>>>=2,h-=2;break e}break;case 2:r.mode=$;break;case 3:e.msg="invalid block type",r.mode=ce}c>>>=2,h-=2;break;case X:for(c>>>=7&h,h-=7&h;h<32;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}if((65535&c)!==(c>>>16^65535)){e.msg="invalid stored block lengths",r.mode=ce;break}if(r.length=65535&c,c=0,h=0,r.mode=Q,t===C)break e;case Q:r.mode=J;case J:if(g=r.length){if(g>l&&(g=l),g>d&&(g=d),0===g)break e;p.arraySet(o,i,a,g,s),l-=g,a+=g,d-=g,s+=g,r.length-=g;break}r.mode=V;break;case $:for(;h<14;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}if(r.nlen=(31&c)+257,c>>>=5,h-=5,r.ndist=(31&c)+1,c>>>=5,h-=5,r.ncode=(15&c)+4,c>>>=4,h-=4,r.nlen>286||r.ndist>30){e.msg="too many length or distance symbols",r.mode=ce;break}r.have=0,r.mode=ee;case ee:for(;r.have<r.ncode;){for(;h<3;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}r.lens[Ce[r.have++]]=7&c,c>>>=3,h-=3}for(;r.have<19;)r.lens[Ce[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,Se={bits:r.lenbits},xe=_(x,r.lens,0,19,r.lencode,0,r.work,Se),r.lenbits=Se.bits,xe){e.msg="invalid code lengths set",r.mode=ce;break}r.have=0,r.mode=te;case te:for(;r.have<r.nlen+r.ndist;){for(;Ue=r.lencode[c&(1<<r.lenbits)-1],ge=Ue>>>24,we=Ue>>>16&255,pe=65535&Ue,!(ge<=h);){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}if(pe<16)c>>>=ge,h-=ge,r.lens[r.have++]=pe;else{if(16===pe){for(Ee=ge+2;h<Ee;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}if(c>>>=ge,h-=ge,0===r.have){e.msg="invalid bit length repeat",r.mode=ce;break}_e=r.lens[r.have-1],g=3+(3&c),c>>>=2,h-=2}else if(17===pe){for(Ee=ge+3;h<Ee;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}c>>>=ge,h-=ge,_e=0,g=3+(7&c),c>>>=3,h-=3}else{for(Ee=ge+7;h<Ee;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}c>>>=ge,h-=ge,_e=0,g=11+(127&c),c>>>=7,h-=7}if(r.have+g>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=ce;break}for(;g--;)r.lens[r.have++]=_e}}if(r.mode===ce)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=ce;break}if(r.lenbits=9,Se={bits:r.lenbits},xe=_(S,r.lens,0,r.nlen,r.lencode,0,r.work,Se),r.lenbits=Se.bits,xe){e.msg="invalid literal/lengths set",r.mode=ce;break}if(r.distbits=6,r.distcode=r.distdyn,Se={bits:r.distbits},xe=_(E,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,Se),r.distbits=Se.bits,xe){e.msg="invalid distances set",r.mode=ce;break}if(r.mode=re,t===C)break e;case re:r.mode=ne;case ne:if(l>=6&&d>=258){e.next_out=s,e.avail_out=d,e.next_in=a,e.avail_in=l,r.hold=c,r.bits=h,y(e,m),s=e.next_out,o=e.output,d=e.avail_out,a=e.next_in,i=e.input,l=e.avail_in,c=r.hold,h=r.bits,r.mode===V&&(r.back=-1);break}for(r.back=0;Ue=r.lencode[c&(1<<r.lenbits)-1],ge=Ue>>>24,we=Ue>>>16&255,pe=65535&Ue,!(ge<=h);){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}if(we&&0===(240&we)){for(ve=ge,ke=we,ye=pe;Ue=r.lencode[ye+((c&(1<<ve+ke)-1)>>ve)],ge=Ue>>>24,we=Ue>>>16&255,pe=65535&Ue,!(ve+ge<=h);){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}c>>>=ve,h-=ve,r.back+=ve}if(c>>>=ge,h-=ge,r.back+=ge,r.length=pe,0===we){r.mode=le;break}if(32&we){r.back=-1,r.mode=V;break}if(64&we){e.msg="invalid literal/length code",r.mode=ce;break}r.extra=15&we,r.mode=ie;case ie:if(r.extra){for(Ee=r.extra;h<Ee;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}r.length+=c&(1<<r.extra)-1,c>>>=r.extra,h-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=oe;case oe:for(;Ue=r.distcode[c&(1<<r.distbits)-1],ge=Ue>>>24,we=Ue>>>16&255,pe=65535&Ue,!(ge<=h);){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}if(0===(240&we)){for(ve=ge,ke=we,ye=pe;Ue=r.distcode[ye+((c&(1<<ve+ke)-1)>>ve)],ge=Ue>>>24,we=Ue>>>16&255,pe=65535&Ue,!(ve+ge<=h);){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}c>>>=ve,h-=ve,r.back+=ve}if(c>>>=ge,h-=ge,r.back+=ge,64&we){e.msg="invalid distance code",r.mode=ce;break}r.offset=pe,r.extra=15&we,r.mode=ae;case ae:if(r.extra){for(Ee=r.extra;h<Ee;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}r.offset+=c&(1<<r.extra)-1,c>>>=r.extra,h-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=ce;break}r.mode=se;case se:if(0===d)break e;if(g=m-d,r.offset>g){if(g=r.offset-g,g>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=ce;break}g>r.wnext?(g-=r.wnext,w=r.wsize-g):w=r.wnext-g,g>r.length&&(g=r.length),me=r.window}else me=o,w=s-r.offset,g=r.length;g>d&&(g=d),d-=g,r.length-=g;do o[s++]=me[w++];while(--g);0===r.length&&(r.mode=ne);break;case le:if(0===d)break e;o[s++]=r.length,d--,r.mode=ne;break;case de:if(r.wrap){for(;h<32;){if(0===l)break e;l--,c|=i[a++]<<h,h+=8}if(m-=d,e.total_out+=m,r.total+=m,m&&(e.adler=r.check=r.flags?k(r.check,o,m,s-m):v(r.check,o,m,s-m)),m=d,(r.flags?c:n(c))!==r.check){e.msg="incorrect data check",r.mode=ce;break}c=0,h=0}r.mode=fe;case fe:if(r.wrap&&r.flags){for(;h<32;){if(0===l)break e;l--,c+=i[a++]<<h,h+=8}if(c!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=ce;break}c=0,h=0}r.mode=ue;case ue:xe=T;break e;case ce:xe=A;break e;case he:return I;case be:default:return B}return e.next_out=s,e.avail_out=d,e.next_in=a,e.avail_in=l,r.hold=c,r.bits=h,(r.wsize||m!==e.avail_out&&r.mode<ce&&(r.mode<de||t!==U))&&u(e,e.output,e.next_out,m-e.avail_out)?(r.mode=he,I):(b-=e.avail_in,m-=e.avail_out,e.total_in+=b,e.total_out+=m,r.total+=m,r.wrap&&m&&(e.adler=r.check=r.flags?k(r.check,o,m,e.next_out-m):v(r.check,o,m,e.next_out-m)),e.data_type=r.bits+(r.last?64:0)+(r.mode===V?128:0)+(r.mode===re||r.mode===Q?256:0),(0===b&&0===m||t===U)&&xe===L&&(xe=z),xe)}function h(e){if(!e||!e.state)return B;var t=e.state;return t.window&&(t.window=null),e.state=null,L}function b(e,t){var r;return e&&e.state?(r=e.state,0===(2&r.wrap)?B:(r.head=t,t.done=!1,L)):B}function m(e,t){var r,n,i,o=t.length;return e&&e.state?(r=e.state,0!==r.wrap&&r.mode!==K?B:r.mode===K&&(n=1,n=v(n,t,o,0),n!==r.check)?A:(i=u(e,t,o,o))?(r.mode=he,I):(r.havedict=1,L)):B}var g,w,p=e("../utils/common"),v=e("./adler32"),k=e("./crc32"),y=e("./inffast"),_=e("./inftrees"),x=0,S=1,E=2,U=4,R=5,C=6,L=0,T=1,O=2,B=-2,A=-3,I=-4,z=-5,F=8,Z=1,P=2,N=3,H=4,j=5,D=6,M=7,W=8,G=9,q=10,K=11,V=12,Y=13,X=14,Q=15,J=16,$=17,ee=18,te=19,re=20,ne=21,ie=22,oe=23,ae=24,se=25,le=26,de=27,fe=28,ue=29,ce=30,he=31,be=32,me=852,ge=592,we=15,pe=we,ve=!0;r.inflateReset=a,r.inflateReset2=s,r.inflateResetKeep=o,r.inflateInit=d,r.inflateInit2=l,r.inflate=c,r.inflateEnd=h,r.inflateGetHeader=b,r.inflateSetDictionary=m,r.inflateInfo="pako inflate (from Nodeca project)"},"zlib/constants.js":function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},"zlib/messages.js":function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},"zlib/zstream.js":function(e,t,r){"use strict";function n(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}t.exports=n},"zlib/gzheader.js":function(e,t,r){"use strict";function n(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}t.exports=n},"zlib/adler32.js":function(e,t,r){"use strict";function n(e,t,r,n){for(var i=65535&e|0,o=e>>>16&65535|0,a=0;0!==r;){a=r>2e3?2e3:r,r-=a;do i=i+t[n++]|0,o=o+i|0;while(--a);i%=65521,o%=65521}return i|o<<16|0}t.exports=n},"zlib/crc32.js":function(e,t,r){"use strict";function n(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}function i(e,t,r,n){var i=o,a=n+r;e^=-1;for(var s=n;s<a;s++)e=e>>>8^i[255&(e^t[s])];return e^-1}var o=n();t.exports=i},"zlib/inffast.js":function(e,t,r){"use strict";var n=30,i=12;t.exports=function(e,t){var r,o,a,s,l,d,f,u,c,h,b,m,g,w,p,v,k,y,_,x,S,E,U,R,C;r=e.state,o=e.next_in,R=e.input,a=o+(e.avail_in-5),s=e.next_out,C=e.output,l=s-(t-e.avail_out),d=s+(e.avail_out-257),f=r.dmax,u=r.wsize,c=r.whave,h=r.wnext,b=r.window,m=r.hold,g=r.bits,w=r.lencode,p=r.distcode,v=(1<<r.lenbits)-1,k=(1<<r.distbits)-1;e:do{g<15&&(m+=R[o++]<<g,g+=8,m+=R[o++]<<g,g+=8),y=w[m&v];t:for(;;){if(_=y>>>24,m>>>=_,g-=_,_=y>>>16&255,0===_)C[s++]=65535&y;else{if(!(16&_)){if(0===(64&_)){y=w[(65535&y)+(m&(1<<_)-1)];continue t}if(32&_){r.mode=i;break e}e.msg="invalid literal/length code",r.mode=n;break e}x=65535&y,_&=15,_&&(g<_&&(m+=R[o++]<<g,g+=8),x+=m&(1<<_)-1,m>>>=_,g-=_),g<15&&(m+=R[o++]<<g,g+=8,m+=R[o++]<<g,g+=8),y=p[m&k];r:for(;;){if(_=y>>>24,m>>>=_,g-=_,_=y>>>16&255,!(16&_)){if(0===(64&_)){y=p[(65535&y)+(m&(1<<_)-1)];continue r}e.msg="invalid distance code",r.mode=n;break e}if(S=65535&y,_&=15,g<_&&(m+=R[o++]<<g,g+=8,g<_&&(m+=R[o++]<<g,g+=8)),S+=m&(1<<_)-1,S>f){e.msg="invalid distance too far back",r.mode=n;
break e}if(m>>>=_,g-=_,_=s-l,S>_){if(_=S-_,_>c&&r.sane){e.msg="invalid distance too far back",r.mode=n;break e}if(E=0,U=b,0===h){if(E+=u-_,_<x){x-=_;do C[s++]=b[E++];while(--_);E=s-S,U=C}}else if(h<_){if(E+=u+h-_,_-=h,_<x){x-=_;do C[s++]=b[E++];while(--_);if(E=0,h<x){_=h,x-=_;do C[s++]=b[E++];while(--_);E=s-S,U=C}}}else if(E+=h-_,_<x){x-=_;do C[s++]=b[E++];while(--_);E=s-S,U=C}for(;x>2;)C[s++]=U[E++],C[s++]=U[E++],C[s++]=U[E++],x-=3;x&&(C[s++]=U[E++],x>1&&(C[s++]=U[E++]))}else{E=s-S;do C[s++]=C[E++],C[s++]=C[E++],C[s++]=C[E++],x-=3;while(x>2);x&&(C[s++]=C[E++],x>1&&(C[s++]=C[E++]))}break}}break}}while(o<a&&s<d);x=g>>3,o-=x,g-=x<<3,m&=(1<<g)-1,e.next_in=o,e.next_out=s,e.avail_in=o<a?5+(a-o):5-(o-a),e.avail_out=s<d?257+(d-s):257-(s-d),r.hold=m,r.bits=g}},"zlib/inftrees.js":function(e,t,r){"use strict";var n=e("../utils/common"),i=15,o=852,a=592,s=0,l=1,d=2,f=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],u=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],c=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],h=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,b,m,g,w,p){var v,k,y,_,x,S,E,U,R,C=p.bits,L=0,T=0,O=0,B=0,A=0,I=0,z=0,F=0,Z=0,P=0,N=null,H=0,j=new n.Buf16(i+1),D=new n.Buf16(i+1),M=null,W=0;for(L=0;L<=i;L++)j[L]=0;for(T=0;T<b;T++)j[t[r+T]]++;for(A=C,B=i;B>=1&&0===j[B];B--);if(A>B&&(A=B),0===B)return m[g++]=20971520,m[g++]=20971520,p.bits=1,0;for(O=1;O<B&&0===j[O];O++);for(A<O&&(A=O),F=1,L=1;L<=i;L++)if(F<<=1,F-=j[L],F<0)return-1;if(F>0&&(e===s||1!==B))return-1;for(D[1]=0,L=1;L<i;L++)D[L+1]=D[L]+j[L];for(T=0;T<b;T++)0!==t[r+T]&&(w[D[t[r+T]]++]=T);if(e===s?(N=M=w,S=19):e===l?(N=f,H-=257,M=u,W-=257,S=256):(N=c,M=h,S=-1),P=0,T=0,L=O,x=g,I=A,z=0,y=-1,Z=1<<A,_=Z-1,e===l&&Z>o||e===d&&Z>a)return 1;for(;;){E=L-z,w[T]<S?(U=0,R=w[T]):w[T]>S?(U=M[W+w[T]],R=N[H+w[T]]):(U=96,R=0),v=1<<L-z,k=1<<I,O=k;do k-=v,m[x+(P>>z)+k]=E<<24|U<<16|R|0;while(0!==k);for(v=1<<L-1;P&v;)v>>=1;if(0!==v?(P&=v-1,P+=v):P=0,T++,0===--j[L]){if(L===B)break;L=t[r+w[T]]}if(L>A&&(P&_)!==y){for(0===z&&(z=A),x+=O,I=L-z,F=1<<I;I+z<B&&(F-=j[I+z],!(F<=0));)I++,F<<=1;if(Z+=1<<I,e===l&&Z>o||e===d&&Z>a)return 1;y=P&_,m[y]=A<<24|I<<16|x-g|0}}return 0!==P&&(m[x+P]=L-z<<24|64<<16|0),p.bits=A,0}}};for(var r in t)t[r].folder=r.substring(0,r.lastIndexOf("/")+1);var n=function(e){var r=[];return e=e.split("/").every(function(e){return".."==e?r.pop():"."==e||""==e||r.push(e)})?r.join("/"):null,e?t[e]||t[e+".js"]||t[e+"/index.js"]:null},i=function(e,t){return e?n(e.folder+"node_modules/"+t)||i(e.parent,t):null},o=function(e,t){var r=t.match(/^\//)?null:e?t.match(/^\.\.?\//)?n(e.folder+t):i(e,t):n(t);if(!r)throw"module not found: "+t;return r.exports||(r.parent=e,r(o.bind(null,r),r,r.exports={})),r.exports};return o(null,e)},decompress:function(e){this.exports||(this.exports=this.require("inflate.js"));try{return this.exports.inflate(e)}catch(e){}},hasUnityMarker:function(e){var t=10,r="UnityWeb Compressed Content (gzip)";if(t>e.length||31!=e[0]||139!=e[1])return!1;var n=e[3];if(4&n){if(t+2>e.length)return!1;if(t+=2+e[t]+(e[t+1]<<8),t>e.length)return!1}if(8&n){for(;t<e.length&&e[t];)t++;if(t+1>e.length)return!1;t++}return 16&n&&String.fromCharCode.apply(null,e.subarray(t,t+r.length+1))==r+"\0"}}};return new Promise(function(e,t){h.SystemInfo.hasWebGL?(1==h.SystemInfo.hasWebGL&&h.print('Warning: Your browser does not support "WebGL 2.0" Graphics API, switching to "WebGL 1.0"'),h.startupErrorHandler=t,r(0),h.postRun.push(function(){r(1),delete h.startupErrorHandler,e(p)}),c()):t("Your browser does not support WebGL.")})}