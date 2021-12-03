/// <reference path="../../src/types/main.d.ts" />

import fs from 'fs-extra';
import * as componentController from "../../src/store/controller/component";
import { v1 as uuidv1 } from 'uuid';
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
    expect(saveSecondComponent.saved).toBe(false);
});

// For updateSingle function
test('Test if updateSingle updates component in theme/components.json', async () => {

    // Reset components.json file
    fs.writeFileSync(path.resolve('./theme/components.json'), '[]');


    // Test update throws error if it cannot find the component.
    const componentUpdateRes1 = await componentController.updateSingle(uuidv1(), {
        name: 'Test name',
        description: 'Test Description'
    });
    expect(componentUpdateRes1.updated).toBe(false);

    // Save new component for test data.
    let newComponentRes = await componentController.saveSingle({
        name: 'Test name one',
        description: 'Test Description one',
        file_name: 'test.twig'
    });

    // Test update works and verify
    if(newComponentRes.component != undefined) {
        let newCompID = newComponentRes.component.id;

        const componentUpdateRes2 = await componentController.updateSingle(newCompID, {
            name: 'Test name two',
            description: 'Test Description two'
        });
        expect(componentUpdateRes2.updated).toBe(true);

        // Test it exists
        // Find the newly updated component in theme/components.json file
        const directory = path.resolve('./theme/components.json');
        const fileRes = fs.readFileSync(directory);
        const data: Array<mod_componentModel> = JSON.parse(fileRes.toString());

        let component = data.find( x => x.id === newCompID);
        expect(component).toEqual(componentUpdateRes2.component);
    }
});