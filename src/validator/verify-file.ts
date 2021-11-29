import fse from 'fs-extra';
import { getConfig } from "../cms/config";
const path = require('path');

type vali_verifyFIleTargetPath = 'theme';

async function verifyFileExists(targetPath: vali_verifyFIleTargetPath, dir: string) {
    let relativeThemeDirectory, themeDirectory;
    const config = getConfig();

    if(targetPath === 'theme') {
        relativeThemeDirectory = config.directories.theme;
        themeDirectory = path.resolve(__dirname, relativeThemeDirectory + dir);
    }
    else return false

    if (fse.existsSync(themeDirectory)) return true
    else return false
}

export default verifyFileExists;