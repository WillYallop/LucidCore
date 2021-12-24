import { getSingleFileContent, writeSingleFile, verifyFileExists } from './theme';
import validate from '../validator';
import { v1 as uuidv1 } from 'uuid';
import { __verifyFieldsToErrorArray } from './helper/shared';

// ------------------------------------ ------------------------------------
// save single component content type
// ------------------------------------ ------------------------------------
const saveSingle = async (componentID: mod_componentModel["id"], contentType: cont_cont_saveSingleInp): Promise<cont_cont_saveSingleRes> => {
    // Check if file ith component ID exists in theme/config/content_types and save a single component content type object to it
    // Else create the file and save a single component content type object to it
    let verifyData = await validate([
        {
            method: 'uuidVerify',
            value: componentID
        },
        {
            method: 'cont_name',
            value: contentType.name // only the contentType.name is user inputted, so we assume the rest is correct
        }
    ]);
    if(verifyData.valid) {
        let componentData: Array<mod_componentModel> = await getSingleFileContent('/config/components.json', 'json');
        let findComponent = componentData.find( x => x.id === componentID );
        if(findComponent) {

            // Create the content type object 
            let contentTypeObj: mod_contentTypesConfigModel = {
                id: uuidv1(),
                name: contentType.name.toLowerCase(),
                type: contentType.type,
                config: contentType.config
            };

            let contentTypeFileData: Array<mod_contentTypesConfigModel> = await getSingleFileContent(`/config/content_types/${componentID}.json`, 'json');
            let findDuplicateName = contentTypeFileData.findIndex( x => x.name === contentTypeObj.name );
            if(findDuplicateName === -1) {
                // Does not exist
                // Add to array and save
                contentTypeFileData.push(contentTypeObj);
                let response = await writeSingleFile(`/config/content_types/${componentID}.json`, 'json', contentTypeFileData);
                return {
                    saved: response,
                    content_type: contentTypeObj
                }
            }
            else {
                // Exists
                return {
                    saved: false,
                    errors: [
                        {
                            code: 403,
                            origin: 'contentTypeController.saveSingle',
                            title: 'Content Type Name Taken',
                            message: `Content type with name "${contentType.name}" has already been registered.`
                        }
                    ]
                }
            }
        }
        else {
            return {
                saved: false,
                errors: [
                    {
                        code: 404,
                        origin: 'contentTypeController.saveSingle',
                        title: 'Component Not Found',
                        message: `Cannot get component with ID: "${componentID}" because it cannot be found!`
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
// get all component content types data
// ------------------------------------ ------------------------------------
const getAll = async (componentID: mod_componentModel["id"]): Promise<cont_cont_getAllRes> => {
    let verifyData = await validate([
        {
            method: 'uuidVerify',
            value: componentID
        }
    ]);
    if(verifyData.valid) {
        let contentTypeFileData: Array<mod_contentTypesConfigModel> = await getSingleFileContent(`/config/content_types/${componentID}.json`, 'json');
        return {
            success: true,
            content_types: contentTypeFileData
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
// delete single component content type
// ------------------------------------ ------------------------------------
const deleteSingle = async (componentID: mod_componentModel["id"], contentTypeID: mod_contentTypesConfigModel["id"]): Promise<cont_cont_deleteSingleRes> => {
    let verifyData = await validate([
        {
            method: 'uuidVerify',
            value: componentID
        },
        {
            method: 'uuidVerify',
            value: contentTypeID
        }
    ]);
    if(verifyData.valid) {
        let contentTypeFileData: Array<mod_contentTypesConfigModel> = await getSingleFileContent(`/config/content_types/${componentID}.json`, 'json');
        let findContentTypeIndex = contentTypeFileData.findIndex( x => x.id === contentTypeID);
        if(findContentTypeIndex != -1) {
            // Remove from array and write to file
            contentTypeFileData.splice(findContentTypeIndex, 1);
            let response = await writeSingleFile(`/config/content_types/${componentID}.json`, 'json', contentTypeFileData);
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
                        origin: 'contentTypeController.deleteSingle',
                        title: 'Content Type Not Found',
                        message: `Cannot delete content type with ID: "${contentTypeID}" for component with ID: "${contentTypeID}" because it cannot be found!`
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
// update single component content type
// ------------------------------------ ------------------------------------
const updateSingle = async () => {

}

export {
    saveSingle,
    getAll,
    deleteSingle,
    updateSingle
}