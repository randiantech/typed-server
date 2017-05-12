const local = require('../../../config/config.local');
const dev = require('../../../config/config.dev');
const prod = require('../../../config/config.prod');

/**
 * Utility function used to load the corresponding configuration file
 * @returns {TypeNode|Type|boolean}
 */
function properties() {
    switch (process.env.APP_ENV) {
        case 'local': return local.default;
        case 'dev'  : return dev.default;
        case 'prod' : return prod.default;
        default     : return local.default;
    }
}

export = properties