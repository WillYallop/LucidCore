/// <reference path="../../src/types/models/index.d.ts" />

import fs from 'fs-extra';
import * as componentController from "../../src/store/controller/component";

const path = require('path');

// For saveSingle function
test('Test if saveComponent saves to theme/components.json file', async () => {

    // Reset components.json file
    fs.writeFileSync(path.resolve('./theme/components.json'), '[]');


    // Test it saves
    const fileName = 'test.twig';
    const saveComponent = await componentController.saveSingle({
        name: 'test',
        description: 'This is a test component!',
        file_name: fileName
    });
    expect(saveComponent.saved).toBe(true);
    

    // Test it exists
    // Find the newly created component in theme/components.json file
    const directory = path.resolve('./theme/components.json');
    const fileRes = fs.readFileSync(directory);
    const data: Array<mod_componentModel> = JSON.parse(fileRes.toString());

    let component = data.find( x => x.file_name === fileName);
    expect(component).toEqual(saveComponent.component);


    // Test it only allows one component instance with file_name
    const saveSecondComponent = await componentController.saveSingle({
        name: 'test',
        description: 'This is a test component!',
        file_name: fileName
    });
    console.log(saveSecondComponent);
    expect(saveSecondComponent.saved).toBe(false);
});

// For updateSingle function
test('Test if updateSingle updates component in theme/components.json', async () => {



});