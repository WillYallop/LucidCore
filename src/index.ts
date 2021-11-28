import { setConfig } from "./cms/config";
import * as validator from "./validator";
import * as store from "./store";

const initialise = async (config: core_initConfig) => {
    setConfig(config); // Set config
    // STEPS TO IMPLEMENT:
    // - Check if theme directory exists, else create one based off a boilerplate. This will be saved in the location specified in the config above
    // - 
    // - 
}

export {
    initialise,
    validator,
    store
};