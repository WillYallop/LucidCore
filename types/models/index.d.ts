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
    content_types: Array<mod_contentTypesModel["id"]> // stores an array of IDs for fields config
}

// Content Types Model
interface mod_contentTypesModel {
    id: string
    type: 'text' | 'email' | `rich_media` | 'number' | `range` | 'repeater' | 'select' | 'date' | 'media' | 'boolean' | 'json'
    data: mod_ct_text | mod_ct_email | mod_ct_rich_media | mod_ct_number | mod_ct_range | mod_ct_repeater | mod_ct_select | mod_ct_select | mod_ct_date | mod_ct_media | mod_ct_boolean | mod_ct_json
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
    components: Array<mod_componentModel["id"]>
}