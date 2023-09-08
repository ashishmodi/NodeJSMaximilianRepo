const path = require('path');

// module.exports = path.dirnameprocess.dirname(process.mainModule.filename);  // deprecated
module.exports = path.dirname(require.main.filename);