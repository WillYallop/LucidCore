import { elementsCompiler, elements } from './elements';

const pageCompiler = async (data: gene_compilePage): Promise<string> => {
    try {
       var markup = data.template.markup;
        // Build markup if needed and replace elements in tempalte markup.
        for(const element of elements) {
            switch(element.tag) {
                case 'willpressHead': {
                    // add seo
                    // add others
                    markup = markup.replace(element.regex, data.head);
                    break;
                }
                case 'willpressSeo': {
                    
                    break;
                }
                case 'willpress': {
                    let component = await elementsCompiler(element.regex, data.components);
                    markup = markup.replace(element.regex, component);
                    break;
                }
                case 'willpressFooter': {
                    markup = markup.replace(element.regex, data.footer);
                    break;
                }
            }
        }
       return markup
    }
    catch(err) {
        throw [{
            code: 500,
            origin: 'pageCompiler',
            title: 'Compiling Error',
            message: `Error while compiling page!`
        }];
    }
}

export default pageCompiler;