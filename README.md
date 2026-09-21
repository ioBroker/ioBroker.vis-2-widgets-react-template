![Logo](admin/vis-2-widgets-react-template.svg)

# Vis 2 Demo widgets

This is only for development purposes, and it could be used as a basis for own vis-2 widget's development.

This example consists of two projects: TypeScript (`src-widgets-ts`) and JavaScript (`src-widgets-jsvite`).
Both are built with vite and `@module-federation/vite`.

Build the widgets with `npm run build` (TypeScript) or `npm run build-jsv` (JavaScript).
The build checks the sources with `tsc`, bundles them with vite and copies the result to `widgets/<YOUR_ADAPTER_NAME>/`.
The folder `widgets` is generated: it is deleted on every build and must not be edited by hand.

## Development with TypeScript

It is suggested to develop the widgets with TypeScript.

After all entries with `vis-2-widgets-react-template` are replaced to your adapter name in `package.json`, `io-package.json`
and file `admin/vis-2-widgets-react-template.svg` renamed too, you can start with renaming of widgets. (You can use PNG files too)

Some important places:

1. `io-package.json` => `common.visWidgets`
2. `src-widgets-ts/vite.config.ts` => `federation({ name, exposes })`: `name` must be equal to `common.visWidgets.<entry>.name` and `exposes` must list all widgets from `components` plus `./translations`
3. File `DemoWidget.tsx`
4. Check existence of attribute `"bundlerType": "module"` in `io-package.json`

The files `src-widgets-ts/index.html` and `src-widgets-ts/src/index.tsx` are only there to satisfy the compiler and will not be used in production.

