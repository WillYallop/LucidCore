var cmsConfig: core_initConfig;

const setConfig = (config: core_initConfig) => {
    cmsConfig = config;
}

const getConfig = () => {
    return cmsConfig
}

export {
    setConfig,
    getConfig
};