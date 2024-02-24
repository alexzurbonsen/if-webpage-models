// evil eval, but the last resort
// I tried to
// - use the legacy import from chrome-launcher, which doesn't work because the package still gets identified as ESM (some oversight on their side I suppose)
// - dynamic imports without eval, but they get transpiled to require
// - build the package for CommonJS, doesn't help because chrome-launcher still needs to be imported without require

async function loadESModule() {
  const module = await eval("import('./index.js')");
  return module.LighthouseModel;
}

module.exports = loadESModule().catch(err => {
  console.error('Failed to load the ESM package:', err);
  process.exit(1);
});

