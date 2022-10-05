## Test Source Map in SAP Cloud SDK

### Overview
 
We wanted to provide a way to make the sources available for debugging.
The [sourceRoot](https://www.typescriptlang.org/tsconfig#sourceRoot) property seemed to be a nice way to do that.
We would put a [source URL](https://raw.githubusercontent.com/SAP/cloud-sdk-js/main/packages/util/src/array.ts), and sources would be downloaded if needed.
However, this is not working as expected. Here a minimal example using local source files:

- Uses the `@sap-cloud-sdk/util` package as test package which is shipped with source maps.
- `.ts` files of this package are in `util-src` folder for testing.
- In a post install the `sourceRoot` property is adjusted to point to the `util-src`

In VSC it does not work at all.
In Webstorm it does but only if you `force step into` and only for the source files and not for the first module loading (index.js). 
The remote URL is not working in any case.

### Steps to reproduce

- run `npm i`
- run `src/debug-test.ts` in debug mode (see launch.json)
- step into the `trimLeft()` method of the test
- plain `.js` file is shown in debugger not the mapped file.

### Goal

The `sourceRoot` should work like expected also with a remote URL in VSC and Webstorm. 
