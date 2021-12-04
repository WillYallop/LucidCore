
import { getSingleFileContent, writeSingleFile } from './theme'
import validate from '../../validator';
import { v1 as uuidv1 } from 'uuid';

// INTERNAL
// Handles adding a new component or updating one to the compononts.json array, making sure duplicates dont exists
// Then saving the component and returning the component
// Can be updated to handle many if needed in the future
const __saveComponentHandler = async (componentsArray: Array<mod_componentModel>, component: mod_componentModel): Promise<stor_comp_saveComponentHandlerRes> => {
    // Check if the component exists
    let compIndex = componentsArray.findIndex( x => x.file_name === component.file_name);
    if(compIndex != -1) {
        return {
            saved: false,
            component: component
        }
    } 
    else {
        // Add to array and save
        componentsArray.push(component);
        let response = await writeSingleFile('/components.json', 'json', componentsArray);
        return {
            saved: response,
            component: component
        }
    }
}

// Handles merging and turning the verify.fields array into single errors array. 
const __verifyFieldsToErrorArray = (errors: Array<core_errorMsg>, verifyFields: Array<vali_validateFieldResponse>): Array<core_errorMsg> => {
    let errorArray = errors;
    verifyFields.forEach((field) => {
        errorArray = errorArray.concat(field.errors);
    });
    return errorArray;
}

// EXTERNAL
// ------------------------------------ ------------------------------------
// delete single component
// ------------------------------------ ------------------------------------
// This doesnt remove the component file.twig, it just unregisteres in from the components collection that stores its info and fields.
const deleteSingle = async (id: string): Promise<stor_comp_deleteSingleRes> => {
    // Validate the ID
    let verifyData = await validate([
        {
            method: 'uuidVerify',
            value: id
        }
    ]);
    if(verifyData.valid) {
        // theme/components.json
        let componentData: Array<mod_componentModel> = await getSingleFileContent('/components.json', 'json');
        let componentIndex = componentData.findIndex( x => x.id === id);
        if(componentIndex != -1) {
            // Remove from array and write to file
            componentData.splice(componentIndex, 1);
            let response = await writeSingleFile('/components.json', 'json', componentData);
            return {
                deleted: response
            }
        }
        else {
            return {
                deleted: false,
                errors: [
                    {
                        code: 404,
                        origin: 'deleteSingle',
                        title: 'Component Not Found',
                        message: `Cannot delete component with ID: "${id}" because it cannot be found!`
                    }
                ]
            }
        }
    }
    else {
        // Define custom errors
        let errors: Array<core_errorMsg> = [];
        return {
            deleted: false,
            errors: __verifyFieldsToErrorArray(errors, verifyData.fields)
        }
    }
}

// ------------------------------------ ------------------------------------
// update single component
// ------------------------------------ ------------------------------------
// Handles updating a component, all fields must pass validation first, can pass any amount of value to update
// TO DO - add validation to the preview_url and fields paramaters
const updateSingle = async (id: string, data: stor_comp_updateSingleInp): Promise<stor_comp_updateSingleRes> => {
    if(Object.entries(data).length) {
        let validateObj: Array<vali_validateFieldObj> = [
            {
                method: 'uuidVerify',
                value: id
            }
        ];
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
            }
        }
        // Validate
        let verifyData = await validate(validateObj);
        // Update data
        if(verifyData.valid) {
            // theme/components.json
            let componentData: Array<mod_componentModel> = await getSingleFileContent('/components.json', 'json');

            // Make sure it exists elseo throw
            let findCompIndex = componentData.findIndex( x => x.id === id );
            if(findCompIndex != -1) {
                // Update object and save
                let newCompObj: mod_componentModel = {...componentData[findCompIndex], ...data};
                componentData[findCompIndex] = newCompObj;
                let response = await writeSingleFile('/components.json', 'json', componentData);
                return {
                    updated: response,
                    component: componentData[findCompIndex]
                }
            } 
            else {
                return {
                    updated: false,
                    errors: [
                        {
                            code: 404,
                            origin: 'updateSingle',
                            title: 'Component Not Found',
                            message: `Cannot find component with ID: "${id}" to update!`
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
        let componentData: Array<mod_componentModel> = await getSingleFileContent('/components.json', 'json');
        // Make sure it doesnt exist, else throw
        let findComponent = componentData.findIndex( x => x.file_name === data.file_name );
        if(findComponent === -1) {
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
                errors: [
                    {
                        code: 403,
                        origin: 'saveSingle',
                        title: 'Component Already Registered',
                        message: `Component with the file_name: "${data.file_name}" has already been registered. Please use the componentController.updateSingle() function!`
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
// get single component
// ------------------------------------ ------------------------------------
const getSingleByID = async (id: string): Promise<stor_comp_getSingleByIDRes> => {
    // Verify ID
    // Get component data
    // Return component
    let verifyData = await validate([
        {
            method: 'uuidVerify',
            value: id
        }
    ]);
    if(verifyData.valid) {

        let componentData: Array<mod_componentModel> = await getSingleFileContent('/components.json', 'json');
        let findComponent = componentData.find( x => x.id === id );
        if(findComponent) {
            return {
                success: true,
                component: findComponent
            }
        }
        else {
            return {
                success: false,
                errors: [
                    {
                        code: 404,
                        origin: 'getSingleByID',
                        title: 'Component Not Found',
                        message: `Cannot get component with ID: "${id}" because it cannot be found!`
                    }
                ]
            }

        }
    }
    else {
        // Define custom errors
        let errors: Array<core_errorMsg> = [];
        return {
            success: false,
            errors: __verifyFieldsToErrorArray(errors, verifyData.fields)
        }
    }
}

// ------------------------------------ ------------------------------------
// get multiple components
// ------------------------------------ ------------------------------------
const getMultiple = async (limit: number, skip: number): Promise<stor_comp_getMultipleRes> => {
    // Validate inputs are numbers
    // Get component data
    // Splice items before the skip value index
    // Return component array
    if(typeof limit != 'number' && typeof skip != 'number') {
        return {
            success: false,
            errors: [
                {
                    code: 400,
                    origin: 'getMultiple',
                    title: 'Type Error',
                    message: `Type of limit and skip paramater must be "number"! Not "${typeof limit}" and "${typeof skip}"!`
                }
            ]
        }
    }
    // Process
    else {
        // Get component data
        let componentData: Array<mod_componentModel> = await getSingleFileContent('/components.json', 'json');
        componentData.splice(0, skip);
        componentData.splice(limit);
        return {
            success: true,
            components: componentData
        }
    }
}

export {
    saveSingle,
    updateSingle,
    deleteSingle,
    getSingleByID,
    getMultiple
}