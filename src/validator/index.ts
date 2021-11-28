{
    const { getConfig } = require('../cms/config');

    const test = () => {
        console.log(getConfig())
    }

    module.exports = {
        test
    };
}