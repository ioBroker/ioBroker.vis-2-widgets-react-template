// We are creating JSON file "icon-set.json" in the following format:
// {
//    "iconName1": { "src": "data:...", "keywords": ["arrow", "left"], "name": "Arrow left" }
//    "iconName2": { "src": "data:...", "keywords": ["arrow", "right"], "name": "Arrow right" }
// }
// etc.

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
