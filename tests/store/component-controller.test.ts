/// <reference path="../../src/types/models/index.ts" />

import fse from 'fs-extra';
import * as componentController from "../../src/store/controller/component";

const path = require('path');

// For saveSingle function
test('Test if saveComponent saves to theme/components.json file', async () => {

    const fileName = 'test.twig';

    const saveComponent = await componentController.saveSingle({
        name: 'test',
        description: 'This is a test component!',
        file_name: fileName
    });
    expect(saveComponent.saved).toBe(true)
    
    // Find the newly created component in theme/components.json file
    const directory = path.resolve('./theme/components.json');
    const fileRes = fse.readFileSync(directory);
    const data: Array<mod_componentModel> = JSON.parse(fileRes.toString());

    let component = data.find( x => x.file_name === fileName);
    expect(component).toEqual(saveComponent.component)

});