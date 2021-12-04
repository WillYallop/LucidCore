// Key: stor_

// deleteSingle()
interface stor_comp_deleteSingleRes {
    deleted: boolean
    errors?: Array<core_errorMsg>
}

// saveSingle()
interface stor_comp_saveSingleInp {
    name: string
    description: string
    file_name: string
    image?: string
}
interface stor_comp_saveSingleRes {
    saved: boolean,
    component?: mod_componentModel
    errors?: Array<core_errorMsg>
}

// updateSingle()
interface stor_comp_updateSingleInp {
    file_name?: string
    name?: string
    description?: string
    preview_url?: string
    fields?: Array<string> // will be changed 
}
interface stor_comp_updateSingleRes {
    updated: boolean
    component?: mod_componentModel
    errors?: Array<core_errorMsg>
}

// getSingleByID()
interface stor_comp_getSingleByIDRes {
    success: boolean
    component?: mod_componentModel
    errors?: Array<core_errorMsg>
}

// getMultiple() 
interface stor_comp_getMultipleRes {
    success: boolean
    components?: Array<mod_componentModel>
    errors?: Array<core_errorMsg>
}

// Internal
interface stor_comp_saveComponentHandlerRes {
    saved: boolean
    component: mod_componentModel
}