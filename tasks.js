const { existsSync } = require('node:fs');
const adapterName = require('./package.json').name.replace('iobroker.', '');
const { deleteFoldersRecursive, copyFiles, npmInstall, buildReact } = require('@iobroker/build-tools');

/**
 * Build one widget project and copy the result into `widgets/<adapterName>`
 *
 * @param {string} srcDir folder of the widget project relative to this file, e.g. `src-widgets-ts/`
 */
async function build(srcDir) {
    const src = `${__dirname}/${srcDir}`;

    deleteFoldersRecursive(`${src}build`);
    deleteFoldersRecursive(`${__dirname}/widgets`);

    if (!existsSync(`${src}node_modules`)) {
        await npmInstall(src);
    }

    // tsc checks the sources first (types for TypeScript, syntax for JavaScript), then vite builds the bundle
    await buildReact(src, { rootDir: __dirname, vite: true, tsc: true });

    copyFiles([`${srcDir}build/customWidgets.js`], `widgets/${adapterName}`);
    // Optional icon set: public/icon-set.json of the widget project (see README)
    copyFiles([`${srcDir}build/icon-set.json`], `widgets/${adapterName}`);
    copyFiles([`${srcDir}build/assets/*.*`], `widgets/${adapterName}/assets`);
    copyFiles([`${srcDir}build/img/*`], `widgets/${adapterName}/img`);
}

let srcDir;
if (process.argv.includes('--javascript-vite')) {
    srcDir = 'src-widgets-jsvite/';
} else if (process.argv.includes('--typescript') || process.argv.length === 2) {
    srcDir = 'src-widgets-ts/';
}

if (srcDir) {
    build(srcDir).catch(e => {
        console.error(`Cannot build: ${e}`);
        process.exit(1);
    });
}
