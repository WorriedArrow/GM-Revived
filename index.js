(function(){"use strict";var sleep=e=>new Promise((o=>setTimeout(o,e)));const init=async()=>{for(;!window.webpackJsonp?.push;)await sleep(10);const wpRequire=window.webpackJsonp.push([[],{get_require:(e,o,t)=>e.exports=t},[["get_require"]]]),locale=Object.keys(wpRequire.c).map((e=>wpRequire.c[e].exports)).find((e=>e?.default?.getLocaleInfo)).default.getLocale();console.log("[GooseMod Bootstrap]","Found locale",locale),eval(await(await fetch(`https://raw.githubusercontent.com/GooseMod/GooseMod/dist-dev/goosemod.${locale}.js?_1630004850815`)).text())};init()})();