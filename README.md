# How to create a new redoc bundle

## KYC Portal
- Navigate to the KYC redoc directory: `cd redoc-kyc`
- Install dependencies: `npm install`
- Bundle redoc: `npm run bundle:standalone`
  - In case of ``Error: error:0308010C:digital envelope routines::unsupported``: Switch to an older node version using nvm: `nvm use 16`. This should resolve the issue.
- The bundled redoc is now created and added to `redoc-kyc/bundles/redoc.standalone.js`
- To test the bundled redoc file, open the `redoc-kyc/index.html` file in your browser

## EVA Portal
- Navigate to the EVA redoc directory: `cd redoc-eva`
- Install dependencies: `npm install`
- Bundle redoc: `npm run bundle:standalone`
- The bundled redoc is now created and added to `redoc-eva/bundles/redoc.standalone.js`
- To test the bundled redoc file, open the `redoc-eva/index.html` file in your browser

## Disclaimer
- Eventually, there will be only one redoc, that is generic enough to be used by both portal contexts. However, currently there are still some obstacles that need to be resolved before both redocs can be merged into one.
  - KYC Redoc:
    - Requires bootstrap classes for some styled components to look as expected
    - Requires fetching of applications and api keys in a specific shape from a specific KYC url
    - Has [hardcoded](kwf-repo/redoc/src/components/ApiInfo/ApiInfo.tsx:33) option to hide Download API spec button
  - EVA Redoc:
    - Does not require bootstrap classes, however it is styled differently than KYC redoc
    - Requires fetching of applications and api keys in a specific shape from a specific EVA url
    - Misses some feature additions that were added to KYC Portal (i.e. hide user key, setting usery keys for internal users)