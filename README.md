![Logo](admin/vis-2-widgets-react-template.svg)

# Vis 2 Demo widgets

This is only for development purposes, and it could be used as a basis for own vis-2 widget's development.

This example consists of two projects: JavaScript (src-widgets-js) and TypeScript (src-widgets-ts).

## Development with TypeScript

It is suggested to develop the widgets with TypeScript.

After all entries with `vis-2-widgets-react-template` are replaced to your adapter name in `package.json`, `io-package.json`
and file `admin/vis-2-widgets-react-template.svg` renamed too, you can start with renaming of widgets. (You can use PNG files too)

Some important places:

1. `io-package.json` => `common.visWidgets`
2. `src-widgets-ts/vite.config.ts` from line 13
3. File `DemoWidget.tsx`
4. Check existence of attribute `"bundlerType": "module"` in `io-package.json`

File in directory `src-widgets-ts/index.html` `src-widgets-ts/src/index.tsx` and is only to satisfy the compiler and will not be used in production.

For debugging, please see [Debugging](#debugging-with-vite-typescript-or-javascript)

## Development with JavaScript + CRA

It is not suggested to develop the widgets with JavaScript and CRA, but it is possible.

After all entries with `vis-2-widgets-react-template` are replaced to your adapter name in `package.json`, `io-package.json`
and file `admin/vis-2-widgets-react-template.png` renamed too, you can start with renaming of widgets.

Some important places:

1. `io-package.json` => `common.visWidgets`
2. `src-widgets-js/modulefederation.config.js` from line 4
3. File `DemoWidget.jsx`
4. Check that attribute `bundlerType` in `io-package.json` is not set. (Important!)

File in directory `src-widgets-js/src/index.jsx` is only to satisfy the compiler and will not be used in production.

By development, you can start the script from `src-widgets-js` folder with `npm run start` command,
and then on port 4173 you will see the demo widget.

For faster development, you can:

- start dev-server with installed web and vis-2 adapter with the following command `dev-server watch --noStart`. If your adapter contains adapter backend logic, start your adapter with a suitable launch configuration.
- start in src-widgets-js: `npm run start`
- write in object `system.adapter.vis-2-widgets-react-template.0`=>`common.visWidgets.vis2DemoWidget.url` to `http://localhost:4173/customWidgets.js`
- Press F5 in `iobroker.vis-2` web page

## Development with JavaScript + vite

It is suggested to develop the widgets with TypeScript.
Compared to the solution JavaScript + CRA, vite is much faster and more resource-efficient in the build process

After all entries with `vis-2-widgets-react-template` are replaced to your adapter name in `package.json`, `io-package.json`
and file `admin/vis-2-widgets-react-template.svg` renamed too, you can start with renaming of widgets. (You can use PNG files too)

Some important places:

1. `io-package.json` => `common.visWidgets`
2. `src-widgets-jsvite/vite.config.ts` from line 13
3. File `DemoWidget.jsx`
4. Check existence of attribute `"bundlerType": "module"` in `io-package.json`

File in directory `src-widgets-jsvite/index.html` `src-widgets-jsvite/src/index.jsx` is only to satisfy the compiler and will not be used in production.

For debugging, please see [Debugging](#debugging-with-vite-typescript-or-javascript)

## Debugging with vite (TypeScript or JavaScript)

To be able to debug with vite and TypeScript/JavaScript, vis-2 and the vis-2-react-widget adapter to be developed must each be running in vite dev mode.

In preparation, you must:

- install the web adapter in iobroker
- install the vis-2 adapter in iobroker
- start vis-2 in the editor to create a corresponding project.

Then follow these steps:

- Install vis-2 according to the following description:
  <https://github.com/ioBroker/ioBroker.vis-2?tab=readme-ov-file#development-and-debugging>
- As a result, the vis-2 adapter is running, but cannot be called at this point, as this requires a running instance of ioBroker.
- Open another window of a development environment (e.g., VS Code)
- Then set up the vis-2-react-widgets project/repository according to the description in this README.
- Then set up the iobroker dev server according to the following description:
  <https://github.com/ioBroker/dev-server?tab=readme-ov-file#installation>
- To start the iobroker dev-server, I recommend the following command for the vis-2-widgets adapter:

```shell
dev-server watch --noStart
```

- write in object `system.adapter.vis-2-widgets-react-template.0`=>`common.visWidgets.vis2DemoWidget.url` to `http://localhost:4173/customWidgets.js`, with dev-server you have to upload the adapter with the `dev-server upload` command
- Start the widgets adapter in the widgets-src directory in vite dev mode with the following command:

```shell
npm run start
```

- You can then open a browser instance using one of the two launch configurations. Breakpoints can be set in vscode, which will then also stop vscode.

## VSCode launch.json

Adjust the webroot path to match your widget source.
This launch configuration is only valid for debugging with vite.

```json
    {
        "type": "chrome",
        "request": "launch",
        "name": "vis-2 editor",
        "url": "http://localhost:3000/#default",
        "webRoot": "${workspaceFolder}/src-widgets-ts"
    },
    {
        "type": "chrome",
        "request": "launch",
        "name": "vis-2 runtime",
        "url": "http://localhost:3000/?main&runtime=true#default",
        "webRoot": "${workspaceFolder}/src-widgets-ts"
    }
```

## Changelog

<!--
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (oweitman) improve documentation
- (oweitman) add missing eslint file to prevent markdown formating errors

### 1.2.0 (2025-06-06)

- (oweitman) add js/vite support
- (oweitman) improve documentation
- (oweitman) small fixes
- (oweitman) debugging description for vite

### 1.1.1 (2025-06-02)

- (@German) Finished TypeScript project

### 1.0.1 (2024-07-13)

- (oweitman) changed the node version from 16 to 20 in test and release workflow
- (bluefox) updated packages

### 1.0.0 (2024-07-10)

- (bluefox) updated packages

### 0.2.1 (2023-07-30)

- (bluefox) update packages

### 0.2.0 (2023-05-18)

- (bluefox) Added CI tests

### 0.1.6 (2023-03-09)

- (bluefox) update packages

### 0.1.2 (2023-02-27)

- (bluefox) Packages were updated

### 0.1.1 (2022-09-07)

- (bluefox) Initial commit

## License

The MIT License (MIT)

Copyright (c) 2022-2025 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
