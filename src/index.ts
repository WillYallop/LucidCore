{
    const { initialise } = require('./cms/config');
    const validator = require('./validator');
    const store = require('./store');

    module.exports = {
        initialise,
        validator,
        store
    };
}