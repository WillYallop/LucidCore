// Responsible for crud actions to manage menus
// These will be stored in the theme config directory @ theme/config/menus.json

/*
    Example file:

    [
        {
            "id": "123-456",
            "name": "header_name",
            "links": [
                {
                    "id": "123-456",
                    "text": "Home Page",
                    "blank": false,
                    "page_id": "123-456",
                    "external": false
                },
                {
                    "id": "123-456",
                    "text": "Blog Page",
                    "blank": false,
                    "page_id": "2234-45264",
                    "external": false
                },
                {
                    "id": "123-456",
                    "text": "App",
                    "blank": true,
                    "external": true
                }
            ]
        }
    ]
*/


// ------------------------------------ ------------------------------------
// create a new menu
// ------------------------------------ ------------------------------------
const createMenu = async () => {

}


// ------------------------------------ ------------------------------------
// responsible for updating item from a menu
// ------------------------------------ ------------------------------------
const updateMenu = async () => {

}


// ------------------------------------ ------------------------------------
// responsible for updating item from a menu
// ------------------------------------ ------------------------------------
const deleteMenu = async () => {

}

export {
    createMenu,
    updateMenu,
    deleteMenu
}