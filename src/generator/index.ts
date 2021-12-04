import templateCompiller from './compiler/template';
import componentCompiller from './compiler/components';
import pageCompiler from './compiler/page';
import { savePages, createSitemap, buildDefaultApp, copyStatic } from '../store/controller/dist';

const generateApp = async (pages: Array<mod_pageModel>) => {
    try {
        // Start timer
        const start = Date.now();
        const builtPages: gene_pagseMap = new Map();
        // If we have pages passed down generate them,
        // Else only copy over static files and create a default get started page for the index.
        if(pages.length) {
            // Generate all template files
            const templates = await templateCompiller();
            // Generate pages
            for (const page of pages) {
                // Compile page components
                const components = await componentCompiller(page.components); // generate components
                const pageTemplate = templates.get(page.template);
                // Error handling
                if(pageTemplate === undefined || typeof pageTemplate.markup !== 'string') {
                    throw [{
                        code: pageTemplate === undefined ? 404 : 500,
                        origin: 'generateApp',
                        title: 'Compiling Error',
                        message: pageTemplate === undefined ? `Template "${page.template}"" for page ID "${page.id}" was not found!` : `Template "${page.template}"" for page ID "${page.id}", markup is not typeof string!`
                    }];
                }
                else {
                    // Compile page - replaces all custom element tags with component data, seo etc.
                    const markup = await pageCompiler({
                        template: pageTemplate,
                        seo: page.seo,
                        components: components,

                        // These are temp for testing
                        head: `<title>${page.name}</title>`,
                        footer: '<script> console.log("footer markdown") </script>'
                    });
                    // Add new built page entry in builtPages map!
                    builtPages.set(page.id, {
                        slug: page.slug,
                        path: page.path,
                        markup: markup
                    });
                }
            }
            // Post Build If we have pages
            await savePages(builtPages) // Save pages
            await createSitemap(builtPages) // Create/Save sitemap
        }
        else await buildDefaultApp();

        // Copy static files over
        await copyStatic();
        // Stop Timer
        const stop = Date.now();

        return {
            build_time: (stop - start)/1000,
            built_pages: builtPages.size
        }
    }
    catch(err) {
        return err
    }
}

export default generateApp;