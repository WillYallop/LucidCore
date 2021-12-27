// Key: mod_


// Page Model 
interface mod_pageModel {
    id: string
    template: string
    slug: string
    name: string
    seo: {
        title: string
        description: string
    }
    components: Array<mod_pageModelComponent>
}
interface mod_pageModelComponent {
    id: mod_componentModel["id"]
    file_name: mod_componentModel["file_name"]
    file_path: mod_componentModel["file_path"]
    name: mod_componentModel["name"]
    description: mod_componentModel["description"]
    preview_url: mod_componentModel["preview_url"]
    date_added: mod_componentModel["date_added"]
    date_modified: mod_componentModel["date_modified"]
    content_types: Array<mod_pageModelComponentContentType>
}
interface mod_pageModelComponentContentType {
    id: mod_contentTypesDatabaseModel["id"]
    config_id: mod_contentTypesConfigModel["id"]
    name: mod_contentTypesConfigModel["name"]
    type: mod_contentTypesConfigModel["type"]
    config: mod_contentTypesConfigModel["config"]
    data: mod_contentTypesDatabaseModel["data"]
}