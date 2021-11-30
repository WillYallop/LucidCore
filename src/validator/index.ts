// Methods
import { verifyFileExists } from "../store/controller/theme";
import validatorConfig from './validator-config';

// Handle passing of field data to correct method validator
const validateField = async (field: vali_validateFieldObj): Promise<vali_validateFieldResponse> => {
    const fieldResponse: vali_validateFieldResponse = {
        valid: true,
        value: field.value,
        method: field.method,
        errors: []
    }
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