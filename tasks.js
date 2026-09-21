const { existsSync } = require('node:fs');
const adapterName = require('./package.json').name.replace('iobroker.', '');
const { deleteFoldersRecursive, copyFiles, npmInstall, buildReact } = require('@iobroker/build-tools');

// ------------------- tasks for typescript ----------------------

const SRC_TS = 'src-widgets-ts/';
const src_ts = `${__dirname}/${SRC_TS}`;

function tsClean() {
    deleteFoldersRecursive(`${src_ts}build`);
    deleteFoldersRecursive(`${__dirname}/widgets`);
}

function tsCopyAllFiles() {
    copyFiles([`${SRC_TS}build/customWidgets.js`], `widgets/${adapterName}`);
    copyFiles([`${SRC_TS}build/icon-set.json`], `widgets/${adapterName}`);
    copyFiles([`${SRC_TS}build/assets/*.*`], `widgets/${adapterName}/assets`);
    copyFiles([`${SRC_TS}build/img/*`], `widgets/${adapterName}/img`);
}

if (process.argv.includes('--typescript') || process.argv.length === 2) {
    tsClean();
    let npmPromise;
    if (existsSync(`${src_ts}/node_modules`)) {
        npmPromise = Promise.resolve();
    } else {
        npmPromise = npmInstall(src_ts);
    }
    npmPromise
        .then(() => buildReact(src_ts, { rootDir: __dirname, vite: true }))
        .then(() => tsCopyAllFiles())
        .catch(e => console.error(`Cannot build: ${e}`));
}

// ------------------- tasks for javascript-vite ----------------------

const SRC_JSV = 'src-widgets-jsvite/';
const src_jsv = `${__dirname}/${SRC_JSV}`;

function jsvClean() {
    deleteFoldersRecursive(`${src_jsv}build`);
    deleteFoldersRecursive(`${__dirname}/widgets`);
}

function jsvCopyAllFiles() {
    copyFiles([`${SRC_JSV}build/customWidgets.js`], `widgets/${adapterName}`);
    copyFiles([`${SRC_JSV}build/assets/*.*`], `widgets/${adapterName}/assets`);
    copyFiles([`${SRC_JSV}build/img/*`], `widgets/${adapterName}/img`);
}

if (process.argv.includes('--javascript-vite')) {
    jsvClean();
    let npmPromise;
    if (existsSync(`${src_jsv}/node_modules`)) {
        npmPromise = Promise.resolve();
    } else {
        npmPromise = npmInstall(src_jsv);
    }
    npmPromise
        .then(() => buildReact(src_jsv, { rootDir: __dirname, vite: true }))
        .then(() => jsvCopyAllFiles())
        .catch(e => console.error(`Cannot build: ${e}`));
}
