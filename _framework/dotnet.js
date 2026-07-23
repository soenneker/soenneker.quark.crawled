//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"f7d90799ce4ef09a0bb257852a57248d2a8fb8dd",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "Soenneker.Quark.Suite.Demo",
  "resources": {
    "hash": "sha256-JHbUaJdsw0n4AyRbUNyH44v16YZvnsbWmWUD2mq19vw=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.eqq18mejr1.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.web2r9gqbh.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.o9fvzezrci.wasm",
        "hash": "sha256-9LVPL6k1V+7ffOFlZUBZ/sgDqGa3JCs+8eYgggwoyKk=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "hash": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "hash": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "hash": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.xs6yu76bks.wasm",
        "hash": "sha256-8dAeYP1ooz071MHVhHIVl6ljhupDIHU5h6aDO7fhLBI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.exiwokgwkq.wasm",
        "hash": "sha256-0g/4ZdIjwIYAgjIMphd67O5wusXR7A0kEXPkPIrAyvU=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "virtualPath": "Bogus.wasm",
        "name": "Bogus.yn7e1oy79k.wasm",
        "hash": "sha256-sgBQWvDAeMztRt/Zz3kbIhHu0/sWUoKHV/CddXYETlY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.iwpvtj6q7w.wasm",
        "hash": "sha256-4t27udUqZwVgJq2rYw+E/BFgsg+qd6gUpt+MT7hn1lY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.70obyjt5p6.wasm",
        "hash": "sha256-uRPJqTZqpJXb5478lftJnuLWtz8kC3BU7Ek2ixZ04tk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.28bh2kthp3.wasm",
        "hash": "sha256-7opf/jM4LrDW7y+yYg5J/rYBKRtvXTKXpLVIIoIMOCE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.h04o3qotid.wasm",
        "hash": "sha256-UXXPzkWV9AkDpXZnSfA5RYcbmWlLFJZyMdl2OctPoJk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.8bxxhl0mdp.wasm",
        "hash": "sha256-5MtFQNuGkbp9GtbdlNoyZBDTLhLGehzR1x9qa+PHmWk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.tpqe78u6u9.wasm",
        "hash": "sha256-P5rBqbQN+VvS3ikrK7kC5YfvLqNra+K7cYt3iKTerXk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.0bo4vfq7rz.wasm",
        "hash": "sha256-9DAgRXcHEHa2Qyakp7FHzxaF5JlFvUgTI8HtrYCMU+g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.ixktlrimdt.wasm",
        "hash": "sha256-NjAIjIQlITJK5e/1cNjeMLBSuW2yXbc3mfYPnlQU0WU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.b9mcrj62ry.wasm",
        "hash": "sha256-Uf2OoF4AD/nB8bEP9+Vtasx3otZscbwOarFh3Uu7bQI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.7yxaqdf70b.wasm",
        "hash": "sha256-odcBJjbIudGV0uKMuC9VszpNiMXLQ7WlHcGllnKtKc8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.petruk80e0.wasm",
        "hash": "sha256-XwQQvE4BMZWbBjZYxq7UXS8eDytDYtaVJ6Q7Mr1gJec=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.z2eefbifzl.wasm",
        "hash": "sha256-y5mb/CehV9x2Rx0kW+SW8p8MjHtJYOgwLW6t6naUeY4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.7casl6plax.wasm",
        "hash": "sha256-VwAAxIhZBnhgVKckxEYo0QJ6+mAQ4dfVvMkl8h0fqUU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.yxjt7vtatl.wasm",
        "hash": "sha256-ymLJ18O0TWi69zlDhVo+NpMt34Z3v1+9qEyGdf3sJFI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Validation.wasm",
        "name": "Microsoft.Extensions.Validation.i1jbpxa1yw.wasm",
        "hash": "sha256-2g0xbalavoKn33M6IeoFtrs+NrsKZRzARVqX7WWXWeY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IO.RecyclableMemoryStream.wasm",
        "name": "Microsoft.IO.RecyclableMemoryStream.k69j9tcsp2.wasm",
        "hash": "sha256-PLLNYyORp9p97V0x5KgrbBal9u/7enJGj68o7bI3pgU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.w8nurcj68t.wasm",
        "hash": "sha256-0NNGIxcEwIfeyLQi/odjyG/GHS2GjJ0miea6RtnTFeU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.5ydn64ly88.wasm",
        "hash": "sha256-Xcxd+z/8v1MjYI/6IsNgJ46ifV38aKmiGyz4RR+L0ms=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Newtonsoft.Json.wasm",
        "name": "Newtonsoft.Json.jcjjiqe038.wasm",
        "hash": "sha256-s8KVuknfxWl1cuDvQM/OnpBfnpM1rxzvzq21S1cF36U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.wasm",
        "name": "Serilog.4fc18v83x4.wasm",
        "hash": "sha256-IBl8lnCvAbF1ByJqcc9Mrpw4n3JgOxIuA5Rff/hTuWA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.Extensions.Logging.wasm",
        "name": "Serilog.Extensions.Logging.4aarm1ia2h.wasm",
        "hash": "sha256-NHk6xRS3dIv7nLWuBUZvce3EXz7kvxiBsrjE7KvSMcI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Asyncs.Initializers.wasm",
        "name": "Soenneker.Asyncs.Initializers.50i577kgo5.wasm",
        "hash": "sha256-ZQ0f0BYUWjslBBcqIYsEOq4O2+HL7DA+9gxG5+IuZto=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Asyncs.Locks.wasm",
        "name": "Soenneker.Asyncs.Locks.1nyxd8ywpl.wasm",
        "hash": "sha256-nZoPKvM44CBHRG2aKyqdGEoSMByN52XUZdoH59VV5Mw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.Resources.wasm",
        "name": "Soenneker.Atomics.Resources.h82e8f1ri9.wasm",
        "hash": "sha256-0XaMyFYQbBhATWk57lvJ3s3gA3OvoJe8RXAnWCQjpXY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueBools.wasm",
        "name": "Soenneker.Atomics.ValueBools.r4j852a3hu.wasm",
        "hash": "sha256-29/Ve33t7NgERREMW9TzcwN4dfFAR/rBeKHPWApQAaQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueInts.wasm",
        "name": "Soenneker.Atomics.ValueInts.cvbyp958n6.wasm",
        "hash": "sha256-mD0V1e8iU9xXNRnX6vwe0UDdHreOr8SrOPUPUWibkbw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueNullableBools.wasm",
        "name": "Soenneker.Atomics.ValueNullableBools.bf1cehadts.wasm",
        "hash": "sha256-yds+bx9eQP2hnExtUsHVDRZHuCS0VwuhQgPH9YlaKa0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Attributes.MapTo.wasm",
        "name": "Soenneker.Attributes.MapTo.ngc5shaob7.wasm",
        "hash": "sha256-qREW3zM4XunBGHk+uz5w3T+I0yb1fhYru4KbnUmBv3U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Attributes.PublicOpenApiObject.wasm",
        "name": "Soenneker.Attributes.PublicOpenApiObject.jti3rvhz5f.wasm",
        "hash": "sha256-BykUE84I/NAjXl1MIidY5ox7VN6OtmoqqryUznb/nSI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.C15t.wasm",
        "name": "Soenneker.Blazor.C15t.uf5wpspj3d.wasm",
        "hash": "sha256-ityvWZ2DOxVXLWi/V5lPxC4rOzZP/Xfefm5VKd4RWNU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.CreditCards.wasm",
        "name": "Soenneker.Blazor.CreditCards.iv2sdscx8i.wasm",
        "hash": "sha256-cuU5MZcQcG3WpEv+YBYP80p5ANQmVvNPU6ofkuhi/n4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Extensions.EventCallback.wasm",
        "name": "Soenneker.Blazor.Extensions.EventCallback.n6douwu5v6.wasm",
        "hash": "sha256-v9bo77DGiWVf4XFbJrcrvVbdvTFyE87np0L8h++i9JA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Interops.Floating.wasm",
        "name": "Soenneker.Blazor.Interops.Floating.6p3nmw62cz.wasm",
        "hash": "sha256-eqhXl1cGHf8NgIG/tJmdoOZOg7+0UCrG44RUoovADW8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.Clipboard.wasm",
        "name": "Soenneker.Blazor.Utils.Clipboard.l1rozo6adz.wasm",
        "hash": "sha256-Fx6sE94GUrfpy4Heh85pwvirJJeQhHCkIWvm2MGT/yo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.Ids.wasm",
        "name": "Soenneker.Blazor.Utils.Ids.c6hcechfgt.wasm",
        "hash": "sha256-9C/5u5cYVJcYbL9LDyEp7vDPkm41qg+/Q7LudKe5Yzo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.JsVariable.wasm",
        "name": "Soenneker.Blazor.Utils.JsVariable.5bis5hhuf9.wasm",
        "hash": "sha256-TxuoWficx8ywbd22HszcCADqGhe6cNEENppH+C/InJY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.ModuleImport.wasm",
        "name": "Soenneker.Blazor.Utils.ModuleImport.tu5x83lilh.wasm",
        "hash": "sha256-G6ClJePnOCjHF55ny18tuzHcjJJ6xq+YscnyftlVgTY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.ResourceLoader.wasm",
        "name": "Soenneker.Blazor.Utils.ResourceLoader.pelrlvnw7c.wasm",
        "hash": "sha256-39k+hkkkR5fajjtBIIxkPoVDyNiuPMkuXa38uZeu/xo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Bradix.Suite.wasm",
        "name": "Soenneker.Bradix.Suite.k6hgpgnmm5.wasm",
        "hash": "sha256-BFyrFyDl7uP/bN84JgBFc0vEFl+pRdzzhjICx21s87o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Culture.English.US.wasm",
        "name": "Soenneker.Culture.English.US.vb97oz4rqd.wasm",
        "hash": "sha256-+65rBBrZqyMYDD8C3AfYWqYLxv71Cg0ffemNIZeHQ3k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Dtos.Column.wasm",
        "name": "Soenneker.DataTables.Dtos.Column.fuuhcocslv.wasm",
        "hash": "sha256-Z2KEUhkqY88WLhzBqy0yeDbQXFf1iQIB08xon1mxhd8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Dtos.ServerResponse.wasm",
        "name": "Soenneker.DataTables.Dtos.ServerResponse.u7qu80p87b.wasm",
        "hash": "sha256-xoe/8cn6tpf/yBk6i/6EWeqwba1PEvDXJSxgXaYiOs4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Dtos.ServerSideRequest.wasm",
        "name": "Soenneker.DataTables.Dtos.ServerSideRequest.5t5fdl9o14.wasm",
        "hash": "sha256-KfwlF81J7vw5Xh2MLm+loevwWpAwnLdUfhnMlbE7IkA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Extensions.ServerSideRequest.wasm",
        "name": "Soenneker.DataTables.Extensions.ServerSideRequest.34pgogndfc.wasm",
        "hash": "sha256-I+uvx95jsd4B9n30HgZGEu1G0GS4ed2AT5lTqsnzPe0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dictionaries.SingletonKeys.wasm",
        "name": "Soenneker.Dictionaries.SingletonKeys.x9ta7cub8d.wasm",
        "hash": "sha256-S5bYuj4d6yyQLvH2mQ2y7kA4cj10N5c0NNGMTID+wiQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dictionaries.Singletons.wasm",
        "name": "Soenneker.Dictionaries.Singletons.6cyu4uwj7b.wasm",
        "hash": "sha256-VoVfwMvDned/5Qskx0LnO65boSZA6fMQBl3rMcTdC20=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Filters.Base.wasm",
        "name": "Soenneker.Dtos.Filters.Base.yz8navqra9.wasm",
        "hash": "sha256-ThNBANFujzZSc5Dcxbabzl31jDhR0H8S2lcFqzfdKNY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Filters.ExactMatch.wasm",
        "name": "Soenneker.Dtos.Filters.ExactMatch.2nvx7v31cb.wasm",
        "hash": "sha256-btGo5km1y292gHuc4Nzwc0jzroxJIsF9fDgQ1rkWU3M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Filters.Range.wasm",
        "name": "Soenneker.Dtos.Filters.Range.c8w9d92a90.wasm",
        "hash": "sha256-bJwpDeexcH14vagRXkiWeCPvQtOtwKKvPyqKl09Z9IM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Options.OrderBy.wasm",
        "name": "Soenneker.Dtos.Options.OrderBy.wfwx4x7aj5.wasm",
        "hash": "sha256-hEWDHT3ljS3pcj/QL2kC/mK8h+F1FtvB3X2tMmXcEug=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.RequestDataOptions.wasm",
        "name": "Soenneker.Dtos.RequestDataOptions.p6sh2t476b.wasm",
        "hash": "sha256-8X5Whp8UF8UFrOoIkOVnwtdry/FTnS5DWOSh4LctmFY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Results.Paged.wasm",
        "name": "Soenneker.Dtos.Results.Paged.4wf3yd3o4b.wasm",
        "hash": "sha256-zKa4tTKJzjvu2utLMCgSdJmcyP31iMAnuCKiGaLBpkg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.ContentKinds.wasm",
        "name": "Soenneker.Enums.ContentKinds.lxbblcwenp.wasm",
        "hash": "sha256-14kJKWfo2bGp2sqALhT2J17z2Yf3ZX1ytEOLqmG+31s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.InitializationModes.wasm",
        "name": "Soenneker.Enums.InitializationModes.gpmso2fstb.wasm",
        "hash": "sha256-DE61YoezCHmszvy1jXstcEYFLxHy87RHvfL0FxxKink=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.JsonLibrary.wasm",
        "name": "Soenneker.Enums.JsonLibrary.wjyo35ky0e.wasm",
        "hash": "sha256-7Js95FBj5ucp51o6YYr7TgFi0214VfAmqVVC8S59yKI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.JsonOptions.wasm",
        "name": "Soenneker.Enums.JsonOptions.t22mvz04r0.wasm",
        "hash": "sha256-BZ/C9m+yBQ9SnFcjaQldBIdAZRRSgrEREqo/95pArT8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.SortDirections.wasm",
        "name": "Soenneker.Enums.SortDirections.2ufel3rvex.wasm",
        "hash": "sha256-qtg2Lrn/q1ppHyssW3JkmUuV4IJXxGZvQrT3XTvy5fU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Arrays.Bytes.wasm",
        "name": "Soenneker.Extensions.Arrays.Bytes.j8fnc16uue.wasm",
        "hash": "sha256-HUM18AjODO6PzHS2IRM4vyrHS+ZYe1nljtzeiqmi4Z8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.CancellationTokens.wasm",
        "name": "Soenneker.Extensions.CancellationTokens.yewim9jyvh.wasm",
        "hash": "sha256-mr5W1Vgx5jMjZbh5anP33E6ycP3pDxoceGn4AnD1Lko=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Char.wasm",
        "name": "Soenneker.Extensions.Char.od89q29vxx.wasm",
        "hash": "sha256-VHsTtOiUIYS4M77Au+gZK1fC0ziDk+z7Gtx5cmmIVQw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Configuration.wasm",
        "name": "Soenneker.Extensions.Configuration.py1s0q03u4.wasm",
        "hash": "sha256-8WAhFN9mUn5WrDfWxucOS58QdA2pO9F3w2q8Fb1l4c8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Configuration.Logging.wasm",
        "name": "Soenneker.Extensions.Configuration.Logging.wmbfera4f8.wasm",
        "hash": "sha256-qKLfgUOK5vA3y0afCMI+FLFS/QQTScTbXuCxsiG5qQM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Enumerable.wasm",
        "name": "Soenneker.Extensions.Enumerable.0pqrdn9b50.wasm",
        "hash": "sha256-HAch8YJDYqaej2oCPU2qpMq7d37Zn07aHaayiRq1e8w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.FieldInfo.wasm",
        "name": "Soenneker.Extensions.FieldInfo.978g1csvna.wasm",
        "hash": "sha256-e6E8VtqyRYzfPjBU0oPOUQUJ38boKbKuIaZjq/mw17w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Long.wasm",
        "name": "Soenneker.Extensions.Long.gach1ur5ch.wasm",
        "hash": "sha256-eCGDBRHcca9Cm5IwRTJnKdsuNTzflzvdnZxvJhsdRCA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.MemberInfo.wasm",
        "name": "Soenneker.Extensions.MemberInfo.ec9mwltpv2.wasm",
        "hash": "sha256-znyjLQz2zwVo8qUBHwvzfSzMv4bh8v5oY4wyjm+YhQA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.MethodInfo.wasm",
        "name": "Soenneker.Extensions.MethodInfo.wl4bw70mc6.wasm",
        "hash": "sha256-FAjUMwCHAkwa5iyLo/Kwfb0ljy/Rb2fH+zJyCyWbvyI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Serilog.LogEventLevels.wasm",
        "name": "Soenneker.Extensions.Serilog.LogEventLevels.nh8t5hh0iq.wasm",
        "hash": "sha256-xRY8QoVnmYPW7eWAO9dUe1l2xlF5E2/PvwaFve75MeA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Bytes.wasm",
        "name": "Soenneker.Extensions.Spans.Bytes.airj2bxd32.wasm",
        "hash": "sha256-ArC7vtLf5i4e5TPylGafxsZTWfxhs5rlUkGaeXMIOSI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Chars.wasm",
        "name": "Soenneker.Extensions.Spans.Chars.22d2qtayka.wasm",
        "hash": "sha256-ZkN4swlmjR35E5rLPB/UCdGMaBlzCarGJ/id4eKLPs4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.Bytes.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.Bytes.k75lz3kfgb.wasm",
        "hash": "sha256-oPxO79FL1cwYpwuDdbsvYj7MIIWz3ycHAsooUBFBlgM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.Chars.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.Chars.qi8x1qveyq.wasm",
        "hash": "sha256-YmKaLDqUjYMktB6yejg5FUTOx3inHPHWzTbo8+kr7TI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.ParameterInfos.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.ParameterInfos.g6y1tdpasb.wasm",
        "hash": "sha256-SAQiwoGLllkMP6bPUPxSMAJ8Ofm+jcUmLD7tHpTQadE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.Types.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.Types.pqpwc1c13w.wasm",
        "hash": "sha256-UXpbwZQcGJQD7YDnMROGPdOZeqo9viJxIers1APbI9I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Stream.wasm",
        "name": "Soenneker.Extensions.Stream.fh8k08e2ry.wasm",
        "hash": "sha256-8+cl18RE5shon+6lUtAu+t4LG1koLEzAj3492XfG0AE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.String.wasm",
        "name": "Soenneker.Extensions.String.py9vkybzbg.wasm",
        "hash": "sha256-z+9LaUwVLIbsKJvcYXFvuxK60nz5JhSsgEYsO3Gld/c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Task.wasm",
        "name": "Soenneker.Extensions.Task.puripch6g1.wasm",
        "hash": "sha256-gVY3CWzgVSIGDcTWF5pZHE22dVDWa/ZPKyRXOaHzR20=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.ValueTask.wasm",
        "name": "Soenneker.Extensions.ValueTask.fixr580jkg.wasm",
        "hash": "sha256-Z+d7GlfIDodHC0nZpy+bf80HhJ3H5VnJK9wdAPyJgbA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Invocations.Actions.wasm",
        "name": "Soenneker.Invocations.Actions.hm0tcuf5gn.wasm",
        "hash": "sha256-aZz8RB0hfZFGwXmA5AUfT3A4FLIjwky/thAMe+3cXSg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Invocations.Funcs.wasm",
        "name": "Soenneker.Invocations.Funcs.hustmbup6b.wasm",
        "hash": "sha256-t8YXhXoUebvmv+H0sqfjFcGIxw7Dj4GlRvSgj2xGqe0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Json.OptionsCollection.wasm",
        "name": "Soenneker.Json.OptionsCollection.6lfht1gs9w.wasm",
        "hash": "sha256-KkrXVOxzQOg/sWTj3WaXIVcHar2bQ+jszyX8woemypg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Lepton.Suite.wasm",
        "name": "Soenneker.Lepton.Suite.c6fhgrao2r.wasm",
        "hash": "sha256-7JzfKM8s11+ih8wozfHB/TNR1+uZDqOmvTETcIDLo0s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Lucide.Enums.Icons.wasm",
        "name": "Soenneker.Lucide.Enums.Icons.mlf1gnf6un.wasm",
        "hash": "sha256-xr4eItAFIaDqq1fuyEMsR6c9koFmSYnCDs8pw3rt0qU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Lucide.Icons.wasm",
        "name": "Soenneker.Lucide.Icons.m0rs4rm13m.wasm",
        "hash": "sha256-xufOmSjMSHh2yiRJGpRKu3jZsDR4+Ol8nSbpX/OvHow=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Builders.wasm",
        "name": "Soenneker.Quark.Builders.nvg67smxg9.wasm",
        "hash": "sha256-85FXXX6mebRlc/sWOpvwAbJcxq2cH46jVQJa5g9Q2Fw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Breakpoints.wasm",
        "name": "Soenneker.Quark.Enums.Breakpoints.gdqzc0jusw.wasm",
        "hash": "sha256-RKzCYGIxJ/JykIuy6mf5G4CGHeI7U5koeRtnxfBx8bw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.ColorPalettes.wasm",
        "name": "Soenneker.Quark.Enums.ColorPalettes.w3nlpas4lv.wasm",
        "hash": "sha256-xLYFVD2vC17ETnIdbCCJBKXGN8ezuUl2aVd4PxshRL0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.DisplayTypes.wasm",
        "name": "Soenneker.Quark.Enums.DisplayTypes.1h8syoosb0.wasm",
        "hash": "sha256-5VtuOZiWAAxbTV1orVIP4a5OkR49ZWf1k2+GU9yf5qM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.FontStyles.wasm",
        "name": "Soenneker.Quark.Enums.FontStyles.sn1rscoucn.wasm",
        "hash": "sha256-KI2NGLeR47oGPLtcmQnejyZV4AATq36qs7V/lt27xhQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.GlobalKeywords.wasm",
        "name": "Soenneker.Quark.Enums.GlobalKeywords.r9bzzkuipu.wasm",
        "hash": "sha256-z1ZEIFsg43EdbIdLxrPLNhhxS2gRlC2yR1OFr2pN/3I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.HtmlElementTypes.wasm",
        "name": "Soenneker.Quark.Enums.HtmlElementTypes.kshqsuqqui.wasm",
        "hash": "sha256-bC+gwxMbv13mWDgOVooHfeGKEfLFo0U+9A3QOinb+C4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.ObjectFits.wasm",
        "name": "Soenneker.Quark.Enums.ObjectFits.n1kql0i2u0.wasm",
        "hash": "sha256-+7yGgWd7BTQrw+Ea2MMuHVUx5buvURC4G+YzRMAKkZ4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Overflows.wasm",
        "name": "Soenneker.Quark.Enums.Overflows.hv5qk2w1a3.wasm",
        "hash": "sha256-w0OBHC3XwjWQ38QgDv6v3hONbDFgdr1vJCDtRKEvkCI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Placements.wasm",
        "name": "Soenneker.Quark.Enums.Placements.xe7ieuv3q6.wasm",
        "hash": "sha256-CazCaDYZu7cIIr776AoenA1WsRzyJD7CQgbeMDE5TP4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.PointerEvents.wasm",
        "name": "Soenneker.Quark.Enums.PointerEvents.mqul0l3tyx.wasm",
        "hash": "sha256-Io1Q6rfdoKPI2QBXvTIx9Ll+9SBY6xyKoehRoVskx/w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Positions.wasm",
        "name": "Soenneker.Quark.Enums.Positions.ql6gdip1km.wasm",
        "hash": "sha256-bgqrjdTBouNvYLYSotvVGKBjFR75OP8D1Cbju7cGNPo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.TextAlignments.wasm",
        "name": "Soenneker.Quark.Enums.TextAlignments.gicgyritjb.wasm",
        "hash": "sha256-qE7yNpTKAe7PU6ZsvDQHUN2AbSoYeo1wIDnY9iMzAwk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.TextBreaks.wasm",
        "name": "Soenneker.Quark.Enums.TextBreaks.amhn6putbg.wasm",
        "hash": "sha256-8qLgZoO9tzo5akV47ice2+mEbMUFxArZKTeH5PY8qcs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.TextOverflows.wasm",
        "name": "Soenneker.Quark.Enums.TextOverflows.e5hy1d67mo.wasm",
        "hash": "sha256-UqAQz35urvJPLHMvgRsQq71ROO1EV3v2BWRLRc8R8XM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.TextTransforms.wasm",
        "name": "Soenneker.Quark.Enums.TextTransforms.01qyohlkp8.wasm",
        "hash": "sha256-vPv4rYLhoJOxXIfjlf0IN60vGjSvnIgvwfB6MWPnQR0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.UserSelects.wasm",
        "name": "Soenneker.Quark.Enums.UserSelects.3yor3mitto.wasm",
        "hash": "sha256-9e27XOgrGHOPkZGoVmhTnN41nj3OWKqCUyntSFxrI3Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Visibilities.wasm",
        "name": "Soenneker.Quark.Enums.Visibilities.puseeeld6k.wasm",
        "hash": "sha256-kd/R9KSjcVJ9A/4OHRs1hxBE3GnQhCGcP1/el73gJ2Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Gen.Lucide.Abstractions.wasm",
        "name": "Soenneker.Quark.Gen.Lucide.Abstractions.babquzhiga.wasm",
        "hash": "sha256-o5Wg2DVeTDovRl0UjZVzzV8gP+kDNgFnArK8S6tt1Rw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Gen.SimpleIcons.Abstractions.wasm",
        "name": "Soenneker.Quark.Gen.SimpleIcons.Abstractions.uxa4zawezf.wasm",
        "hash": "sha256-Yvu2s0mLhI9pugju2EjfPzMO7QW4/tFb17JeC1/Neds=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Queues.Intrusive.Abstractions.wasm",
        "name": "Soenneker.Queues.Intrusive.Abstractions.9982ejzitx.wasm",
        "hash": "sha256-s798SQqG1ZCgGlBZRXlZSM64aokOif4RLps6hgDS1rA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Queues.Intrusive.ValueMpsc.wasm",
        "name": "Soenneker.Queues.Intrusive.ValueMpsc.roj1um0adu.wasm",
        "hash": "sha256-FXDACXPTQYy9xgNLJqhdq1yOvjpBjQHRqcaeGbCi994=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Reflection.Cache.wasm",
        "name": "Soenneker.Reflection.Cache.dxspqsxexk.wasm",
        "hash": "sha256-sTiQAzUxXtpuklDC9sscM9jI1w8xiUNdPU2CsgcfWdk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Serilog.Sinks.Browser.Blazor.wasm",
        "name": "Soenneker.Serilog.Sinks.Browser.Blazor.u7wlryvmvd.wasm",
        "hash": "sha256-pjZDnOrVhIPJm00AOJ5g5qAmx9YvZl3kS00s768GvyY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.SimpleIcons.Enums.Icons.wasm",
        "name": "Soenneker.SimpleIcons.Enums.Icons.l9jtobb549.wasm",
        "hash": "sha256-N+WJyYRNIZaCzJRmGpDxC57LcB7q6B6kH7a57N9QNVI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.SimpleIcons.Icons.wasm",
        "name": "Soenneker.SimpleIcons.Icons.g1ljltmd2m.wasm",
        "hash": "sha256-RFp7xkk/YVFUC5L3f+hbaOgCSUAil24aOObl3iZ349E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.AsyncSingleton.wasm",
        "name": "Soenneker.Utils.AsyncSingleton.mwbj0kelhb.wasm",
        "hash": "sha256-+kxCG686xIaJ7yQkBOsBRtm+JLN9MoCS54m452BdONU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.AtomicResources.wasm",
        "name": "Soenneker.Utils.AtomicResources.8fsc97rhhe.wasm",
        "hash": "sha256-5C88G2jtzmEZmjvsSTnICAbWrd9MqhiFelWTOdduMTo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.AutoBogus.wasm",
        "name": "Soenneker.Utils.AutoBogus.j4hiy2fdub.wasm",
        "hash": "sha256-MwH/NFpXhMEBTSX9Wckv2/Gt+ytEQb4sb5imRiqiB7M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.CancellationScopes.wasm",
        "name": "Soenneker.Utils.CancellationScopes.o3j61c7jqa.wasm",
        "hash": "sha256-NCd4/Bb/fAZyKTmwLeDO47SJ/oIw23p6nywl8Yz23kY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Debounce.wasm",
        "name": "Soenneker.Utils.Debounce.0gdl2lxitl.wasm",
        "hash": "sha256-UH1U7TfsjZFA16Cxi70nMS3Aywjidjng6Y+uTNq92U8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Delay.wasm",
        "name": "Soenneker.Utils.Delay.pyqqfqbsge.wasm",
        "hash": "sha256-/y2rmtIBmibr/ZLMghghPARVFyBz+RVwSmnzNJrNXFU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.ExecutionContexts.wasm",
        "name": "Soenneker.Utils.ExecutionContexts.8tmqru4b8z.wasm",
        "hash": "sha256-/CiTFDDP+XZne4Yv4GqnzVLvXjlV3VGHgUufr0Sy+50=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.File.wasm",
        "name": "Soenneker.Utils.File.7jisdjcorl.wasm",
        "hash": "sha256-LZq6kxM2pfLsWBdySVDl/o8aIEujp0ml1Hk7WIXx/ac=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Json.wasm",
        "name": "Soenneker.Utils.Json.4y45f7nfnf.wasm",
        "hash": "sha256-tDxOlvSO2kbfTGgBA7cR2roSK+6egSfFI0t2fazOC5E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.LazyBools.wasm",
        "name": "Soenneker.Utils.LazyBools.1kbqparb3i.wasm",
        "hash": "sha256-/7HDSh3lcSHLiC0Wg1sgVDQWEek+VsSdlhf46Lg7J5s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.MemoryStream.wasm",
        "name": "Soenneker.Utils.MemoryStream.lmw09ykj9u.wasm",
        "hash": "sha256-0+kB7WTUZQm4wPq0qq9dV6XXz4qq/u8Mump+I9jsWI4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.PooledStringBuilders.wasm",
        "name": "Soenneker.Utils.PooledStringBuilders.x04y3pq3c9.wasm",
        "hash": "sha256-4Y9hF6yJsnkC6903Tr8XXS4vTY6rPfSye7Sg72vApV8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Random.wasm",
        "name": "Soenneker.Utils.Random.ljexcc5jn4.wasm",
        "hash": "sha256-H+yD8gpnkOvVrvkzVIC4KRwFuNtNhSTzezl36VbZw2E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.ReusableStringWriter.wasm",
        "name": "Soenneker.Utils.ReusableStringWriter.x9lj5z1pld.wasm",
        "hash": "sha256-ddMOGbbEIrJjhNjMk8XmmL26pNlfayW6CZlvQ14xTiQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Runtime.wasm",
        "name": "Soenneker.Utils.Runtime.12ehcskvpk.wasm",
        "hash": "sha256-ad25Yfh45rElcjcPGc87OaVlQ9PiOtBe+wQBRjLjXzQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.d2mbngq7kc.wasm",
        "hash": "sha256-i6SgAK1F0PrlSZpdyRX+UqxxfqVBrg2pgws75+pld/s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.h9odcxrvbo.wasm",
        "hash": "sha256-6yNIqeHFmw2AInikvhtkABNuoHR9jY8UWrvSrJ/LwJk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.5k5gvqatmn.wasm",
        "hash": "sha256-JYegfiMe2CgMkccNfl8k71Qua3I1I+T1GCFsF46yJKA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.odhq5yl8tx.wasm",
        "hash": "sha256-fBccA0qWTYZfRWpE+b3XdVPLjLuUooK7Z190v8OCHEk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.uxzob2hub6.wasm",
        "hash": "sha256-DnHQhxb05vrPrsZHsrcyOhQH6t7QHx9FiPOCxaxbbQc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.tckv1j8l8g.wasm",
        "hash": "sha256-M/pJh7FF+Oej4VSUq9dXioIsECgYjcEliAUG9I0a+MI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.iqu486xn78.wasm",
        "hash": "sha256-Ztuv+la7A3u5zZPaqUx9ytE2x9FURdbsQdAjHOc5QOU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.04j3g0e669.wasm",
        "hash": "sha256-gPPug4o3kIkfTOEKSCLr869BM1HoSXjjqnBXQ2bv5Kw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.eh6tfswo7n.wasm",
        "hash": "sha256-EiXqIWqeXQ1LgC+rL2SodZbkb9yyDzyhYCvc57td260=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.ejevkr3409.wasm",
        "hash": "sha256-WmtAQESEnRlgy6cf9wq9Ara3dePY6YSWe+uFuPESbrY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.5w8cygkagp.wasm",
        "hash": "sha256-++X1ItooDDP+W8CHf2R/TmZ1/7gVPXb6RoKEqWiQpE4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.iktp04fshq.wasm",
        "hash": "sha256-Dh7pIkRfpvLuX+B3DTadpvdilRopn8qeQ0NAuxDV0Oc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.kivs2vmtx5.wasm",
        "hash": "sha256-jEx/CbtU1/IIlRrRvzVJbisVChBkgC5ioASXHD6tt3I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.vpplgg7i01.wasm",
        "hash": "sha256-c7XxGdglDx8K5ptGokyDDzPU/NWPHyekDfZYo/cMor4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.x7yycyl2ea.wasm",
        "hash": "sha256-vQXlZw+WGL49Bd1PR3ZWFVMXv84RDl6R81nXQE/cR2w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.rgbnv7qr16.wasm",
        "hash": "sha256-NQu5Ll5Dzlm9W4jn3lBUsGljhgufQlg7mvxf2SrggoU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.fguc99srv0.wasm",
        "hash": "sha256-0e2aBibUB23f9KpiyrADoRVC5LGftAaBzjSFQ4jfIro=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.uznrqn6wwr.wasm",
        "hash": "sha256-xtdOKQZpNum4/1xVdvHxEcE6rSiRpnADTbN3z/ut9DA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.k7tcpifzgv.wasm",
        "hash": "sha256-4A8q9ilt96kfE/ReoyRVkQO+IVMEfgyAn9oUxfAMGX0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.e9ex1klxez.wasm",
        "hash": "sha256-csdSp9QdyAI+RfY0/1+GhOCkWYpezlsAOlohtafScf0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.05byix4gj1.wasm",
        "hash": "sha256-5CJ8e9tm0yNkVhxykUhksLeXtS1Yv/3uBLKzKRBsFPE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.3ypja7iwps.wasm",
        "hash": "sha256-G/DIvn5GjLgRwqblp41QihVyBkyU5poTVobcjjp98bQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.12mtpyjo4j.wasm",
        "hash": "sha256-6cUTo3ZszS5VhxwzUEmCVsN5ABiK+QpVpK9mKxNd6J0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.csnoomy97p.wasm",
        "hash": "sha256-bB6OHIhPMaNg6SvZWoJtL/j/zwIwXBqW/SuU660Z+Ro=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.4bj2aaqv9j.wasm",
        "hash": "sha256-wB99XeBl6GKSg0bcg5O5sN1aehapohYsigfGdSwZKGg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.i7ao4k4hnb.wasm",
        "hash": "sha256-rh2OwdArhLkNCF9f26D2mO+DY6xdgNn6tENPWcx1ttA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.n5y5zgjfdg.wasm",
        "hash": "sha256-1ZB/mo7+IxnA7SLaiUdt8JPfGl/uodbjiCSKvKda1lc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.pyeelb9qqg.wasm",
        "hash": "sha256-v2vibckK4bfyZ0QNp0sb1xDKIJBXIjhWYmKTQnhNtB0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.zcp2n2i7ds.wasm",
        "hash": "sha256-44sUVnJiFHxlB2U+xDlEam5rjiJveh7Qen+bX2A+IuQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.6n0zme69c4.wasm",
        "hash": "sha256-AlwoS7lmuxVzz+JVwEHJGXgFHhp22BPataSHTYdY2a4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.bo0rur2s82.wasm",
        "hash": "sha256-1Xl/3Gyr2Tvvdsv86jaDkTBKvyvjQZ7yOxoLOt0V5dc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.xhui7c72ss.wasm",
        "hash": "sha256-G459sOibnyzMLdwwjxtCpV3MFXN5ZVEILtVQaf8royw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.p6j2xrwqcd.wasm",
        "hash": "sha256-oVpjkCrt29RLL6Gl0KKYyb6otjVwKhDRtO2pQH0+qBY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.vpriezzar7.wasm",
        "hash": "sha256-00Z9DmQJmf5bxTp4A83hD0NcLRpGtI3pjSj2tk8ILFg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.qjj60n7aaf.wasm",
        "hash": "sha256-iqvYd2lRP3mPnVru/62/R+5En19ux1P/P80Z7XmvXdg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.vbfh8c51wt.wasm",
        "hash": "sha256-2692kJoZ/SEXcs+P2ctUutDiPynhux3woLUH5KIWe5k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.4cmrtz6fmz.wasm",
        "hash": "sha256-LI0+7n8SaHWpSC5WGK/hhQemJSpxtPVnrJ29xjtqUJ0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.8c86omsr87.wasm",
        "hash": "sha256-SOC/CmTUM+G0zSbEr/3s+nhgI80xiw0pDWEarnt5er0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.zswydz4t9a.wasm",
        "hash": "sha256-bQwr0yZ2Vy+E57aGNk84lo2p2tH+APqeqqQ0ZmhIEi4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.skis8vo92f.wasm",
        "hash": "sha256-DPFyn4hN8Rt9TIv25E1CtVqcbVM7peLkUciWjPlmO4o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.mrdtwx0s7v.wasm",
        "hash": "sha256-8i5qXzTa+Tot44FZn9ijiqgJEEwMXE41ySRtZ3toHWw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.pav5sfey40.wasm",
        "hash": "sha256-TzqTSM802paUUNtqcUy9Roqg/dIjyUSXSn2Sg8BRmQo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.wasm",
        "name": "System.Threading.Tasks.Parallel.d3lpcrowfk.wasm",
        "hash": "sha256-93D6JkQNcQjAW7clIjzqp/r6RRU7MuMCSNIuMmiRXKw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.tushtfc6hy.wasm",
        "hash": "sha256-VcWWLXu8OTEUqnSd9sUqnmjB0HyYsyiXDJrkZExh4lE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.vmpbqs2ywk.wasm",
        "hash": "sha256-eb8AHdP5b8q/jTb5CjThWV/ttKrRHq9z9aSh5CqYFug=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.xorxxf2zgs.wasm",
        "hash": "sha256-cUe2Rpuwodxb9Zl4Aen3bgv8hlEah7r36PWyeIRYVWQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.iundaxgnxk.wasm",
        "hash": "sha256-+ucyTecxrBpXYyC1rbffnJsmb8oCrLJyd4+XNBRThto=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.m29kz0w4p6.wasm",
        "hash": "sha256-EpKEVu99++DMmujHczEKYhFiYk0JHPZTHHrYPQLfdD4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.cvgusyd4es.wasm",
        "hash": "sha256-GBsoWgsm7nTRKlb5Lr430r1XsgW1gVH+jeoGAIS2K00=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.iin6prhwnx.wasm",
        "hash": "sha256-di744eJYk0X9q8egtWEiIFJYac75XlI5EHhWwHrCBNI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Suite.wasm",
        "name": "Soenneker.Quark.Suite.0fpyqb49lh.wasm",
        "hash": "sha256-1GTCstiOCsCt43Gub/QzY+duT1xLgElq54B1F3SUx9M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Suite.Demo.wasm",
        "name": "Soenneker.Quark.Suite.Demo.rnwqlpv8yy.wasm",
        "hash": "sha256-11BG1Fj/ilU24XYuApS62qYqBSLttUBWi9VZ8tCJrMY=",
        "cache": "force-cache"
      }
    ]
  },
  "debugLevel": 0,
  "linkerEnabled": true,
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
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
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
        "Microsoft.AspNetCore.Components.Endpoints.NavigationManager.DisableThrowNavigationException": false
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
