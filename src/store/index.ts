// Handlers
import * as componentController from './controller/component'

const deleteSingle = async (type: stor_types) => {
    if(type === 'component') componentController.deleteSingle('test');
}

const updateSingle = async (type: stor_types) => {
    if(type === 'component') componentController.updateSingle();
}

const saveSingle = async (type: stor_types, data: any) => {
    if(type === 'component') componentController.saveSingle();
}

export {
    saveSingle,
    updateSingle,
    deleteSingle
}
