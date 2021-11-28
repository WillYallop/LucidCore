{
    var cmsConfig: initConfig;

    const initialise = (config: initConfig) => {
        cmsConfig = config;
    }

    const getConfig = () => {
        return cmsConfig
    }

    module.exports = {
        initialise,
        getConfig
    };
}