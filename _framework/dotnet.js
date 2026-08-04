//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"f7d90799ce4ef09a0bb257852a57248d2a8fb8dd",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "Soenneker.Quark.Suite.Demo",
  "resources": {
    "hash": "sha256-7M+BFhoc5Zv1Mr/rhnU6VO+vxeSWsSRWRHSw+jeQ8Lg=",
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
        "name": "dotnet.native.3d0mobkoxh.wasm",
        "hash": "sha256-qfDrwfpvKgqkZPONNI0IWxcXICtp8+FFHeX4uUAH8ik=",
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
        "name": "System.Private.CoreLib.qi0mjh4qvx.wasm",
        "hash": "sha256-3rwSPd/58Mu/e+A+WU4qlU5w6WExouPyIbkibUvnFRM=",
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
        "name": "Microsoft.AspNetCore.Components.hsbieaidln.wasm",
        "hash": "sha256-MaLHH9ekoklgc3BHLuLY9Q5Yhr1ZGDEhB+bCF1eUftk=",
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
        "name": "Soenneker.Asyncs.Initializers.3czugtt62f.wasm",
        "hash": "sha256-nf0C7qdOHGedwfBWEITYC/X9M+nxh63DAw9T++kSpas=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Asyncs.Locks.wasm",
        "name": "Soenneker.Asyncs.Locks.pc174e1zn2.wasm",
        "hash": "sha256-mU6x2BzDlIxyI534VF40LbjOPUHVCHR0+atcUgyENQo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.Resources.wasm",
        "name": "Soenneker.Atomics.Resources.4accj3u8s0.wasm",
        "hash": "sha256-LIjRSnYyhyBAxbrD1eXfF7zTDvzt7c2Kudm0IhJXa2M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueBools.wasm",
        "name": "Soenneker.Atomics.ValueBools.gzr8oa4mi6.wasm",
        "hash": "sha256-VIA4rusP1snhCmzG4obSkyKAEticu5kvEf7xUKhG1Bk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueInts.wasm",
        "name": "Soenneker.Atomics.ValueInts.e1pf3ylegj.wasm",
        "hash": "sha256-fljuOIgXYIeLrFixpeG+j8MSyZGQEWHqwgZiAoe+R7Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueNullableBools.wasm",
        "name": "Soenneker.Atomics.ValueNullableBools.kite1pwfud.wasm",
        "hash": "sha256-FA7ImJPQ9W2G5y9CL7eceA8R3SGTXa7UxLZwFwIIYEo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Attributes.MapTo.wasm",
        "name": "Soenneker.Attributes.MapTo.my4nnma17d.wasm",
        "hash": "sha256-IhjIp2MHEY6oqshbLVBysF7gDAkuj/g2K/0Lyg7ZcFs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Attributes.PublicOpenApiObject.wasm",
        "name": "Soenneker.Attributes.PublicOpenApiObject.nv03qp5wgf.wasm",
        "hash": "sha256-M9WFXwRZzp0dLsWBvzA6a1/XdO1umu8tGeU3JUqlcDw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.C15t.wasm",
        "name": "Soenneker.Blazor.C15t.gf3eua3d65.wasm",
        "hash": "sha256-3L7lHOQ91IsvR1z/ikOlb5yieFhrTnNqX3i9v4NhqSU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.CreditCards.wasm",
        "name": "Soenneker.Blazor.CreditCards.lge38w3yu1.wasm",
        "hash": "sha256-9aOnYcTTMP0kFRx1AUWOp9b/xoc+FOhZVBQ2tERiYRQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Extensions.EventCallback.wasm",
        "name": "Soenneker.Blazor.Extensions.EventCallback.v6x8zryq8m.wasm",
        "hash": "sha256-B0mphPaKq65VL/bBuuWqu0xSqgLtyoctLY7TMC8OUBE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Interops.Floating.wasm",
        "name": "Soenneker.Blazor.Interops.Floating.xuq35ll3vz.wasm",
        "hash": "sha256-uVMUYC1FwtZgyhl1IIwRYiHMOb/Qv/6bpvsCThQtGGk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.SignaturePads.wasm",
        "name": "Soenneker.Blazor.SignaturePads.ph46gvh047.wasm",
        "hash": "sha256-w6eHurCbKpStiNzQ0csa1PdfOWqFH1oJTNCSdEaw5vE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.Clipboard.wasm",
        "name": "Soenneker.Blazor.Utils.Clipboard.sts1xwao4a.wasm",
        "hash": "sha256-0Nazb/U8ubnvnxelmvf50sijqJVacjI+VOVPHvaE6ZM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.Ids.wasm",
        "name": "Soenneker.Blazor.Utils.Ids.5mj3iq9n71.wasm",
        "hash": "sha256-DdBOhFGjuc9a97By2kTvanyZ6NjKuymjsSYdeijOJzk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.JsVariable.wasm",
        "name": "Soenneker.Blazor.Utils.JsVariable.lvbufpyalu.wasm",
        "hash": "sha256-oar7cJ/24oBZAVR5LKF+T0kzjtIeocHkpPRJBLIYNYY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.ModuleImport.wasm",
        "name": "Soenneker.Blazor.Utils.ModuleImport.dfjgzxd5hw.wasm",
        "hash": "sha256-Wf2H/lz8plwh16mremuOG1/dBfm/Wc7IZbHiNXB9/Gk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.ResourceLoader.wasm",
        "name": "Soenneker.Blazor.Utils.ResourceLoader.ceyqlzjqha.wasm",
        "hash": "sha256-pIFb3Jtu/xQOhoMCqUoWjuQmjFKMZU2/bLxoF2vTssk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Bradix.Suite.wasm",
        "name": "Soenneker.Bradix.Suite.wqzet9cuyi.wasm",
        "hash": "sha256-eO17jlTMFTlbixGonk+m5rKJzz0GIjW9eQkpjktHtEY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Culture.English.US.wasm",
        "name": "Soenneker.Culture.English.US.hacbja0tgv.wasm",
        "hash": "sha256-B1Itpxpo2kWdtrfoDl1xx3iSYLbtiXChOA9FMiXJ5Tw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Dtos.Column.wasm",
        "name": "Soenneker.DataTables.Dtos.Column.7soz6ew3pr.wasm",
        "hash": "sha256-N+ZZReULlHNFeUkYhVlBx9KSZA9dFztHsR0uTGz0kJU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Dtos.ServerResponse.wasm",
        "name": "Soenneker.DataTables.Dtos.ServerResponse.omxitxfc3f.wasm",
        "hash": "sha256-wMv/KUKHLS58rYlNYECVzQ2pnnUSxgWxyPdjicpFtI8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Dtos.ServerSideRequest.wasm",
        "name": "Soenneker.DataTables.Dtos.ServerSideRequest.q63vmx4n7c.wasm",
        "hash": "sha256-HuQbCGXe/PDfqoVNF1TiLLfEZv5BZrrR7p2qzqdVChs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Extensions.ServerSideRequest.wasm",
        "name": "Soenneker.DataTables.Extensions.ServerSideRequest.im0fsxgidm.wasm",
        "hash": "sha256-6vC9aLVcjWVQt+iTiH34bfMP2y37BmVnv0Tr5GtbLiI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dictionaries.SingletonKeys.wasm",
        "name": "Soenneker.Dictionaries.SingletonKeys.lce3i9icfd.wasm",
        "hash": "sha256-ZaEsU8VfA3IGFvuDZE/oCV6VfM7IQrljdmdudDjP/Yc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dictionaries.Singletons.wasm",
        "name": "Soenneker.Dictionaries.Singletons.iymddtg59l.wasm",
        "hash": "sha256-hkm/mhhFVMfhrMh0mLw4nXRIACwXm9QcdXV2J4y3Byc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Filters.Base.wasm",
        "name": "Soenneker.Dtos.Filters.Base.gj83ccqi66.wasm",
        "hash": "sha256-BFZEcJjNbnehwYLDx8T8bbc9bz3aXDfgWvepdsP+4FI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Filters.ExactMatch.wasm",
        "name": "Soenneker.Dtos.Filters.ExactMatch.ylw223086n.wasm",
        "hash": "sha256-asDmbpvTsdv36EI+MRrClwQlYwQyUfpZC9tnxzls+eY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Filters.Range.wasm",
        "name": "Soenneker.Dtos.Filters.Range.89s2i93qe4.wasm",
        "hash": "sha256-jMH88YshI/U4Z6mg7zJZDIgVhx+p82IIdpjvSxuYvoo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Options.OrderBy.wasm",
        "name": "Soenneker.Dtos.Options.OrderBy.s5ecr3gsmq.wasm",
        "hash": "sha256-UEbFcRBmCDXAhHrwYkIzWVV1TPTMgrpbN8WMk7Upxxc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.RequestDataOptions.wasm",
        "name": "Soenneker.Dtos.RequestDataOptions.gxtfd2bnou.wasm",
        "hash": "sha256-RCorboR7+KkpG6+y9PBaDyp6bBZR7+Oq18J8m/SdrkU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Results.Paged.wasm",
        "name": "Soenneker.Dtos.Results.Paged.oj31kkno9t.wasm",
        "hash": "sha256-NJwz9b84IN0ZXsAsPsyYVtyFrlX9Jkl1uoDfnjbuaHg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.ContentKinds.wasm",
        "name": "Soenneker.Enums.ContentKinds.x5kp2ov2c2.wasm",
        "hash": "sha256-q7snAKnwv1zc7JTL3dp1dCtUvf7TdHIRl+QGUaNd5TQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.InitializationModes.wasm",
        "name": "Soenneker.Enums.InitializationModes.x0loni6y9q.wasm",
        "hash": "sha256-cV/umhOf5U5Pj3BrOSvidC2GJ8HK5Yjwpm2WVjSK1O8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.JsonLibrary.wasm",
        "name": "Soenneker.Enums.JsonLibrary.45uuy7t7u9.wasm",
        "hash": "sha256-6J39UT1DLsrpv93LTym91Tg18N24XgZT2JoWmVAdUYY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.JsonOptions.wasm",
        "name": "Soenneker.Enums.JsonOptions.2v2n62u783.wasm",
        "hash": "sha256-wuMEXIysVNGVBj4hHO6aGZ+dZ0iYRTkBZzQUyc5mscc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.SortDirections.wasm",
        "name": "Soenneker.Enums.SortDirections.uhwm4n4a86.wasm",
        "hash": "sha256-/rH5hyYQk5uEw+TNsr8jxKCj5buAkfnaWHmyJJtELQE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Arrays.Bytes.wasm",
        "name": "Soenneker.Extensions.Arrays.Bytes.cd0y713eva.wasm",
        "hash": "sha256-YPFhWzZcYSxe5obbgNcZntM4cM8CuPfTZQjuP+6rzWw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.CancellationTokens.wasm",
        "name": "Soenneker.Extensions.CancellationTokens.kh4ezau5ny.wasm",
        "hash": "sha256-yGaQFDl04ESOpE5fIJBStQXOOwpw3tjhXM3v3xMKJDQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Char.wasm",
        "name": "Soenneker.Extensions.Char.e767vhmv60.wasm",
        "hash": "sha256-1mEQf1lH1XaPBdzOWkkBBMcqRH1fxKRywNTtKDbOqjg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Configuration.wasm",
        "name": "Soenneker.Extensions.Configuration.6w13yu4qpc.wasm",
        "hash": "sha256-qnm/kqBjoMLC5u74hDeiaulBfvBZnY2ja+JK3S91Ptg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Configuration.Logging.wasm",
        "name": "Soenneker.Extensions.Configuration.Logging.ucn0w99ktn.wasm",
        "hash": "sha256-PuqBHyBHbtZ6oZKz1UjyUcamsadenA62Z02v08omt+Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Enumerable.wasm",
        "name": "Soenneker.Extensions.Enumerable.58b3gb1nhm.wasm",
        "hash": "sha256-lUcBXS6lS65WVKWOIYCIRZhsc3azC9c7lFx1MSkAkws=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.FieldInfo.wasm",
        "name": "Soenneker.Extensions.FieldInfo.dyzp2yry5z.wasm",
        "hash": "sha256-u0O0HgQgIcG6BPt6rMPWaDayJytG7KJybboX9V9amIY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Long.wasm",
        "name": "Soenneker.Extensions.Long.p7h0lpdvzr.wasm",
        "hash": "sha256-JSDhNcQ7t953QSfKedW3nNlMVKfozNychHjzeFkx3J0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.MemberInfo.wasm",
        "name": "Soenneker.Extensions.MemberInfo.eozixmkgbm.wasm",
        "hash": "sha256-4mGml9v/VBj97na53Qp27ZDBy5lUcWJKXyIu4/4PbsM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.MethodInfo.wasm",
        "name": "Soenneker.Extensions.MethodInfo.uxjcfyjtcq.wasm",
        "hash": "sha256-Dmm9qGuoKY3xseYoHUyGYzhSfX139UBfR0b/VZAdG1Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Serilog.LogEventLevels.wasm",
        "name": "Soenneker.Extensions.Serilog.LogEventLevels.34l9dbozey.wasm",
        "hash": "sha256-I0x7h6l5GrslIqeUJJbhTV510pcll1GsewpAmjL3lUk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Bytes.wasm",
        "name": "Soenneker.Extensions.Spans.Bytes.29od0jkg38.wasm",
        "hash": "sha256-+tcnQoHpBGvbRjDEG2Cz6h/Fq65spnX0NSx89OXT6ek=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Chars.wasm",
        "name": "Soenneker.Extensions.Spans.Chars.rh2xdv0l71.wasm",
        "hash": "sha256-39PkxDXfGKMRVFLw9h3SLJHItV7RN/qMcqFTD3G3bhc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.Bytes.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.Bytes.8igvicbyf2.wasm",
        "hash": "sha256-UJd0dGNLlyJBBmBnD/dbPQ52k4ofNRhVOLr6UEuLTP0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.Chars.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.Chars.otrk9gbw9f.wasm",
        "hash": "sha256-3GJCSNYnoAAxcfGH5eFs/vz9kvHdOp8Qu309s374a6c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.ParameterInfos.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.ParameterInfos.fyf3pghsqr.wasm",
        "hash": "sha256-eYMd7gAmrnDTI5faVZMHr+VyiuSTQTb/0mSvTpMZCW4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.Types.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.Types.nb5dg8twgs.wasm",
        "hash": "sha256-M1zly3WU5/Uq+ZI1mzG90UpdvfL+LwDaet/58ii7Cys=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Stream.wasm",
        "name": "Soenneker.Extensions.Stream.twbjj8ridb.wasm",
        "hash": "sha256-8/l1oZf18DrpjeOLJC7tjI0z5youw7LRQBDvhfkIMrU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.String.wasm",
        "name": "Soenneker.Extensions.String.864z6osh5a.wasm",
        "hash": "sha256-INooKkogeUPhcyHL41FBaDLWwtJGtcecj0CYs4Hjeuk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Task.wasm",
        "name": "Soenneker.Extensions.Task.o7z3vh4ipl.wasm",
        "hash": "sha256-/AckQyrL1mDCGoU6nDicy/vI6HbUtVwzTS/ACcP04DE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.ValueTask.wasm",
        "name": "Soenneker.Extensions.ValueTask.k7zcxm7yot.wasm",
        "hash": "sha256-QAbLLe9xwr8bCo9diOynuhaVxQWQHio4q+rzRD8YjCM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Invocations.Actions.wasm",
        "name": "Soenneker.Invocations.Actions.ignd1vyeeo.wasm",
        "hash": "sha256-/iq9Yg7VwJHMANBFBC+RUuIP/Q8oplpcP50DEsOJmnE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Invocations.Funcs.wasm",
        "name": "Soenneker.Invocations.Funcs.2r9qzys75z.wasm",
        "hash": "sha256-3v5Hq9L52W0Xm4gKr5AieNxyy7BmOoyTr4Cb3/pC+xA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Json.OptionsCollection.wasm",
        "name": "Soenneker.Json.OptionsCollection.syyflkpoca.wasm",
        "hash": "sha256-xPM8IADXdj1phwcOIMyAuwW9DKaySL28atiscqifGx0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Lepton.Suite.wasm",
        "name": "Soenneker.Lepton.Suite.1bsho7b35q.wasm",
        "hash": "sha256-ja2rOK/wH95kjC+EXwxqOvxVEIqhQZAiMUbU43Sc77E=",
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
        "name": "Soenneker.Lucide.Icons.6o0p94074i.wasm",
        "hash": "sha256-psgCFv5VhuVXVw1S4iah9fnctXfA+sj8+6tr5xDF4qM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Builders.wasm",
        "name": "Soenneker.Quark.Builders.pnpa8bvv56.wasm",
        "hash": "sha256-ZWQzClVWoDR2EZ/x9ZmwfUAn8CkvBsIi9yBsBhz+dOg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Breakpoints.wasm",
        "name": "Soenneker.Quark.Enums.Breakpoints.9e12u68f36.wasm",
        "hash": "sha256-kWmrJhlUh1FlU+0IGu9CukjXgkVHmas49A5+q25Ini8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.ColorPalettes.wasm",
        "name": "Soenneker.Quark.Enums.ColorPalettes.tc03i849rn.wasm",
        "hash": "sha256-c+ln9eIZIiG5EdP0M5X9VqTHD4RJ5HydKkM9J9spGpE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.DisplayTypes.wasm",
        "name": "Soenneker.Quark.Enums.DisplayTypes.u3p3qpr7ex.wasm",
        "hash": "sha256-JpC8ncwKfjfGQ39rIETsgcG6mmqnpWXlU3CUCLPgJPg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.FontStyles.wasm",
        "name": "Soenneker.Quark.Enums.FontStyles.e9mhmtmgi5.wasm",
        "hash": "sha256-8lQaNNp3HSIU4VSiAIvaueed7vThBodYANUT/OhgqKc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.GlobalKeywords.wasm",
        "name": "Soenneker.Quark.Enums.GlobalKeywords.48olo24xtp.wasm",
        "hash": "sha256-5E2PnNHJcfY1+sl1OvFZu3cuPeBfI+IYVssmMhmjGe8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.HtmlElementTypes.wasm",
        "name": "Soenneker.Quark.Enums.HtmlElementTypes.6nk34s1vdq.wasm",
        "hash": "sha256-vjCPcttzDQahQKoBPSTNDC7tKZqOcv+vIMSCQN0MS20=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.ObjectFits.wasm",
        "name": "Soenneker.Quark.Enums.ObjectFits.tllgr90wyt.wasm",
        "hash": "sha256-n2/itzY1DDaPIj0mFQINIvEjrKPpaadRJ7Py+V4GwD0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Overflows.wasm",
        "name": "Soenneker.Quark.Enums.Overflows.hv4q9lnqgp.wasm",
        "hash": "sha256-01d2u/ZXaQ3cJu/4e6hqNV4Oj37BgVP5JKEbw/ZNEwM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Placements.wasm",
        "name": "Soenneker.Quark.Enums.Placements.e11zmtzwf9.wasm",
        "hash": "sha256-/nUUl5Xg6SXOQKSWRQMy0ijhIELOmlZsjHd4WlfMgjw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.PointerEvents.wasm",
        "name": "Soenneker.Quark.Enums.PointerEvents.gycurp4rth.wasm",
        "hash": "sha256-GJwhgb3ai1x65uyiDKn9AdoJvRdC83YnBJMJc4sDQNA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Positions.wasm",
        "name": "Soenneker.Quark.Enums.Positions.hogepp2tue.wasm",
        "hash": "sha256-D5eZBWUX1yb21syc1W3mkVKi+TFE8Skv2+aeEy9CUeQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.TextAlignments.wasm",
        "name": "Soenneker.Quark.Enums.TextAlignments.4k5d12ae81.wasm",
        "hash": "sha256-nJnd5wL4o/6imBeDorR0CjHqCwU1d/jZvkaAyM6Be38=",
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
        "name": "Soenneker.Quark.Enums.TextTransforms.3ztofuakxo.wasm",
        "hash": "sha256-v/SFrebBfdlvANtVEz6xgm9n222mLxv/I4f6oDV8KW8=",
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
        "name": "Soenneker.Quark.Enums.Visibilities.61myewqtso.wasm",
        "hash": "sha256-9i3rx5C2g2H8JElg0ddKlhY4hip3SRh5qirFEgqAAAg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Gen.Lucide.Abstractions.wasm",
        "name": "Soenneker.Quark.Gen.Lucide.Abstractions.rwfw4i3ljr.wasm",
        "hash": "sha256-dWvrLphKvSOZwyUbHxOPoEkXUV9w0da9HYac++mxnqE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Gen.SimpleIcons.Abstractions.wasm",
        "name": "Soenneker.Quark.Gen.SimpleIcons.Abstractions.cmtxwztxl7.wasm",
        "hash": "sha256-zE9DFWX6Hfij099E1DYcpRnSFkEihpw21ZInPy3x2rU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Queues.Intrusive.Abstractions.wasm",
        "name": "Soenneker.Queues.Intrusive.Abstractions.apxqwpdy9j.wasm",
        "hash": "sha256-HqF+dK+YC5FXeBWXGxQ3QW2vUcA6hfIAy8eDuJhj7sg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Queues.Intrusive.ValueMpsc.wasm",
        "name": "Soenneker.Queues.Intrusive.ValueMpsc.uvgxt9ma4m.wasm",
        "hash": "sha256-urSUz5bVvns9Sv5bxPXj/K7/rwfRECB2LRYOszNkRRg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Reflection.Cache.wasm",
        "name": "Soenneker.Reflection.Cache.num36aonwt.wasm",
        "hash": "sha256-kftzsWZeO8S6+ZVlUmQeneni4fX7b6nb9wn7tKAn8j0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Serilog.Sinks.Browser.Blazor.wasm",
        "name": "Soenneker.Serilog.Sinks.Browser.Blazor.q97o6os1t7.wasm",
        "hash": "sha256-zmD3ppKq2ocHek68ipm6ABXihZS2fAf/AC4tsWaDXbA=",
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
        "name": "Soenneker.SimpleIcons.Icons.366qt43ul4.wasm",
        "hash": "sha256-ReHNSoZRA+HaKS3muwzB7FD7ROGnMArwVpJtTROlT98=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.AsyncSingleton.wasm",
        "name": "Soenneker.Utils.AsyncSingleton.kwjqepbem9.wasm",
        "hash": "sha256-ROnaLTkGZO57xtb57j5guD9D8mbGV/tm+SfztKdRWeA=",
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
        "name": "Soenneker.Utils.AutoBogus.k5grhoiiy3.wasm",
        "hash": "sha256-eMQbvJsBqnOnXPD2ffUarXqk0ccRjjGBbfydhrlsqbg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.CancellationScopes.wasm",
        "name": "Soenneker.Utils.CancellationScopes.8y3nukdaov.wasm",
        "hash": "sha256-wHGMHtbwlQUU3zH8SWEvvjqpfiQoh1ftr2s21MmiY8Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Debounce.wasm",
        "name": "Soenneker.Utils.Debounce.b02cg7kmsi.wasm",
        "hash": "sha256-K+GXoEWLYmQfkmVSYg4FFzrS7kFKLVAvu+JQ79pxqiA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Delay.wasm",
        "name": "Soenneker.Utils.Delay.r0zxqrt5a6.wasm",
        "hash": "sha256-dRqgEK5pTSDamrx0HC6lEWMswx7JTJq2/JQEgVJFFp0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.ExecutionContexts.wasm",
        "name": "Soenneker.Utils.ExecutionContexts.b66uqsyc6a.wasm",
        "hash": "sha256-PRsdNE+PKICCHq8MlghMV9bVgsTEChoJQ8zti3K87iw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.File.wasm",
        "name": "Soenneker.Utils.File.6dpoy3yaol.wasm",
        "hash": "sha256-aoRTPKUvRktI7xOkQoxeMoJvitAOiCEEE+M7TIju+9k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Json.wasm",
        "name": "Soenneker.Utils.Json.ind23uneck.wasm",
        "hash": "sha256-YkOEMgHA3ibdE8qPI05TUKm0/1CVq4g7rbZeKpjfXUI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.LazyBools.wasm",
        "name": "Soenneker.Utils.LazyBools.ohguk7tyfk.wasm",
        "hash": "sha256-/A75m3mDqzFwH/lckBlCnWlCP9XD2NN3um4tkcGgFGQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.MemoryStream.wasm",
        "name": "Soenneker.Utils.MemoryStream.1oprr78zjp.wasm",
        "hash": "sha256-T47bFSiFjDe80EB40p+5Jbg6gODsXI1V3qaGL4SNuM4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.PooledStringBuilders.wasm",
        "name": "Soenneker.Utils.PooledStringBuilders.ms42nn9vrd.wasm",
        "hash": "sha256-OvhLqw8aK3XG1o1ZcGrwie4ZYaZlo8DZ5R+QkpmVxRo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Random.wasm",
        "name": "Soenneker.Utils.Random.891x34rveh.wasm",
        "hash": "sha256-nGehytDnGFMr0vByn2OGf+O5vXBIf/LJhQFPctWMaNs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.ReusableStringWriter.wasm",
        "name": "Soenneker.Utils.ReusableStringWriter.a7d0wbgymy.wasm",
        "hash": "sha256-KhHT87Ypgnfjr6ZffpEcYE89dskUY/HufOq1hN45BC8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Runtime.wasm",
        "name": "Soenneker.Utils.Runtime.v1z9bq2k26.wasm",
        "hash": "sha256-TTNFQKuO/8fxuySGZGNI0fpF6locW3dinusOEt6b0Dw=",
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
        "name": "System.Runtime.ecpl8moc0c.wasm",
        "hash": "sha256-cuykAOc0X4665Jd1otCT7GRb/lJ1h2YmRdWViItfw+c=",
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
        "name": "Soenneker.Quark.Suite.0k0q3lsx3g.wasm",
        "hash": "sha256-sCPSqm5ZnE3KDqHW4GTQujMxek0ss/93YAnQWVMD3fk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Suite.Demo.wasm",
        "name": "Soenneker.Quark.Suite.Demo.hzf90htfyi.wasm",
        "hash": "sha256-LS3QouUK5Vci1AtHRZP0lyz8HSY/iDgzAROQwJzX08M=",
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
