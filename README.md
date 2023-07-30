![Logo](admin/vis-2-widgets-react-template.png)
# Vis 2 Energy widgets

This is only for development purposes, and it could be used as a basis for own vis-2 widgets' development.

## Development
After all entries with `vis-widgets-react-template` are replaced to your adapter name in `package.json`, `io-package.json` 
and file `admin/vis-widgets-react-template.png` renamed too, you can start with renaming of widgets.

Some important places:
1. `io-package.json` => `common.visWidgets`
2. `src-widgets/modulefederation.config.js` from line 4
3. File `DemoWidget.jsx`

Files in directory `src-widgets` (`App.jsx`, `bootstrap.jsx`, `index.jsx`) are only for development mode and will not be used in production. 

By development, you can start the script from `src-widgets` folder with `npm run start` command,
and then on port 4173 you will see the demo widget.

For faster development, you can:
- start in src-widgets: `npm run start`
- write in object `system.adapter.vis-widgets-react-template.0`=>`common.visWidgets.vis2DemoWidget.url` to `http://localhost:4173/customWidgets.js`
- Press F5 in `iobroker.vis` web page

<!--
    ### **WORK IN PROGRESS**
-->
## Changelog
### 0.2.1 (2023-07-30)
* (bluefox) update packages

### 0.2.0 (2023-05-18)
* (bluefox) Added CI tests

### 0.1.6 (2023-03-09)
* (bluefox) update packages

### 0.1.2 (2023-02-27)
* (bluefox) Packages were updated

### 0.1.1 (2022-09-07)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2022-2023 bluefox <dogafox@gmail.com>

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