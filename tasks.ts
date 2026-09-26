/*!
 * ioBroker build tasks for this widget set template.
 *
 * Executed with `tsx` (see the `build*` scripts in package.json), so this file is type checked by the root
 * tsconfig.json like the rest of the repository instead of being an opaque JavaScript blob.
 */
import { existsSync, readFileSync } from 'node:fs';
import { deleteFoldersRecursive, copyFiles, npmInstall, buildReact } from '@iobroker/build-tools';

const { name } = JSON.parse(readFileSync(`${__dirname}/package.json`, 'utf8')) as { name: string };

/** Name of the adapter without the `iobroker.` prefix, e.g. `vis-2-widgets-react-template` */
const adapterName = name.replace('iobroker.', '');

/**
 * Build one widget project and copy the result into `widgets/<adapterName>`
 *
 * @param srcDir - folder of the widget project relative to this file, e.g. `src-widgets-ts/`
 */
async function build(srcDir: string): Promise<void> {
    const src = `${__dirname}/${srcDir}`;

    deleteFoldersRecursive(`${src}build`);
    deleteFoldersRecursive(`${__dirname}/widgets`);

    if (!existsSync(`${src}node_modules`)) {
        await npmInstall(src);
    }

    // tsc checks the sources first (types for TypeScript, syntax for JavaScript), then vite builds the bundle
    await buildReact(src, { rootDir: __dirname, vite: true, tsc: true });

    // The exclusion must carry the same base folder as the include pattern: `collectFiles()` strips the
    // part before the first `*` off every found file, so a `!**/index.html` would be compared as
    // `src-widgets-ts/build/index.html` against the already stripped `index.html` and match nothing.
    copyFiles([`${srcDir}build/**/*`, `!${srcDir}build/index.html`], `widgets/${adapterName}`);
}

let srcDir: string | undefined;
if (process.argv.includes('--javascript-vite')) {
    srcDir = 'src-widgets-jsvite/';
} else if (process.argv.includes('--typescript') || process.argv.length === 2) {
    srcDir = 'src-widgets-ts/';
}

if (srcDir) {
    build(srcDir).catch((e: unknown) => {
        console.error(`Cannot build: ${e instanceof Error ? e.message : String(e)}`);
        process.exit(1);
    });
}
