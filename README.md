## Test Source Map in SAP Cloud SDK

### Overview
 
We wanted to provide a way to make the sources available for debugging.
The [sourceRoot](https://www.typescriptlang.org/tsconfig#sourceRoot) property seemed to be a nice way to do that.
We would put a [source URL](https://raw.githubusercontent.com/SAP/cloud-sdk-js/main/packages/util/src/array.ts), and sources would be downloaded if needed.
However, this is not working as expected. Here a minimal example using local source files:

- Uses the `@sap-cloud-sdk/util` package as test package which is shipped with source maps.
- In a post install the `sourceRoot` property is adjusted to point to remote url

### Steps to reproduce

- run `npm i`
- run `node src/debug-test.mjs` in debug mode (see launch.json)
- step into the `trimLeft()` method of the test
- plain `.js` file is shown in debugger not the mapped file.

Also an error is shown: 

```
Could not load source '/Users/XXX/WebstormProjects/source-map-test/node_modules/@sap-cloud-sdk/util/dist/https:/raw.githubusercontent.com/SAP/cloud-sdk-js/main/packages/util/src/string.ts': Unable to retrieve source content.
```

which indicated that the sourceRoot property is not correctly considered. According to [spec](https://www.typescriptlang.org/tsconfig#sourceRoot) it is an absolute path.
Also in the [sourceroot spec](https://sourcemaps.info/spec.html) nothing is mentioned about a default path based on the current working directory.

I had a look at the default lib which everybody uses I guess `source-map` but there it also did not load the file see `source-map-test.mjs`.
Also with the chrome debug tolls the same could not load source error appears with the paths beeing added up.


### Goal

The `sourceRoot` should work like expected also with a remote URL in VSC. 
