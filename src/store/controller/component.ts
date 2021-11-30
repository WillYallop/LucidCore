
import { getSingleFileContent } from './theme'



const deleteSingle = async (test: string): Promise<string> => {
    return 'hello'
}

const updateSingle = async () => {

}

// ------------------------------------ ------------------------------------
// register a new component
// ------------------------------------ ------------------------------------
const saveSingle = async (data: stor_comp_saveSingleData) => {
    // Validate the data
    let componentData = await getSingleFileContent('/components.json', 'json');
    
}

export {
    saveSingle,
    updateSingle,
    deleteSingle
}