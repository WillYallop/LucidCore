import { listDirectoryFiles } from '../../controller/theme';
// Path and theme directory
const path = require('path');
const config = require(path.resolve("./lucid.config.ts"));
const themeDir = config.directories.theme;
// Twing Setup
const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');
const loader = new TwingLoaderFilesystem(path.resolve(themeDir + '/templates'));
const twing = new TwingEnvironment(loader);


// Handles building templates with twig
// Generate all templates
const templateCompiller = async (): Promise<gene_templatesMap> => {
    try {
        const templateMap: gene_templatesMap = new Map();
        const templates = await listDirectoryFiles('/templates'); // Get template list
        // TEMP - this will pass in any global data that the tempalte may want to use.
        const data = {
            global: {}
        };
        // Build templates out
        for (const template of templates) {
            let output: string = await twing.render(template, data);
            templateMap.set(template, {
                markup: output
            });
        }
        return templateMap;
    }
    catch(err) {
        throw {
            code: 500,
            origin: 'templateCompiller',
            title: 'Compiling Error',
            message: `Error while compiling templates!`
        };
    }
}

export default templateCompiller;