//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

const e=()=>(async()=>{try{return new WebAssembly.Module(Uint8Array.from(atob("AGFzbQEAAAABBAFgAAADAgEAChABDgACaR9AAQMAAAsACxoL"),e=>e.codePointAt(0))),!0}catch(e){return!1}})(),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),n=Symbol.for("wasm promise_control");function r(e,o){let t=null;const r=new Promise(function(n,r){t={isDone:!1,promise:null,resolve:o=>{t.isDone||(t.isDone=!0,n(o),e&&e())},reject:e=>{t.isDone||(t.isDone=!0,r(e),o&&o())}}});t.promise=r;const s=r;return s[n]=t,{promise:s,promise_control:t}}function s(e){return e[n]}function i(e){e&&function(e){return void 0!==e[n]}(e)||We(!1,"Promise is not controllable")}const a="__mono_message__",l=["debug","log","trace","warn","info","error"],c="MONO_WASM: ";let d,u,f,m,g,p;function h(e){m=e}function b(e){if(ke.diagnosticTracing){const o="function"==typeof e?e():e;console.debug(c+o)}}function w(e,...o){console.info(c+e,...o)}function y(e,...o){console.info(e,...o)}function v(e,...o){console.warn(c+e,...o)}function _(e,...o){if(o&&o.length>0&&o[0]&&"object"==typeof o[0]){if(o[0].silent)return;if(o[0].toString)return void console.error(c+e,o[0].toString())}console.error(c+e,...o)}function A(e,o,t){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}o(t?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){f.error(`proxyConsole failed: ${e}`)}}}function x(e,o,t){u=o,m=e,f={...o};const n=`${t}/console`.replace("https://","wss://").replace("http://","ws://");d=new WebSocket(n),d.addEventListener("error",E),d.addEventListener("close",j),function(){for(const e of l)u[e]=A(`console.${e}`,R,!0)}()}function T(e){let o=30;const t=()=>{d?0==d.bufferedAmount||0==o?(e&&y(e),function(){for(const e of l)u[e]=A(`console.${e}`,f.log,!1)}(),d.removeEventListener("error",E),d.removeEventListener("close",j),d.close(1e3,e),d=void 0):(o--,globalThis.setTimeout(t,100)):e&&f&&f.log(e)};t()}function R(e){d&&d.readyState===WebSocket.OPEN?d.send(e):f.log(e)}function E(e){f.error(`[${m}] proxy console websocket error: ${e}`,e)}function j(e){f.debug(`[${m}] proxy console websocket closed: ${e}`,e)}function D(){ke.preferredIcuAsset=C(ke.config);let e="invariant"==ke.config.globalizationMode;if(!e)if(ke.preferredIcuAsset)ke.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===ke.config.globalizationMode||"all"===ke.config.globalizationMode||"sharded"===ke.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}ke.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,ke.preferredIcuAsset=null}const o="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",t=ke.config.environmentVariables;if(void 0===t[o]&&e&&(t[o]="1"),void 0===t.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(t.TZ=e)}catch(e){w("failed to detect timezone, will fallback to UTC")}}function C(e){var o;if((null===(o=e.resources)||void 0===o?void 0:o.icu)&&"invariant"!=e.globalizationMode){const o=e.applicationCulture||(Me?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale);e.applicationCulture||(e.applicationCulture=o);const t=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(t.length>=1)return t[0].name}else o&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const o=e.split("-")[0];return"en"===o||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(o)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(o)):n="icudt.dat";if(n)for(let e=0;e<t.length;e++){const o=t[e];if(o.virtualPath===n)return o.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const M=class{constructor(e){this.url=e}toString(){return this.url}};async function S(e){if(Se&&"function"!=typeof globalThis.atob){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";globalThis.atob=o=>{const t=String(o).replace(/=+$/,"");let n="";for(let o=0,r=0,s=0;s<t.length;s++){const i=e.indexOf(t.charAt(s));-1!==i&&(r=o%4?64*r+i:i,o++%4&&(n+=String.fromCharCode(255&r>>(-2*o&6))))}return n}}if(Ee){const e=await import(/*! webpackIgnore: true */"process"),o=14;if(e.versions.node.split(".")[0]<o)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${o}.`)}const o=/*! webpackIgnore: true */import.meta.url,t=o.indexOf("?");var n;if(t>0&&(ke.modulesUniqueQuery=o.substring(t)),ke.scriptUrl=o.replace(/\\/g,"/").replace(/[?#].*/,""),ke.scriptDirectory=(n=ke.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",ke.locateFile=e=>"URL"in globalThis&&globalThis.URL!==M?new URL(e,ke.scriptDirectory).toString():I(e)?e:ke.scriptDirectory+e,ke.fetch_like=U,ke.out=console.log,ke.err=console.error,ke.onDownloadResourceProgress=e.onDownloadResourceProgress,Me&&globalThis.navigator){const e=globalThis.navigator,o=e.userAgentData&&e.userAgentData.brands;o&&o.length>0?ke.isChromium=o.some(e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand):e.userAgent&&(ke.isChromium=e.userAgent.includes("Chrome"),ke.isFirefox=e.userAgent.includes("Firefox"))}void 0===globalThis.URL&&(globalThis.URL=M)}async function U(e,o){try{const t="function"==typeof globalThis.fetch;if(Ee){const n=e.startsWith("file://");if(!n&&t)return globalThis.fetch(e,o||{credentials:"same-origin"});g||(p=await import(/*! webpackIgnore: true */"url"),g=await import(/*! webpackIgnore: true */"fs")),n&&(e=p.fileURLToPath(e));const r=await g.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(t)return globalThis.fetch(e,o||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(o){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+o,arrayBuffer:()=>{throw o},json:()=>{throw o},text:()=>{throw o}}}throw new Error("No fetch implementation available")}const P=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,k=/[a-zA-Z]:[\\/]/;function I(e){return Ee||Se?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||k.test(e):P.test(e)}let O,$=0;const L=[],N=[],z=new Map,F={"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},W={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},B={...W,manifest:!0},J={...W,dotnetwasm:!0},H={dotnetwasm:!0,symbols:!0},Q={...W,dotnetwasm:!0,symbols:!0},q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=ke.preferredIcuAsset)}function Z(e,o,t){null!=o||(o=[]),We(1==o.length,`Expect to have one ${t} asset in resources`);const n=o[0];return n.behavior=t,K(n),e.push(n),n}function K(e){V[e.behavior]&&z.set(e.behavior,e)}function X(e){We(V[e],`Unknown single asset behavior ${e}`);const o=z.get(e);if(o&&!o.resolvedUrl)if(o.resolvedUrl=ke.locateFile(o.name),F[o.behavior]){const e=me(o);e?("string"!=typeof e&&We(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),o.resolvedUrl=e):o.resolvedUrl=le(o.resolvedUrl,o.behavior)}else if("dotnetwasm"!==o.behavior)throw new Error(`Unknown single asset behavior ${e}`);return o}function Y(e){const o=X(e);return We(o,`Single asset for ${e} not found`),o}let ee=!1;async function oe(){if(!ee){ee=!0,ke.diagnosticTracing&&b("mono_download_assets");try{const e=[],o=[],t=(e,o)=>{!Q[e.behavior]&&G(e)&&ke.expected_instantiated_assets_count++,!J[e.behavior]&&G(e)&&(ke.expected_downloaded_assets_count++,o.push(se(e)))};for(const o of L)t(o,e);for(const e of N)t(e,o);ke.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...o]).then(()=>{ke.allDownloadsFinished.promise_control.resolve()}).catch(e=>{throw ke.err("Error in mono_download_assets: "+e),Xe(1,e),e}),await ke.runtimeModuleLoaded.promise;const n=async e=>{const o=await e;if(H[o.behavior])return"symbols"===o.behavior&&(await Pe.instantiate_symbols_asset(o),ge(o)),void++ke.actual_downloaded_assets_count;if(o.buffer){if(!Q[o.behavior]){o.buffer&&"object"==typeof o.buffer||We(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof o.resolvedUrl&&We(!1,"resolvedUrl must be string");const e=o.resolvedUrl,t=await o.buffer,n=new Uint8Array(t);ge(o),await Pe.beforeOnRuntimeInitialized.promise,await Pe.afterInstantiateWasm.promise,Pe.instantiate_asset(o,e,n)}}else o.isOptional||We(!1,"Expected asset to have the downloaded buffer"),!J[o.behavior]&&G(o)&&ke.expected_downloaded_assets_count--,!Q[o.behavior]&&G(o)&&ke.expected_instantiated_assets_count--},r=[],s=[];for(const o of e)r.push(n(o));for(const e of o)s.push(n(e));Promise.all(r).then(()=>{Ce||Pe.coreAssetsInMemory.promise_control.resolve()}).catch(e=>{throw ke.err("Error in mono_download_assets: "+e),Xe(1,e),e}),Promise.all(s).then(async()=>{Ce||(await Pe.coreAssetsInMemory.promise,Pe.allAssetsInMemory.promise_control.resolve())}).catch(e=>{throw ke.err("Error in mono_download_assets: "+e),Xe(1,e),e})}catch(e){throw ke.err("Error in mono_download_assets: "+e),e}}}let te=!1;function ne(){if(te)return;te=!0;const e=ke.config,o=[];if(e.assets)for(const o of e.assets)"object"!=typeof o&&We(!1,`asset must be object, it was ${typeof o} : ${o}`),"string"!=typeof o.behavior&&We(!1,"asset behavior must be known string"),"string"!=typeof o.name&&We(!1,"asset name must be string"),o.resolvedUrl&&"string"!=typeof o.resolvedUrl&&We(!1,"asset resolvedUrl could be string"),o.hash&&"string"!=typeof o.hash&&We(!1,"asset resolvedUrl could be string"),o.pendingDownload&&"object"!=typeof o.pendingDownload&&We(!1,"asset pendingDownload could be object"),o.isCore?L.push(o):N.push(o),K(o);else if(e.resources){const t=e.resources;t.wasmNative||We(!1,"resources.wasmNative must be defined"),t.jsModuleNative||We(!1,"resources.jsModuleNative must be defined"),t.jsModuleRuntime||We(!1,"resources.jsModuleRuntime must be defined"),Z(N,t.wasmNative,"dotnetwasm"),Z(o,t.jsModuleNative,"js-module-native"),Z(o,t.jsModuleRuntime,"js-module-runtime"),t.jsModuleDiagnostics&&Z(o,t.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,o,t)=>{const n=e;n.behavior=o,t?(n.isCore=!0,L.push(n)):N.push(n)};if(t.coreAssembly)for(let e=0;e<t.coreAssembly.length;e++)n(t.coreAssembly[e],"assembly",!0);if(t.assembly)for(let e=0;e<t.assembly.length;e++)n(t.assembly[e],"assembly",!t.coreAssembly);if(0!=e.debugLevel&&ke.isDebuggingSupported()){if(t.corePdb)for(let e=0;e<t.corePdb.length;e++)n(t.corePdb[e],"pdb",!0);if(t.pdb)for(let e=0;e<t.pdb.length;e++)n(t.pdb[e],"pdb",!t.corePdb)}if(e.loadAllSatelliteResources&&t.satelliteResources)for(const e in t.satelliteResources)for(let o=0;o<t.satelliteResources[e].length;o++){const r=t.satelliteResources[e][o];r.culture=e,n(r,"resource",!t.coreAssembly)}if(t.coreVfs)for(let e=0;e<t.coreVfs.length;e++)n(t.coreVfs[e],"vfs",!0);if(t.vfs)for(let e=0;e<t.vfs.length;e++)n(t.vfs[e],"vfs",!t.coreVfs);const r=C(e);if(r&&t.icu)for(let e=0;e<t.icu.length;e++){const o=t.icu[e];o.name===r&&n(o,"icu",!1)}if(t.wasmSymbols)for(let e=0;e<t.wasmSymbols.length;e++)n(t.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let o=0;o<e.appsettings.length;o++){const t=e.appsettings[o],n=pe(t);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||N.push({name:t,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...L,...N,...o]}async function re(e){const o=await se(e);return await o.pendingDownloadInternal.response,o.buffer}async function se(e){try{return await ie(e)}catch(o){if(!ke.enableDownloadRetry)throw o;if(Se||Ee)throw o;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw o;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw o;if(o&&404==o.status)throw o;e.pendingDownloadInternal=void 0,await ke.allDownloadsQueued.promise;try{return ke.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ie(e)}catch(o){return e.pendingDownloadInternal=void 0,await new Promise(e=>globalThis.setTimeout(e,100)),ke.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ie(e)}}}async function ie(e){for(;O;)await O.promise;try{++$,$==ke.maxParallelDownloads&&(ke.diagnosticTracing&&b("Throttling further parallel downloads"),O=r());const o=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const o=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>o,json:()=>JSON.parse(new TextDecoder("utf-8").decode(o)),text:()=>new TextDecoder("utf-8").decode(o),headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const o=e.loadRemote&&ke.config.remoteSources?ke.config.remoteSources:[""];let t;for(let n of o){n=n.trim(),"./"===n&&(n="");const o=ae(e,n);e.name===o?ke.diagnosticTracing&&b(`Attempting to download '${o}'`):ke.diagnosticTracing&&b(`Attempting to download '${o}' for ${e.name}`);try{e.resolvedUrl=o;const n=ue(e);if(e.pendingDownloadInternal=n,t=await n.response,!t||!t.ok)continue;return t}catch(e){t||(t={ok:!1,url:o,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&ke.config.ignorePdbLoadErrors;if(t||We(!1,`Response undefined ${e.name}`),!n){const o=new Error(`download '${t.url}' for ${e.name} failed ${t.status} ${t.statusText}`);throw o.status=t.status,o}w(`optional download '${t.url}' for ${e.name} failed ${t.status} ${t.statusText}`)}(e);return o?(H[e.behavior]||(e.buffer=await o.arrayBuffer(),++ke.actual_downloaded_assets_count),e):e}finally{if(--$,O&&$==ke.maxParallelDownloads-1){ke.diagnosticTracing&&b("Resuming more parallel downloads");const e=O;O=void 0,e.promise_control.resolve()}}}function ae(e,o){let t;return null==o&&We(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?t=e.resolvedUrl:(t=""===o?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:o+e.name,t=le(ke.locateFile(t),e.behavior)),t&&"string"==typeof t||We(!1,"attemptUrl need to be path or url string"),t}function le(e,o){return ke.modulesUniqueQuery&&B[o]&&(e+=ke.modulesUniqueQuery),e}let ce=0;const de=new Set;function ue(e){try{e.resolvedUrl||We(!1,"Request's resolvedUrl must be set");const o=function(e){let o=e.resolvedUrl;if(ke.loadBootResource){const t=me(e);if(t instanceof Promise)return t;"string"==typeof t&&(o=t)}const t={};return e.cache?t.cache=e.cache:ke.config.disableNoCacheFetch||(t.cache="no-cache"),e.useCredentials?t.credentials="include":!ke.config.disableIntegrityCheck&&e.hash&&(t.integrity=e.hash),ke.fetch_like(o,t)}(e),t={name:e.name,url:e.resolvedUrl,response:o};return de.add(e.name),t.response.then(()=>{"assembly"==e.behavior&&ke.loadedAssemblies.push(e.name),ce++,ke.onDownloadResourceProgress&&ke.onDownloadResourceProgress(ce,de.size)}),t}catch(o){const t={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+o,arrayBuffer:()=>{throw o},json:()=>{throw o}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(t)}}}const fe={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs"};function me(e){var o;if(ke.loadBootResource){const t=null!==(o=e.hash)&&void 0!==o?o:"",n=e.resolvedUrl,r=fe[e.behavior];if(r){const o=ke.loadBootResource(r,e.name,n,t,e.behavior);return"string"==typeof o?function(e){return"string"!=typeof e&&We(!1,"url must be a string"),!I(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}(o):o}}}function ge(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function pe(e){let o=e.lastIndexOf("/");return o>=0&&o++,e.substring(o)}async function he(e){e&&await Promise.all((null!=e?e:[]).map(e=>async function(e){try{const o=e.name;if(!e.moduleExports){const t=le(ke.locateFile(o),"js-module-library-initializer");ke.diagnosticTracing&&b(`Attempting to import '${t}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */t)}ke.libraryInitializers.push({scriptName:o,exports:e.moduleExports})}catch(o){v(`Failed to import library initializer '${e}': ${o}`)}}(e)))}async function be(e,o){if(!ke.libraryInitializers)return;const t=[];for(let n=0;n<ke.libraryInitializers.length;n++){const r=ke.libraryInitializers[n];r.exports[e]&&t.push(we(r.scriptName,e,()=>r.exports[e](...o)))}await Promise.all(t)}async function we(e,o,t){try{await t()}catch(t){throw v(`Failed to invoke '${o}' on library initializer '${e}': ${t}`),Xe(1,t),t}}function ye(e,o){if(e===o)return e;const t={...o};return void 0!==t.assets&&t.assets!==e.assets&&(t.assets=[...e.assets||[],...t.assets||[]]),void 0!==t.resources&&(t.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},t.resources)),void 0!==t.environmentVariables&&(t.environmentVariables={...e.environmentVariables||{},...t.environmentVariables||{}}),void 0!==t.runtimeOptions&&t.runtimeOptions!==e.runtimeOptions&&(t.runtimeOptions=[...e.runtimeOptions||[],...t.runtimeOptions||[]]),Object.assign(e,t)}function ve(e,o){if(e===o)return e;const t={...o};return t.config&&(e.config||(e.config={}),t.config=ye(e.config,t.config)),Object.assign(e,t)}function _e(e,o){if(e===o)return e;const t={...o};return void 0!==t.coreAssembly&&(t.coreAssembly=[...e.coreAssembly||[],...t.coreAssembly||[]]),void 0!==t.assembly&&(t.assembly=[...e.assembly||[],...t.assembly||[]]),void 0!==t.lazyAssembly&&(t.lazyAssembly=[...e.lazyAssembly||[],...t.lazyAssembly||[]]),void 0!==t.corePdb&&(t.corePdb=[...e.corePdb||[],...t.corePdb||[]]),void 0!==t.pdb&&(t.pdb=[...e.pdb||[],...t.pdb||[]]),void 0!==t.jsModuleNative&&(t.jsModuleNative=[...e.jsModuleNative||[],...t.jsModuleNative||[]]),void 0!==t.jsModuleDiagnostics&&(t.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...t.jsModuleDiagnostics||[]]),void 0!==t.jsModuleRuntime&&(t.jsModuleRuntime=[...e.jsModuleRuntime||[],...t.jsModuleRuntime||[]]),void 0!==t.wasmSymbols&&(t.wasmSymbols=[...e.wasmSymbols||[],...t.wasmSymbols||[]]),void 0!==t.wasmNative&&(t.wasmNative=[...e.wasmNative||[],...t.wasmNative||[]]),void 0!==t.icu&&(t.icu=[...e.icu||[],...t.icu||[]]),void 0!==t.satelliteResources&&(t.satelliteResources=function(e,o){if(e===o)return e;for(const t in o)e[t]=[...e[t]||[],...o[t]||[]];return e}(e.satelliteResources||{},t.satelliteResources||{})),void 0!==t.modulesAfterConfigLoaded&&(t.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...t.modulesAfterConfigLoaded||[]]),void 0!==t.modulesAfterRuntimeReady&&(t.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...t.modulesAfterRuntimeReady||[]]),void 0!==t.extensions&&(t.extensions={...e.extensions||{},...t.extensions||{}}),void 0!==t.vfs&&(t.vfs=[...e.vfs||[],...t.vfs||[]]),Object.assign(e,t)}function Ae(){const e=ke.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){ke.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const o of e.assets){const t={};switch(o.behavior){case"assembly":t.assembly=[o];break;case"pdb":t.pdb=[o];break;case"resource":t.satelliteResources={},t.satelliteResources[o.culture]=[o];break;case"icu":t.icu=[o];break;case"symbols":t.wasmSymbols=[o];break;case"vfs":t.vfs=[o];break;case"dotnetwasm":t.wasmNative=[o];break;case"js-module-runtime":t.jsModuleRuntime=[o];break;case"js-module-native":t.jsModuleNative=[o];break;case"js-module-diagnostics":t.jsModuleDiagnostics=[o];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${o.behavior} of asset ${o.name}`)}_e(e.resources,t)}}e.debugLevel,void 0===e.virtualWorkingDirectory&&(e.virtualWorkingDirectory=Ue),e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Pe.diagnosticTracing=ke.diagnosticTracing=!!e.diagnosticTracing,Pe.waitForDebugger=e.waitForDebugger,ke.maxParallelDownloads=e.maxParallelDownloads||ke.maxParallelDownloads,ke.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:ke.enableDownloadRetry}let xe=!1;async function Te(e){var o;if(xe)await ke.afterConfigLoaded.promise;else try{if(xe=!0,Ae(),await he(null===(o=ke.config.resources)||void 0===o?void 0:o.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[ke.config]),e.onConfigLoaded)try{await e.onConfigLoaded(ke.config,Oe),Ae()}catch(e){throw _("onConfigLoaded() failed",e),e}Ae(),ke.afterConfigLoaded.promise_control.resolve(ke.config)}catch(o){const t=`Failed to initialize config ${o} ${null==o?void 0:o.stack}`;throw ke.config=e.config=Object.assign(ke.config,{message:t,error:o,isError:!0}),Xe(1,new Error(t)),o}}function Re(){return!!globalThis.navigator&&(ke.isChromium||ke.isFirefox)}"function"==typeof importScripts&&(globalThis.dotnetSidecar=!0);const Ee="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,je="function"==typeof importScripts,De=je&&"undefined"!=typeof dotnetSidecar,Ce=je&&!De,Me="object"==typeof window||je&&!Ee,Se=!Me&&!Ee,Ue="/";let Pe={},ke={},Ie={},Oe={},$e={},Le=!1;const Ne={},ze={config:Ne},Fe={mono:{},binding:{},internal:$e,module:ze,loaderHelpers:ke,runtimeHelpers:Pe,diagnosticHelpers:Ie,api:Oe};function We(e,o){if(e)return;const t="Assert failed: "+("function"==typeof o?o():o),n=new Error(t);_(t,n),Pe.nativeAbort(n)}function Ve(){return void 0!==ke.exitCode}function Be(){return Pe.runtimeReady&&!Ve()}function Je(){Ve()&&We(!1,`.NET runtime already exited with ${ke.exitCode} ${ke.exitReason}. You can use dotnet.runMain() which doesn't exit the runtime.`),Pe.runtimeReady||We(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function He(){Me&&(globalThis.addEventListener("unhandledrejection",eo),globalThis.addEventListener("error",oo))}let Qe,qe;function Ge(){Qe=ze.onAbort,qe=ze.onExit,ze.onAbort=Ke,ze.onExit=Ze}function Ze(e){qe&&qe(e),Xe(e,ke.exitReason)}function Ke(e){Qe&&Qe(e||ke.exitReason),Xe(1,e||ke.exitReason)}function Xe(e,o){var t;const n=o&&"object"==typeof o;e=n&&"number"==typeof o.status?o.status:void 0===e?-1:e;const r=n&&"string"==typeof o.message?o.message:""+o;(o=n?o:Pe.ExitStatus?function(e,o){const t=new Pe.ExitStatus(e);return t.message=o,t.toString=()=>o,t}(e,r):new Error("Exit with code "+e+" "+r)).status=e,o.message||(o.message=r);const s=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>s})}catch(e){}const i=!!o.silent;if(o.silent=!0,Ve())ke.diagnosticTracing&&b("mono_exit called after exit");else{try{ze.onAbort==Ke&&(ze.onAbort=Qe),ze.onExit==Ze&&(ze.onExit=qe),Me&&(globalThis.removeEventListener("unhandledrejection",eo),globalThis.removeEventListener("error",oo)),Pe.runtimeReady?(Pe.jiterpreter_dump_stats&&Pe.jiterpreter_dump_stats(!1),0===e&&(null===(t=ke.config)||void 0===t?void 0:t.interopCleanupOnExit)&&Pe.forceDisposeProxies(!0,!0)):(ke.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){ke.allDownloadsQueued.promise_control.reject(e),ke.allDownloadsFinished.promise_control.reject(e),ke.afterConfigLoaded.promise_control.reject(e),ke.wasmCompilePromise.promise_control.reject(e),ke.runtimeModuleLoaded.promise_control.reject(e),Pe.dotnetReady&&(Pe.dotnetReady.promise_control.reject(e),Pe.afterInstantiateWasm.promise_control.reject(e),Pe.afterPreRun.promise_control.reject(e),Pe.beforeOnRuntimeInitialized.promise_control.reject(e),Pe.afterOnRuntimeInitialized.promise_control.reject(e),Pe.afterPostRun.promise_control.reject(e))}(o))}catch(e){v("mono_exit A failed",e)}try{i||(function(e,o){if(0!==e&&o){const e=Pe.ExitStatus&&o instanceof Pe.ExitStatus?b:_;"string"==typeof o?e(o):(void 0===o.stack&&(o.stack=(new Error).stack+""),o.message?e(Pe.stringify_as_error_with_stack?Pe.stringify_as_error_with_stack(o.message+"\n"+o.stack):o.message+"\n"+o.stack):e(JSON.stringify(o)))}!Ce&&ke.config&&(ke.config.logExitCode?ke.config.forwardConsole?T("WASM EXIT "+e):y("WASM EXIT "+e):ke.config.forwardConsole&&T())}(e,o),function(e){if(Me&&!Ce&&ke.config&&ke.config.appendElementOnExit&&document){const o=document.createElement("label");o.id="tests_done",0!==e&&(o.style.background="red"),o.innerHTML=""+e,document.body.appendChild(o)}}(e))}catch(e){v("mono_exit B failed",e)}ke.exitCode=e,ke.exitReason||(ke.exitReason=o),!Ce&&Pe.runtimeReady&&ze.runtimeKeepalivePop()}if(ke.config&&ke.config.asyncFlushOnExit&&0===e)throw(async()=>{try{await async function(){if(Ee)try{const e=await import(/*! webpackIgnore: true */"process"),o=e=>new Promise((o,t)=>{e.on("error",t),e.end("","utf8",o)}),t=o(e.stderr),n=o(e.stdout);let r;const s=new Promise(e=>{r=setTimeout(()=>e("timeout"),1e3)});await Promise.race([Promise.all([n,t]),s]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(e,o)}})(),o;Ye(e,o)}function Ye(e,o){if(Pe.runtimeReady&&Pe.nativeExit)try{Pe.nativeExit(e)}catch(e){!Pe.ExitStatus||e instanceof Pe.ExitStatus||v("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!Me)throw Ee?process.exit(e):Pe.quit&&Pe.quit(e,o),o}function eo(e){to(e,e.reason,"rejection")}function oo(e){to(e,e.error,"error")}function to(e,o,t){e.preventDefault();try{o||(o=new Error("Unhandled "+t)),void 0===o.stack&&(o.stack=(new Error).stack),o.stack=o.stack+"",o.silent||(_("Unhandled error:",o),Xe(1,o))}catch(e){}}!function(n){if(Le)throw new Error("Loader module already loaded");Le=!0,Pe=n.runtimeHelpers,ke=n.loaderHelpers,Ie=n.diagnosticHelpers,Oe=n.api,$e=n.internal,Object.assign(Oe,{INTERNAL:$e,invokeLibraryInitializers:be}),Object.assign(n.module,{config:ye(Ne,{environmentVariables:{}})});const a={mono_wasm_bindings_is_ready:!1,config:n.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"5254d8bcf59917edc1e1abc33bdf2442b77b1c70",config:n.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:r(),allDownloadsQueued:r(),allDownloadsFinished:r(),wasmCompilePromise:r(),runtimeModuleLoaded:r(),loadingWorkers:r(),is_exited:Ve,is_runtime_running:Be,assert_runtime_running:Je,mono_exit:Xe,createPromiseController:r,getPromiseController:s,assertIsControllablePromise:i,mono_download_assets:oe,resolve_single_asset_path:Y,setup_proxy_console:x,set_thread_prefix:h,installUnhandledErrorHandler:He,retrieve_asset_download:re,invokeLibraryInitializers:be,isDebuggingSupported:Re,exceptionsFinal:e,simd:t,relaxedSimd:o};Object.assign(Pe,a),Object.assign(ke,l)}(Fe);let no,ro,so,io=!1,ao=!1;async function lo(e){if(!ao){if(ao=!0,Me&&ke.config.forwardConsole&&void 0!==globalThis.WebSocket&&x("main",globalThis.console,globalThis.location.origin),ze||We(!1,"Null moduleConfig"),ke.config||We(!1,"Null moduleConfig.config"),"function"==typeof e){const o=e(Fe.api);if(o.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(ze,o),ve(ze,o)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");ve(ze,e)}await S(ze)}}async function co(e){return await lo(e),ke.config.exitOnUnhandledError&&He(),Ge(),async function(){var e;await Te(ze),ne();const o=uo();(async function(){try{const e=Y("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||We(!1,"Can't load dotnet.native.wasm");const o=await e.pendingDownloadInternal.response,t=o.headers&&o.headers.get?o.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===t)n=await WebAssembly.compileStreaming(o);else{Me&&"application/wasm"!==t&&v('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await o.arrayBuffer();ke.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Se?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,ke.wasmCompilePromise.promise_control.resolve(n)}catch(e){ke.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout(async()=>{try{D(),await oe()}catch(e){Xe(1,e)}},0);const t=await Promise.all(o);return await fo(t),await Pe.dotnetReady.promise,await he(null===(e=ke.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Oe}()}function uo(){const e=Y("js-module-runtime"),o=Y("js-module-native");if(no&&ro)return[no,ro,so];"object"==typeof e.moduleExports?no=e.moduleExports:(ke.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),no=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof o.moduleExports?ro=o.moduleExports:(ke.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),ro=import(/*! webpackIgnore: true */o.resolvedUrl));const t=X("js-module-diagnostics");return t&&("object"==typeof t.moduleExports?so=t.moduleExports:(ke.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),so=import(/*! webpackIgnore: true */t.resolvedUrl))),[no,ro,so]}async function fo(e){const{initializeExports:o,initializeReplacements:t,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:s,setRuntimeGlobals:i,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];i(Fe),o(Fe),c&&c.setRuntimeGlobals(Fe),await n(ze),ke.runtimeModuleLoaded.promise_control.resolve(),l(()=>(Object.assign(ze,{__dotnet_runtime:{initializeReplacements:t,configureEmscriptenStartup:r,configureWorkerStartup:s,passEmscriptenInternals:a}}),ze)).catch(e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize.");throw e})}Ce&&async function(){(function(){const e=new MessageChannel,o=e.port1,t=e.port2;o.addEventListener("message",e=>{!function(e){const o=JSON.parse(e.config),t=JSON.parse(e.monoThreadInfo);ze.config=o,ze.wasmModule=e.wasmModule,ze.wasmMemory=e.wasmMemory,ze.handlers=e.handlers,io?ke.diagnosticTracing&&b("mono config already received"):(ye(ke.config,o),Pe.monoThreadInfo=t,Ae(),ke.diagnosticTracing&&b("mono config received"),io=!0,ke.afterConfigLoaded.promise_control.resolve(ke.config),Me&&o.forwardConsole&&void 0!==globalThis.WebSocket&&ke.setup_proxy_console("worker-idle",console,globalThis.location.origin))}(e.data),o.close(),t.close()},{once:!0}),o.start(),self.postMessage({[a]:{monoCmd:"preload",port:t}},[t])})(),await ke.afterConfigLoaded.promise,function(){const e=ke.config;e.assets||We(!1,"config.assets must be defined");for(const o of e.assets)K(o),q[o.behavior]&&N.push(o)}();const e=uo(),o=await Promise.all(e);return globalThis.name="em-pthread",await fo(o),ke.config.exitOnUnhandledError&&He(),Ge(),Me&&ke.config.forwardConsole&&void 0!==globalThis.WebSocket&&x("main",globalThis.console,globalThis.location.origin),await S(ze),await oe(),self.dispatchEvent(new MessageEvent("message",{data:{cmd:1,handlers:ze.handlers,wasmMemory:ze.wasmMemory,wasmModule:ze.wasmModule}})),ze}().catch(e=>Xe(1,e));const mo=new class{withModuleConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,o){try{return ye(Ne,{interpreterPgo:e,interpreterPgoSaveDelay:o}),Ne.runtimeOptions?Ne.runtimeOptions.push("--interp-pgo-recording"):Ne.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ye(Ne,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){return this}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||We(!1,"must be directory path"),ye(Ne,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,o){try{const t={};return t[e]=o,ye(Ne,{environmentVariables:t}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||We(!1,"must be dictionary object"),ye(Ne,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&We(!1,"must be boolean"),ye(Ne,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||We(!1,"must be number"),ye(Ne,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||We(!1,"must be array of strings"),ye(Ne,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||We(!1,"must be array of strings"),Ne.runtimeOptions?Ne.runtimeOptions.push(...e):Ne.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ye(Ne,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ye(Ne,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ye(Ne,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return ke.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lo(ze),await Te(ze),ne(),D(),oe(),await ke.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await co(ze),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}run(){return this.runMainAndExit()}async runMainAndExit(){try{return ze.config||We(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}async runMain(){try{return ze.config||We(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMain()}catch(e){throw Xe(1,e),e}}},go=Xe,po=co;Se||"function"==typeof globalThis.URL||We(!1,"This browser/engine doesn't support URL API. Please use a modern version."),"function"!=typeof globalThis.BigInt64Array&&We(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://learn.microsoft.com/aspnet/core/blazor/supported-platforms"),globalThis.performance&&"function"==typeof globalThis.performance.now||We(!1,"This browser/engine doesn't support performance.now. Please use a modern version."),Se||globalThis.crypto&&"object"==typeof globalThis.crypto.subtle||We(!1,"This engine doesn't support crypto.subtle. Please use a modern version."),Se||globalThis.crypto&&"function"==typeof globalThis.crypto.getRandomValues||We(!1,"This engine doesn't support crypto.getRandomValues. Please use a modern version."),Ee&&"function"!=typeof process.exit&&We(!1,"This engine doesn't support process.exit. Please use a modern version."),mo.withConfig(/*json-start*/{
  "mainAssemblyName": "Soenneker.Quark.Suite.Demo",
  "resources": {
    "hash": "sha256-tzUHO6ShVGRO1H+7Q8DEAFZ3foJh5cKKFgzv8UwxDQk=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.k851xj4z1b.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.tzjft7ib9j.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.q662xoutyt.wasm",
        "hash": "sha256-LjO64Jnof8enfv6ObvyPS5pg2NgOCF54QIf6P+zEu5U=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.5lgyv9xn0b.dat",
        "hash": "sha256-eZuX0pntrUwNrAmFCMwpxJjFA3/Myi/rW2x9mEZ+Mbg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.xyuimhy3ww.dat",
        "hash": "sha256-SQcxb+bdx2UXUCU9tFdOWCr4Ctk64xghCnr0JGLWWKQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.h0en30vv0c.dat",
        "hash": "sha256-T8YllylpxyWp9Aq4AiF+BMAxKXqYyzWB9RA5RqY19vs=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "payloadSize": 44112,
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.czzvbunlz4.wasm",
        "hash": "sha256-GGUn/3Rj5rje8ITwLkCrQjdNgP77K8YS/nqZSnKCyMo=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 2590288,
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.xs6s5us04d.wasm",
        "hash": "sha256-j9F+6UDbSPOHOWDOVBB8e2soYPTWd/xjLcidPl6bIOM=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "payloadSize": 2433104,
        "virtualPath": "Bogus.wasm",
        "name": "Bogus.1xv4rmdijs.wasm",
        "hash": "sha256-ld0Iz99gTi0z8IrJQFtnCJXSg8m61uz9E6QIOQcaxwo=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 298064,
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.egfk1ghf6k.wasm",
        "hash": "sha256-Pjw+ysy9pdQod+nMeIPXnWpgLtbxvPy0o8+QLbaBccM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 42576,
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.63fk9fq3dv.wasm",
        "hash": "sha256-Yi4QGH/fEs9mGg2DnmRplBAkxxCvnfvFU5VWyKc47r0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 102480,
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.kle3y9ka6h.wasm",
        "hash": "sha256-WK3AWNi03KPpBrZutokPvUN5CBR6KnOqdpO4YFl8z+E=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 145488,
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.wjojdwbj2q.wasm",
        "hash": "sha256-DCDejNdvdvRCyPqSKvWCi65RDhK5iQw2P13EZWHzuyU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 12880,
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.m82kd6krz3.wasm",
        "hash": "sha256-qrI3ukrIa6bcoJZnRmqRZbtQohhNHv7WuSK531C6xWI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 12880,
        "virtualPath": "Microsoft.Extensions.Configuration.EnvironmentVariables.wasm",
        "name": "Microsoft.Extensions.Configuration.EnvironmentVariables.vaqacjgd1g.wasm",
        "hash": "sha256-WWSvU1JDlu+bkUC9QASXcgI6FBxn6nqhoi+goYlADAM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 9808,
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.q81lkglnox.wasm",
        "hash": "sha256-it2ZhBMdA01nWq87yJoqpIh2zzD4VlW5qVKw+RKqPzw=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 54864,
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.nyfzzvsl5t.wasm",
        "hash": "sha256-jxo+s2tQ1ttnsvHv0GfKvqHrm+o+J/1F+8wsAPpKK20=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 14928,
        "virtualPath": "Microsoft.Extensions.Diagnostics.wasm",
        "name": "Microsoft.Extensions.Diagnostics.es1aeztafo.wasm",
        "hash": "sha256-jrG0mdpst0h6GpNSYnKL6CGIpoqljOAai75Nx5vueow=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "Microsoft.Extensions.Localization.Abstractions.wasm",
        "name": "Microsoft.Extensions.Localization.Abstractions.b2zmeqgqub.wasm",
        "hash": "sha256-/a5GuIgvHJ3nPQg/M+CY+r95mEIuE76UqesU3pTN7TE=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 25168,
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.j2p9uhwgw9.wasm",
        "hash": "sha256-1VYZQOd0IYLpOmpxIDiEPKH4or4Cq2D92uoX1VuNlEM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 8272,
        "virtualPath": "Microsoft.Extensions.Validation.wasm",
        "name": "Microsoft.Extensions.Validation.ldu2yz4khd.wasm",
        "hash": "sha256-SRTMKPr3Z5FePw1q6Wp9LtpCKZ5t4kA7iSPq1TUBwJg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 55376,
        "virtualPath": "Microsoft.IO.RecyclableMemoryStream.wasm",
        "name": "Microsoft.IO.RecyclableMemoryStream.av07o1q5r3.wasm",
        "hash": "sha256-Jpy82mvTevMgRWi4XofcBOF744jNAphf1UVQQHYvkds=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 50256,
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.90ufxfbv2b.wasm",
        "hash": "sha256-qRKGsJT/iSJ1pFURLJzAcn/V3W8J54lJtlaTqRfgzkQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 11856,
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.kthmj8ue8z.wasm",
        "hash": "sha256-uHbb5b7vnE0GwS6Qws3ipDRp2E0UWNZ9G2JJrz8Au4U=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 63056,
        "virtualPath": "Serilog.wasm",
        "name": "Serilog.493qoseb5n.wasm",
        "hash": "sha256-CMWLHiMfg2SLJvtD4XKV22LNVwec15JGLMeDvpVHtfA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 28240,
        "virtualPath": "Serilog.Extensions.Logging.wasm",
        "name": "Serilog.Extensions.Logging.szx2utty1s.wasm",
        "hash": "sha256-mNpR27PltK5RcIdzWH+061ACgosjl4/rw2B/ue7+CPk=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 11344,
        "virtualPath": "Soenneker.Asyncs.Initializers.wasm",
        "name": "Soenneker.Asyncs.Initializers.5vdgatrv1g.wasm",
        "hash": "sha256-Mfix3S7TJnJZ/SYqMalTdXyskLZUCOoNO23dw/wbb9U=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 11856,
        "virtualPath": "Soenneker.Asyncs.Locks.wasm",
        "name": "Soenneker.Asyncs.Locks.gsvjd325nr.wasm",
        "hash": "sha256-UF/8fsygfv/ZQ4lY7FIa7HzaRt8FkLf1uNB/OVGnt6s=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Atomics.Longs.wasm",
        "name": "Soenneker.Atomics.Longs.qpjvwhoh7z.wasm",
        "hash": "sha256-csbBmJcm9+j/rvVhUT12mZdd6KJ3Ko4joyMi1TeVk1g=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "Soenneker.Atomics.ValueBools.wasm",
        "name": "Soenneker.Atomics.ValueBools.rr9enyhdaw.wasm",
        "hash": "sha256-97eEHKZVyDY5aJzpyOonh9OfDRNB/BEbGMNOOQJ688M=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Atomics.ValueInts.wasm",
        "name": "Soenneker.Atomics.ValueInts.p39opla3q5.wasm",
        "hash": "sha256-FdEgMUoFOaovC0xMDcF6lgLuAuE51YOAPZqwbKVhkaU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "Soenneker.Atomics.ValueLazys.wasm",
        "name": "Soenneker.Atomics.ValueLazys.7z5sy6amzf.wasm",
        "hash": "sha256-Q2dqyVJrRutWO9WDhlUVhHAPxt9jOkMi/p/XJFn4jB4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Atomics.ValueLocks.wasm",
        "name": "Soenneker.Atomics.ValueLocks.3h6s904n69.wasm",
        "hash": "sha256-OUcHD0pw2jSX5pu6pvgqRfy2VgpG/yFgiYJVVXCXzpk=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "Soenneker.Atomics.ValueNullableLazys.wasm",
        "name": "Soenneker.Atomics.ValueNullableLazys.y5rnf6w826.wasm",
        "hash": "sha256-us9wLlYoTBXkdxi72jH7Dtr+64IZ6VqFHNs92IHtEqU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 8272,
        "virtualPath": "Soenneker.Atomics.ValueResources.wasm",
        "name": "Soenneker.Atomics.ValueResources.7kvra6ew35.wasm",
        "hash": "sha256-eSXqQ3aA4/zHYk5hG0i/2HTWDNWIjEDvo+eML/Au7TI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Attributes.MapTo.wasm",
        "name": "Soenneker.Attributes.MapTo.yyxmjktm7b.wasm",
        "hash": "sha256-hpeSCowLHRGLP1qUrJIhiHrxkgQeucOL5kNWRkaKCjU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4176,
        "virtualPath": "Soenneker.Attributes.PublicOpenApiObject.wasm",
        "name": "Soenneker.Attributes.PublicOpenApiObject.p5axezbm9r.wasm",
        "hash": "sha256-rRsHerPWnpIfkIsuK/5AHq6Y1jNWuZpGAfUzHP6xprc=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 45648,
        "virtualPath": "Soenneker.Blazor.C15t.wasm",
        "name": "Soenneker.Blazor.C15t.2h3zf9tg55.wasm",
        "hash": "sha256-qgBlGAQmiqKvbCBeEutbO6wUczKlCDVgE02Q9eKPC7I=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 31312,
        "virtualPath": "Soenneker.Blazor.Cloudflare.AiSearch.wasm",
        "name": "Soenneker.Blazor.Cloudflare.AiSearch.3zlk32j8h4.wasm",
        "hash": "sha256-PwfSZRFLkWgi2KKUFNA1TKb4DTiNrZOFet9mpf9ii0U=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 55888,
        "virtualPath": "Soenneker.Blazor.CreditCards.wasm",
        "name": "Soenneker.Blazor.CreditCards.tbqaagcdrq.wasm",
        "hash": "sha256-yS1zlYV7Qswf5cjCBWCmUjezbgYC7TRJmK7HAFetZFA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Blazor.Extensions.EventCallback.wasm",
        "name": "Soenneker.Blazor.Extensions.EventCallback.hk7ezwf03n.wasm",
        "hash": "sha256-L29/vXhIfJPWCbXs18mu2VKSeg9I0JoCj+GrFeyuE00=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 9808,
        "virtualPath": "Soenneker.Blazor.Extensions.IJSObjectReferences.wasm",
        "name": "Soenneker.Blazor.Extensions.IJSObjectReferences.2wri9z1i7w.wasm",
        "hash": "sha256-Tv3w2rQoSKGYq2l/JtsWWa4lf8O2XQApqu/Hs1ZCxyU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 11344,
        "virtualPath": "Soenneker.Blazor.Interops.Floating.wasm",
        "name": "Soenneker.Blazor.Interops.Floating.7z4rsmysim.wasm",
        "hash": "sha256-DdqL9R0URy2KnoaHAABafGn3/gwVXZJ5IlJLfBWNlNM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 42064,
        "virtualPath": "Soenneker.Blazor.Rrweb.Replay.wasm",
        "name": "Soenneker.Blazor.Rrweb.Replay.nlxcui2ic9.wasm",
        "hash": "sha256-GzsYHvwuXXAH7PTmZBQW0SQPIUqLeHieDuNdOhRa0hM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 83024,
        "virtualPath": "Soenneker.Blazor.SignaturePads.wasm",
        "name": "Soenneker.Blazor.SignaturePads.a2wbzrkfpq.wasm",
        "hash": "sha256-7jmzRiIl33KVgHiD2GL3ya1OEDaIgIk09j+fyccBF1A=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 9808,
        "virtualPath": "Soenneker.Blazor.Utils.Clipboard.wasm",
        "name": "Soenneker.Blazor.Utils.Clipboard.47wf9o7ewv.wasm",
        "hash": "sha256-wEletpfnpLx2UvB0PYFRJzv/uZpGSVSJqeEPaeozc50=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6224,
        "virtualPath": "Soenneker.Blazor.Utils.Ids.wasm",
        "name": "Soenneker.Blazor.Utils.Ids.6qsgh6mpzi.wasm",
        "hash": "sha256-kuGVbYYE80TbocL+/F3xhFfmCQxBnl+mUhuZ29tGt3k=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 14928,
        "virtualPath": "Soenneker.Blazor.Utils.JsVariable.wasm",
        "name": "Soenneker.Blazor.Utils.JsVariable.tjswcr7n4c.wasm",
        "hash": "sha256-d59ANuoKvN3tNkgsFvZwCtVwz8Q7WqQONCb7obVwgp4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 20048,
        "virtualPath": "Soenneker.Blazor.Utils.ModuleImport.wasm",
        "name": "Soenneker.Blazor.Utils.ModuleImport.nx47rnzyn0.wasm",
        "hash": "sha256-u3so5/pLxqdyy2WNTEM+RT7szO0OZSjRCQEMoSAZfOg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 29264,
        "virtualPath": "Soenneker.Blazor.Utils.ResourceLoader.wasm",
        "name": "Soenneker.Blazor.Utils.ResourceLoader.v25pgc8so4.wasm",
        "hash": "sha256-CdpU/XlmJEj71kqASFJ83jPtZ9h+EUsGrCoEYkNf0d0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 1518160,
        "virtualPath": "Soenneker.Bradix.Suite.wasm",
        "name": "Soenneker.Bradix.Suite.q196zgwlpf.wasm",
        "hash": "sha256-sgnOnGONlenKm82+Jtfy2B9MVHppBQWrb6Fplels+W4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.DataTables.Attributes.Orderable.wasm",
        "name": "Soenneker.DataTables.Attributes.Orderable.dd8v0e9l3d.wasm",
        "hash": "sha256-3/s6am4K/wWGj6lwZjq2ltY+Gloh1wlSXZvbmpuHt6M=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.DataTables.Attributes.Searchable.wasm",
        "name": "Soenneker.DataTables.Attributes.Searchable.d1m3ge1l0b.wasm",
        "hash": "sha256-UepXGvvHmNJmQHGGh+AywWp313cxkfs5O1W+syAjJmA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 8784,
        "virtualPath": "Soenneker.DataTables.Dtos.Column.wasm",
        "name": "Soenneker.DataTables.Dtos.Column.52c7cqrcsy.wasm",
        "hash": "sha256-M+Nc9emMzDT8wi2oNCPROpnQppVcpKCTgS9DuLET3FA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6736,
        "virtualPath": "Soenneker.DataTables.Dtos.ServerResponse.wasm",
        "name": "Soenneker.DataTables.Dtos.ServerResponse.f2ta89tvc1.wasm",
        "hash": "sha256-pw3zxHDfI5Ettir/cOHVt5jnOHX+gMFTWzxloYwSjtc=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 8272,
        "virtualPath": "Soenneker.DataTables.Dtos.ServerSideRequest.wasm",
        "name": "Soenneker.DataTables.Dtos.ServerSideRequest.c0dymqqo2m.wasm",
        "hash": "sha256-pGvn64a56/6svtvFLa0C+XTcM8fvk2RFf/qC3truv0Y=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 8784,
        "virtualPath": "Soenneker.DataTables.Extensions.ServerSideRequest.wasm",
        "name": "Soenneker.DataTables.Extensions.ServerSideRequest.yqkae4qlke.wasm",
        "hash": "sha256-djpYUtAu0Z/9mhfqqKg4P4UGIPsQztxhn5+T7e9dEQo=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "Soenneker.Dtos.Filters.Base.wasm",
        "name": "Soenneker.Dtos.Filters.Base.84vh37y9f3.wasm",
        "hash": "sha256-OInwoMNQZsDuW+Cw2rj6pKS7jAVML8BlMrmOmXHu0YY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Dtos.Filters.ExactMatch.wasm",
        "name": "Soenneker.Dtos.Filters.ExactMatch.mf2m0jes38.wasm",
        "hash": "sha256-0sHOdnrujA4OLNOULkw0h1X62tFNi9wXiH/4J3fo8bU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6736,
        "virtualPath": "Soenneker.Dtos.IdValuePair.wasm",
        "name": "Soenneker.Dtos.IdValuePair.eggimw0h47.wasm",
        "hash": "sha256-zrlnjsiRvmUXZSiDHoA00e+yf/LroN0bX5lYCp2fmfY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "Soenneker.Dtos.Options.OrderBy.wasm",
        "name": "Soenneker.Dtos.Options.OrderBy.a5uk2i0ufh.wasm",
        "hash": "sha256-YuDPxob0SQrMjvQCT+Szi95aIvb68i1tngQQzxcyjGI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6224,
        "virtualPath": "Soenneker.Dtos.RequestDataOptions.wasm",
        "name": "Soenneker.Dtos.RequestDataOptions.ilnjxicn4p.wasm",
        "hash": "sha256-yjjwMcorlW6rV32Tfj3sdGbr2cZn2EmD7kQAIoMJ+LM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "Soenneker.Dtos.Results.Paged.wasm",
        "name": "Soenneker.Dtos.Results.Paged.j7uey01rfe.wasm",
        "hash": "sha256-b8LYp4b1hblNEWnmWzzmk/cguUW1skcOAF8v0swpz6E=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 9296,
        "virtualPath": "Soenneker.Enums.SortDirections.wasm",
        "name": "Soenneker.Enums.SortDirections.1u76z8a17h.wasm",
        "hash": "sha256-149VetowYYXZ/repsiQ4VwrFgaZWWn4JQvAV+4Q47W8=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Extensions.CancellationTokens.wasm",
        "name": "Soenneker.Extensions.CancellationTokens.nq7yosj2km.wasm",
        "hash": "sha256-rxMQi3Q9NSRfx8UgHmQsXDHesi4COMtKpzaMJv2CMIE=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Extensions.Char.wasm",
        "name": "Soenneker.Extensions.Char.ow8dnpiw9l.wasm",
        "hash": "sha256-WAkFZ88x7BI17UuMY81dpXg5j81d6eTxKaLhB8BTXZY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 16464,
        "virtualPath": "Soenneker.Extensions.Configuration.wasm",
        "name": "Soenneker.Extensions.Configuration.iih0x6qhw2.wasm",
        "hash": "sha256-qtHvqA4p0XwIwJBAXoyO5anlSUaszYsKNomddJnv+PI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "Soenneker.Extensions.Configuration.Logging.wasm",
        "name": "Soenneker.Extensions.Configuration.Logging.2qp3d9s84y.wasm",
        "hash": "sha256-+lXDh1OLmLBEGeML5qDyH/aoaUOFO7duFY6WQkjb5Xc=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4176,
        "virtualPath": "Soenneker.Extensions.FieldInfo.wasm",
        "name": "Soenneker.Extensions.FieldInfo.qyrads5zas.wasm",
        "hash": "sha256-7iapcwAle+6pzao98HA12vbb2VugflD7I0j+kZKTKyw=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Extensions.Long.wasm",
        "name": "Soenneker.Extensions.Long.epf7sdhygc.wasm",
        "hash": "sha256-vjSuLzxa5cezMhYV2ccjoMGC9rQ50B3Al7ib+JTJsik=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Extensions.MemberInfo.wasm",
        "name": "Soenneker.Extensions.MemberInfo.6czd9wn6yl.wasm",
        "hash": "sha256-2vIkGpkgG7vZw9WiDi6+qLqB4dQOdzOwIU7xhPzfKP0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "Soenneker.Extensions.MethodInfo.wasm",
        "name": "Soenneker.Extensions.MethodInfo.315by3wh8e.wasm",
        "hash": "sha256-N3wTRFxxcL04NbJclNJKCHH0zhPvGcbjDrtEVRSiHss=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Extensions.Serilog.LogEventLevels.wasm",
        "name": "Soenneker.Extensions.Serilog.LogEventLevels.5znpz3yh5z.wasm",
        "hash": "sha256-X2v5vbp00heTMQHScXokds2aZlH7JmEJsEsOOE8ICcQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4176,
        "virtualPath": "Soenneker.Extensions.Spans.Chars.wasm",
        "name": "Soenneker.Extensions.Spans.Chars.p0a38md6ca.wasm",
        "hash": "sha256-ecUWVjdcWvBG+Qc9cWGJSbcSrKMRjRMs1Foc1HRTgNM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.ParameterInfos.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.ParameterInfos.32c1d52emt.wasm",
        "hash": "sha256-tQudGUQPZ4/h9XU75cOGOyY8bwo/by91ENpsNXd7ySY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.Types.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.Types.3a872i0p07.wasm",
        "hash": "sha256-qy/4S6eYkvo9uaJh9ixrEZx7ut5/zcCYoz6kznBGMGE=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 7760,
        "virtualPath": "Soenneker.Extensions.String.wasm",
        "name": "Soenneker.Extensions.String.kwoqcxv0l5.wasm",
        "hash": "sha256-bF8uCXbr+MeEKVKQqpRlFPNll5Zc3AMfkzcoh19+Lts=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Extensions.Task.wasm",
        "name": "Soenneker.Extensions.Task.gy0om060d4.wasm",
        "hash": "sha256-KK/To1CfyhC4clrG3lnijboTyziegqEiZdyyt6WzKII=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Extensions.ValueTask.wasm",
        "name": "Soenneker.Extensions.ValueTask.4vxbf0rx8p.wasm",
        "hash": "sha256-0CDeDVQAtv3X1ueO9u4qMLNViTGY40PPSKWrc2P6B1M=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 25168,
        "virtualPath": "Soenneker.Lepton.Suite.wasm",
        "name": "Soenneker.Lepton.Suite.fs4oro61j4.wasm",
        "hash": "sha256-wdY/jZEIkkTBgb0acRWlslksUGZeOyVHIRucY1wRqk8=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 10832,
        "virtualPath": "Soenneker.Librarian.Abstractions.wasm",
        "name": "Soenneker.Librarian.Abstractions.gxra95jjpk.wasm",
        "hash": "sha256-5Hjp5Tdf6bgQzrsTPQTmcREUI+P1Ul7hSgl2IqMe4lY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 9296,
        "virtualPath": "Soenneker.Librarian.Browser.wasm",
        "name": "Soenneker.Librarian.Browser.wnon1e5s7n.wasm",
        "hash": "sha256-nMVcACc5qDlq5KQD3zB20H4bJmQ6ofAcCF4j6DNB5CU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 36944,
        "virtualPath": "Soenneker.Librarian.Core.wasm",
        "name": "Soenneker.Librarian.Core.3wrs0rwitb.wasm",
        "hash": "sha256-zbdQhtHzA6LbFs2KM87ayHyjFy3DNV+dxr10/REUnYQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Librarian.LocalStorage.wasm",
        "name": "Soenneker.Librarian.LocalStorage.j9mz0plk8w.wasm",
        "hash": "sha256-iVALJvafQrSvloWNSvLhlexvK+IzU0Ka9I72LB7RfM0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 61520,
        "virtualPath": "Soenneker.Lucide.Enums.Icons.wasm",
        "name": "Soenneker.Lucide.Enums.Icons.twha9gobqu.wasm",
        "hash": "sha256-LaLwJy3Z4qgYLFaWNUvAEvZqAP04SOa7hgKEahExQlY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4176,
        "virtualPath": "Soenneker.Lucide.Icons.wasm",
        "name": "Soenneker.Lucide.Icons.gqzqe5hftc.wasm",
        "hash": "sha256-mPb9FnHTyv3wTX3dDRgqIflHD+548g+IcKchXmNHKb0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 482384,
        "virtualPath": "Soenneker.Quark.Builders.wasm",
        "name": "Soenneker.Quark.Builders.5ux27u7lop.wasm",
        "hash": "sha256-zWZFEhzBIXsXyLQFW4zPTg9eHWMsKTPdiyKJbg6ySwM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 10320,
        "virtualPath": "Soenneker.Quark.Enums.Breakpoints.wasm",
        "name": "Soenneker.Quark.Enums.Breakpoints.os7jk731n7.wasm",
        "hash": "sha256-yNG4feYt95LiUcL0DjHkDqftlLKTjpCqyIBm5dCo5Kw=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 20560,
        "virtualPath": "Soenneker.Quark.Enums.DisplayTypes.wasm",
        "name": "Soenneker.Quark.Enums.DisplayTypes.s91ugfdh7x.wasm",
        "hash": "sha256-EOIPsH1lk+qm1QJn5dyfVmE703zb6H5uJcHAjSXDhWs=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 10832,
        "virtualPath": "Soenneker.Quark.Enums.TextAlignments.wasm",
        "name": "Soenneker.Quark.Enums.TextAlignments.skxsokl87y.wasm",
        "hash": "sha256-/NANu8mJW0ogVOb3bTuzRICU18qT0N2do3x7Qm9g2dA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 9808,
        "virtualPath": "Soenneker.Quark.Enums.TextTransforms.wasm",
        "name": "Soenneker.Quark.Enums.TextTransforms.z00fxswda7.wasm",
        "hash": "sha256-455zDUTWUioNgvmXRsU2olnrXH51MbjtRFbGS4+l6jU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Quark.Gen.Lucide.Abstractions.wasm",
        "name": "Soenneker.Quark.Gen.Lucide.Abstractions.e2jgn2oc10.wasm",
        "hash": "sha256-hgOEulijZTofZcilJ3VYGF+30UYne6Ku6VjnSmJ4aKQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "Soenneker.Quark.Gen.SimpleIcons.Abstractions.wasm",
        "name": "Soenneker.Quark.Gen.SimpleIcons.Abstractions.eechxbbc7s.wasm",
        "hash": "sha256-+ilp7bkXoBnI519rMkJr/2k0XbnhpRe62F18uaZKFRc=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4176,
        "virtualPath": "Soenneker.Queues.Intrusive.Abstractions.wasm",
        "name": "Soenneker.Queues.Intrusive.Abstractions.ze7zxiiqds.wasm",
        "hash": "sha256-S/nEY01XbURiBX++3HV9kligPi1kr8UdXoVntH/HnzU=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6224,
        "virtualPath": "Soenneker.Queues.Intrusive.ValueMpsc.wasm",
        "name": "Soenneker.Queues.Intrusive.ValueMpsc.eaqcjtgxce.wasm",
        "hash": "sha256-6igA/QdF97q1ASjB8q7Ol00Urug2Fbg6fWwl6mn+Hys=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 95824,
        "virtualPath": "Soenneker.Reflection.Cache.wasm",
        "name": "Soenneker.Reflection.Cache.o8np52n3ti.wasm",
        "hash": "sha256-6N4hyqC1fq89Nz06MlAbxfj8HFD+AwNggD3hdIHo9Dk=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 15440,
        "virtualPath": "Soenneker.Serilog.Sinks.Browser.Blazor.wasm",
        "name": "Soenneker.Serilog.Sinks.Browser.Blazor.nsscar5gac.wasm",
        "hash": "sha256-Of096TLKfE33uZjd14tY8Zym8TLv3VfiP5SjUCgh2Mg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 94800,
        "virtualPath": "Soenneker.SimpleIcons.Enums.Icons.wasm",
        "name": "Soenneker.SimpleIcons.Enums.Icons.7jols590ix.wasm",
        "hash": "sha256-c89vSlmO7IwbWW2TQtI0Mvym9JFNudTjrIJrivLQTCg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 72784,
        "virtualPath": "Soenneker.Utils.AutoBogus.wasm",
        "name": "Soenneker.Utils.AutoBogus.qgr3p4pag7.wasm",
        "hash": "sha256-NvkuIRZtCQWTbRDRi2y29LY0x+V4eE+INJe0Cw5TOZk=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 7248,
        "virtualPath": "Soenneker.Utils.CancellationScopes.wasm",
        "name": "Soenneker.Utils.CancellationScopes.36j7zz5ygz.wasm",
        "hash": "sha256-NWQpmtxMj+7L3pm0zBfc+aC7p6w8kWejvxpKMAZoSgM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 9296,
        "virtualPath": "Soenneker.Utils.Debounce.wasm",
        "name": "Soenneker.Utils.Debounce.kb82e0md5v.wasm",
        "hash": "sha256-oASuMTqFLCZWxoAEpw14B0DJ4RyKYVS8g2P9Pvsn7IM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 7248,
        "virtualPath": "Soenneker.Utils.Delay.wasm",
        "name": "Soenneker.Utils.Delay.of7rd9g6iy.wasm",
        "hash": "sha256-nDA/gkFFcZ6ikoJ4Y6gtnY3aABz0e3RarcrH+vTYBp4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Utils.Json.wasm",
        "name": "Soenneker.Utils.Json.hgy11itrnx.wasm",
        "hash": "sha256-sR0boHV1mqZyN93hhYgpy8QlKFPJ45bLOLzXk7DEx88=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Utils.LazyBools.wasm",
        "name": "Soenneker.Utils.LazyBools.ble6il78fp.wasm",
        "hash": "sha256-X8X/XSVEfZYCxbsKFY7zF8nmiPeP8kIkkyfyT49er8k=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 7760,
        "virtualPath": "Soenneker.Utils.PooledStringBuilders.wasm",
        "name": "Soenneker.Utils.PooledStringBuilders.50b6h16tei.wasm",
        "hash": "sha256-NXIAqlTkuIEzxbuj7AynqyQXJ3Yx4q1F/9b7Gd+BYww=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "Soenneker.Utils.ReusableStringWriter.wasm",
        "name": "Soenneker.Utils.ReusableStringWriter.8aankmyto1.wasm",
        "hash": "sha256-MGBrsMeGYm7qidWtThRE+ZibssjVmyYiilU9m1KGEUg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 9296,
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.epw3ato3iz.wasm",
        "hash": "sha256-rhnm3AlCKkvEnces8YRqNOz1ArsEYr78dAivNTsaZEg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 27728,
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.tb2vrw6nc0.wasm",
        "hash": "sha256-ibicG3QN+QN9Si0aCvoJowJsz1FmT/iIqA3KNj+/D5s=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 8272,
        "virtualPath": "Microsoft.Extensions.Diagnostics.Abstractions.wasm",
        "name": "Microsoft.Extensions.Diagnostics.Abstractions.c7pw3k7gpl.wasm",
        "hash": "sha256-mGoTbWiv99FJoeOKGurDmGoopfy52pklSKJIvrC6CnI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "Microsoft.Extensions.Hosting.Abstractions.wasm",
        "name": "Microsoft.Extensions.Hosting.Abstractions.bfjwrpc7xz.wasm",
        "hash": "sha256-V6naAUM8v18XnXNqgObSTSTM6WznHbemhjnMlVhfpGM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 31824,
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.05hlmqldlz.wasm",
        "hash": "sha256-/KdRHKB8ljODC4kPZEGcrBXFb0SnUv79z7AYl8e9buA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 27216,
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.pz5lk3qpfj.wasm",
        "hash": "sha256-a45pOSauz2utHFwSYs2QQ1xiqFvcod+oXEGTrquF4WI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 11344,
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.ee9arlg4sw.wasm",
        "hash": "sha256-6kL/AYAU+mLGlRYyBzhido7jr60LA//68qv4u39vm6c=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 10320,
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.qr9z69jp36.wasm",
        "hash": "sha256-NhbwzaaVbjgpS7+OgLRZoo3sFY3iakVaP3Y3tchyTIg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 89680,
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.xs5nvte1vj.wasm",
        "hash": "sha256-30+kXmrurdO3FOmIXM39Lo/04wM/MdggkznZMcg8HxM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 14928,
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.2kr5s0gvx3.wasm",
        "hash": "sha256-wnZZvJLoyMVIZ+p+Yw+gEVyqHDo12Jwoq3ZqtjtQU0c=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 10832,
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.m5eih2se7v.wasm",
        "hash": "sha256-KlFGCa3+SOwkFILw5XK9meLYzQdxlfKcDL/aNAwgAO0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 40016,
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.ldnvny0fm4.wasm",
        "hash": "sha256-53gG2onYdCmwdaqjluM3Zdc+dpRU4DOtbjRwBS1jRV0=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 36432,
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.vzrh5mmc0b.wasm",
        "hash": "sha256-+0TpgKn/a/IbPe2KDK29aXtbY+2yy87hkhfByHrJgME=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 12368,
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.6zzanj6har.wasm",
        "hash": "sha256-XugNE9uHdPfnDDjUOAvhRkD/xSv1dbSi0tdXUj5GjPw=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 127568,
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.5vai9ugg3y.wasm",
        "hash": "sha256-fxfNnu8QzbWKFcNDMDZfnukgMHqqSDvtlrwk+iqXxis=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.jsworeszzk.wasm",
        "hash": "sha256-/dAJev/bBjzvF5m5HAX+Xk7mEjPu9bGAAPKeagaWlxA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 14416,
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.kfedcre5so.wasm",
        "hash": "sha256-UIJi09jkeKUgKuU2+4SRhMFU94E3CjZvSLwQtUsQr+M=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 451152,
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.9fjhfjnelp.wasm",
        "hash": "sha256-a/jtHjqNrmLYfrzWcwcagyRR7nakBWifA5ViZTFO1l8=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 155216,
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.m2uxnikk4d.wasm",
        "hash": "sha256-flWHdVS9CgYL9vmAfLkbAYSK8zUEgl3+ea52zc4yPE8=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 9808,
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.ttocprhmsk.wasm",
        "hash": "sha256-sZ3OLj2mwe0Z85mxCwNZ1NgepxTQ/bcm2qF7I5dE6ms=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.xo8uxrj3dx.wasm",
        "hash": "sha256-f3uj1BQxxMW039f3CgjJTvtAPY734otHoI/umgBViTY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 36944,
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.0q0zt2il18.wasm",
        "hash": "sha256-mCz/wr8scfaj5+0jr55L+wp2URnr2V6JHtqYRuRdIp4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.1jil32f1t3.wasm",
        "hash": "sha256-81OVLSRFq9eiO0fU+BALyjHay9PAgNH5LGYQBdsAlrM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5712,
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.poe6z4m2xv.wasm",
        "hash": "sha256-J/1aPN+FxxTbtAxMIN3gJeVId686kFSMZKU1Z/KTL1M=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 360528,
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.yhew3m9eo4.wasm",
        "hash": "sha256-muNK9UYJtZzGO3pax7VLgv5vXPTnEFMNXUrM+uHByME=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 86608,
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.5hupwfszem.wasm",
        "hash": "sha256-d10b8XjhgjzH8kcEvGD/yW+VHse2HUoBIgqdHi+JfMk=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 16976,
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.nzpzsmir6z.wasm",
        "hash": "sha256-rf3MsSrUK2O8Ip+ZrwCmn1aVSqznKV8wJn4qa2kdJs8=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 173136,
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.4ee8lxcbxx.wasm",
        "hash": "sha256-JCwKZHoqV2bSzrSLwrhd3nhNM5W+yb1gusNCm2Z727I=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 31312,
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.9phy7rz4dz.wasm",
        "hash": "sha256-447zTIX4He7Sr7S11LM3H4MxLMMwadT0eQeXBGCiH98=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6224,
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.2vyoss71e7.wasm",
        "hash": "sha256-gv0UttvU1YL+TtfqRBBkTgHgGZ6iP8vlUy0Hvw7nMVI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 69200,
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.pa9aaj98s0.wasm",
        "hash": "sha256-kVOXNcnRt/FDGXsyaOTr0TPJjIZBzPirYn3/GpYoSzs=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 40528,
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.fzxiq7r6g2.wasm",
        "hash": "sha256-i4KmptO8Bbwl1vMeOUVw2X5lAIm6IE2UwYa1Up5Im7E=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 1321040,
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.7snpmtm8cq.wasm",
        "hash": "sha256-WfHzgZbFbnXClZLQaivYAQ3HOlX8DoUgUVpWEvSaj4w=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.o5iswu9qar.wasm",
        "hash": "sha256-FE1YDBO65ljNeHFd7aBdApaFzz8FKIRrzRQ4Wpz0CxQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 128080,
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.dls53vu1vh.wasm",
        "hash": "sha256-/wCQI7qP8NCyaA2WR9hihnQEH03sX8B8QbmKEu+T7co=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 6736,
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.x6rhzecb90.wasm",
        "hash": "sha256-F+HCZi4f7W6M+ALFPn0PjvrKRK12bTfTIZw7M4egz8g=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.nz9salteiq.wasm",
        "hash": "sha256-bdC1PpJmxf3ZyJvOb+Wneui/29HhIL+ioV0AhV8nmgk=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 11856,
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.t0olvr8z32.wasm",
        "hash": "sha256-3XevLw1IhekweHeoIi0HbPCE3Xa0iFu/cKhwdhgOmuI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.d7d857flfa.wasm",
        "hash": "sha256-JzpbCN9ljBeyBlv7uo43wYPQv8ebSIXbZUD7fFZxujY=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.bd7xui4686.wasm",
        "hash": "sha256-j8k577/5zp9jO65jer9afZsNSCJnm5yD9Hkd4dU15po=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 22096,
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.yw8cutlp4o.wasm",
        "hash": "sha256-3kVd8Xw7lOzjteMviO9Mqzwxdz2EaVciRcldKGudYj4=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.0pk8gtc6hb.wasm",
        "hash": "sha256-xP4rX5pk1asH9qiGUu/GvnmiXhVXvXdIO27+7DYaqcM=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 30800,
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.mf7iq1u5g0.wasm",
        "hash": "sha256-IhS9xDcDiHAVkxzePW5gfqVWEisk2gd2Sq6Lls6qVcI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 460880,
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.cmh1shqnhy.wasm",
        "hash": "sha256-dO+rvQzS8S5m5NDotnXzHhjSjt7Ikf70NYeZL5V87Eg=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 264784,
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.59iuovesf0.wasm",
        "hash": "sha256-F3QYupID7kW1QRKaiyuRV6Uhf6uDRGyCk2HwzGRPQdA=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.xiax8m3res.wasm",
        "hash": "sha256-icMKJ108hEh11RnsAuM5S1k5WQFH+d12Vmp22l/qp2I=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4176,
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.cdvmp88v6w.wasm",
        "hash": "sha256-sJ7x9qNQI6zO1y1cKMOtbGwvY+U/CSx0IjywIjGyNuE=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4688,
        "virtualPath": "System.wasm",
        "name": "System.vasn2s1gvu.wasm",
        "hash": "sha256-BzFYPuXGBhZmBht9/mjpa/UBgs6V7beqeNmnMqh4j6U=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5200,
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.sojvjac6au.wasm",
        "hash": "sha256-lO9LDYpTL3Oc8NavMsM5sA71XxivyO3fP2AUPRBViFQ=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 4171856,
        "virtualPath": "Soenneker.Quark.Suite.wasm",
        "name": "Soenneker.Quark.Suite.i2oo7yni71.wasm",
        "hash": "sha256-JlFLrpV5R2WCKFJx8XnrOQYEu3d2m/oxtb+dX+6BlRI=",
        "cache": "force-cache"
      },
      {
        "payloadSize": 5897296,
        "virtualPath": "Soenneker.Quark.Suite.Demo.wasm",
        "name": "Soenneker.Quark.Suite.Demo.ixl5o5txck.wasm",
        "hash": "sha256-RlonJML/788l/4KHRihY301MIWTo2sMs78tdYIOTzMc=",
        "cache": "force-cache"
      }
    ]
  },
  "debugLevel": 0,
  "appsettings": [
    "../appsettings.json"
  ],
  "globalizationMode": "sharded",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "Serilog.Capturing.IsStructureValueSupported": false,
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": true,
        "System.Diagnostics.Tracing.EventSource.IsSupported": true,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": true,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true,
        "System.Threading.Thread.EnableAutoreleasePool": false,
        "Microsoft.AspNetCore.Components.Endpoints.NavigationManager.DisableThrowNavigationException": false,
        "System.Diagnostics.StackTrace.IsLineNumberSupported": false,
        "System.Runtime.CompilerServices.RuntimeFeature.IsMultithreadingSupported": false
      }
    }
  }
}/*json-end*/);export{po as default,mo as dotnet,go as exit};
