// Key: cont_cont_

// saveSingle()
interface cont_cont_saveSingleInp {
    name: mod_contentTypesConfigModel["name"]
    type: mod_contentTypesConfigModel["type"]
    config: mod_contentTypesConfigModel["config"]
}
interface cont_cont_saveSingleRes {
    saved: boolean,
    content_type?: mod_contentTypesConfigModel
    errors?: Array<core_errorMsg>
}

// getAll()
interface cont_cont_getAllRes {
    success: boolean
    content_types?: Array<mod_contentTypesConfigModel>
    errors?: Array<core_errorMsg>
}