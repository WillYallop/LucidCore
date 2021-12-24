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
    content_types: Array<mod_contentTypesConfigModel["id"]> // stores an array of IDs for fields config
}

// Content Types Model
// This is the model for the content types that is stored in the themes/config/content_types directory
interface mod_contentTypesConfigModel {
    id: string
    name: string // this is the custom name the user gives to the content type
    type: 'text' | 'email' | `rich_media` | 'number' | `range` | 'repeater' | 'select' | 'date' | 'media' | 'boolean' | 'json'
    config: mod_ct_conf_text | mod_ct_conf_email | mod_ct_conf_rich_media | mod_ct_conf_number | mod_ct_conf_range | mod_ct_conf_repeater | mod_ct_conf_select | mod_ct_conf_date | mod_ct_conf_media | mod_ct_conf_boolean | mod_ct_conf_json
}
// This is the model for the data base, this is what links the pageComponentModel component to its data
interface mod_contentTypesDatabaseModel {
    id: string
    config_id: mod_contentTypesConfigModel["id"]
    data: mod_ct_data_text | mod_ct_data_email | mod_ct_data_rich_media | mod_ct_data_number | mod_ct_data_range | mod_ct_data_repeater | mod_ct_data_select | mod_ct_data_date | mod_ct_data_media | mod_ct_data_boolean | mod_ct_data_json
}

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