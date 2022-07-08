/*!
 * ioBroker gulpfile
 * Date: 2019-01-28
 */
'use strict';

const gulp = require('gulp');
const fs = require('fs');
const cp = require('child_process');
const del = require('del');
const adapterName = require('../package.json').name.replace('iobroker.', '');

const SRC = 'src-widgets/';
const src = __dirname + '/' + SRC;

function npmInstall() {
    return new Promise((resolve, reject) => {
        // Install node modules
        const cwd = src.replace(/\\/g, '/');

        const cmd = `npm install -f`;
        console.log(`"${cmd} in ${cwd}`);

        // System call used for update of js-controller itself,
        // because during installation npm packet will be deleted too, but some files must be loaded even during the install process.
        const exec = cp.exec;
        const child = exec(cmd, {cwd});

        child.stderr.pipe(process.stderr);
        child.stdout.pipe(process.stdout);

        child.on('exit', (code /* , signal */) => {
            // code 1 is strange error that cannot be explained. Everything is installed but error :(
            if (code && code !== 1) {
                reject('Cannot install: ' + code);
            } else {
                console.log(`"${cmd} in ${cwd} finished.`);
                // command succeeded
                resolve();
            }
        });
    });
}

function buildRules() {
    const version = JSON.parse(fs.readFileSync(__dirname + '/package.json').toString('utf8')).version;
    const data    = JSON.parse(fs.readFileSync(src + 'package.json').toString('utf8'));

    data.version = version;

    fs.writeFileSync(src + 'package.json', JSON.stringify(data, null, 4));

    return new Promise((resolve, reject) => {
        const options = {
            stdio: 'pipe',
            cwd: src
        };

        console.log(options.cwd);

        let script = src + 'node_modules/@craco/craco/bin/craco.js';
        if (!fs.existsSync(script)) {
            script = __dirname + '/node_modules/@craco/craco/bin/craco.js';
        }
        if (!fs.existsSync(script)) {
            console.error('Cannot find execution file: ' + script);
            reject('Cannot find execution file: ' + script);
        } else {
            const child = cp.fork(script, ['build'], options);
            child.stdout.on('data', data => console.log(data.toString()));
            child.stderr.on('data', data => console.log(data.toString()));
            child.on('close', code => {
                console.log(`child process exited with code ${code}`);
                code ? reject('Exit code: ' + code) : resolve();
            });
        }
    });
}

gulp.task('widget-0-clean', () => del([`${SRC}build/**/*`]));

gulp.task('widget-1-npm', async () => npmInstall());

gulp.task('widget-2-compile', async () => buildRules());

gulp.task('widget-3-copy', () => Promise.all([
    gulp.src([`${SRC}build/*.js`]).pipe(gulp.dest(`widgets/${adapterName}`)),
    gulp.src([`${SRC}build/*.map`]).pipe(gulp.dest(`widgets/${adapterName}`)),
    gulp.src([`${SRC}build/static/**/*`]).pipe(gulp.dest(`widgets/${adapterName}/static`)),
    gulp.src([`${SRC}src/i18n/*.json`]).pipe(gulp.dest(`widgets/${adapterName}/i18n`)),
]));

gulp.task('widget-build', gulp.series(['widget-0-clean', 'widget-1-npm', 'widget-2-compile', 'widget-3-copy']));

gulp.task('default', gulp.series('widget-build'));