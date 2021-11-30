import fse from 'fs-extra';
import { getConfig } from "../../cms/config";
const path = require('path');

// ------------------------------------ ------------------------------------
//  Get single file content
// ------------------------------------ ------------------------------------
const getSingleFileContent = async (target: string, type: 'json') => {
    const config = getConfig();
    const directory = path.resolve(__dirname, config.directories.theme + target);
    let data = fse.readFileSync(directory);

    if(type === 'json') return JSON.parse(data.toString());
    else return data;
}

// ------------------------------------ ------------------------------------
//  Verify File Exists
// ------------------------------------ ------------------------------------
const verifyFileExists = async (target: string) => {
    const config = getConfig();
    const directory = path.resolve(__dirname, config.directories.theme + target);

    if (fse.existsSync(directory)) return true
    else return false
}

export {
    getSingleFileContent,
    verifyFileExists
}