// Key: mod_

// Component Fields Model
interface mod_componentFieldModel {
    name: string
    data: any
}

// Component Model
interface mod_componentModel {
    id: string
    file_name: string
    name: string
    description: string
    preview_url: string
    date_added: string
    date_modified: string
    fields: Array<mod_componentFieldModel> // will be changed 
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
    components: Array<mod_componentModel>
}