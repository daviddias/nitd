module.exports = function(context, options) {

    var paginate = require('handlebars-paginate');

    if(!context)
        return '';

    return paginate(context, options);
    

}
