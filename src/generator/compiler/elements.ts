

const elements = [
    { tag: 'lucidHead', regex: /<lucidHead>/i },
    { tag: 'lucidSeo', regex: /<lucidSeo>/i },
    { tag: 'lucidApp', regex: /<lucidApp>/i },
    { tag: 'lucidFooter', regex: /<lucidFooter>/i }
];

const elementsCompiler = async (regex: RegExp, components: gene_componentsMap): Promise<string> => {
    var componentsString: string = '';
    for (const [key, value] of components.entries()) {
        componentsString += value.markup
    }
    return componentsString
}

export {
    elementsCompiler,
    elements
};