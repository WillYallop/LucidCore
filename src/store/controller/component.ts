
import { getSingleFileContent, writeSingleFile } from './theme'
import validate from '../../validator';
import { v1 as uuidv1 } from 'uuid';

// INTERNAL
// Handles adding a new component or updating one to the compononts.json array, making sure duplicates dont exists
// Then saving the component and returning the component
// Can be updated to handle many if needed in the future
const __saveComponentHandler = async (componentsObj: Array<mod_componentModel>, component: mod_componentModel) => {
    // Check if the component exists
    let compIndex = componentsObj.findIndex( x => x.file_name === component.file_name);
    if(compIndex != -1) {
        // Update object and save
        let newCompObj: mod_componentModel = {...componentsObj[compIndex], ...component};
        componentsObj[compIndex] = newCompObj;
        let response = await writeSingleFile('/components.json', 'json', componentsObj);
        console.log('UPDATED');
        return {
            saved: response,
            updated: true,
            component: componentsObj[compIndex]
        }
    } 
    else {
        // Add to array and save
        componentsObj.push(component);
        let response = await writeSingleFile('/components.json', 'json', componentsObj);
        console.log('ADDED');
        return {
            saved: response,
            updated: false,
            component: component
        }
    }
}

// EXTERNAL

const deleteSingle = async (id: string): Promise<string> => {
    return 'hello'
}

// ------------------------------------ ------------------------------------
// update single component
// ------------------------------------ ------------------------------------
// Handles updating a component, all fields must pass validation first, can pass any amount of value to update
// TO DO - add validation to the preview_url and fields paramaters
const updateSingle = async (data: stor_comp_updateSingleInp): Promise<stor_comp_updateSingleRes> => {
    if(Object.entries(data).length) {
        let validateObj: Array<vali_validateFieldObj> = [];
        // Build out the validate object
        for (const [key, value] of Object.entries(data)) {
            switch(key) {
                case 'name': {
                    validateObj.push({
                        method: 'comp_name',
                        value: value
                    });
                    break;
                }
                case 'description': {
                    validateObj.push({
                        method: 'comp_description',
                        value: value
                    });
                    break;
                }
                case 'file_name': {
                    validateObj.push(        {
                        method: 'comp_verifyFileExists',
                        value: value
                    });
                    break;
                }
            }
        }
        // Validate
        let verifyData = await validate(validateObj);
        // Update data
        if(verifyData.valid) {
            // theme/components.json
            let componentData = await getSingleFileContent('/components.json', 'json');
            // Update
            let componentRes = await __saveComponentHandler(componentData, data);
            return {
                updated: componentRes.updated,
                component: componentRes.component
            }
        }
        else {
            return {
                updated: false,
                field_errors: verifyData.fields,
            }
        }
    }
    else {
        return {
            updated: false,
            errors: [
                {
                    code: 403,
                    origin: 'updateSingle',
                    title: 'No Paramaters',
                    message: 'No paramaters passed to componentController.updateSingle() function!'
                }
            ]
        }
    }
}

// ------------------------------------ ------------------------------------
// register a new component
// ------------------------------------ ------------------------------------
// Will handle saving a new component 
// This should be used to update a component - if one exists already for that component file it will update it inproperly - use the updateSingle instead.
const saveSingle = async (data: stor_comp_saveSingleInp): Promise<stor_comp_saveSingleRes> => {
    // Validate the data
    let verifyData = await validate([
        {
            method: 'comp_name',
            value: data.name
        },
        {
            method: 'comp_description',
            value: data.description
        },
        {
            method: 'comp_verifyFileExists',
            value: data.file_name
        }
    ]);
    // Validate input data
    if(verifyData.valid) {
        // theme/components.json
        let componentData = await getSingleFileContent('/components.json', 'json');
        // Base component object
        let componentObj: mod_componentModel = {
            id: uuidv1(),
            file_name: data.file_name,
            name: data.name,
            description: data.description,
            preview_url: '',
            date_added: new Date().toString(),
            date_modified: new Date().toString(),
            fields: []
        }
        let componentRes = await __saveComponentHandler(componentData, componentObj);
        return componentRes
    }
    else {
        return {
            saved: false,
            updated: false,
            field_errors: verifyData.fields,
        }
    }
}

export {
    saveSingle,
    updateSingle,
    deleteSingle
}