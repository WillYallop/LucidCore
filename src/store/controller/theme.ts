import fse from 'fs-extra';

const path = require('path');
const config = require(path.resolve("./cms.config.js"));
const themeDir = config.directories.theme;


// ------------------------------------ ------------------------------------
//  Get single file content
// ------------------------------------ ------------------------------------
const getSingleFileContent = async (target: string, type: 'json') => {
    const directory = path.resolve(themeDir + target);
    let data = fse.readFileSync(directory);

    if(type === 'json') return JSON.parse(data.toString());
    else return data;
}

// ------------------------------------ ------------------------------------
//  Verify File Exists
// ------------------------------------ ------------------------------------
const verifyFileExists = async (target: string) => {
    const directory = path.resolve(themeDir + target);
    
    if (fse.existsSync(directory)) return true
    else return false
}

export {
    getSingleFileContent,
    verifyFileExists
}