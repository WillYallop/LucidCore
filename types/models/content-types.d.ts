// Key: mod_ct_

// TYPES
// 'text' | 'email' | `rich_media` | 'number' | `range` | 'repeater' | 'select' | 'date' | 'media' | 'boolean' | 'json'

// Text content type
interface mod_ct_text {
    max_length: number
    min_length: number
    value: number
}

// Email content type
interface mod_ct_email {
    value: string
}

// Rich media content type
interface mod_ct_rich_media {
    value: string
}

// Number content type
interface mod_ct_number {
    value: number
}

// Range content type
interface mod_ct_range {
    max_range: number
    min_range: number
    value: number
}

// Repeater content type
interface mod_ct_repeater {
    max_repeats: number
    value: Array<mod_ct_text | mod_ct_email | mod_ct_rich_media | mod_ct_number | mod_ct_range | mod_ct_repeater | mod_ct_select | mod_ct_select | mod_ct_date | mod_ct_media | mod_ct_boolean | mod_ct_json>
}

// Select content type
interface mod_ct_select {
    value: Array<string | number>
}

// Date content type
interface mod_ct_date {
    value: string
}

// Media content type
interface mod_ct_media {
    value: string
}

// Boolean content type
interface mod_ct_boolean {
    value: boolean
}

// JSON content type
interface mod_ct_json {
    value: string // Because they can enter any json into this, it will have to be stringified and stored as string.
}