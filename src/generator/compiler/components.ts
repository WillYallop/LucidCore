// Path and theme directory
const path = require('path');
const config = require(path.resolve("./cms.config.ts"));
const themeDir = config.directories.theme;
// Twing Setup
const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');
const loader = new TwingLoaderFilesystem(path.resolve(themeDir + '/components'));
const twing = new TwingEnvironment(loader);

const __generateDataField = async (fields: Array<mod_pageComponentFieldModel>) => {
    // TODO
    let response: any = {};
    for (const field of fields) {
        response[field.name] = field.data;
    }
    return response;
}

const componentCompiller = async (components: Array<mod_pageComponentModel>): Promise<gene_componentsMap> => {
    try {
        // Create empty component map
        const componentsMap: gene_componentsMap = new Map();
        // Build templates out
        for (const component of components) {
            const data = await __generateDataField(component.fields); // TODO
            const output = await twing.render(component.file_name, data);
            componentsMap.set(component.name, {
                id: component.id,
                markup: output
            });
        }
        return componentsMap;
    }
    catch(err) {
        throw {
            code: 500,
            origin: 'componentCompiller',
            title: 'Compiling Error',
            message: `Error while compiling page components!`
        };
    }
}

export default componentCompiller;