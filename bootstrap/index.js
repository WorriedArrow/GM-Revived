import sleep from '../src/util/sleep';

const init = async () => {
  console.log("[GooseMod Bootstrap]", "Starting GMRevived Bootstrapper");

  while (!window.webpackJsonp?.push && !window.webpackChunkdiscord_app?.push) {
    await sleep(10);
  }

  console.log("[GooseMod Bootstrap]", "Webpack chunk is ready");

  let wpRequire;

  if (window.webpackJsonp) { // Older
    wpRequire = window.webpackJsonp.push([[], { get_require: (mod, _exports, wpRequire) => mod.exports = wpRequire }, [["get_require"]]]); // Get Webpack's require via injecting into webpackJsonp

    // Remove module injected
    delete wpRequire.m.get_require;
    delete wpRequire.c.get_require;
  } else if (window.webpackChunkdiscord_app) { // New (Canary @ 22nd Oct)
    window.webpackChunkdiscord_app.push([['gm_webpackInject'], {}, (req) => { wpRequire = req; }]);
  }

  eval(await (await fetch(`https://raw.githubusercontent.com/WorriedArrow/GM-Revived/master/defiant/index.js?_` + Date.now())).text());


  const locale = Object.keys(wpRequire.c).map((x) => wpRequire.c[x].exports).find((x) => x?.default?.getLocaleInfo).default.getLocale();

  console.log('[GooseMod Bootstrap]', 'Found locale', locale);

  // eval(await (await fetch(`http://localhost:1234/goosemod.${locale}.js`)).text());
  try {
    eval(await (await fetch(`https://raw.githubusercontent.com/WorriedArrow/GM-Revived/dist-dev/goosemod.${locale}.js?_<buildtime>`)).text());
  } catch (e) {
    console.warn('[GooseMod Bootstrap]', 'Failed to fetch with buildtime', e);
    eval(await (await fetch(`https://raw.githubusercontent.com/WorriedArrow/GM-Revived/dist-dev/goosemod.${locale}.js?_${Date.now()}`)).text());
  }
};

init();
//# sourceURL=GooseMod%20Bootstrap