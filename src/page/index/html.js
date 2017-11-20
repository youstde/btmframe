var layout = require('../../layout/html');
var contentTpl = require('./content.ejs');
module.exports = layout(contentTpl());
