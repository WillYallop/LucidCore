import * as fs from 'fs-extra';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const themeDir = config.directories.theme;

// ------------------------------------ ------------------------------------
//  Write to file
// ------------------------------------ ------------------------------------
const writeSingleFile = async (target: string, type: 'json', data: any): Promise<boolean> => {
    const directory = path.resolve(themeDir + target);
    try {
        if(type === 'json') {
            let writeData = JSON.stringify(data);
            fs.writeFileSync(directory, writeData);
            return true
        }
    }
    catch {
        return false
    }
    return false
}

// ------------------------------------ ------------------------------------
//  Get single file content
// ------------------------------------ ------------------------------------
const getSingleFileContent = async (target: string, type: 'json') => {
    const directory = path.resolve(themeDir + target);
    let data = fs.readFileSync(directory);

    if(type === 'json') return JSON.parse(data.toString());
    else return data;
}

// ------------------------------------ ------------------------------------
//  Verify File Exists
// ------------------------------------ ------------------------------------
const verifyFileExists = async (target: string) => {
    const directory = path.resolve(themeDir + target);
    if (fs.existsSync(directory)) return true
    else return false
}

// ------------------------------------ ------------------------------------
// Read Directory
// ------------------------------------ ------------------------------------
const listDirectoryFiles = async (target: string): Promise<Array<string>> => {
    const directory = path.resolve(themeDir + target);
    // Will list all files names inside the target directory
    let fileNames: Array<string> = [];
    let files = await fs.readdir(directory);
    for await(const file of files) {
        fileNames.push(file);
    }
    return fileNames;
}

export {
    getSingleFileContent,
    verifyFileExists,
    writeSingleFile,
    listDirectoryFiles
}