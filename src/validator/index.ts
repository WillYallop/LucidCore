// Methods
import { verifyFileExists } from "../controller/theme";
import validatorConfig from './validator-config';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

// Handle passing of field data to correct method validator
const validateField = async (field: vali_validateFieldObj): Promise<vali_validateFieldResponse> => {
    const fieldResponse: vali_validateFieldResponse = {
        valid: true,
        value: field.value,
        method: field.method,
        errors: []
    }

    if(field.value != undefined) {
        switch(field.method) {
            // Components
            case 'comp_name': {
                let regex = new RegExp(validatorConfig.comp_name);
                let res = regex.test(field.value);
                fieldResponse.valid = res;
                if(!res) fieldResponse.errors.push({
                    code: 403,
                    origin: 'validateField',
                    title: 'Doesnt Match Regex',
                    message: `Component name: "${field.value}" does not meet the criteria.`
                });
                break;
            }
            case 'comp_description': {
                let regex = new RegExp(validatorConfig.comp_description);
                let res = regex.test(field.value);
                fieldResponse.valid = res;
                if(!res) fieldResponse.errors.push({
                    code: 403,
                    origin: 'validateField',
                    title: 'Doesnt Match Regex',
                    message: `Component description: "${field.value}" does not meet the criteria.`
                });
                break;
            }
            // Components - Theme
            case 'comp_verifyFileExists': {
                let res = await verifyFileExists(`/components/${field.value}`);
                fieldResponse.valid = res;
                if(!res) fieldResponse.errors.push({
                    code: 404,
                    origin: 'validateField',
                    title: 'File Not Found',
                    message: `Component with file name: "${field.value}" could not be found in the theme components directory!`
                });
                break;
            }
            // Alt
            case 'uuidVerify': {
                let res = uuidValidate(field.value) && uuidVersion(field.value) === 1;
                fieldResponse.valid = res;
                if(!res) fieldResponse.errors.push({
                    code: 404,
                    origin: 'validateField',
                    title: 'uuid Not Valid',
                    message: `uuid: "${field.value}" is not a valid ID.`
                });
                break;  
            }
        }
    } else {
        fieldResponse.valid = false;
        fieldResponse.errors.push({
            code: 403,
            origin: 'validateField',
            title: 'Value is undefined',
            message: `Method "${field.method}": value is undefined!`
        });
    }

    return fieldResponse
}

// Validate handler
const validate = async (data: vali_validateFieldObj | Array<vali_validateFieldObj>): Promise<vali_validateResponse> => {
    const validateRes: vali_validateResponse = {
        valid: true,
        fields: []
    }
    // Check if its an array
    if(Array.isArray(data)) {
        for(let i = 0; i < data.length; i++) {
            let fieldRes: vali_validateFieldResponse = await validateField(data[i]);
            validateRes.fields.push(fieldRes);
            if(!fieldRes.valid) validateRes.valid = false;
        }
    } 
    else {
        let fieldRes: vali_validateFieldResponse = await validateField(data);
        validateRes.fields.push(fieldRes);
        if(!fieldRes.valid) validateRes.valid = false;
    }
    return validateRes
}

export default validate;