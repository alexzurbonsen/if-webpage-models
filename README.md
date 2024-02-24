# Impact Framework - Models for Measurement of Webpages


## Implementations

- Lighthouse Model



## The Perils of ESM vs. CommonJS

I tried a bunch of things... all did not work.

- dynamic import of lighthouse and chrome-launcher modules in lighthouse model -> doesn't work since import statements are transpiled to requires; can be circumvented with eval. Not good.
- use legacy require imports of lighthouse and chrome-launcher -> fails for chrome because entire module is still recognized as ESM, might be a mistake at their side. didn't check lighthouse.
- hybrid build for commonjs and esm as described here: https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html -> again, can't require chrome-launcher and lighthouse
- create a cjs-wrapper.ts which dynamically imports the module (with eval) and is wired correctly in package.json (main and exports require) -> doesn't work because it encounters export statements in the code that can't be replaced
- webpack bundle -> doesn't work with lighthouse (and seems like a dumb idea since I am targeting a node environment)
- guess I tried even more. But don't remember it all.
