// Key: stor_

// saveSingle()
interface stor_comp_saveSingleInp {
    name: string
    description: string
    file_name: string
    image?: string
}

// updateSingle()
interface stor_comp_updateSingleInp {
    file_name?: string
    name?: string
    description?: string
    preview_url?: string
    fields?: Array<string> // will be changed 
}