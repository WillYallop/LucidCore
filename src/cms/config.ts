var cmsConfig: core_initConfig;

const initialise = (config: core_initConfig) => {
    cmsConfig = config;
}

const getConfig = () => {
    return cmsConfig
}

export {
    initialise,
    getConfig
};