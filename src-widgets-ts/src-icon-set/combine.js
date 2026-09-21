// We are creating JSON file "icon-set.json" in the following format:
// {
//    "iconName1": { "src": "PHN2Zy...", "words": ["arrow", "left"], "name": "Arrow left" }
//    "iconName2": { "src": "PHN2Zy...", "words": ["arrow", "right"], "name": "Arrow right" }
// }
// etc.
// "src" is the base64 content of the SVG file without the "data:image/svg+xml;base64," prefix.
// "words" are optional keywords for the search in the icon selector of vis-2.
//
// Call it from the "src-widgets-ts" folder with "npm run icon-set". The result is written to "public/icon-set.json".

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

function combineIcons(inputDir, outputFile) {
    const icons = {};
    const files = readdirSync(inputDir).filter(file => file.endsWith('.svg'));
    files.forEach(file => {
        const filePath = join(inputDir, file);
        try {
            const data = readFileSync(filePath, 'utf8');
            icons[file.replace(/\.svg$/i, '')] = {
                // to save space do not add the prefix `data:image/svg+xml;base64,`
                // it will be added when the icon is used
                src: Buffer.from(data).toString('base64'),
                words: [],
                name: file
                    .replace(/\.svg$/i, '')
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase()),
            };
        } catch (err) {
            console.error(`Error reading or parsing ${file}:`, err);
        }
    });

    try {
        writeFileSync(outputFile, JSON.stringify(icons, null, 2), 'utf8');
        console.log(`Combined ${Object.keys(icons).length} icons into ${outputFile}`);
    } catch (err) {
        console.error(`Error writing to ${outputFile}:`, err);
    }
}

combineIcons('./', '../public/icon-set.json');
