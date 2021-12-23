// Key: mod_

// Component Model
interface mod_componentModel {
    id: string
    file_name: string
    file_path: string
    name: string
    description: string
    preview_url: string
    date_added: string
    date_modified: string
    fields: Array<string> // stores an array of IDs for fields config
}


// Page Model 
interface mod_pageModel {
    id: string
    template: string
    slug: string
    path: string
    name: string
    seo: {
        title: string
        description: string
    }
    components: Array<mod_pageComponentModel>
}
interface mod_pageComponentModel {
    id: string
    file_name: string
    file_path: string
    name: string
    fields: Array<mod_pageComponentFieldModel>
}
interface mod_pageComponentFieldModel {
    name: string
    data: any
}