For debugging, please see [Debugging](#debugging-with-vite-typescript-or-javascript)

## Development with JavaScript + vite

It is suggested to develop the widgets with TypeScript, but JavaScript works with the same vite setup.

After all entries with `vis-2-widgets-react-template` are replaced to your adapter name in `package.json`, `io-package.json`
and file `admin/vis-2-widgets-react-template.svg` renamed too, you can start with renaming of widgets. (You can use PNG files too)

Some important places:

1. `io-package.json` => `common.visWidgets`
2. `src-widgets-jsvite/vite.config.ts` => `federation({ name, exposes })`: `name` must be equal to `common.visWidgets.<entry>.name` and `exposes` must list all widgets from `components` plus `./translations`
3. File `DemoWidget.jsx`
4. Check existence of attribute `"bundlerType": "module"` in `io-package.json`

The files `src-widgets-jsvite/index.html` and `src-widgets-jsvite/src/index.jsx` are only there to satisfy the compiler and will not be used in production.

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
- Start the widget project in vite dev mode in its directory (`src-widgets-ts` or `src-widgets-jsvite`) with the following command:

```shell
npm run start
```

- The dev server always uses port 4173 (`--strictPort`). If this port is already in use, it stops with an error instead of switching to another port that would not match the URL above.
- You can then open a browser instance using one of the two launch configurations below. Don't forget to adjust the `webRoot` property to the name of your widget source directory. Breakpoints set in VS Code will then be hit.

### Compatibility

To ensure compatibility between vis-2 and the vis-2 widget during development, the following libraries should be the same versions as in vis-2:

- @iobroker/gui-components
- @iobroker/types-vis-2
- @module-federation/vite
- @mui/icons-material
- @mui/material
- @vitejs/plugin-react
- react
- react-dom
- typescript
- vite
- vite-plugin-commonjs

At runtime, vis-2 hands its own React and MUI to the widgets as shared singletons (see `moduleFederationShared` in `@iobroker/types-vis-2`),
so the widgets always render with the versions of vis-2.

### VSCode launch.json

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

## SVG Icon set

From vis-2 version 2.13.0 onwards, SVG icon sets are supported.

To add an icon set, please do the following steps:

- add Entry in `io-package.json` in `common.visIconSets` like this:

```json5
"common.visIconSets": {
    "vis2DemoIconSet": {
        "name": { // name could be a string or an object with translations
            "en": "Demo icon set",
            "de": "Demo-Icon-Set",
            "ru": "Набор иконок Demo",
            "pt": "Conjunto de ícones Demo",
            "nl": "Demo-pictogramset",
            "fr": "Ensemble d'icônes de démonstration",
            "it": "Set di icone Demo",
            "es": "Conjunto de iconos de demostración",
            "pl": "Zestaw ikon Demo",
            "uk": "Демо-набір іконок",
            "zh-cn": "演示图标集"
        },
        "url": "<YOUR_ADAPTER_NAME>/icon-set.json", // URL to the icon set file (important: must end with .json)
        // Optional logo for widget set (with data:image/svg+xml;)
        "icon": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODEiIGhlaWdodD0iODEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0ibm9uZSI+ICAgIDxwYXRoIGZpbGw9IndoaXRlIiBkPSJtNzIuNDQyMiw3MS4wNDUxMmM0LjE0MDYsLTYuMTM5NiA2LjU1NzgsLTEzLjUzNzUgNi41NTc4LC0yMS41YzAsLTIxLjI2MyAtMTcuMjM3LC0zOC41IC0zOC41LC0zOC41Yy0yMS4yNjMsMCAtMzguNSwxNy4yMzcgLTM4LjUsMzguNWMwLDcuOTYyNSAyLjQxNzIsMTUuMzYwNCA2LjU1Nzg0LDIxLjVsNjMuODg0MzYsMHoiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbC1ydWxlPSJldmVub2RkIi8+ICAgIDxwYXRoIGZpbGw9IiMzM0RENTIiIGQ9Im02OS42ODYyLDcxLjQ2NzAyYzQuNTkyMSwtNi4xMDQxIDcuMzEzOCwtMTMuNjk1MiA3LjMxMzgsLTIxLjkyMTljMCwtMjAuMTU4NCAtMTYuMzQxNiwtMzYuNSAtMzYuNSwtMzYuNWMtMjAuMTU4NCwwIC0zNi41LDE2LjM0MTYgLTM2LjUsMzYuNWMwLDguMjI2NyAyLjcyMTY5LDE1LjgxNzggNy4zMTM4LDIxLjkyMTlsLTQuODczNzIsMGMtNC4wNzUxOSwtNi4zMTg2IC02LjQ0MDA4LC0xMy44NDQxIC02LjQ0MDA4LC0yMS45MjE5YzAsLTIyLjM2NzUgMTguMTMyNSwtNDAuNSA0MC41LC00MC41YzIyLjM2NzUsMCA0MC41LDE4LjEzMjUgNDAuNSw0MC41YzAsOC4wNzc4IC0yLjM2NDksMTUuNjAzMyAtNi40NDAxLDIxLjkyMTlsLTQuODczNywweiIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4gICAgPGxpbmUgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2U9IiMzM0RENTIiIHkyPSI2OS40NjcwMiIgeDI9Ijc0LjMxMTQiIHkxPSI2OS40NjcwMiIgeDE9IjcuNDMwNjYiLz4gICAgPHBhdGggc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iIzMzREQ1MiIgZD0ibTcyLjQ2NTcsNDYuMjE5OTJjMC4zNDA4LDQuODA2NCAtMC41MDkzLDkuNjE3MSAtMi40NzQ4LDE0LjAzODZjLTAuMjAyOSwwLjQ1NjUgLTAuNzM5NiwwLjY1MjYgLTEuMTk2MSwwLjQ0OTVsMCwwYy0wLjQ3NjIsLTAuMjExNyAtMC42ODE4LC0wLjc3NDcgLTAuNDcxOSwtMS4yNTE4YzEuODE5LC00LjEzNDcgMi42MDQxLC04LjYyNzEgMi4yODU5LC0xMy4xMTU2Yy0wLjM0MDYsLTQuODAzNCAtMS45MzM4LC05LjQ0NzggLTQuNjMyOCwtMTMuNTA0OWMtMi42OTksLTQuMDU3MSAtNi40MTY5LC03LjM5NjQgLTEwLjgxMSwtOS43MWMtNC4zOTQsLTIuMzEzNiAtOS4zMjI4LC0zLjUyNzEgLTE0LjMzMiwtMy41Mjg3Yy01LjAwOTIsLTAuMDAxNSAtOS45Mzc1LDEuMjA5IC0xNC4zMzA3LDMuNTJjLTQuMzkzMSwyLjMxMDkgLTguMTA5Nyw1LjY0OCAtMTAuODA3MSw5LjcwMzRjLTIuNjk3NSw0LjA1NTUgLTQuMjg4OSw4LjY5ODggLTQuNjI3NiwxMy41MDIxYy0wLjMxNjUsNC40ODgzIDAuNDcwNCw4Ljk4MTMgMi4yOTEsMTMuMTE3MWMwLjIxLDAuNDc3MSAwLjAwNDQsMS4wNDAxIC0wLjQ3MiwxLjI1MTdsMCwwYy0wLjQ1NjIsMC4yMDI2IC0wLjk5MjMsMC4wMDY3IC0xLjE5NTIsLTAuNDQ5NGMtMS45Njc1NywtNC40MjMgLTIuODE5NzQsLTkuMjM0NiAtMi40ODA3OSwtMTQuMDQxM2MwLjM1OTg0LC01LjEwMjggMi4wNTA0OSwtMTAuMDM1OCA0LjkxNjE5LC0xNC4zNDQzYzIuODY1NywtNC4zMDg0IDYuODE0MSwtNy44NTM2IDExLjQ4MTMsLTEwLjMwODdjNC42NjcyLC0yLjQ1NTEgOS45MDI5LC0zLjc0MTA4IDE1LjIyNDYsLTMuNzM5NDZjNS4zMjE2LDAuMDAxNjIgMTAuNTU3OCwxLjI5MDg2IDE1LjIyNiwzLjc0ODc2YzQuNjY4MSwyLjQ1OCA4LjYxNzksNi4wMDU1IDExLjQ4NTMsMTAuMzE1N2MyLjg2NzMsNC4zMTAyIDQuNTU5OSw5LjI0NDIgNC45MjE3LDE0LjM0NzN6Ii8+ICAgIDxwYXRoIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlPSIjMzNERDUyIiBkPSJtNDMuNzg2NzQsNTQuNDA3MjJjMS4wOTYxLDEuMzAxOSAxLjI2NDIsMi4zNzE3IDEuMDkzNiwzLjIyMzVjLTAuMTg1MiwwLjkyNDggLTAuODI4MywxLjg3NjYgLTEuODYzMywyLjc0NzljLTEuMDMzMSwwLjg2OTggLTEuOTEzMSwxLjIwMjggLTIuNjY2LDEuMTY0NGMtMC43MjYxLC0wLjAzNzEgLTEuNjg5MywtMC40MzkzIC0yLjg2MjgsLTEuODMzMmMtMC41OCwtMC42ODg5IC0xLjc2NjcsLTIuNTA1MSAtMy4yOTcsLTUuMDEwOGMtMS41MDMsLTIuNDYxIC0zLjI3MjUsLTUuNDc3OCAtNC45OTM5LC04LjQ3NThjLTEuNTIwMSwtMi42NDc2IC0yLjk4NDcsLTUuMjQ5NCAtNC4xOSwtNy40Mjk0YzIuMDExNywxLjUzNDIgNC4zODgsMy4zOTQ3IDYuNzczMSw1LjMwNDJjMi43MDQsMi4xNjQ4IDUuNDEwNyw0LjM4NTcgNy42MDM4LDYuMjU5NGMyLjIzNTcsMS45MSAzLjgyOTYsMy4zNjkzIDQuNDAyNSw0LjA0OTh6Ii8+ICAgIDxwYXRoIGZpbGw9IiMzM0RENTIiIGQ9Im0yMC44NTQzNCwzNC4wNTIxMmw2LjYzNTYsNC42OTY4bC0xLjM2MDgsMS4yNjRsLTEuNDY5NywxLjM4MWwtMy44MDUxLC03LjM0MTh6Ii8+PC9zdmc+"
    }
}
```

Put the file `icon-set.json` (the name must be equal to the one in `url` in `io-package.json`) into the `public` folder of your widget project (`src-widgets-ts/public/` or `src-widgets-jsvite/public/`).
The build copies it to `widgets/<YOUR_ADAPTER_NAME>/`. Do not put it into `widgets/` directly, because this folder is deleted on every build.

The file has the following content:

```json5
{
    iconName1: {
        src: 'PCEtLQp0YWdzOiBbZ.... base64 content of SVG without data:image/...', // without! data:image/svg+xml;
        words: ['Arrow', 'Content'], // optional keywords for search
        name: 'Arrow Autofit Content', // optional name. could be a string or an object with translations
    },
    iconName2: {
        src: 'PCEtLQp0YWdzOiBbZGl.... base64 content of SVG without data:image/...', // without! data:image/svg+xml;
        words: ['Arrow', 'Down'], // optional keywords for search
        name: 'Arrow Autofit Down', // optional name. could be a string or an object with translations
    },
}
```

You can create this file from SVG files with the script [combine.js](src-widgets-ts/src-icon-set/combine.js):
put your SVG files into `src-widgets-ts/src-icon-set/` and call `npm run icon-set` in `src-widgets-ts`. The result is written to `src-widgets-ts/public/icon-set.json`.

## Changelog

<!--
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (oweitman) improve documentation
- (oweitman) add missing eslint file to prevent markdown formating errors
- (@GermanBluefox) Removed the JavaScript project based on CRA (craco). The JavaScript example is built with vite now
- (@GermanBluefox) Fixed TypeScript configuration, lint configuration and the widget test
- (@GermanBluefox) Fixed the format of the icon set file: keywords are stored in `words`

### 1.3.1 (2025-08-24)
- (@GermanBluefox) Added Icon Set example

### 1.2.0 (2025-06-06)

- (oweitman) add js/vite support
- (oweitman) improve documentation
- (oweitman) small fixes
- (oweitman) debugging description for vite

### 1.1.1 (2025-06-02)

- (@GermanBluefox) Finished TypeScript project

### 1.0.1 (2024-07-13)

- (oweitman) changed the node version from 16 to 20 in test and release workflow
- (@GermanBluefox) updated packages

### 1.0.0 (2024-07-10)

- (@GermanBluefox) updated packages

### 0.2.1 (2023-07-30)

- (@GermanBluefox) update packages

### 0.2.0 (2023-05-18)

- (@GermanBluefox) Added CI tests

### 0.1.6 (2023-03-09)

- (@GermanBluefox) update packages

### 0.1.2 (2023-02-27)

- (@GermanBluefox) Packages were updated

### 0.1.1 (2022-09-07)

- (@GermanBluefox) Initial commit

## License

The MIT License (MIT)

Copyright (c) 2022-2026 @GermanBluefox <dogafox@gmail.com>

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
