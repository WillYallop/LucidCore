import { Liquid, TagToken, Context, Emitter } from 'liquidjs';

// Path and theme directory
const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const themeDir = config.directories.theme;

// Liquid Engine
const engine = new Liquid({
    root: path.resolve(themeDir),
    extname: '.liquid'
})

// Generate component data
const __generateDataField = async (fields: Array<mod_pageComponentFieldModel>) => {
    // TODO
    let response: any = {};
    for (const field of fields) {
        response[field.name] = field.data;
    }
    return response;
}

// Compile page components
const componentCompiler = async (components: Array<mod_pageComponentModel>): Promise<gene_componentsMap> => {
    try {
        // Create empty component map
        const componentsMap: gene_componentsMap = new Map();
        // Build templates out
        for (const component of components) {
            const data = await __generateDataField(component.fields); // TODO
            const output = await engine.renderFile(component.file_name, data);
            componentsMap.set(component.name, {
                id: component.id,
                markup: output
            });
        }
        return componentsMap;
    }
    catch (err) {
        throw {
            code: 500,
            origin: 'componentCompiller',
            title: 'Compiling Error',
            message: `Error while compiling page components!`
        };
    }
}

// Compile page
const pageCompiler = async (data: gene_compilePage): Promise<string> => {
    try {

        // Register custom tags
        engine.registerTag('lucidHead', {
            render: async function (context: Context, emitter: Emitter) {
                emitter.write(data.head);
            }
        });
        engine.registerTag('lucidSeo', {
            render: async function (context: Context, emitter: Emitter) {
                emitter.write(`<title>${data.seo.title}</title>
                <meta name="description" content="${data.seo.description}">`);
            }
        });
        engine.registerTag('lucidApp', {
            render: async function (context: Context, emitter: Emitter) {
                let componentsString: string = '';
                for (const [key, value] of data.components.entries()) {
                    componentsString += value.markup
                }
                emitter.write(componentsString);
            }
        });
        engine.registerTag('lucidScript', {
            render: async function (context: Context, emitter: Emitter) {
                emitter.write(data.script);
            }
        });

        let dir = `${themeDir}/templates/${data.template}`;
        let markup = await engine.renderFile(dir)

        return markup
    }
    catch (err) {
        throw {
            code: 500,
            origin: 'pageCompiler',
            title: 'Compiling Error',
            message: `Error while compiling page!`
        };
    }
}

export {
    componentCompiler,
    pageCompiler
}