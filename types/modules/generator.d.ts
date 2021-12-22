// Key: _gene

// Template Compiler Res Map
type gene_templatesMap = Map<string, {
    markup: string
}>
// Component Compiler Res Map
// generateComponents 
type gene_componentsMap = Map<string, {
    id: string
    markup: string
}>

// Page Compiler Res Map
type gene_pagseMap = Map<string, {
    slug: string
    path: string
    markup: string
}>
// Page Compiler Input 
interface gene_compilePage {
    template: string,
    seo: {
        title: string
        description: string
    }
    components: gene_componentsMap
    head: string
    script: string
}
interface gene_compilePageOld {
    template: {
        markup: string
    },
    seo: {
        title: string
        description: string
    }
    components: gene_componentsMap
    head: string
    footer: string
}

interface gene_generateAppRes {
    build_time: number,
    pages_built: number
}