//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"4099f83977f4d29604a9aeb971fb0a7bc1d5f699",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "Soenneker.Quark.Suite.Demo",
  "resources": {
    "hash": "sha256-w0XJcnaP1l4ejFUwdmCygsWD9AHfsT/26TuhFjeb6xA=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.6hxud45j4c.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.azrfhwb804.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.dzxyps9i9d.wasm",
        "hash": "sha256-d2Z3qVOfbxbBWv/lPM5yQVirZConannHkuUuOEDAHIk=",
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
        "name": "System.Runtime.InteropServices.JavaScript.2h81ftq2dy.wasm",
        "hash": "sha256-2vsAdKWBErzY6EocA7xnEf5lq1vRQia9Z5hsfP5pw84=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.mzi9hsqdm9.wasm",
        "hash": "sha256-nraQNoicbYTwT40qLcFVHq9TcMuG5PpyGOsu2crv0SU=",
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
        "name": "Microsoft.AspNetCore.Components.fe9ajt4sna.wasm",
        "hash": "sha256-FxV9UP+I5do+i+LkVa+mg+mi3feKMEMZOUM40hPerGo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.0utp1rd4sw.wasm",
        "hash": "sha256-SCDUvgaVZpJRxdvtF+N8Hcep4ujGIhBLGEK5oZOt/7E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.gjl5qh7uly.wasm",
        "hash": "sha256-tNXqMjt/Tgz3gD4Va5cmzmTHnHyO149fo6LS+xaq0Lw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.a58tnk8uhp.wasm",
        "hash": "sha256-fhWw68Crm7VtLeJKBWVWbaq+Z7BfVa4lSuRYBJeqlBo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.9q0jp76nnp.wasm",
        "hash": "sha256-jyB6Ohndx3+UzniXuNKXiUmZyJPVObtu8CGksOyKvGk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.ilvvifrsuk.wasm",
        "hash": "sha256-tk833d+XfJljytZVRfi+SBFa1REgiO7cPyNmj25suCc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.frazqtnewj.wasm",
        "hash": "sha256-O//lmM7iBWUtBjH2FJ3NMhOI8xRMCAko/BmV8+lm5Do=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.mt5uv2cyps.wasm",
        "hash": "sha256-BoC4IaIn4gTK5fp6lkWpNObM7wNMfTYpbARl7nl0wyY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.efkiw32juf.wasm",
        "hash": "sha256-6iN4OHOtaMxKFBUNBt42hbFm1/aW6UvmYjgNfJuRdOY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.hpp2g9vmos.wasm",
        "hash": "sha256-pTKQzfARG50gdDsekcLpOR8CeX2yus+kHOJmo0y3cDg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.zjpyiry385.wasm",
        "hash": "sha256-3zPsHkA/42I5Bj1CJ2kgwDANjBto1srhbRaYpic31O0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.8cgbhdxqce.wasm",
        "hash": "sha256-eLydBWiljAhXfow851jt2lgxdLxnRn2IyrblR799WqU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.1w0lc1mcj1.wasm",
        "hash": "sha256-wYd6P1RQVdx1wLGbVUXdca6pRBBwPJthqnLyxO6UMf0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Validation.wasm",
        "name": "Microsoft.Extensions.Validation.lspj8863f6.wasm",
        "hash": "sha256-q66DgMDVe0j5t5W6CBWuOybJfxVf1p7oarfQQ5bXyH0=",
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
        "name": "Microsoft.JSInterop.u0aw55mwsr.wasm",
        "hash": "sha256-Qkx4L/1MuyPFRtDS3LGOdyenkxsg8VAihJ60onnljAY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.gfego8d62w.wasm",
        "hash": "sha256-9MrMSaF3Ux7qJdu19tfa59lYtIOsndS8NEbyw4VNnOA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.wasm",
        "name": "Serilog.4sydjdc6tj.wasm",
        "hash": "sha256-rIdh1TYLe3DEG/icXVN+5cylv4kldq7CKch1278HqvU=",
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
        "name": "Soenneker.Asyncs.Initializers.5isu795yjr.wasm",
        "hash": "sha256-MxnYRIaebv/pGfsBCs23B4yG4/z//pgVWrTttxvDFf8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Asyncs.Locks.wasm",
        "name": "Soenneker.Asyncs.Locks.aoiz2egf47.wasm",
        "hash": "sha256-SkMYD7sczn9T6v/FvWPlijaYKJvv96Y4FN3uVefjANE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.Longs.wasm",
        "name": "Soenneker.Atomics.Longs.rmzpz7bfmd.wasm",
        "hash": "sha256-XZDsTGgYwvWXvyuiCQspuqjTASLCKYwgCCG4JBZ+Lt4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.Resources.wasm",
        "name": "Soenneker.Atomics.Resources.sd0pqgdb99.wasm",
        "hash": "sha256-MPgDFBoC4t4EkFmAfiCd0Ig/aqPODGrDuZa2sqweXTE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueBools.wasm",
        "name": "Soenneker.Atomics.ValueBools.uaq8tis4l6.wasm",
        "hash": "sha256-Jryorz5hMuxs5KnIXTdSiZHan08ipevm7slS4PPl6Og=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueInts.wasm",
        "name": "Soenneker.Atomics.ValueInts.g1mgak3hqr.wasm",
        "hash": "sha256-lF0GJYn+hSkTtXdfaP0rncM2OSRmWGgWNNzy56Ud2CE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueLazys.wasm",
        "name": "Soenneker.Atomics.ValueLazys.styejk8kt7.wasm",
        "hash": "sha256-MBWrak2c18iYe4rZ+UbyBiC6OwZK2U88oK7lcN4fBWc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueLocks.wasm",
        "name": "Soenneker.Atomics.ValueLocks.i9m5bfhdho.wasm",
        "hash": "sha256-9tZ3artX289VZLfZZnwKFIdcnOUiRPzPuq6O4KorCgY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Atomics.ValueNullableLazys.wasm",
        "name": "Soenneker.Atomics.ValueNullableLazys.upb5udqo8n.wasm",
        "hash": "sha256-kpzQEHEA5fAXw7HSHKcDP+BZgJvA8+fKpd6sz3fROMM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Attributes.MapTo.wasm",
        "name": "Soenneker.Attributes.MapTo.n7a0azqs0b.wasm",
        "hash": "sha256-TXZoonWxMDvfe41UuRnuHbjCisG1bRLjOYTzhxxOO/g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Attributes.PublicOpenApiObject.wasm",
        "name": "Soenneker.Attributes.PublicOpenApiObject.2vxko6b4eg.wasm",
        "hash": "sha256-bohSRf2jHRBK+GNPtJc32THY3Pn3ZyPHkfp5xnz8HYw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.C15t.wasm",
        "name": "Soenneker.Blazor.C15t.ge1anx8dg6.wasm",
        "hash": "sha256-mIBdDs4YHyd5jj2xw4Ft0uEkNcjuzxtE4+MZgOf8wJA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Cloudflare.AiSearch.wasm",
        "name": "Soenneker.Blazor.Cloudflare.AiSearch.dcameovaaz.wasm",
        "hash": "sha256-I4RCutKJstLlaHpRKcCHTIDZ/Ig5Vazh3NIKot1sHyI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.CreditCards.wasm",
        "name": "Soenneker.Blazor.CreditCards.iozypqk9h6.wasm",
        "hash": "sha256-3jVrwe5u0brPz6vbCE10DclMWvDemLkIaqcfHSEZ9Uo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Extensions.EventCallback.wasm",
        "name": "Soenneker.Blazor.Extensions.EventCallback.cohjdrfoe6.wasm",
        "hash": "sha256-xLZHk5Q34Yuz9MZfCKHgPdCnlqPiCfU0eSPhgN3GmTs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Interops.Floating.wasm",
        "name": "Soenneker.Blazor.Interops.Floating.6s3wcfsk91.wasm",
        "hash": "sha256-2jwWDFtF2U2Ewd3QC39OUjXTwripmolS/IioRn+6TR8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Rrweb.Replay.wasm",
        "name": "Soenneker.Blazor.Rrweb.Replay.w0iuw4vdcl.wasm",
        "hash": "sha256-wJbAuiJwnNxHfze8gV9+UzXxOk0rDJtULWgaN2HOaGQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.SignaturePads.wasm",
        "name": "Soenneker.Blazor.SignaturePads.ejjtnkyi45.wasm",
        "hash": "sha256-Ku9v8xjdYttlnwz3daglugwEdskTplgEad1rll0EkAg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.Clipboard.wasm",
        "name": "Soenneker.Blazor.Utils.Clipboard.96zifm80p7.wasm",
        "hash": "sha256-b3ZKv6ZrMSXwnvQZvm84LupGsuvnAHEYWIhmq0Gx+ls=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.Ids.wasm",
        "name": "Soenneker.Blazor.Utils.Ids.uzyt5mx435.wasm",
        "hash": "sha256-llyP8FD82gqU3fBEAn/Kp9lw0zc0rjTjR0eujGBuZ28=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.JsVariable.wasm",
        "name": "Soenneker.Blazor.Utils.JsVariable.lrfo49kmu4.wasm",
        "hash": "sha256-0W3s3ni9kxByMOrglU9uksyXTpsI5a2x0BpCnCTYzoA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.ModuleImport.wasm",
        "name": "Soenneker.Blazor.Utils.ModuleImport.seaaj22rux.wasm",
        "hash": "sha256-zJHr3EBrXtKzYTtCzIxm52jgAVCRNqHJGf3Ht9B2SrI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Blazor.Utils.ResourceLoader.wasm",
        "name": "Soenneker.Blazor.Utils.ResourceLoader.w16vfcb3k2.wasm",
        "hash": "sha256-ZL+iisp69bcJxPjn5Moqb2ZS1unMOlPR6U0+LBKQYCk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Bradix.Suite.wasm",
        "name": "Soenneker.Bradix.Suite.ph5x8n0h35.wasm",
        "hash": "sha256-82HtspAVSZPSjZItPHMLs//SYa8S5KD14hRdGaFDVlI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Attributes.Orderable.wasm",
        "name": "Soenneker.DataTables.Attributes.Orderable.los9cthzmr.wasm",
        "hash": "sha256-demjqr8DEQp3x5JdxcXP9kNY0E0fjB9nLnvP9wGfMWY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Attributes.Searchable.wasm",
        "name": "Soenneker.DataTables.Attributes.Searchable.x254w4k9jh.wasm",
        "hash": "sha256-uSLWZXg+2FR8f0x2xB5ZGuXT2RTRIdnHw8y/17Vf0ho=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Dtos.ServerResponse.wasm",
        "name": "Soenneker.DataTables.Dtos.ServerResponse.9di7xd61jy.wasm",
        "hash": "sha256-Q/L+K3cWjA+J7cLTb0FuVMDySdLb/gRO4uBbbQlMNPk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Dtos.ServerSideRequest.wasm",
        "name": "Soenneker.DataTables.Dtos.ServerSideRequest.7uofj8wbbb.wasm",
        "hash": "sha256-f/5c7FNRuPBaKp6/nHYUMQ2CaIQd8JWCzleFz9OgR9c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.DataTables.Extensions.ServerSideRequest.wasm",
        "name": "Soenneker.DataTables.Extensions.ServerSideRequest.kfq7c78l87.wasm",
        "hash": "sha256-cLZUoyGVbcaFRzyaioSgJPmeAb4a9beyg9D+hHA45D4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Filters.Base.wasm",
        "name": "Soenneker.Dtos.Filters.Base.rdwiey9g7f.wasm",
        "hash": "sha256-b5qMHWFujthgUiHRjmJYnB4+tYppnw11EmUm6dg2qYo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Filters.ExactMatch.wasm",
        "name": "Soenneker.Dtos.Filters.ExactMatch.pbv6107r01.wasm",
        "hash": "sha256-60oDIyEGjx3YOukXRWbW+FAIEXurE2RhQidyLLisk/Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.IdValuePair.wasm",
        "name": "Soenneker.Dtos.IdValuePair.mo4rle7ry5.wasm",
        "hash": "sha256-dq3y1idp9GIcFQ0On4khIftly3YPyTZ1Ex7fpvcykZY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Options.OrderBy.wasm",
        "name": "Soenneker.Dtos.Options.OrderBy.nzmlab78cn.wasm",
        "hash": "sha256-oy34FcxUBJonPecKw3o2HMNO0SaOMPl3fSGiCpP6Ok0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.RequestDataOptions.wasm",
        "name": "Soenneker.Dtos.RequestDataOptions.l0bzcnbmr1.wasm",
        "hash": "sha256-e2VAhCn4kPiFdpbP7RDMIFRKMBdqRWxva5u6uBynSkQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Dtos.Results.Paged.wasm",
        "name": "Soenneker.Dtos.Results.Paged.8vg0btiitp.wasm",
        "hash": "sha256-nIuQz8RTa1S8nOI1EHL9IYoroHgvhdxpz57zXKdTQQ8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Enums.SortDirections.wasm",
        "name": "Soenneker.Enums.SortDirections.tj1irx6c7l.wasm",
        "hash": "sha256-p6ifBxc2s/Ovv4WBUMy3PTlYD/ugxwiCMsO/qNle49A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.CancellationTokens.wasm",
        "name": "Soenneker.Extensions.CancellationTokens.t3ecuc9bwf.wasm",
        "hash": "sha256-abA5e1goJWxIJHQKzCKX8tR8lnmEv+AjpwVvxh//uxc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Char.wasm",
        "name": "Soenneker.Extensions.Char.6j15kn06nj.wasm",
        "hash": "sha256-/pg+hawzwR7034z8+hCqgMaBBBBfxDoqOFL7YWaEVKw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Configuration.wasm",
        "name": "Soenneker.Extensions.Configuration.w0bd9ojjtd.wasm",
        "hash": "sha256-8I0yX+sLoVTj4QLjNnxOjpika6gpteH/Bkeps++ElPY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Configuration.Logging.wasm",
        "name": "Soenneker.Extensions.Configuration.Logging.ptse8b9jj2.wasm",
        "hash": "sha256-be39xPgTgQkr0njbdOyA5GvS6SClLe3nvLz/oG6u2Yw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.FieldInfo.wasm",
        "name": "Soenneker.Extensions.FieldInfo.gj6kozwgpz.wasm",
        "hash": "sha256-5B1b17+zQ9yUsQnLSyP3Jg9nvzqMRUF8PPDfW2uQ9mg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Long.wasm",
        "name": "Soenneker.Extensions.Long.9ra6jeoj0z.wasm",
        "hash": "sha256-9aZ0sOULj7oDkdeCkLt0ekGBB0ckTsmTzmTtdn+SblQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.MemberInfo.wasm",
        "name": "Soenneker.Extensions.MemberInfo.li41rv432u.wasm",
        "hash": "sha256-HaT/F36nAkonkwC81/jVhg8A5Pq00iNkhtQOT19M4Ac=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.MethodInfo.wasm",
        "name": "Soenneker.Extensions.MethodInfo.2d6ibp4rqb.wasm",
        "hash": "sha256-SiBs5UxoMI65WHiVjrLWHtiaYxn9Ool8vpoGdUbIhhw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Serilog.LogEventLevels.wasm",
        "name": "Soenneker.Extensions.Serilog.LogEventLevels.5c76io8zn9.wasm",
        "hash": "sha256-W6N4UzIKFRz5udIadw5Z91CcYkfUQnSROTvOASKV/LQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Chars.wasm",
        "name": "Soenneker.Extensions.Spans.Chars.0weej7ag1k.wasm",
        "hash": "sha256-4FEX5YckFBlYuZ313cYRzUvddut6uU5adrgbtqXaTSw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.ParameterInfos.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.ParameterInfos.9ds8urgx6t.wasm",
        "hash": "sha256-Y1S4BI9hR0P+4YPhxnH8BZZ3wndmGq4KjFoB8z7tGLM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Spans.Readonly.Types.wasm",
        "name": "Soenneker.Extensions.Spans.Readonly.Types.pg4pgzfdld.wasm",
        "hash": "sha256-J3HLJP45+NWgIXwA8WCPH7Z0ev2gOHxzxDhox/ZdRC0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.String.wasm",
        "name": "Soenneker.Extensions.String.ogkuqmwt2y.wasm",
        "hash": "sha256-6Iosww5wq7uQdqIG5knKiAQfOimMiw7X9pukC1Qhn2U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.Task.wasm",
        "name": "Soenneker.Extensions.Task.dze23y11m2.wasm",
        "hash": "sha256-p0x8R0h16LbSG0Hbc7zIvi6/oPiin9Rf7d9t8559t3s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Extensions.ValueTask.wasm",
        "name": "Soenneker.Extensions.ValueTask.b9mo99c82d.wasm",
        "hash": "sha256-UUzrb6w+b4Oah4C+xyKzWA/oFZHi7FZWwr8Twjg1rOo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Lepton.Suite.wasm",
        "name": "Soenneker.Lepton.Suite.5qg7sv3tan.wasm",
        "hash": "sha256-bTjdaAE58X0JOH5UjuupRkDCT3aSYhOzB/vsaNIe3vQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Librarian.Abstractions.wasm",
        "name": "Soenneker.Librarian.Abstractions.du1r12gw86.wasm",
        "hash": "sha256-69T0zqAuBb7ZU+P4jXp2Xt/YoJO7RZfAEZq10GVG6MA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Librarian.Browser.wasm",
        "name": "Soenneker.Librarian.Browser.kippz4awbd.wasm",
        "hash": "sha256-lH8ENoI5/L3QaCld2ZHD230hmEtne4AGE4FAlYXKJYM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Librarian.Core.wasm",
        "name": "Soenneker.Librarian.Core.dgajvec8h9.wasm",
        "hash": "sha256-rfJI7Ww3R79JNuuwgUGaUCqfVffYoouvbgtASI1z41w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Librarian.LocalStorage.wasm",
        "name": "Soenneker.Librarian.LocalStorage.u2f8xhof0x.wasm",
        "hash": "sha256-VuNrVFlnZHULR7elRKlz/h01Ffe7+UaLagw7hsLX0IM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Lucide.Enums.Icons.wasm",
        "name": "Soenneker.Lucide.Enums.Icons.ucw1fmhri8.wasm",
        "hash": "sha256-DrHeJjM6w1xfTUOD/OMOn2EzL3vFw7Fs8hIkF3Mb094=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Lucide.Icons.wasm",
        "name": "Soenneker.Lucide.Icons.ttdjm7l21p.wasm",
        "hash": "sha256-PxFG4Fn/h8LvoUWfEEjaUdxQJJhGcxlGz8iKdlaZB5Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Builders.wasm",
        "name": "Soenneker.Quark.Builders.z2x8nn8or9.wasm",
        "hash": "sha256-hfOJUPbFHiiKu80601pE4S9M6+ovrJuMamK/Y4uTvaE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.Breakpoints.wasm",
        "name": "Soenneker.Quark.Enums.Breakpoints.y0h8x8q6i8.wasm",
        "hash": "sha256-zvZ3b0Aq/E6X/EDAiivaKJtPefJUPp8EUUlM99M5xtU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.DisplayTypes.wasm",
        "name": "Soenneker.Quark.Enums.DisplayTypes.8cu3w1hu9j.wasm",
        "hash": "sha256-qO89QYcEFVKRxcdgNJUY66S8kbuPtbR75PnzoFLlEvI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.TextAlignments.wasm",
        "name": "Soenneker.Quark.Enums.TextAlignments.sf9kugr89t.wasm",
        "hash": "sha256-yDpvTw6GwOcvZTs/6DTHujm35CCQhg40Hn4Niu0S32Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Enums.TextTransforms.wasm",
        "name": "Soenneker.Quark.Enums.TextTransforms.9qplj856f3.wasm",
        "hash": "sha256-f6cI2LoUuzLSxgO+z/15YRpHzcpE17PnkqdJQ+QRG5c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Gen.Lucide.Abstractions.wasm",
        "name": "Soenneker.Quark.Gen.Lucide.Abstractions.v3p369k3z8.wasm",
        "hash": "sha256-JdS4GMUaIaOoaZNvU5PrhHk1wAc++Jl1KVQ7Z1R3ESo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Gen.SimpleIcons.Abstractions.wasm",
        "name": "Soenneker.Quark.Gen.SimpleIcons.Abstractions.wy18v2fiwm.wasm",
        "hash": "sha256-CA1Qx7iLlsHXQYAto8O9aIl37YrnBz3j6fkCtJVIdZw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Queues.Intrusive.Abstractions.wasm",
        "name": "Soenneker.Queues.Intrusive.Abstractions.pg8wuj8872.wasm",
        "hash": "sha256-J4OErxd7yX/8wlOkj23ioAACGvASERYhGGkVs09x+T8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Queues.Intrusive.ValueMpsc.wasm",
        "name": "Soenneker.Queues.Intrusive.ValueMpsc.so87ujjhrr.wasm",
        "hash": "sha256-RF6o0AV+Wfqf2p26H5wTXvEmP3Hov1hIzYhdBn0Hh9k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Reflection.Cache.wasm",
        "name": "Soenneker.Reflection.Cache.6zjxn8rh10.wasm",
        "hash": "sha256-Ymq0OwUyy4w+ZWrMJzRXqW6t0eom47D8f2iM67dYdLE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Serilog.Sinks.Browser.Blazor.wasm",
        "name": "Soenneker.Serilog.Sinks.Browser.Blazor.y5zbsa4zmy.wasm",
        "hash": "sha256-xoqdTXiq2osjlK2OWq5PZivHx3h87Ytr4cVJj5nI0pg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.SimpleIcons.Enums.Icons.wasm",
        "name": "Soenneker.SimpleIcons.Enums.Icons.3zknpkgmgq.wasm",
        "hash": "sha256-ES1XjLF2DSnIWcGkLmmn/E3HDiPj8JcY+MwHCLEkA4s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.AutoBogus.wasm",
        "name": "Soenneker.Utils.AutoBogus.2rklt4gj6f.wasm",
        "hash": "sha256-shZ9c67YNZf8sl63ppn1E13IemKgGjdlSggw+dXcXYM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.CancellationScopes.wasm",
        "name": "Soenneker.Utils.CancellationScopes.w46ij2h4ca.wasm",
        "hash": "sha256-kDrGy6vnd8NF7/ngktkuBiSuiOQUjRacRzLPTq5igww=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Debounce.wasm",
        "name": "Soenneker.Utils.Debounce.y8g9sb1tzk.wasm",
        "hash": "sha256-fk2H0SZgHtDj9w/PvBTk1pHDF5OU7km6uabyXbTEcuY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Delay.wasm",
        "name": "Soenneker.Utils.Delay.v7rxbrx1vm.wasm",
        "hash": "sha256-9XDoo4bwi0vBP1plZL4Wd4MQHaPEYubDPls+qjrL2Fg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.Json.wasm",
        "name": "Soenneker.Utils.Json.0i5bob8et7.wasm",
        "hash": "sha256-mBSNiOv098oArU9M38nUWdY5k0K8qq+CxFUm6x+KoD4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.LazyBools.wasm",
        "name": "Soenneker.Utils.LazyBools.dguvb66ee2.wasm",
        "hash": "sha256-7U5oVoVtFd9gifDYA3zL+HqwWFxDFl3TkrOAChxd7IE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.PooledStringBuilders.wasm",
        "name": "Soenneker.Utils.PooledStringBuilders.brv5nzzfoh.wasm",
        "hash": "sha256-+fyoArP9BbzCP2CoHy2ePIcM6wNAbc/7vfoOF1jIeD4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Utils.ReusableStringWriter.wasm",
        "name": "Soenneker.Utils.ReusableStringWriter.gz8l5qpvmp.wasm",
        "hash": "sha256-RMK/elDLiwzXKSykLnc/1MBZiBGIGSqW6zFMNmSj4wA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.jjqoass7gw.wasm",
        "hash": "sha256-oan6Kg+P8SfmGl9nff2F84IDRIbo9YeZhcg0ZrqXKXU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.hwggm2b55f.wasm",
        "hash": "sha256-bzgtRNVtiz/sNrazoMnlrVKurX+2XzrmXHhHX5wiuZQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.1h20913tms.wasm",
        "hash": "sha256-hcnhdmqfKvBbLYprtH5BkvygJ20UYK1I9wAtTvRLUuk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.5h10vyahon.wasm",
        "hash": "sha256-h9FuHwAIpdDniA92BkZSrhJpEGYwDqTV+3MoK8AhGWE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.34cfaguj7j.wasm",
        "hash": "sha256-7eok1qvHUMLH8/g6P3jfv8tsnr+d42Tg9RVOkYC0g7w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.9gd6hhmtq6.wasm",
        "hash": "sha256-mb7HRLmqKMAS4gZuPTZ1KdCzCD/z9n/AZADIXtRaofs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.p1wwl9k45f.wasm",
        "hash": "sha256-PaOocBx6IrEY5tUEUZy6zIJ5j0TXlnx5ChvWPLb+jCs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.ugyt9wfunl.wasm",
        "hash": "sha256-vuxozN9VfWtnaMZmzNfFypGt2sz7mjFiof9ptzvMl8k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.2lpuvkg07t.wasm",
        "hash": "sha256-+tNuyDZwqiy9xZyweHauypGvvavFKtWz/nCwkmVlu8M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.krf3zhjd3u.wasm",
        "hash": "sha256-cDYF5ukc0Lzz62KGQvr9CdtNhKIS5Qne3ibEQJkDsMY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.mphxtpmm0d.wasm",
        "hash": "sha256-6vhx9U6Ce7k9zPc9TiXH3CY6Cf3CvrGhRTPfDVVoOSs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.girgwm1dep.wasm",
        "hash": "sha256-uIhLj2qYYXmuwleAE/RCnLFECx9iVoybyov8TibMQAo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.cdn8djalmo.wasm",
        "hash": "sha256-UGHlqG1ELEQxufBP7onaOe/HiaL+Ioss5EHM57kgM3w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.b5vrkplsa9.wasm",
        "hash": "sha256-b76XW9164nRecneiD32r7Ex4kY/OBVmlmIDlW+q5ew0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.piut1umxuo.wasm",
        "hash": "sha256-P0fSw+mjuBWxolK0um8OgOhVI0VaDwqVWBA1ZbN/gDU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.bquzof8wit.wasm",
        "hash": "sha256-U7pGfxw5D048q3pJfUynlq/AnwY9KVVAT8R8bFRgLpY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.zw1ambfxtz.wasm",
        "hash": "sha256-MzohL7WKh4tauIlSf3u4m7en9EKnFfRP91+1XgsxecA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.qlya9i5xsw.wasm",
        "hash": "sha256-ro4r/6yBoE9j9DWmbo1WyAAnLaHswcfGphu3hCoZm8U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.w1jl35b3p3.wasm",
        "hash": "sha256-TCVpyuiiUyrjK3vOfNc6D1wj/JJ6mU6Jk2yo6nUfHLQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.jc3dudjcn8.wasm",
        "hash": "sha256-M7TUGhrabnJ7ccalSntUq0KG/bv5EfqlJuNJKGmgODU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.tnk39yewxq.wasm",
        "hash": "sha256-pyPpYKhWqm3PXoYu0OwASul3oELGBOB1iId0/Td92hc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.h3n7dr5c3k.wasm",
        "hash": "sha256-U8ZUhbVsdsnP+96Yd8xUo0JEgBPHShMiX//M0ohuwhQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.lp4fsy8ota.wasm",
        "hash": "sha256-mamFuob07mFQyCUwc+xePVOzqgpoP4VEax7jjl/a230=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.y7lm80385i.wasm",
        "hash": "sha256-ErNmk908lezHIQYY58l7NmEpGHDm/g8TllZua/6b60Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.324h710p8x.wasm",
        "hash": "sha256-y3l6v06YQSYFc3zVlbkbTHZCge+D8xcyxyCe2mFiqus=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.hz1idoqnqo.wasm",
        "hash": "sha256-cziNiDVmNHiam08A2H6GXuOYxtOz1DOTEw/8wZACRNg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.1uqe4ybfnl.wasm",
        "hash": "sha256-p8QOYm6k0bujXBwHmGKmXjTTSm+vOH12tnIAwxFnCo0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.r0smcjcs25.wasm",
        "hash": "sha256-W6/XQK4g925QRP9GT5yQJRdHlwoN5f54ISRGeuffvmg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.1el1a2iqki.wasm",
        "hash": "sha256-d6sbINVEOf2ew8qhuruTD0bBxJv4zDCcyhIOcKgP8e0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.sawgapnm1q.wasm",
        "hash": "sha256-fLqs0SZWAwrzX5+YXIrKA0TV2nwPz5smDyFJdu+urGQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.axm4yfbbsd.wasm",
        "hash": "sha256-8kQjTAKKYhuCUwyJGcOcaUvjUWkGRVYhEt93YmvGXLk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.vsov7u42ja.wasm",
        "hash": "sha256-T+7cWHM7Ac9otyMUNeOWz8ZfrrtOKYWOxpMarVdyTwQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.7q01occcoy.wasm",
        "hash": "sha256-70E3MVG9LC4uwtP5SKBbiBm9Rov9yYU7CJNIB8iOZqo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.qizm3e8m2k.wasm",
        "hash": "sha256-Ujg2Kd4u+soD5hEId0WRpdVA7qPZRCJ41Y/DF/79CxY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.j95f39uoi8.wasm",
        "hash": "sha256-mbBcpfSrflT332c8zepVkKJc5qc//zVK5BHxU/OFPHY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.qm9epraifj.wasm",
        "hash": "sha256-Qk0MKu5Wwwd6OKO6MnhUkHL1FM5pHvbnY6TXkIqR6wE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.axpooz46t8.wasm",
        "hash": "sha256-Pt2b7SH4VtxHlVof29yHLQHdZyZUkWs/jhM5I4qkh3w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.84otmjv16o.wasm",
        "hash": "sha256-WFH6wwrR2lE3C4T8lcB4GI6iyvBKFFWAenVegxdlnj4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.mf2xcoy9rz.wasm",
        "hash": "sha256-binOW1w231SV4HaSWhW/NpNt2hcVaRpvXDk5F1if90k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.qf9o9thhcz.wasm",
        "hash": "sha256-Oi2ZVXkw2JmP+MBLYf56Z9QoZPjrC9vYuyU2cUrA7EM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.x4q0tpphoq.wasm",
        "hash": "sha256-UZXMwjpUNiphx0TljfJp/mktvGG16XoDcGYQvaqlzHU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Suite.wasm",
        "name": "Soenneker.Quark.Suite.3a5mxd82x6.wasm",
        "hash": "sha256-xSb6Uot72mHnKzFgDsLLrYT5u374pL4VMT3GBi/gWFs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Soenneker.Quark.Suite.Demo.wasm",
        "name": "Soenneker.Quark.Suite.Demo.4mpy13mqc0.wasm",
        "hash": "sha256-LCOcj85eB81iCBZreMWuXi1dCHyK0cQZMtta5IjpXGg=",
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
