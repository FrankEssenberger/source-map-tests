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
But Webstorm does some strange source lookup, because the source root does not really matter as long as a file with the correct name is somewhere in the search index.
The remote URL is not working in any case.

### Steps to reproduce

- run `npm i`
- run `src/debug-test.ts` in debug mode (see launch.json or run file in .idea)
- step into the `trimLeft()` method of the test
- plain `.js` file is shown in debugger not the mapped file.

In the  `adjust-source-maps.ts` there is a boolean to disable the usage of `sourceRoot`..
Behaviour is the same if you use the source route or not. 
Source maps are not picked up by the debugger.

### Goal

The `sourceRoot` should work like expected also with a remote URL in VSC and Webstorm. 
