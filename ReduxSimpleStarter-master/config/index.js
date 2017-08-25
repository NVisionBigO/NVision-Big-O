var configValues = require('./config');

module.exports = {

    getDbConnectionString: function() {
        return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds145010.mlab.com:45010/nodetodosample123'
       // mongodb://<dbuser>:<dbpassword>@ds145010.mlab.com:45010/nodetodosample123
    }

}