//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"94ea82652cdd4e0f8046b5bd5becbd11461482ca",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "Soenneker.Quark.Suite.Demo",
  "resources": {
    "hash": "sha256-rq8hz6GBh+ADZVDrSPPjxt6Ip65e50AuglfRo2dbYGk=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.e2cah0ytus.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.r2kbxkuujc.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.wje1vo28mk.wasm",
        "hash": "sha256-7P5wVVqfk/R8R6lpwL/IpU6zs8vmtG/7auWpMZScthU=",
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
        "name": "System.Runtime.InteropServices.JavaScript.2j7dj8dwvr.wasm",
        "hash": "sha256-orXDJ+k47PinKZ2FtzefqtlGM6rB3uolse7A5ghR1QI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.faiigj79y9.wasm",
        "hash": "sha256-Fxmx+9LuYIkZXAT/emDRH6Isdfe1cU+5MHq6seypMy8=",
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
        "name": "Microsoft.AspNetCore.Components.x6tgvouy83.wasm",
        "hash": "sha256-yTZSXYMFYcBjBOQiIBfFvJ5AmygOZs/JFZ4VeexBcXU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.9m4crafndr.wasm",
        "hash": "sha256-YbUJLaCe39ofKZWjRHF/4IhqKarMWaS0lciesKxt6FY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.evfyyld2si.wasm",
        "hash": "sha256-2qoTX81iCcsXPDRrH15ve/3j6BdHXxzygkfWBaiHMgc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.6q68ljc3h3.wasm",
        "hash": "sha256-DrWW7lUV9fgJMiiKoB129YUJhHacvjB7CHnWdWCzIRY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.gl4y5i7dwy.wasm",
        "hash": "sha256-xKjiTKS1V4FzA6XtLAgFnE9pO5vyXhL9jZX7dU/FecM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.fh4dg18a1y.wasm",
        "hash": "sha256-8wvO/MawTQkoLg/E4HQBMHqjoEbljFqL9Re+cc8wjnc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.v8qqhbr59g.wasm",
        "hash": "sha256-X7TShXPosSxjEYpa1FOHbXgIm+K5HiPV7d+0/M2w00U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.qiwbq8ugx5.wasm",
        "hash": "sha256-niwb2sZskJ7wsZsNxfs8leRiqjwIuv7eqfar1dAjILU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.556xh3l82c.wasm",
        "hash": "sha256-WYob3eJ5JZ5ET5XXcpdH1/7t3wwTlVUO7ByA3A/XT8o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.ltnnbdksrd.wasm",
        "hash": "sha256-p6g/giNeMwizMxhRlWKnGNqwGOSNIT3UAtelLNwP0b8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.su3zsfp0tw.wasm",
        "hash": "sha256-vDnk5+v30dver2+uSUMH0PeoM95tO4Gx+SBAZjVPD0Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.9z05b7ixmq.wasm",
        "hash": "sha256-NVub33PEixV+uZUA+ZbjTPkAFiwBnC/bZmjc1cERsWk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.yjpj6amj8z.wasm",
        "hash": "sha256-HlbwOjCW0VIZVD2YaVp/C+MqOKwI2IO4QqtQ36NHe+A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.t9gw8p8qof.wasm",
        "hash": "sha256-n9kiqxmELAr75j81XAvmMMKJ0o2jNzjY4Djom5VsRSg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Validation.wasm",
        "name": "Microsoft.Extensions.Validation.9q24f4ufiz.wasm",
        "hash": "sha256-L3o6ScQiBNjoEsgB31VKNkW9rtDoCuWxpDnaZmdLG9Q=",
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
        "name": "Microsoft.JSInterop.h89qpbsf4d.wasm",
        "hash": "sha256-QfY7OjKC2slVO/mawwJHrSJgHGi8XbFMgh/K8tfVKDU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.r99mmn9mmt.wasm",
        "hash": "sha256-b3oDx6CnxrlJd3wQYFL7BPJaC0gtnVabH6OvSqSmP+0=",
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
        "name": "Serilog.153xd4bfxx.wasm",
        "hash": "sha256-20Tw5YeAoKC5qfmmaAEwbpYoYedaVmTKCX7mVwDOq5M=",
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
        "name": "Soenneker.Asyncs.Initializers.pty54gudeq.wasm",
        "hash": "sha256-c9zn4+x2Az/dYgRX2lR1K2kvfmlckP5ztOULGCK7GFs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Asyncs.Locks.wasm",
        "name": "Soenneker.Asyncs.Locks.lvfek4kyvm.wasm",
        "hash": "sha256-4St+/xbMz51OhLFV7pQy9xJiY8FDWesjgjbmG1kVrHc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.Resources.wasm",
        "name": "Soenneker.Atomics.Resources.dmrfkthuqk.wasm",
        "hash": "sha256-lfGVQQuYYWIROrytp2FVTkHkMtFzdxFlFqWFTGqrXRw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueBools.wasm",
        "name": "Soenneker.Atomics.ValueBools.yxevsww10r.wasm",
        "hash": "sha256-mkZ7VSETAZHqzTe4qVhT+XIBfv6/nnHdIso3/BnE6n0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueInts.wasm",
        "name": "Soenneker.Atomics.ValueInts.56zitgdbpn.wasm",
        "hash": "sha256-c3AbW+BOikP+4jLs4wp7B0+GtOWH4GqRuLKwnqQReJI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueNullableBools.wasm",
        "name": "Soenneker.Atomics.ValueNullableBools.np49jwpth1.wasm",
        "hash": "sha256-G8PspnI8Im8rgwpshZN+cVxqmB4goJueb5bJ7RO3LZU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Attributes.MapTo.wasm",
        "name": "Soenneker.Attributes.MapTo.0p5w7zmyyl.wasm",
        "hash": "sha256-LGhbGkV2vwbG7wSmRHMabHinuwTQqQRMhLGtgyZLkYA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Attributes.PublicOpenApiObject.wasm",
        "name": "Soenneker.Attributes.PublicOpenApiObject.6aoj42qqqm.wasm",
        "hash": "sha256-ru1VbEmhpHh7hrqsDocuPyHa2bi3P4Yyjpsl8IGM824=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.C15t.wasm",
        "name": "Soenneker.Blazor.C15t.brg7g6i82b.wasm",
        "hash": "sha256-l1jOgm92cNg6Rqgg1maWR4c3cU6MkC0OtnF5qxxLuME=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.CreditCards.wasm",
        "name": "Soenneker.Blazor.CreditCards.od3yvo0avj.wasm",
        "hash": "sha256-nKSLICQv1w4NIgW4mgdtnSqffXgSphIEtzH6wioWmZ4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Extensions.EventCallback.wasm",
        "name": "Soenneker.Blazor.Extensions.EventCallback.5q4tpy88gd.wasm",
        "hash": "sha256-Lb4d2xp6m5B3mJ1SPPifTe2RcFSFZGCo/aMxtHnk/Z8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Interops.Floating.wasm",
        "name": "Soenneker.Blazor.Interops.Floating.f2km66mvtq.wasm",
        "hash": "sha256-F82T2OLhTSwWdhM3fO3h2QSDYi5bQXJB7FbmyYf1Ol0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.Clipboard.wasm",
        "name": "Soenneker.Blazor.Utils.Clipboard.17q08dvlmv.wasm",
        "hash": "sha256-Y+/3EdO8QZeFBdsrlc81azNxyI76rRijY1VOQ3wOjBQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.Ids.wasm",
        "name": "Soenneker.Blazor.Utils.Ids.ufin856zao.wasm",
        "hash": "sha256-GhnK93rJcyl92JPtwQ9G5FEKN36wxN/LUw2t06v5zrs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.JsVariable.wasm",
        "name": "Soenneker.Blazor.Utils.JsVariable.7yobrkmb14.wasm",
        "hash": "sha256-Dz4a25XGdPQQHtZwe2ifR333IG/Y7T+Sod5o/OGJDms=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.ModuleImport.wasm",
        "name": "Soenneker.Blazor.Utils.ModuleImport.sj0x3ixq7b.wasm",
        "hash": "sha256-CHy6QGoxmcBt7Fe2BU/hr30pB9qi1qtgIcJoWs90reo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.ResourceLoader.wasm",
        "name": "Soenneker.Blazor.Utils.ResourceLoader.ousjc50os2.wasm",
        "hash": "sha256-0NgQmV+JxPt+CPxWcM+T80LU8cuPenwCy7fAAkFI7OU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Bradix.Suite.wasm",
        "name": "Soenneker.Bradix.Suite.fiqk5zc89e.wasm",
        "hash": "sha256-yeu0BKLRC43HWkxYHpAkXVcBMlkKffFaxvIC7Yopjmo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Culture.English.US.wasm",
        "name": "Soenneker.Culture.English.US.ffitc3uivc.wasm",
        "hash": "sha256-dSXEe/9CqW6/uZNDp6zt7SOB2Ekma9PSsKlpZnBjFII=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Dtos.Column.wasm",
        "name": "Soenneker.DataTables.Dtos.Column.trquqi5kpm.wasm",
        "hash": "sha256-CRWJHIJgi4MfVDFyNbW8lrAamdbwwVSxbQgU0ZbvC3o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Dtos.ServerResponse.wasm",
        "name": "Soenneker.DataTables.Dtos.ServerResponse.hlcuvq9sf3.wasm",
        "hash": "sha256-u60591FktB/7QHxFdfP6lQH8TGK2XpyE4WBj9CAYWMk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Dtos.ServerSideRequest.wasm",
        "name": "Soenneker.DataTables.Dtos.ServerSideRequest.ms1w7lhmxt.wasm",
        "hash": "sha256-6sPnXJ4BBUCvEa6dPb4981qCcdgFb0QQ8xn9O3EI0ZE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Extensions.ServerSideRequest.wasm",
        "name": "Soenneker.DataTables.Extensions.ServerSideRequest.7zuhmrz5g2.wasm",
        "hash": "sha256-7baRctIn+fXxX9Ee4nT1zGQ7+G8zU2b0H2gRo+hmxtY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dictionaries.SingletonKeys.wasm",
        "name": "Soenneker.Dictionaries.SingletonKeys.37id70j8ew.wasm",
        "hash": "sha256-XzSLF2U8lCtfH3yoSV6htHH9z7uLifKdmj+dZvdXgcU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dictionaries.Singletons.wasm",
        "name": "Soenneker.Dictionaries.Singletons.qeufik8t6p.wasm",
        "hash": "sha256-TtZiIvUhxRKiwduEhCKLFelTXG8LO9kvY6GjJSJk9sw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Filters.Base.wasm",
        "name": "Soenneker.Dtos.Filters.Base.3pxiwap19m.wasm",
        "hash": "sha256-F9Nj2WS1tRBYkX9GrlZDKb7H2GVxpZ+WBXq1PUZMCnc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Filters.ExactMatch.wasm",
        "name": "Soenneker.Dtos.Filters.ExactMatch.3f7d557yyl.wasm",
        "hash": "sha256-MVCtcbwASC/ylhXNMqLxefyoGdfAP4NelS1sQpLbjLc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Filters.Range.wasm",
        "name": "Soenneker.Dtos.Filters.Range.1264vfth67.wasm",
        "hash": "sha256-qSJGO2e/BpFAIoVD4x7piihY0wbYcdL7qNlU5+JSFwc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Options.OrderBy.wasm",
        "name": "Soenneker.Dtos.Options.OrderBy.d6xs9hxk9u.wasm",
        "hash": "sha256-9TPv8LUe4S0Rkkx1YkenyvpRoFIVPT0YXDLtJO62fnY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.RequestDataOptions.wasm",
        "name": "Soenneker.Dtos.RequestDataOptions.b4gelm6umq.wasm",
        "hash": "sha256-5YktfCJpJdi5jJEjy42c00Vhattgm5w4GRYuBVyshys=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Results.Paged.wasm",
        "name": "Soenneker.Dtos.Results.Paged.dqdh1s1ehe.wasm",
        "hash": "sha256-xYC/KJMBFvYTb9StoN5FoqdOy13ui4aaWzZr5fy6SS0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.ContentKinds.wasm",
        "name": "Soenneker.Enums.ContentKinds.wryal3f9f3.wasm",
        "hash": "sha256-dOCQWs4469yUppD5ec0sy0DSX10jm9iiVYlyclhL8Ic=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.InitializationModes.wasm",
        "name": "Soenneker.Enums.InitializationModes.xjudx1e5rb.wasm",
        "hash": "sha256-7WDzTLTjqFxnnpivvw1RIyl48JwOPxF9gsIU0CUbgKE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.JsonLibrary.wasm",
        "name": "Soenneker.Enums.JsonLibrary.ywkrif3phs.wasm",
        "hash": "sha256-Xv/MWYS0uM+n52Q52IURkiTfpDIj2JH6leYKQ3LPJVk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.JsonOptions.wasm",
        "name": "Soenneker.Enums.JsonOptions.ci541fp72z.wasm",
        "hash": "sha256-5IEWhAyZYCV8+lvQPG/6RdVOV6JijylwsML/YkS5P6o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.SortDirections.wasm",
        "name": "Soenneker.Enums.SortDirections.tzr1s18u5v.wasm",
        "hash": "sha256-B3yx0Ho+V3PzZ5NZfxF6pTv0dh0rZ1g8/7eVz+dmDwc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Arrays.Bytes.wasm",
        "name": "Soenneker.Extensions.Arrays.Bytes.lwgvr5ttkl.wasm",
        "hash": "sha256-q1nGwdbTZP/KJj6QtYGYo11sgKvARGnjpRvtqOAgT3A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.CancellationTokens.wasm",
        "name": "Soenneker.Extensions.CancellationTokens.10jz6frs1d.wasm",
        "hash": "sha256-D6MCWft3pwPEkFCMqLinGsVBvcRIwVYPSIf7Gt0Nzr0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Char.wasm",
        "name": "Soenneker.Extensions.Char.i939qzde86.wasm",
        "hash": "sha256-OnHfNrn24C6UKipG26RHZ7kzd3831rRdCVIEgUg1ZU4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Configuration.wasm",
        "name": "Soenneker.Extensions.Configuration.znx8vpdejb.wasm",
        "hash": "sha256-by8VwZd4LJBurmnDG9jMQkRkfJ4WnKYtrwdu8XjaPo0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Configuration.Logging.wasm",
        "name": "Soenneker.Extensions.Configuration.Logging.oqa4brnjga.wasm",
        "hash": "sha256-oIlStyKWVd3gpLzrGacrmA11rVT0Wg3iqO3D47fy1ac=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Enumerable.wasm",
        "name": "Soenneker.Extensions.Enumerable.0r08phmx0k.wasm",
        "hash": "sha256-NA3zTjSo7jPzo9icnB+RFUq/fHNpJM/8g6P6+iSexDc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.FieldInfo.wasm",
        "name": "Soenneker.Extensions.FieldInfo.f3w838j7hh.wasm",
        "hash": "sha256-hbgwb85nryLh/JbwZ4ygbPjEhCpY76mkPYeqFGEKHVM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Long.wasm",
        "name": "Soenneker.Extensions.Long.jqshasa2fu.wasm",
        "hash": "sha256-uwUB8TGuf1lSXULOxgTLACX4cTGe9VVH7PRwxC4WE7c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.MemberInfo.wasm",
        "name": "Soenneker.Extensions.MemberInfo.6vs8zoteal.wasm",
        "hash": "sha256-IvegmTe61s8BSw/MOFKzyzzRPE0xOkfKy3bJI89XRcA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.MethodInfo.wasm",
        "name": "Soenneker.Extensions.MethodInfo.wz3ztf9ysw.wasm",
        "hash": "sha256-/Oc3KlGm4nw6XbPdpaAq1wE6P85xyVXiFMtbQdN2U4I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Serilog.LogEventLevels.wasm",
        "name": "Soenneker.Extensions.Serilog.LogEventLevels.n7ss56wuqr.wasm",
        "hash": "sha256-0/rH9lQrAfQU1zO9AkJ4JCqm9tbt7GiktcN7OFGmh7c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Bytes.wasm",
        "name": "Soenneker.Extensions.Spans.Bytes.1yy8ky3ey6.wasm",
        "hash": "sha256-F5EgKIYiHwfBsysx0ipy2814yzckBswgvlsYejqeMO0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Chars.wasm",
        "name": "Soenneker.Extensions.Spans.Chars.2jozm4rwvg.wasm",
        "hash": "sha256-EoPKh02C8sbJxUz5ENxmq17nxcO3aOil/71OgsY+Q/E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.Bytes.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.Bytes.bc5htu8qu0.wasm",
        "hash": "sha256-S6qL0wbgrRAdCQwgBywIilOqwthZgLv0mwTLt6YDaa8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.Chars.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.Chars.a9wajh88r0.wasm",
        "hash": "sha256-zhhpJ58IrU43d8e2/aAtIMQ8ZCeRsxDjUp3wGZyLl+U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.ParameterInfos.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.ParameterInfos.0c6hen59ba.wasm",
        "hash": "sha256-UFR24hhXVo1UKs+8lvKumxA1a5AihbzgeZH/00QoMiY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.Types.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.Types.9gzfqqza60.wasm",
        "hash": "sha256-ORPOYgJPzK1rEi/RJxNWQp6TnqIcqDww8+bkT3b8VSU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Stream.wasm",
        "name": "Soenneker.Extensions.Stream.pqz8n2n7ng.wasm",
        "hash": "sha256-D6qBsXLoVVmZpHpMPq9uuUhGG41jJq8ASbXsSf4/rno=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.String.wasm",
        "name": "Soenneker.Extensions.String.dmg706xncd.wasm",
        "hash": "sha256-5fdd7iSpl7VJD2hspcMB1UFao/4ZfAhAkBo8kSGUCXg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Task.wasm",
        "name": "Soenneker.Extensions.Task.dt8x1y0tz6.wasm",
        "hash": "sha256-H6w88Z43Z/yVZFN93EsvcOLqr2hMXtL8fqjv1qkgJJw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.ValueTask.wasm",
        "name": "Soenneker.Extensions.ValueTask.fzf4bqny42.wasm",
        "hash": "sha256-66xsQOBG9s5nF4iIH8VtajrRs9dWyHomdd9NltoJc74=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Invocations.Actions.wasm",
        "name": "Soenneker.Invocations.Actions.gs3xwhag02.wasm",
        "hash": "sha256-cDXzmytwcVNWE+rz3y5rZOudTnXgCJwyPphI4g4Mj0c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Invocations.Funcs.wasm",
        "name": "Soenneker.Invocations.Funcs.snbvq98lp3.wasm",
        "hash": "sha256-ONVWEpvEr1mVZW4AmV/xy9A5Ovrv6XEFxYtYu7IWyUA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Json.OptionsCollection.wasm",
        "name": "Soenneker.Json.OptionsCollection.2z8guilp1k.wasm",
        "hash": "sha256-bocdRIHZDlkYTmRGIvl1fW0TB3pY/8cTqUdmMYWMuxY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Lepton.Suite.wasm",
        "name": "Soenneker.Lepton.Suite.qz3e9j7lmc.wasm",
        "hash": "sha256-Sm8a9asWeGKPHZ98yXk9UpZn9J946ENISUVhBq90/hQ=",
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
        "name": "Soenneker.Lucide.Icons.topumcczp0.wasm",
        "hash": "sha256-cxzmG1lGlU7+QSaEHhmopV6YywLWxifs1nN+20SzKGM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Builders.wasm",
        "name": "Soenneker.Quark.Builders.hidhvb0orv.wasm",
        "hash": "sha256-qemoDzzJByZllupqevZQO29nJYfcqRTbDHYJB01yYT0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Breakpoints.wasm",
        "name": "Soenneker.Quark.Enums.Breakpoints.fiev5srmhc.wasm",
        "hash": "sha256-yV/e1y8RofPS8Qv/jPjf7Ti9tC6uJY55ylR39xcUaQw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.ColorPalettes.wasm",
        "name": "Soenneker.Quark.Enums.ColorPalettes.7tisaqycgw.wasm",
        "hash": "sha256-O2A0Rw29LItkp7jxUto6wnRamKM9FMAb00qi43G7fRo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.DisplayTypes.wasm",
        "name": "Soenneker.Quark.Enums.DisplayTypes.lv77m8gkgo.wasm",
        "hash": "sha256-oRn87udS1lpgsrV3WP1Xbbg2GQvGHtFaEy6yIcTRjPk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.FontStyles.wasm",
        "name": "Soenneker.Quark.Enums.FontStyles.1128nji1ia.wasm",
        "hash": "sha256-Rb9kJCUyFGpepcISIX6hd5m+NOCR0PTvgufnhSdnI5A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.GlobalKeywords.wasm",
        "name": "Soenneker.Quark.Enums.GlobalKeywords.swbj42h8nj.wasm",
        "hash": "sha256-DJ++npTwxG15thYNHOPmUePRcVt0gOCkKLUx1m28aq4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.HtmlElementTypes.wasm",
        "name": "Soenneker.Quark.Enums.HtmlElementTypes.ukriukidqs.wasm",
        "hash": "sha256-4pXazsYGalPD2bIXwWRSiVsfHdFXTiGhUKuMLPui7Co=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.ObjectFits.wasm",
        "name": "Soenneker.Quark.Enums.ObjectFits.whwa9ttc1o.wasm",
        "hash": "sha256-BNADex6UB+k7whF5EPKYVfUul48Zdlf8SBcEqAzWdoo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Overflows.wasm",
        "name": "Soenneker.Quark.Enums.Overflows.u8u14q2tlh.wasm",
        "hash": "sha256-oiQPsejBllqSGx8nmYewsWcNtXJO5vDpEr/oWbi46mA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Placements.wasm",
        "name": "Soenneker.Quark.Enums.Placements.nuwk3ihxic.wasm",
        "hash": "sha256-sWEsl8tf9hiEYLImUMdLBxP+c1QBRnkZc9HadoPJKN8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.PointerEvents.wasm",
        "name": "Soenneker.Quark.Enums.PointerEvents.fhufzz9od5.wasm",
        "hash": "sha256-E0cfw0hw9Voyd9ijl+l8O89wiXNFgm9S7h0CYcq9THc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Positions.wasm",
        "name": "Soenneker.Quark.Enums.Positions.mb7a1mwvok.wasm",
        "hash": "sha256-krzOQ7H1EmNkX2G/eb7pRC6GPIUg7Cl8/fx87dIY3oM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.TextAlignments.wasm",
        "name": "Soenneker.Quark.Enums.TextAlignments.b9rzxkmvtz.wasm",
        "hash": "sha256-vyUqPCUQdlxCTFo2+IYxKZvn6xIrPDy0UDaj1IlpfFo=",
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
        "name": "Soenneker.Quark.Enums.TextTransforms.c3n9m6mjvy.wasm",
        "hash": "sha256-2FQk/TPStGvQi3iOt5l0mNOnGee0LHbQjeWdjfzvw0c=",
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
        "name": "Soenneker.Quark.Enums.Visibilities.ns7s5c2dv7.wasm",
        "hash": "sha256-ibSJPywnEEXoTXM8FlKCF7G0cX2eyir3gewalwd9wfU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Gen.Lucide.Abstractions.wasm",
        "name": "Soenneker.Quark.Gen.Lucide.Abstractions.3pfzwum7te.wasm",
        "hash": "sha256-N7JgbVObIWEx++PR0/4kb6BkVy5UhqnlbFNx/wTZgvI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Gen.SimpleIcons.Abstractions.wasm",
        "name": "Soenneker.Quark.Gen.SimpleIcons.Abstractions.t04l6mheg2.wasm",
        "hash": "sha256-nXWSAspYtH8nRV3AjyZWiAlpWuybo/DI4WDWZanVuTE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Queues.Intrusive.Abstractions.wasm",
        "name": "Soenneker.Queues.Intrusive.Abstractions.tlpjn1guhf.wasm",
        "hash": "sha256-n1wATWuklD+qbrvfWB/Ia+DOkpH3xwNScx/AEZ/Nih0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Queues.Intrusive.ValueMpsc.wasm",
        "name": "Soenneker.Queues.Intrusive.ValueMpsc.mwoijkan2g.wasm",
        "hash": "sha256-lnE5cM1j7Zl4xFu+aGNVPhugGPg03PaJUmdDzYFLSjE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Reflection.Cache.wasm",
        "name": "Soenneker.Reflection.Cache.olutnvgpp9.wasm",
        "hash": "sha256-LNOufUNbbO5YDfS3nPSB7V65dxGT3Nnot55AciZjanE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Serilog.Sinks.Browser.Blazor.wasm",
        "name": "Soenneker.Serilog.Sinks.Browser.Blazor.tdk1su1uy6.wasm",
        "hash": "sha256-cYEC7EEGoM90OANp38dzTv9zbWk2vBlStMeNm8nqGmQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.SimpleIcons.Enums.Icons.wasm",
        "name": "Soenneker.SimpleIcons.Enums.Icons.ixxbbtzeid.wasm",
        "hash": "sha256-hq+DB5yvhA5dus6+ce3gvijxsYJcxE5EmN3qqq2J+zM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.SimpleIcons.Icons.wasm",
        "name": "Soenneker.SimpleIcons.Icons.gfbgmjf881.wasm",
        "hash": "sha256-3I+5z/eu9OpOL/mBckUid6p0naHokYIB0VgVZbM+mog=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.AsyncSingleton.wasm",
        "name": "Soenneker.Utils.AsyncSingleton.b5iai0sk0m.wasm",
        "hash": "sha256-oXNwUzTdIpadzPRCyXswDqZiLwoTOPczUp1Mo1yGHn8=",
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
        "name": "Soenneker.Utils.AutoBogus.86qu98pzh1.wasm",
        "hash": "sha256-AAdetj3RNem6pPxRTAiJmFsvmSueWTRFuLyuEWWCoZA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.CancellationScopes.wasm",
        "name": "Soenneker.Utils.CancellationScopes.snlfydix2w.wasm",
        "hash": "sha256-mM5bLWmpWZrkh3ey7L+mq0uEB256h2MGT/UDDDzAd+4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Debounce.wasm",
        "name": "Soenneker.Utils.Debounce.shvg4gtuqq.wasm",
        "hash": "sha256-kOjwuHKXsYKY2YPb/OhL0oAe6fwfkgfQ6Bt5/Uhudq0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Delay.wasm",
        "name": "Soenneker.Utils.Delay.0uljtw67v5.wasm",
        "hash": "sha256-uC3VzdkiqRvRqZtmZPh2PAxUbiAUfyZ6kjNGqxWIb7Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.ExecutionContexts.wasm",
        "name": "Soenneker.Utils.ExecutionContexts.dbiqzn4m03.wasm",
        "hash": "sha256-x6G1OHUtKWfw4MFRJ/y1aLKFNGsz8rzACrnd43T26cM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.File.wasm",
        "name": "Soenneker.Utils.File.loffkv2pea.wasm",
        "hash": "sha256-Jc2NSXIAK0gXaVK5tEVvpul/GzPa6LFysK66uXJrMsY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Json.wasm",
        "name": "Soenneker.Utils.Json.h0j71g1g1x.wasm",
        "hash": "sha256-/7LutdX9nz/NF80VUciXPe6bKBBaGBUrCKq36deECQg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.LazyBools.wasm",
        "name": "Soenneker.Utils.LazyBools.ocxf3ijkat.wasm",
        "hash": "sha256-mPEQgaUdSqcCmqnZiuUQUVNgcX+7q4OQNF610dktah4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.MemoryStream.wasm",
        "name": "Soenneker.Utils.MemoryStream.8tirrmxshn.wasm",
        "hash": "sha256-/LpeaLoJrkwTPvETqJjjCAhGAYjBIEb5ES+1ptGWJrY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.PooledStringBuilders.wasm",
        "name": "Soenneker.Utils.PooledStringBuilders.ka2vg33zbs.wasm",
        "hash": "sha256-pPakAKqymyPqZXo6uVAABp5s31JmWNOUwTM/Cfi18+s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Random.wasm",
        "name": "Soenneker.Utils.Random.vd92viqopn.wasm",
        "hash": "sha256-/byhYlAz+caZgsg60a6eWvPsiUHQdwAj9PHxGsIo/pM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.ReusableStringWriter.wasm",
        "name": "Soenneker.Utils.ReusableStringWriter.1bvv4ccjb1.wasm",
        "hash": "sha256-w5sgP2FWozOat56H76zHjv0ALXmwjnTyOVp/2RH9TyA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Runtime.wasm",
        "name": "Soenneker.Utils.Runtime.784e9nft1h.wasm",
        "hash": "sha256-56HZxNOXqldr9+pD2nHi00aeai9fcmwn+DRB+FLWK9s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.v8chhpuudq.wasm",
        "hash": "sha256-wZJRhndrqNa/k0qyuwqLV09INhv6F9TU/skkCshYilc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.qsbvwbwga4.wasm",
        "hash": "sha256-enn/Zn4j5cEHjEDmPz/3CRR8LdKeRaS8jJ20xH6znjw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.mucz1xtxq5.wasm",
        "hash": "sha256-zgB7wsvImEUJobZ5zHzvlhjPRBXJIW0B2BqfyKOhUUQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.dulb7mon8e.wasm",
        "hash": "sha256-VQKnuSI3uSlsGGhzkpSW3KQiYxZRTinOm+8Dacq+ErY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.2t2pbz79db.wasm",
        "hash": "sha256-duHC/5tVo+pAY3pN+ejqmbKt9rgOHl+734kJlaueE6g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.8kxsyplb96.wasm",
        "hash": "sha256-6A6QZQYPqzdx0qKaBFcRi06N72q5yMluVJ+oLe4CohI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.rss7darmum.wasm",
        "hash": "sha256-i1JzJYSRyMoNMKL4tj6Bzg0SS0GGlLvBSk5QXMmPzzA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.ey8dn5tisb.wasm",
        "hash": "sha256-apamZB0P436Ux2SwX0SEVe+oDva2cgI8Y3XYbMgW+n4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.sfj6thpewa.wasm",
        "hash": "sha256-GCdHzgHubz/8sK72Bv8EjcOwigAL1k7tdsDG2B1zyC8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.pj195idgdy.wasm",
        "hash": "sha256-6xI9OSPx+5XSOYkvAML5B/3GVYQPShxRZSyFvf/sJBA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.7ffpstolv7.wasm",
        "hash": "sha256-rfV7IZBEjQ7uycxy/bzyvQSPq7nwGSVrlLbrIGHC24Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.o3u1hsowta.wasm",
        "hash": "sha256-pG8Flx5EwP0QIahQxcpu9P7vgXKXWCJQBpRD+99Li14=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.135wcs1o3e.wasm",
        "hash": "sha256-vW2UBVnObOUryO6VTpLiq44AHf91xTDrmEHdA7pseUk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.64rzu4hz5h.wasm",
        "hash": "sha256-BrIw2CrOqlV+kVmr9D8acqP7nDRoPkcq8s9/Tg9Q6lo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.c0493ktuge.wasm",
        "hash": "sha256-jH+QrDgqU15OtIiCb8IeEfV1+8Tai8JemQg5+vyBBh0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.6hiv0ze4am.wasm",
        "hash": "sha256-Srvo/sExRqxTdVAcc+QVTTk+cvasZ+oz0SzbDwafeqM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.wkm54058fc.wasm",
        "hash": "sha256-cCr5omumEMXHinHEix8xZiTkT+EehqB59B9NCPae/as=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.unqpbva9an.wasm",
        "hash": "sha256-OvqyZh2BYv1heGP0+hgeRqw86zml5gvGbZqdTSBqZwY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.6pgpfdiz8g.wasm",
        "hash": "sha256-ysOWjYHYjAhAI7Q29XGv//kgW9aT1VWjkfwQBWFG03g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.gh4l7w4wv0.wasm",
        "hash": "sha256-DM/1CVHre7bls5NDA5i8gQZePx/idlMAQdc6JmaAjRw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.a0yp934ber.wasm",
        "hash": "sha256-lvLTqDHpNRiXoyF9RhnWojyjqWP8DB5Md3er37PZ2zU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.2ds89xiwu2.wasm",
        "hash": "sha256-atHGQkr+HB3fU3m10TfpLCBPtahRJqKGWLMHKjfI1m4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.pvuxzzladk.wasm",
        "hash": "sha256-lVn1MY/3XbkiXBxpG1sGLZaTZdk6PwGW32KM8Ups/jk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.ete8oqbmu5.wasm",
        "hash": "sha256-Au2SK8ookNRcSRdNdmrCWifTHn+kKYdWBwRGF6x8hBw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.7jt0r1qk7x.wasm",
        "hash": "sha256-g9T+IOlnLu9Nn65+UVrx8l0gQEBl65GIqSgv+grVNnM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.de8z827348.wasm",
        "hash": "sha256-RZVzrnHdTvg3IvQgb1qPgwmrH6ff9KdSuVvAdJO7em0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.3twxxj526l.wasm",
        "hash": "sha256-qR6uAJdQjP+mLzHfBmho6HO0hokPzTphKd4hAp4EmeU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.c2s6ag0y7g.wasm",
        "hash": "sha256-lN066w/JGY5cE4FuLgTUF+Co/GNYebUhcelJUv5GRxA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.xa4k4v5awg.wasm",
        "hash": "sha256-N3230WTP0KSa1wxLcob6tzKtyoXY7ycLSchQ3JZ1034=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.wp31qs1bml.wasm",
        "hash": "sha256-7Bw1sNGIBmW5LAauS9CP1ixKUAhXda/bTarwtiIXaag=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.bsshqbcju7.wasm",
        "hash": "sha256-BW6WsDfVmUzkwXXZQx/VcxmsmQ0S5/uRGy8RhvkII1M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.ecom3h6m3r.wasm",
        "hash": "sha256-QjTL3romfZK2lrxXt4hzszMh1SwuZobqKH7Q8COsHDY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.m7pn29oq29.wasm",
        "hash": "sha256-nhq6GG/NP/HSWocKZoKTzWncrTgW2KnjvSLn/m60Grw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.mydt5pvsfd.wasm",
        "hash": "sha256-EvtL4372KYbBCwIY8qjWPpoAYCihGo8Jetq5tZO24Nc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.7bf737j53q.wasm",
        "hash": "sha256-QxjNAM8uF3RmwmrJ5eZNSoUhYqgZj7WW+WvQGmftqUc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.jwm00qfx9t.wasm",
        "hash": "sha256-80tqri7ACy4vIo5/C6txQToH4sPRBxR2jp+ocVCeuJE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.hsdbkj2abz.wasm",
        "hash": "sha256-b4XpMkxtC/SaeFfanpkjaNAd/x6X5xPPjfnE+ae+5FM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.ug8sn27t0x.wasm",
        "hash": "sha256-Ind+zms6dS7Tvv5/wwt0RWh2EvNbVZo8H3+fxrSHDJQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.kllinayi9l.wasm",
        "hash": "sha256-2Lziom56t9tYGK+UESWthrUXu8mM3hmHiOrOK16heyY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.d1nf4kzprx.wasm",
        "hash": "sha256-nxmHeJ9gzPOkcCWSsReUVy8v6C4FKpTN0Pj/KMErFHk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.vvaqvjvss0.wasm",
        "hash": "sha256-ZasqvyWnCluEnoDdg49F8s2SDT0Dw6WVilKioqWpIRg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.pkj39e8u35.wasm",
        "hash": "sha256-2SYJQtY3cSwiFOmFsUrRa0mPks1Hjly2Xx3rZMzb2Qc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.wasm",
        "name": "System.Threading.Tasks.Parallel.92ycwx9h5x.wasm",
        "hash": "sha256-j7QQRWN2YJai43zuTqDCP/vtCQuzOAEtNewh6roZik8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.i8frbkfx7j.wasm",
        "hash": "sha256-4nBtKOBgQ6xtZBGpfEBRWWtAFBOq7+ExWt8CVqkgRsQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.j96sdjeon0.wasm",
        "hash": "sha256-t0d7NmRQjkw5NFDI1+QCIlhOMdXDUOWCC7MvG2QF3BQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.3dip6ic8mi.wasm",
        "hash": "sha256-ychfeUH0ggf8nxM3GDZvGyM5rfO3tpXNJnb5MepaEKw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.9c751zx487.wasm",
        "hash": "sha256-ly4Q+MzEHHesY7cjXnL/AO38qsxQJpaHNKTnQ91h2wA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.urpar0tw9i.wasm",
        "hash": "sha256-+mt5VNe9qn0UDP8P2vLPBi8xScWH85qx77EEGTsltSo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.x4983syfn1.wasm",
        "hash": "sha256-QZM96Sbw2BYre4bcT9tJXUPU/9h0LdgAPwGMigVXC8g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.rh3ri2orp2.wasm",
        "hash": "sha256-byTxtRrwmvAxO933nN+ovyekExoYWY+VPCarvh8ZHw0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Suite.wasm",
        "name": "Soenneker.Quark.Suite.102r7cxbsv.wasm",
        "hash": "sha256-4SkcxM7l7lIBHMw1dwF+J2AHKXYswgFqlwfk8iIxcms=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Suite.Demo.wasm",
        "name": "Soenneker.Quark.Suite.Demo.mcpj4l8a4v.wasm",
        "hash": "sha256-Fv/afYCLqZFaxUv5YdETFONuze0ZFCifPEfadQixsdg=",
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
