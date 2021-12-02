
import { getSingleFileContent, writeSingleFile } from './theme'
import validate from '../../validator';
const { v4: uuidv4 } = require('uuid');


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
        return {
            saved: response,
            component: componentsObj[compIndex]
        }
    } 
    else {
        // Add to array and save
        componentsObj.push(component);
        let response = await writeSingleFile('/components.json', 'json', componentsObj);
        return {
            saved: response,
            component: component
        }
    }
}

// EXTERNAL

const deleteSingle = async (test: string): Promise<string> => {
    return 'hello'
}

const updateSingle = async () => {

}

// ------------------------------------ ------------------------------------
// register a new component
// ------------------------------------ ------------------------------------
const saveSingle = async (data: stor_comp_saveSingleData) => {
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
            id: uuidv4(),
            file_name: data.file_name,
            name: data.name,
            description: data.description,
            preview_url: '',
            date_added: new Date().toString(),
            date_modified: new Date().toString(),
            fields: []
        }
        let componentRes = await __saveComponentHandler(componentData, componentObj);
        return {
            saved: componentRes.saved,
            component: componentRes.component
        }
    }
    else {
        return {
            saved: false,
            field_errors: verifyData.fields
        }
    }
}

export {
    saveSingle,
    updateSingle,
    deleteSingle
}