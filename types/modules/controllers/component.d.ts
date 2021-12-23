// Key: cont_comp_

// deleteSingle()
interface cont_comp_deleteSingleRes {
    deleted: boolean
    errors?: Array<core_errorMsg>
}

// saveSingle()
interface cont_comp_saveSingleInp {
    name: string
    description: string
    file_path: string
    image?: string
}
interface cont_comp_saveSingleRes {
    saved: boolean,
    component?: mod_componentModel
    errors?: Array<core_errorMsg>
}

// updateSingle()
interface cont_comp_updateSingleInp {
    file_name?: string
    name?: string
    description?: string
    preview_url?: string
    fields?: Array<string> // will be changed 
}
interface cont_comp_updateSingleRes {
    updated: boolean
    component?: mod_componentModel
    errors?: Array<core_errorMsg>
}

// getSingleByID()
interface cont_comp_getSingleByIDRes {
    success: boolean
    component?: mod_componentModel
    errors?: Array<core_errorMsg>
}

// getMultiple() 
interface cont_comp_getMultipleRes {
    success: boolean
    components?: Array<mod_componentModel>
    errors?: Array<core_errorMsg>
}

// Internal
interface cont_comp_saveComponentHandlerRes {
    saved: boolean
    component: mod_componentModel
}