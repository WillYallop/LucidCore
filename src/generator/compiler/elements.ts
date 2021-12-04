

const elements = [
    { tag: 'willpressHead', regex: /<willpressHead>/i },
    { tag: 'willpressSeo', regex: /<willpressSeo>/i },
    { tag: 'willpress', regex: /<willpress>/i },
    { tag: 'willpressFooter', regex: /<willpressFooter>/i }
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