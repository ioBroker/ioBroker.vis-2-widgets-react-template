const gulp = require('gulp');
const fs = require('node:fs');
const adapterName = require('./package.json').name.replace('iobroker.', '');
const gulpHelper = require('@iobroker/vis-2-widgets-react-dev/gulpHelper');

// --------------- tasks for javascript ----------------------
const SRC_JS = 'src-widgets-js/';
const src_js = `${__dirname}/${SRC_JS}`;

gulp.task('widget-js-0-clean', done => {
    gulpHelper.deleteFoldersRecursive(`${src_js}build`);
    gulpHelper.deleteFoldersRecursive(`${__dirname}/widgets`);
    done();
});
gulp.task('widget-js-1-npm', async () => gulpHelper.npmInstall(src_js));

gulp.task('widget-js-2-compile', async () => gulpHelper.buildWidgets(__dirname, src_js));

gulp.task('widget-js-3-copy', () => Promise.all([
    gulp.src([`${SRC_JS}build/*.js`]).pipe(gulp.dest(`widgets/${adapterName}`)),
    gulp.src([`${SRC_JS}build/img/*`]).pipe(gulp.dest(`widgets/${adapterName}/img`)),
    gulp.src([`${SRC_JS}build/*.map`]).pipe(gulp.dest(`widgets/${adapterName}`)),
    gulp.src([
        `${SRC_JS}build/static/**/*`,
        // ...gulpHelper.ignoreFiles(SRC_JS),
    ]).pipe(gulp.dest(`widgets/${adapterName}/static`)),
    gulp.src([
        ...gulpHelper.copyFiles(SRC_JS),
    ]).pipe(gulp.dest(`widgets/${adapterName}/static/js`)),
    gulp.src([`${SRC_JS}src/i18n/*.json`]).pipe(gulp.dest(`widgets/${adapterName}/i18n`)),
    new Promise(resolve =>
        setTimeout(() => {
            if (fs.existsSync(`widgets/${adapterName}/static/media`) &&
                !fs.readdirSync(`widgets/${adapterName}/static/media`).length
            ) {
                fs.rmdirSync(`widgets/${adapterName}/static/media`)
            }
            resolve();
        }, 500)
    )
]));

gulp.task('widget-js-build', gulp.series(['widget-js-0-clean', 'widget-js-1-npm', 'widget-js-2-compile', 'widget-js-3-copy']));

// ------------------- tasks for typescript ----------------------

const SRC_TS = 'src-widgets-ts/';
const src_ts = `${__dirname}/${SRC_TS}`;

gulp.task('widget-ts-0-clean', done => {
    gulpHelper.deleteFoldersRecursive(`${src_ts}build`);
    gulpHelper.deleteFoldersRecursive(`${__dirname}/widgets`);
    done();
});
gulp.task('widget-ts-1-npm', async () => gulpHelper.npmInstall(src_ts));

gulp.task('widget-ts-2-compile', async () => gulpHelper.buildWidgets(__dirname, src_ts));

gulp.task('widget-ts-3-copy', () => Promise.all([
    gulp.src([`${SRC_TS}build/*.js`]).pipe(gulp.dest(`widgets/${adapterName}`)),
    gulp.src([`${SRC_TS}build/img/*`]).pipe(gulp.dest(`widgets/${adapterName}/img`)),
    gulp.src([`${SRC_TS}build/*.map`]).pipe(gulp.dest(`widgets/${adapterName}`)),
    gulp.src([
        `${SRC_TS}build/static/**/*`,
        // ...gulpHelper.ignoreFiles(SRC_TS),
    ]).pipe(gulp.dest(`widgets/${adapterName}/static`)),
    gulp.src([
        ...gulpHelper.copyFiles(SRC_TS),
    ]).pipe(gulp.dest(`widgets/${adapterName}/static/js`)),
    gulp.src([`${SRC_TS}src/i18n/*.json`]).pipe(gulp.dest(`widgets/${adapterName}/i18n`)),
    new Promise(resolve =>
        setTimeout(() => {
            if (fs.existsSync(`widgets/${adapterName}/static/media`) &&
                !fs.readdirSync(`widgets/${adapterName}/static/media`).length
            ) {
                fs.rmdirSync(`widgets/${adapterName}/static/media`)
            }
            resolve();
        }, 500)
    )
]));

gulp.task('widget-ts-build', gulp.series(['widget-ts-0-clean', 'widget-ts-1-npm', 'widget-ts-2-compile', 'widget-ts-3-copy']));


gulp.task('default', gulp.series('widget-js-build'));
