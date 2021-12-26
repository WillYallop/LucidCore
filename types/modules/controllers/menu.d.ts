// Key: cont_menu

interface cont_menu_createMenuInp {
    name: mod_menuModel["name"],
    links?: Array<{
        text?: mod_menuModelLinks["text"]
        blank?: mod_menuModelLinks["blank"]
        page_id?: mod_menuModelLinks["page_id"]
        external?: mod_menuModelLinks["external"]
        external_url?: mod_menuModelLinks["external_url"]
    }>  
}

interface cont_menu_createMenuRes {
    saved: boolean
    menu?: mod_menuModel
    errors?: Array<core_errorMsg>
}