import fse from 'fs-extra';

const path = require('path');
const themeDirectory = path.resolve(__dirname, '../../theme');


const test = async () => {
    try {
        // Grab names of all templates in theme/templates directory
        let fileNames: Array<string> = [];
        let files = await fse.readdir(`${themeDirectory}`);
        for await(const file of files) {
            fileNames.push(file);
        }
        console.log('File Names: ', fileNames);
    }
    catch(err) {
        throw err
    }
}

export {
    test
};