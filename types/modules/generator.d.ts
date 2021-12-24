// Key: gen_


interface gen_generateAppInp {
    id: mod_pageModel["id"]
    template: mod_pageModel["template"]
    slug: mod_pageModel["slug"]
    name: mod_pageModel["name"]
    seo: {
        title: string
        description: string
    }
    components: Array<gen_generateAppInpComponentModel>
}

interface gen_generateAppInpComponentModel {
    id: mod_componentModel["id"]
    file_name: mod_componentModel["file_name"]
    file_path: mod_componentModel["file_path"]
    name: mod_componentModel["name"]
    fields: Array<gen_generateAppInpComponentFieldModel>
}
interface gen_generateAppInpComponentFieldModel {
    name: string
    data: any
}


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
    slug: mod_pageModel["slug"]
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

interface gene_generateAppRes {
    build_time: number,
    pages_built: number
}