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

import { getSingleFileContent, writeSingleFile } from './theme';
import validate from '../validator';
import { v1 as uuidv1 } from 'uuid';
import { __verifyFieldsToErrorArray, __convertStringLowerUnderscore } from './helper/shared';
import merge from 'lodash/merge';


// ------------------------------------ ------------------------------------
// create a new menu
// ------------------------------------ ------------------------------------
const createMenu = async (menuData: cont_menu_createMenuInp): Promise<cont_menu_createMenuRes> => {
    //
    // Validate the name field and nav item text field
    // Grab the menu config file and check if a menu exists with the name already
    // Build out the new menu object
    // Save & return it
    let validateObj: Array<vali_validateFieldObj> = [
        {
            method: 'menu_name',
            value: __convertStringLowerUnderscore(menuData.name)
        }
    ];
    let menuLinksArray: Array<mod_menuModelLinks> = [];
    // Build out the validate object
    if(menuData.links) {
        menuData.links.forEach((link) => {
            if(link.text) {
                validateObj.push({
                    method: 'menu_linkText',
                    value: link.text
                })
            };
            let linkItem: mod_menuModelLinks = {
                id: uuidv1(),
                text: link.text || '',
                blank: link.blank || false,
                external: link.external || false
            };
            if(link.external) {
                if(link.external_url) linkItem.external_url = link.external_url;
            }
            else {
                if(link.page_id) linkItem.page_id = link.page_id;
            }
            menuLinksArray.push(linkItem);
        })
    };
    // Validate
    let verifyData = await validate(validateObj);
    // Update data
    if(verifyData.valid) {
        // Get menu config file
        let menuConfigData: Array<mod_menuModel> = await getSingleFileContent('/config/menus.json', 'json');
        // Find matching name
        let findMatchingMenuName = menuConfigData.findIndex( x => x.name === __convertStringLowerUnderscore(menuData.name));
        if(findMatchingMenuName === -1) {
            // Doesnt exist - save
            let newMenuObj: mod_menuModel = {
                id: uuidv1(),
                name: __convertStringLowerUnderscore(menuData.name),
                links: menuLinksArray
            };
            menuConfigData.push(newMenuObj);
            let response = await writeSingleFile('/config/menus.json', 'json', menuConfigData);
            return {
                saved: response,
                menu: newMenuObj
            }
        }
        else {
            return {
                saved: false,
                errors: [
                    {
                        code: 409,
                        origin: 'menuController.createMenu',
                        title: 'Menu With Name Exists',
                        message: `A menu with the name of: "${__convertStringLowerUnderscore(menuData.name)}" already exists!`
                    }
                ]
            }
        }
    }
    else {
        // Define custom errors
        let errors: Array<core_errorMsg> = [];
        return {
            saved: false,
            errors: __verifyFieldsToErrorArray(errors, verifyData.fields)
        }
    }
}


// ------------------------------------ ------------------------------------
// responsible for updating item from a menu
// ------------------------------------ ------------------------------------
const updateMenu = async (menuID: mod_menuModel["id"], menuData: cont_menu_updateMenuInp) => {
    // Verify ID and if we have it: the name of the menu
    // Get corresponding menu
    // Update name / loop over links to find one matching our input and merge them
    // Save the menu and return
    let validateObj: Array<vali_validateFieldObj> = [
        {
            method: 'uuidVerify',
            value: menuID
        }
    ];
    if(menuData.name) validateObj.push({
        method: 'menu_name',
        value: __convertStringLowerUnderscore(menuData.name)
    })
    // Validate
    let verifyData = await validate(validateObj);
    // Update data
    if(verifyData.valid) {
        // Get menu config file
        let menuConfigData: Array<mod_menuModel> = await getSingleFileContent('/config/menus.json', 'json');
        // Find corresponding menu
        let findMenu = menuConfigData.find( x => x.id === menuID );
        if(findMenu) {
            // Update name
            findMenu.name = __convertStringLowerUnderscore(menuData.name || findMenu.name);
            // Update links
            if(menuData.links != undefined) {
                menuData.links.forEach((link) => {
                    // Find link index via id
                    if(findMenu) { // beacuse typescript threw error otherwise..
                        let linkIndex = findMenu.links.findIndex( x => x.id === link.id );
                        if(linkIndex != -1) {
                            let newLinkObj = merge(findMenu.links[linkIndex], link);
                            // Depending on if external or not, only save either page_id or external_url
                            if(newLinkObj.external) delete newLinkObj['page_id'];
                            else delete newLinkObj['external_url'];
                            // Update
                            findMenu.links[linkIndex] = newLinkObj;
                        }
                    }
                })
            }
            // Save to file
            await writeSingleFile('/config/menus.json', 'json', menuConfigData);
            return {
                updated: true,
                menu: findMenu
            }
        }
        else {
            return {
                updated: false,
                errors: [
                    {
                        code: 404,
                        origin: 'menuController.updateMenu',
                        title: 'Menu Doenst Exist',
                        message: `Cannot find a menu with an ID of: "${menuID}"!`
                    }
                ]
            }
        }
    }
    else {
        // Define custom errors
        let errors: Array<core_errorMsg> = [];
        return {
            updated: false,
            errors: __verifyFieldsToErrorArray(errors, verifyData.fields)
        }
    }
}


// ------------------------------------ ------------------------------------
// responsible for updating item from a menu
// ------------------------------------ ------------------------------------
const deleteMenu = async (id: mod_menuModel["id"]) => {

}

export {
    createMenu,
    updateMenu,
    deleteMenu
}