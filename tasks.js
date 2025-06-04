const { existsSync, readdirSync, rmdirSync } = require('node:fs');
const adapterName = require('./package.json').name.replace('iobroker.', '');
const { deleteFoldersRecursive, copyFiles, npmInstall, buildReact } = require('@iobroker/build-tools');

// --------------- tasks for javascript ----------------------
const SRC_JS = 'src-widgets-js/';
const src_js = `${__dirname}/${SRC_JS}`;

function jsClean() {
    deleteFoldersRecursive(`${src_js}build`);
    deleteFoldersRecursive(`${__dirname}/widgets`);
}

function jsCopyFilesPattern(src) {
    src = src || './src-widgets/';
    if (!src.endsWith('/')) {
        src += '/';
    }

    return [
        `${src}build/static/js/*fast-xml*.*`,
        `${src}build/static/js/*react-swipeable*.*`,
        `${src}build/static/js/*moment_*.*`,
        `${src}build/static/js/*react-beautiful-dnd*.*`,
        `${src}build/static/js/*vis-2-widgets-react-dev_index_jsx*.*`,
        `${src}build/static/js/*vis-2-widgets-react-dev_node_modules_babel_runtime_helpers*.*`,
        `${src}build/static/js/*runtime_helpers_asyncToGenerator*.*`,
        `${src}build/static/js/*modules_color*.*`,
        `${src}build/static/js/*echarts-for-react_lib_core_js-node_modules_echarts_core_js-*.chunk.*`,
        `${src}build/static/js/*echarts_lib*.*`,
        `${src}build/static/js/*vis-2-widgets-react-dev_node_modules_babel_runtime_helpers*.*`,
        `${src}build/static/js/*leaflet*.*`,
        `${src}build/static/js/*react-circular*.*`,
        `${src}build/static/js/*d3-array_src_index_js-node_modules_d3-collection_src_index_js-*.*`,
        `${src}build/static/js/*d3-dispatch_*.*`,
        `${src}build/static/js/*lodash_*.*`,
        `${src}build/static/js/*react-battery-gauge_dist_react-battery-gauge*.*`,
        `${src}build/static/js/*react-gauge-chart*.*`,
        `${src}build/static/js/*react-liquid-gauge*.*`,
        `${src}build/static/js/*helpers_esm_asyncToGener*.*`,
        `${src}build/static/js/*emotion_styled_dist*.*`,
        `${src}build/static/js/*mui_system_colorManipulator*.*`,
    ];
}

function jsCopyAllFiles() {
    copyFiles([`${SRC_JS}build/*.js`], `widgets/${adapterName}`);
    copyFiles([`${SRC_JS}build/img/*`], `widgets/${adapterName}/img`);
    copyFiles([`${SRC_JS}build/*.map`], `widgets/${adapterName}`);

    copyFiles([`${SRC_JS}build/static/**/*`], `widgets/${adapterName}/static`);

    copyFiles([...jsCopyFilesPattern(SRC_JS)], `widgets/${adapterName}/static/js`);

    copyFiles([`${SRC_JS}src/i18n/*.json`], `widgets/${adapterName}/i18n`);

    return new Promise(resolve =>
        setTimeout(() => {
            if (
                existsSync(`widgets/${adapterName}/static/media`) &&
                !readdirSync(`widgets/${adapterName}/static/media`).length
            ) {
                rmdirSync(`widgets/${adapterName}/static/media`);
            }
            resolve();
        }, 500),
    );
}

if (process.argv.includes('--javascript')) {
    jsClean();
    let npmPromise;
    if (existsSync(`${src_js}/node_modules`)) {
        npmPromise = Promise.resolve();
    } else {
        npmPromise = npmInstall(src_js);
    }
    npmPromise
        .then(() => buildReact(src_js, { rootDir: __dirname, craco: true }))
        .then(() => jsCopyAllFiles())
        .catch(e => console.error(`Cannot build: ${e}`));
}

// ------------------- tasks for typescript ----------------------

const SRC_TS = 'src-widgets-ts/';
const src_ts = `${__dirname}/${SRC_TS}`;

function tsClean() {
    deleteFoldersRecursive(`${src_ts}build`);
    deleteFoldersRecursive(`${__dirname}/widgets`);
}

function tsCopyAllFiles() {
    copyFiles([`${SRC_TS}build/customWidgets.js`], `widgets/${adapterName}`);
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

if (process.argv.includes('--javascript-vite') || process.argv.length === 2) {
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