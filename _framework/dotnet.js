//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"b16286c2284fecf303dbc12a0bb152476d662e44",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "Soenneker.Quark.Suite.Demo",
  "resources": {
    "hash": "sha256-pfzmWK4BHD3zeoFVrBG22gWNeEuzqKCk5Dmv1vgZ2hQ=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.78a1bcjbix.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.2zl32tp6ah.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.w1qodaifes.wasm",
        "integrity": "sha256-HPFToB3TzqDh05PkCegGh3SafClWoYmS1uL7GbthxbY=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "integrity": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "integrity": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "integrity": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.hq2mpklnqr.wasm",
        "integrity": "sha256-p6/wV05PEoKocillIiVPYCnVVIrkHEzHoyxRM/6Uc8A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.b9g33pyt1s.wasm",
        "integrity": "sha256-D7xnCmCkwA4kPLrOsyovndEcHK/n6SX8Pa9EsSCwCbU=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "virtualPath": "Bogus.wasm",
        "name": "Bogus.yn7e1oy79k.wasm",
        "integrity": "sha256-sgBQWvDAeMztRt/Zz3kbIhHu0/sWUoKHV/CddXYETlY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.3ptex2l8zw.wasm",
        "integrity": "sha256-1+aulFm8ZAsqNcp4115seirKI8dzbizCiz+AlP5Cn7Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.rjqti5zebr.wasm",
        "integrity": "sha256-WZ6qApwnOWTumD7weHi64ruft40w8SyfNViBHEUktM0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.7v5ab05ur3.wasm",
        "integrity": "sha256-M/cellURsSBheLBVkfDzypoB/vnLlw3/vtAZfpmglig=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.7q82otst2t.wasm",
        "integrity": "sha256-UbtpbPTJL3vdj8xNM8KUOlHOS2xTsZEcK2vcsHiGis4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.cmt6z8thyo.wasm",
        "integrity": "sha256-jPFrRbDgZQ2aGrpET5ONQ88J672oqLfCFsdRxs2gAGI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.xwknwqg306.wasm",
        "integrity": "sha256-oVF9NBdhweIsnONMUBvRQiQUaXNFRPnuTCIz/GbQNTU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.74f1twtuie.wasm",
        "integrity": "sha256-xw93H0dC8dEZZUG/H3tFzxnjA8kOcLmfRFZaj7X0TSo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.q0m0kr40cg.wasm",
        "integrity": "sha256-eo/oa3JT4Cc/LE0otD/LWr4fQN9Vz7QtpfNt8oeccXM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.7kgrfhq7r7.wasm",
        "integrity": "sha256-acCED8dRnvLNnWqy3QvjvLCIeDKOBEuD3A120wuHhr4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.ot686atps2.wasm",
        "integrity": "sha256-dO2oIlJfK1bolLxL3H3/39sW/B4AwW2UidZhPwsssTw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.vby6uxa9uj.wasm",
        "integrity": "sha256-tSoaqKhOc4CruPKyOTW+OzAbEp/GLC8Wo/KYyN4TocA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.fo166cgvsj.wasm",
        "integrity": "sha256-AXyfXItiCvn+SztpHhxWrjU5Td5USRUmvGTbP64wQrY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.ybfar0mj0f.wasm",
        "integrity": "sha256-4niep9sbaZ/9f5KdA/VVMuzarSZbd2VBIoj77tflweI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.m84zq78fb1.wasm",
        "integrity": "sha256-yumksFeLjkCb3oD27DyYQPGSrliFAjLg4s8CaDv3WyA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Validation.wasm",
        "name": "Microsoft.Extensions.Validation.o5kzzozb1w.wasm",
        "integrity": "sha256-zKNWe/zGp/E5ibBoimP2IH/do0w9653nb3NKFc7lFnk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.IO.RecyclableMemoryStream.wasm",
        "name": "Microsoft.IO.RecyclableMemoryStream.k69j9tcsp2.wasm",
        "integrity": "sha256-PLLNYyORp9p97V0x5KgrbBal9u/7enJGj68o7bI3pgU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.ao5l9rmw3e.wasm",
        "integrity": "sha256-BptMNVEB3PKfHA/t5kJ0/K+Em1gLeAZhlkyS3Sc3u8A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.kivdlry06d.wasm",
        "integrity": "sha256-zIGd0h8/AoN3niSEUSSn1zX71vJ4hqGJZ3UwI1g+UD0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Newtonsoft.Json.wasm",
        "name": "Newtonsoft.Json.jcjjiqe038.wasm",
        "integrity": "sha256-s8KVuknfxWl1cuDvQM/OnpBfnpM1rxzvzq21S1cF36U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.wasm",
        "name": "Serilog.153xd4bfxx.wasm",
        "integrity": "sha256-20Tw5YeAoKC5qfmmaAEwbpYoYedaVmTKCX7mVwDOq5M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.Extensions.Logging.wasm",
        "name": "Serilog.Extensions.Logging.4aarm1ia2h.wasm",
        "integrity": "sha256-NHk6xRS3dIv7nLWuBUZvce3EXz7kvxiBsrjE7KvSMcI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Asyncs.Initializers.wasm",
        "name": "Soenneker.Asyncs.Initializers.3rwyuwdixu.wasm",
        "integrity": "sha256-sXd0XDmD6+XeJSjXYVgLD6AgqLoeYfTBNkyl9QtUVg0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Asyncs.Locks.wasm",
        "name": "Soenneker.Asyncs.Locks.noz4yyqmuv.wasm",
        "integrity": "sha256-p9cf+7n+L+V7n3RZga61Qp6+RRPSxBNE5/AA2gRzCKM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.Resources.wasm",
        "name": "Soenneker.Atomics.Resources.ipns4p479b.wasm",
        "integrity": "sha256-Bu9pjEkL53URCtreRlCME/pOfycdNrup7Q9Zy8fgkBE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueBools.wasm",
        "name": "Soenneker.Atomics.ValueBools.c48skav762.wasm",
        "integrity": "sha256-HMQjpI9zb6d5eNQUkMjv3Va9sk8T4CkMfZcJBogTQRA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueInts.wasm",
        "name": "Soenneker.Atomics.ValueInts.qzr86hkby2.wasm",
        "integrity": "sha256-ShZnX3QWwnKfa6luPh5lANLhM7H/2nmhTO6K5Xk954o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueNullableBools.wasm",
        "name": "Soenneker.Atomics.ValueNullableBools.qo1foinck0.wasm",
        "integrity": "sha256-tjl18lbajyjJwjPvmPDiOwP5xwvXpFNrYHEMxEhV3hU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Attributes.MapTo.wasm",
        "name": "Soenneker.Attributes.MapTo.s0d9e0hu10.wasm",
        "integrity": "sha256-LAg6uKNbeAYyeF6fnhLPvqC1g2NFfxjlJ9BKaeQ4SNw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Attributes.PublicOpenApiObject.wasm",
        "name": "Soenneker.Attributes.PublicOpenApiObject.j89no5y9zz.wasm",
        "integrity": "sha256-gzocpvp32A1Vofsr3oB8ezL0Cw81UDWCbeNymPnzivA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Extensions.EventCallback.wasm",
        "name": "Soenneker.Blazor.Extensions.EventCallback.rir4933921.wasm",
        "integrity": "sha256-rZYihTc2oJ7Rbp/bZnsr3SbNKQfLQY+H693ppi1GURk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.Ids.wasm",
        "name": "Soenneker.Blazor.Utils.Ids.3ehiuv8dm3.wasm",
        "integrity": "sha256-dV10mjL+rGWKP08HVDjFoT1/Ge0siyyj7A1kZMIhhwo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.JsVariable.wasm",
        "name": "Soenneker.Blazor.Utils.JsVariable.atn6wmslbq.wasm",
        "integrity": "sha256-8gkZ3MsetkHaNtynGDgtLUHSBPr1ohGjlV+FbjcaQdI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.ModuleImport.wasm",
        "name": "Soenneker.Blazor.Utils.ModuleImport.cexvr2bi2u.wasm",
        "integrity": "sha256-1C2QOja+uElFo2PtYUEl3/MRns7MF7ySvdenEZgTQGU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.ResourceLoader.wasm",
        "name": "Soenneker.Blazor.Utils.ResourceLoader.kmggvv6822.wasm",
        "integrity": "sha256-LHP2eOnkRGIv/eaViJ/Tm931qd0/AajYZs92+0r58S8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Bradix.Suite.wasm",
        "name": "Soenneker.Bradix.Suite.8hyawgodnl.wasm",
        "integrity": "sha256-DO0zJF1G8ksmhsq6Xh6eVu9aXWc/ENsGlbVwvUDP58w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Culture.English.US.wasm",
        "name": "Soenneker.Culture.English.US.pxjjvb4v3x.wasm",
        "integrity": "sha256-U4llFCVvgLCqdCzHkMLDXGh8qvUETXHqzHR+bKo80Zc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Dtos.Column.wasm",
        "name": "Soenneker.DataTables.Dtos.Column.a1f6d3ne78.wasm",
        "integrity": "sha256-YmVlsZrH/rafz48KQb7Nb8nmQc1/SjG0S0V+fbtcvPY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Dtos.ServerResponse.wasm",
        "name": "Soenneker.DataTables.Dtos.ServerResponse.1059c23aij.wasm",
        "integrity": "sha256-kQXZBCtzzEZ0aHnpwmgT/SCNdVUIy0Wz+J6RP0gozNE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Dtos.ServerSideRequest.wasm",
        "name": "Soenneker.DataTables.Dtos.ServerSideRequest.seqv9qxeqb.wasm",
        "integrity": "sha256-jIe/vLshic7xY6fG23ya+lTMieQSaxF+mqiBvjZF7uA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Extensions.ServerSideRequest.wasm",
        "name": "Soenneker.DataTables.Extensions.ServerSideRequest.apyn0q8hxh.wasm",
        "integrity": "sha256-bne1tzHVZ5dWNiVgWO4HWyiY7A2j1oJUU+4squeaSso=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dictionaries.SingletonKeys.wasm",
        "name": "Soenneker.Dictionaries.SingletonKeys.x45j77m5hq.wasm",
        "integrity": "sha256-wSM3DvLbaxsd9GBjKwjT1ljVjgXJgmAngDhHhpJW6zA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dictionaries.Singletons.wasm",
        "name": "Soenneker.Dictionaries.Singletons.1qdwh7m9r8.wasm",
        "integrity": "sha256-hyW0nZt0yyWrw4dqmI7L8m01fvBj516C5Z55JCWMDfg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Filters.Base.wasm",
        "name": "Soenneker.Dtos.Filters.Base.p4pxgl4ik7.wasm",
        "integrity": "sha256-h75hj6dnA1+xToXIlCi6qJjxDx2zfLLpPQI6XzT9rhE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Filters.ExactMatch.wasm",
        "name": "Soenneker.Dtos.Filters.ExactMatch.34kovb54o5.wasm",
        "integrity": "sha256-01aREC7XxYos1JaHYAzxUyzPWjPLka1jKyAdRsWyG10=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Filters.Range.wasm",
        "name": "Soenneker.Dtos.Filters.Range.tdgpnm99nk.wasm",
        "integrity": "sha256-MX64kLfJrBR+OzN68DWgs7vyHlGa4tM+WuH1h61u5eI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Options.OrderBy.wasm",
        "name": "Soenneker.Dtos.Options.OrderBy.emju9ikg0k.wasm",
        "integrity": "sha256-1i99naE5MhAYR2SYEkJuHkgp+FaoWarz3fGwLjJ8aNs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.RequestDataOptions.wasm",
        "name": "Soenneker.Dtos.RequestDataOptions.2tanczwm89.wasm",
        "integrity": "sha256-dg6wm593nJJ4iD/VLHg65BC214EcTlf/cdfEO9ZMgUA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Results.Paged.wasm",
        "name": "Soenneker.Dtos.Results.Paged.25e450pwhf.wasm",
        "integrity": "sha256-ltUwHJTxu10NK6Xs/tph0ghJBjS6JYqOZaECEXIaf5E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.ContentKinds.wasm",
        "name": "Soenneker.Enums.ContentKinds.r3jg4ip0e5.wasm",
        "integrity": "sha256-t2CcH3XCMqNmdCpwt0O9SVjWYUa0KGUPHdk7A4rAPq8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.InitializationModes.wasm",
        "name": "Soenneker.Enums.InitializationModes.pabanazkia.wasm",
        "integrity": "sha256-T5k6VsrSghyMAgW2o3uY1cPiCK0HhYAkgbV/0Qjzjqw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.JsonLibrary.wasm",
        "name": "Soenneker.Enums.JsonLibrary.8f63ft006a.wasm",
        "integrity": "sha256-REbFzNKMNpMugsjW+4Hbm9VFEycasdg6zq80PaV01Wk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.JsonOptions.wasm",
        "name": "Soenneker.Enums.JsonOptions.zqv7w69ayt.wasm",
        "integrity": "sha256-hVuK2KqarCqASncsepXPDM3Ev+g1EJ2SXpmbcKN2F3k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.SortDirections.wasm",
        "name": "Soenneker.Enums.SortDirections.1wn9rrtb0r.wasm",
        "integrity": "sha256-z0dYlyBWm3LOpX3k6sfZEyXD9YXuXbPKS4pZknt1zlk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Arrays.Bytes.wasm",
        "name": "Soenneker.Extensions.Arrays.Bytes.c8786j9gqn.wasm",
        "integrity": "sha256-ZKcEk8D9FgTM25rHecSEx8VVBpDt71baM0X1nBjn9F8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.CancellationTokens.wasm",
        "name": "Soenneker.Extensions.CancellationTokens.0s0z44n1pg.wasm",
        "integrity": "sha256-UE10H5Qgsd3ijzgeIWkF96P6Og5LIVE3uR2surbqhyw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Char.wasm",
        "name": "Soenneker.Extensions.Char.ov4s8c5qmp.wasm",
        "integrity": "sha256-tI9IvznDQad8kFQimbMvQ3zmU+vk8p8omIu2YlFgb9c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Configuration.wasm",
        "name": "Soenneker.Extensions.Configuration.3iut3nli97.wasm",
        "integrity": "sha256-q67I2dCKJrZGV1polWGhQ81fA9wQbIgmRK/FnGp6OlY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Configuration.Logging.wasm",
        "name": "Soenneker.Extensions.Configuration.Logging.i1k2rh749c.wasm",
        "integrity": "sha256-Ct9pxxM00F+npzhER1lrQfUs69HeSl7A4ppceFDtn58=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Enumerable.wasm",
        "name": "Soenneker.Extensions.Enumerable.hwo4vxu8dt.wasm",
        "integrity": "sha256-7yXsKKiOe9SGcLbn2tAQACYv5/Awpr7BlBa7VlFiND0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.FieldInfo.wasm",
        "name": "Soenneker.Extensions.FieldInfo.xyqks5n3bg.wasm",
        "integrity": "sha256-icUB1ZCuCflGNbA2xUkLuvFr6geE5FmrzlAVFQOz4Yg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Long.wasm",
        "name": "Soenneker.Extensions.Long.jr6f3o3evj.wasm",
        "integrity": "sha256-/8LGNR00AqNFmWz0ZFVdjjb9nlMyk8vdVSTSs9MfFX4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.MemberInfo.wasm",
        "name": "Soenneker.Extensions.MemberInfo.l8tsyxxic7.wasm",
        "integrity": "sha256-+2bLNoAIi/bHzf/KBo7mOHVCRXGFjEBSFeJV/3ME6QA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.MethodInfo.wasm",
        "name": "Soenneker.Extensions.MethodInfo.drk51qzarg.wasm",
        "integrity": "sha256-pw7lrtlF6QPB1xcCV9COZ86roBcKqbnuN0jQukBBJ8E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Serilog.LogEventLevels.wasm",
        "name": "Soenneker.Extensions.Serilog.LogEventLevels.yp7sq4mv5s.wasm",
        "integrity": "sha256-FiCTKik4R2syDYtw3EY7mQvQEAeByxCo55QtfgzRSvE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Bytes.wasm",
        "name": "Soenneker.Extensions.Spans.Bytes.ard6ilg9jz.wasm",
        "integrity": "sha256-JpGRXtKF7yNm9TahBgQ8hYqKC7ZUC/b2r37MMgJ/jFw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Chars.wasm",
        "name": "Soenneker.Extensions.Spans.Chars.5essf3pmwm.wasm",
        "integrity": "sha256-vekOAQw9CKRheK9aDvXZxl73ZU80CuOZ/Gz5aNJ+saU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.Bytes.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.Bytes.ueg1pnv8ks.wasm",
        "integrity": "sha256-qpHwYTxe0l6LP/Z0bJ9o0LibboIFb7piZ0bFhLLp3Qk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.Chars.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.Chars.8o2a5lrebc.wasm",
        "integrity": "sha256-+AowODIpOhGSwR2cl4KdyrhuR+gLrLrpTUVe/aNhohY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.ParameterInfos.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.ParameterInfos.5s1enmvp33.wasm",
        "integrity": "sha256-e0AYfzCD/cb2sLrGpLgVRYQiGv1Oe4XZm1DapSOHREY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.Types.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.Types.qi7e7kkxi5.wasm",
        "integrity": "sha256-ktRLfSvS1x8W2BjTLgUYYHUs+bWelLnW9sjA/nC6404=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Stream.wasm",
        "name": "Soenneker.Extensions.Stream.6coky3kg83.wasm",
        "integrity": "sha256-yrk0xZZRuh7iDXhq60FilxRmDw005hBTLX+/K6gVKn4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.String.wasm",
        "name": "Soenneker.Extensions.String.5r9qp8293p.wasm",
        "integrity": "sha256-HxNSeKjypyvPHTjgYGeZRqsIPqi3goSREtej/o9dcG4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Task.wasm",
        "name": "Soenneker.Extensions.Task.f4eic8mlnz.wasm",
        "integrity": "sha256-AZzwmAkTM6zsWPb86oZIDBeM2PLuwJ2nJOicqDh3Aac=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.ValueTask.wasm",
        "name": "Soenneker.Extensions.ValueTask.2fs64ez2yu.wasm",
        "integrity": "sha256-ov5J09NEQQ+q0QDFlnFmKfmht/Stu76Jqnvsbzj7bLQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Invocations.Actions.wasm",
        "name": "Soenneker.Invocations.Actions.mlquv5wce0.wasm",
        "integrity": "sha256-KpXQ1tan+25rOmxFxMFuzxcWgFMJTxxLmG+N1nPpSpU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Invocations.Funcs.wasm",
        "name": "Soenneker.Invocations.Funcs.uifzy2ij6s.wasm",
        "integrity": "sha256-VsNp1ZOZr8xC85JlXItwkNX0mdKFJv14GiTTkvzfayw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Json.OptionsCollection.wasm",
        "name": "Soenneker.Json.OptionsCollection.iiskol00md.wasm",
        "integrity": "sha256-WlmfggzKVko0gRTh0EFudgbicDchztqr7mBjDEKeyvU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Lepton.Suite.wasm",
        "name": "Soenneker.Lepton.Suite.5jh7dg5pab.wasm",
        "integrity": "sha256-gVFiOQlkvl9TkDOasBcG9bwMfe+dEOqfkqp+e/3ov5Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Lucide.Enums.Icons.wasm",
        "name": "Soenneker.Lucide.Enums.Icons.lijspj2h6f.wasm",
        "integrity": "sha256-M2ketnAphjzMgjFLnyOJrfzm+G8XFQcEVaDYbjyXo2A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Lucide.Icons.wasm",
        "name": "Soenneker.Lucide.Icons.sygw0avp3r.wasm",
        "integrity": "sha256-HEq4hMuUf9Cuc5hA9ToJHm+wcmOR6Ptu1Vlkf5ISO2c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Builders.wasm",
        "name": "Soenneker.Quark.Builders.wy2kd1byxc.wasm",
        "integrity": "sha256-CE2RdHYyFRxFvBftdfJDqVR/ofuZnjJyoh1xO734xKA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Breakpoints.wasm",
        "name": "Soenneker.Quark.Enums.Breakpoints.i2g7vufq4f.wasm",
        "integrity": "sha256-GnQTR8hcM/9PVrpbTShrb/YZQWhs0IGhzqTxWPgft0E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.DisplayTypes.wasm",
        "name": "Soenneker.Quark.Enums.DisplayTypes.fboewujhwv.wasm",
        "integrity": "sha256-mzqa1SoM+VAkxhnZdVJiQ9CmUqBLynGskDyBK+nOZMA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.FontStyles.wasm",
        "name": "Soenneker.Quark.Enums.FontStyles.6l3apb8jpr.wasm",
        "integrity": "sha256-VsqW6ngHEULxXucoy5d3awe6+RddW7+4HQ/blDDMCvc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.FontWeights.wasm",
        "name": "Soenneker.Quark.Enums.FontWeights.ksc58koj55.wasm",
        "integrity": "sha256-BOi2lFdsCzV9b7j3I7CMYTs+LLY8afhKQndywFH/t10=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.GlobalKeywords.wasm",
        "name": "Soenneker.Quark.Enums.GlobalKeywords.n38vwdy6lm.wasm",
        "integrity": "sha256-w04nKOrnpNd16kPpKwd9ctfcpn2Dm9GvrkUahexKKuo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.HtmlElementTypes.wasm",
        "name": "Soenneker.Quark.Enums.HtmlElementTypes.h1jsvhw0b3.wasm",
        "integrity": "sha256-ZbIclVgiISZMNoYYKrRWks7Sl3rx29T0MBYfvu072Z4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.ObjectFits.wasm",
        "name": "Soenneker.Quark.Enums.ObjectFits.ley51knhs9.wasm",
        "integrity": "sha256-bV4v4dmLajlZZBvJVPDlAjihYY5z/FhZ4ZdWL2nxuOw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Overflows.wasm",
        "name": "Soenneker.Quark.Enums.Overflows.o9n0fzsr2g.wasm",
        "integrity": "sha256-zNCtt7oGcn9ZzpzTDqflE5RiosoNBTFNsqo8MixDV70=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Placements.wasm",
        "name": "Soenneker.Quark.Enums.Placements.4ehvderjxa.wasm",
        "integrity": "sha256-zP7GYHZ3KRENugMCiEtovMSdoaJGUVQx2WbjXyDp34M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.PointerEvents.wasm",
        "name": "Soenneker.Quark.Enums.PointerEvents.u0cfx145yf.wasm",
        "integrity": "sha256-YjBbTktPxBHG7stQDIG3Do9v8p+we+sPayNVAKmzLPw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Positions.wasm",
        "name": "Soenneker.Quark.Enums.Positions.whezbf3fdq.wasm",
        "integrity": "sha256-3FQ1o5O01PP1tN20DacPEaoTEZfaNSUoHhDdwp8x0cU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.TextAlignments.wasm",
        "name": "Soenneker.Quark.Enums.TextAlignments.i21tb6du0g.wasm",
        "integrity": "sha256-VkKSKiWzz225YnjYESQacPvFs8gOGInNF4JhmO9S8TI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.TextBreaks.wasm",
        "name": "Soenneker.Quark.Enums.TextBreaks.amhn6putbg.wasm",
        "integrity": "sha256-8qLgZoO9tzo5akV47ice2+mEbMUFxArZKTeH5PY8qcs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.TextOverflows.wasm",
        "name": "Soenneker.Quark.Enums.TextOverflows.e5hy1d67mo.wasm",
        "integrity": "sha256-UqAQz35urvJPLHMvgRsQq71ROO1EV3v2BWRLRc8R8XM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.TextTransforms.wasm",
        "name": "Soenneker.Quark.Enums.TextTransforms.fzfn3sxsse.wasm",
        "integrity": "sha256-q5PLt7Mg7+Zx7G1tq8X8QcI+vwDC4991en8fLpWAqgk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.TextWraps.wasm",
        "name": "Soenneker.Quark.Enums.TextWraps.3yno2mllrh.wasm",
        "integrity": "sha256-O3klGM1jo1wHlwfpKRac60QbBeAYNvZzdglCZwhbDbA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.UserSelects.wasm",
        "name": "Soenneker.Quark.Enums.UserSelects.3yor3mitto.wasm",
        "integrity": "sha256-9e27XOgrGHOPkZGoVmhTnN41nj3OWKqCUyntSFxrI3Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Visibilities.wasm",
        "name": "Soenneker.Quark.Enums.Visibilities.wc183tmaoj.wasm",
        "integrity": "sha256-IPBqWgRMZjDJ1px11MKeRic3AQ/w84e4Wo3ph1iG6xw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Gen.Lucide.Abstractions.wasm",
        "name": "Soenneker.Quark.Gen.Lucide.Abstractions.gv01lmxth3.wasm",
        "integrity": "sha256-rFcA6VLZ5PZQoOBULadKhqWxi4efonA+VH2LdmtWDMg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Queues.Intrusive.Abstractions.wasm",
        "name": "Soenneker.Queues.Intrusive.Abstractions.uzgeotafl9.wasm",
        "integrity": "sha256-ilnL+xO6Tz9/S7uUfNdAdAj3JeHQToHXAI+mZ0r+1XQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Queues.Intrusive.ValueMpsc.wasm",
        "name": "Soenneker.Queues.Intrusive.ValueMpsc.erbef1gdu1.wasm",
        "integrity": "sha256-9nnO/cmmGdLI4EdH+7j4bFaGExYI9/Fv0OgjrSaecpM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Reflection.Cache.wasm",
        "name": "Soenneker.Reflection.Cache.1gohkt044n.wasm",
        "integrity": "sha256-/0HViwC+3qnTMtpyuidH+0QRU976SN3jJhDtIPvDATk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Serilog.Sinks.Browser.Blazor.wasm",
        "name": "Soenneker.Serilog.Sinks.Browser.Blazor.phx2n28woz.wasm",
        "integrity": "sha256-86pW7yPyCh+fsywaPZCNRv2Iajfq0PGITKeBOfuwNNQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.AsyncSingleton.wasm",
        "name": "Soenneker.Utils.AsyncSingleton.mlz4chammj.wasm",
        "integrity": "sha256-xuIh+rJgRGvvRm0nmMSzWM/SaKt0SLm7AvNYPEtJSeU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.AtomicResources.wasm",
        "name": "Soenneker.Utils.AtomicResources.8fsc97rhhe.wasm",
        "integrity": "sha256-5C88G2jtzmEZmjvsSTnICAbWrd9MqhiFelWTOdduMTo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.AutoBogus.wasm",
        "name": "Soenneker.Utils.AutoBogus.hjbo2g6h44.wasm",
        "integrity": "sha256-k43Q+gN0cN/+XbLz4CnOcBZKNJnN1ou//ekaNT3bXRI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.CancellationScopes.wasm",
        "name": "Soenneker.Utils.CancellationScopes.u7dd3a5gfc.wasm",
        "integrity": "sha256-Kh8P9cakdGs/xdKzBDEiyKlFNFxydpx2bSimUv1HTZ4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Debounce.wasm",
        "name": "Soenneker.Utils.Debounce.4hnfyooxkm.wasm",
        "integrity": "sha256-aFlC5rCCLVWbqqNCf/MCo1oJtbRLMEe43xWGyvGs+Ys=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Delay.wasm",
        "name": "Soenneker.Utils.Delay.5z69dbyoec.wasm",
        "integrity": "sha256-keT8IgB4eWE03YCQpt5npgKvJQXkoUGwB+9BWZSloPs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.ExecutionContexts.wasm",
        "name": "Soenneker.Utils.ExecutionContexts.xj0cifntsd.wasm",
        "integrity": "sha256-zStdLoku6pZacI3U6DEx+ds+7mIFH+XUTWCbHzOCI/8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.File.wasm",
        "name": "Soenneker.Utils.File.w30n5zvefa.wasm",
        "integrity": "sha256-TGEGvnjDE18O27YcIj7oClwuD6iGfAEkaLTnEucf4wc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Json.wasm",
        "name": "Soenneker.Utils.Json.mlp09inke7.wasm",
        "integrity": "sha256-miLoJ6uXK9F4unJEnuj03B+CEQ4x6nN0xVrJku//oR8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.LazyBools.wasm",
        "name": "Soenneker.Utils.LazyBools.djhim8650e.wasm",
        "integrity": "sha256-Sb8P1Di83yg4mPQ+yNN0euzPHlP4gZh5cLabMtEbfPs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.MemoryStream.wasm",
        "name": "Soenneker.Utils.MemoryStream.pbjmozarc9.wasm",
        "integrity": "sha256-Ve/iaH10Zk1z3GlMxAr1KJjZwlB4CLiPgWYOrfsVw38=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.PooledStringBuilders.wasm",
        "name": "Soenneker.Utils.PooledStringBuilders.ka2vg33zbs.wasm",
        "integrity": "sha256-pPakAKqymyPqZXo6uVAABp5s31JmWNOUwTM/Cfi18+s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Random.wasm",
        "name": "Soenneker.Utils.Random.gdov9llr4e.wasm",
        "integrity": "sha256-JLp1iJtz3xY6q/TFA57FYZiqA4eGU1Wh5cmmfxl/cHE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.ReusableStringWriter.wasm",
        "name": "Soenneker.Utils.ReusableStringWriter.kuqt4cl21l.wasm",
        "integrity": "sha256-1M52NxcaTmj1wSiM0rgnrt+CHf8tP+vCxBlCEmWFA2g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Runtime.wasm",
        "name": "Soenneker.Utils.Runtime.uyzcl496nb.wasm",
        "integrity": "sha256-FhZejiYOvwInF+F6j8vDqjINwm3cFgR5kAY5hZItbQw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.5176uufpfc.wasm",
        "integrity": "sha256-51CWorH5JYLE2XeAsObFlGgGtQDyXiIUHydnx7pUBnY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.3ngbh3gunw.wasm",
        "integrity": "sha256-/0W/U/4Ga7NKGZVlzG6DZKD8PDGUgnznEUHGbc+xoEc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.53cm7heee9.wasm",
        "integrity": "sha256-sZFUS+zEecZ1W+ZUTcwMO/KYxCW2hRGkaw6GyfyOrGA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.7kxdldkpjh.wasm",
        "integrity": "sha256-J/QG81Ch/j5S9kFIguoLHe+XOBkaZOjkCPh+CA80ppI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.8nbub8eefv.wasm",
        "integrity": "sha256-jP5VooTus1Cgz7v6F+s7Iryl0RJ0JsT/3pNOU3HimO4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.ygv07g9tmj.wasm",
        "integrity": "sha256-Uhb121q/YWZmqwCK5grYO5eH0WWndHJfdK5GIi+gvrE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.6231qei9x2.wasm",
        "integrity": "sha256-Qoh3GLwAGyfsiE0lv9YX3TuY1xzhmWC1z67eOg7kVOA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.jc1ku3b11i.wasm",
        "integrity": "sha256-LQKUBkT7a+eB6JURgQwsbE913NqyddomfRzcRoxwEsM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.3kwsok0qa2.wasm",
        "integrity": "sha256-0/skZa2rbEhZ43by7vEQCYKWTxlKEPP0yk6z/T9IWOk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.p4db1ray47.wasm",
        "integrity": "sha256-x9uzqwDn1crs2MmVVIsjOBhwLttNcKWvXYy050JChWo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.ac2ye6riet.wasm",
        "integrity": "sha256-Wha4hs95ukJreKKDgtMwSExwAPaXVypxFoJwLYiVQrM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.4wen5ib0q6.wasm",
        "integrity": "sha256-JAg47pv6RTEfh3HlLmF/q5So9QggWoEw6bBSwNQDvZ0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.67qe9e0qxx.wasm",
        "integrity": "sha256-Ip3djXpHjTVWHWlFQ5WM0KkOjchbbanDX4qmEZXd4Ms=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.17ttg1movl.wasm",
        "integrity": "sha256-DU0u4p5C1XFV4F03IU9EB2ux1VptOJ2rzmo9EwXAYKY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.vl3us9fhyd.wasm",
        "integrity": "sha256-w/38+yyZcQQmWWoRgDLZhJXkmTZaXXTnGQK5j28b7wA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.f5b9xx9ebt.wasm",
        "integrity": "sha256-TWqOAIv6MKua+eri/2iCwsGU5ELpNEgeVgkgY9NWPd0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.d8abg920y6.wasm",
        "integrity": "sha256-cwPGI68ueVqohpGFUXeVYVJ2KzT1QCSlQ5Rwnj1ngQ0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.pwfw0zwx98.wasm",
        "integrity": "sha256-icS8WxKQ4KAWcutc7rR8xAIOabkTt6riZJOoYooT3/k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.vq2p72bvrm.wasm",
        "integrity": "sha256-2QZTBEsOWl2lksq2Mou5SYtDKnCOP8v2FSF1tfVvkfM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.r1mb0reapf.wasm",
        "integrity": "sha256-X/Ctd75N5fpwWrALaaLPS7RDjVQciJRmRSarbkaz8y0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.cj22par16p.wasm",
        "integrity": "sha256-WIrrGHDhUsVUx6awFtQQJD70cK1Ft/Nx9GLIbl5+yqI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.dvatq3796g.wasm",
        "integrity": "sha256-SdJOIZ7hhX0WKXGsLnD7zvARPM5VIR7R3FY7kmR74x0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.e6ct1w5z8t.wasm",
        "integrity": "sha256-GuyiUZB4G961nL2bszB6rAf+vCTJL7pPdL4T/YduwFY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.p3eh3wfwsr.wasm",
        "integrity": "sha256-W0vAN7Huur3hpOzoWtkmATPWz2xV8RKu5K+tJ+T6M2M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.tyilwx8zv2.wasm",
        "integrity": "sha256-RdcEPtUrXPtnEXtu+npdOHDouRQ+bPkbMrWqEnVR6w8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.d0jszmdkec.wasm",
        "integrity": "sha256-PTrune5UAYcoKGsVrsCbPeKiViSTZJYONT+cr/ctGxw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.ee2sm9cb3z.wasm",
        "integrity": "sha256-2upXdh0yoxXbFW+uUOUdLzFbmfgVBU2gPaRsmsVBapw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.v2h0vt6n8f.wasm",
        "integrity": "sha256-iXYqwHM6lwDzd4ydkfjE1AUiZUx7WEXhaoQT6aGiKCU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.gl1dwy0h33.wasm",
        "integrity": "sha256-rI6HA6b1lY+uWF1zaH/bEm9LtB7KV5Cq2T8t1Lv2nV8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.soa2aswi66.wasm",
        "integrity": "sha256-ZKNzk4yT8RabjrGQkBswkfw6d0D7CWkIQcrUAmuwAzk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.qve5y5gsty.wasm",
        "integrity": "sha256-ao9qR9n1dTj5lWMKmuh76YaO+U7W9T+j+4Ow72GXbOo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.aprxfy5kea.wasm",
        "integrity": "sha256-fpGQO0vsEvACMBuNkeqPxD4yBWSqMsl9ecKx84IGRSw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.75gyazxdtp.wasm",
        "integrity": "sha256-xXOHmYJ0M/aKWwGPe3pyGDZOlg91HwGx9xWEesJPzFg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.zzwqj1m5v2.wasm",
        "integrity": "sha256-cZ8xq5ldTGfAeisBJoFnyzIw0vWyjE+kc6/yJSswu5k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.r4a42ckqzy.wasm",
        "integrity": "sha256-tUG/En8DbQa0VHHMLBd4FLNZSdIAIzLMDVWmNik+nfY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.jisyuelivb.wasm",
        "integrity": "sha256-JZWpSVC5f1+TtKO5UuPPpAK5Jh3Y+Yd1fJkXVaYA8kw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.ks842ie4vx.wasm",
        "integrity": "sha256-fFDrgwknCwCfB8WJxSjyfdFGqpxPcEI3WcGH2dXKomo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.5swfmwb6aa.wasm",
        "integrity": "sha256-SybPgZrxs3nNW49f7cKyJInNmZ6jjZo1aTsYQVsTIj8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.0w3al6sujs.wasm",
        "integrity": "sha256-0ICK1urofcWmz7vV1/rHhXYnpHG221DbVVUfWMinzcw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.t9n8q1mjmx.wasm",
        "integrity": "sha256-L7rg8pQ499juK/35fMyZOqSNtC6V3M+tNr271ZXhbqg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.ib432q1um6.wasm",
        "integrity": "sha256-nrICwc5YcI85imuGjfRqoC7Ivrbk8iqk8RSGt7okpss=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.nlovnoijw0.wasm",
        "integrity": "sha256-S0XhtaNBqfYeZJK5M1880v4EBVR+fFtwubH+UUGdzyM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.wasm",
        "name": "System.Threading.Tasks.Parallel.hghfigc395.wasm",
        "integrity": "sha256-3+cQMYfXw1G0Chpu+AelsEw0rPlyNP3Rwuqr/YWcqYw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.x3pq94fw8i.wasm",
        "integrity": "sha256-nSp+pvvWFMF5eUI2N0wrlDbLNIkSWfTP/hMJrdXoZJo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.arylk6nshj.wasm",
        "integrity": "sha256-yoD5Ng+sx+H6MB4s+1dS5FND4lRhAk4i2mb6CdPqOks=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.1t1f7abjkk.wasm",
        "integrity": "sha256-5fWQqFGllSkAU/RIKtlSWTiQ6yo6HqKLGnlWX4e/sPk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.z22nmtp0zi.wasm",
        "integrity": "sha256-S2R82kxm3W56tla2HUKeATCRKM3n9ylP2gavTqDqANY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.85rg0gj23d.wasm",
        "integrity": "sha256-bN03C7w8/mIYSie/Mu1TLkn4vu+RsAgKm6wxwW7PvlM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.0x1wb7tfot.wasm",
        "integrity": "sha256-tMixsUF4GSgbd7+FHB6PICB4tUpDj29znyKxTr6gLUA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.92yrw2og9w.wasm",
        "integrity": "sha256-zzKMOorN2GbfYOKsIjFmTIb63BAWAWLcNlqlkaOsBFU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Suite.wasm",
        "name": "Soenneker.Quark.Suite.2055aj90vs.wasm",
        "integrity": "sha256-blGLZNLliVjDnUFKhpjLHccI2Cmy5DPdOhkvTIOLWQc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Suite.Demo.wasm",
        "name": "Soenneker.Quark.Suite.Demo.6fh6yjp86e.wasm",
        "integrity": "sha256-srtusuK+kIog6zJk0s9EQq/Wf2FYO8GDMQx3Kfd6HX4=",
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
