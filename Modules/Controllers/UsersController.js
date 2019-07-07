const UsersServiceClass = require('../Services/UsersService');

  class UsersController {
    makeRouteName(routeNameWithoutSlash){
      const prefix = '/api/users';

      return `${prefix}/${routeNameWithoutSlash}`
    }

    async registerRoutes(expressAppInstance, dbConnection){
      const UsersService = new UsersServiceClass(dbConnection);

      expressAppInstance.get(this.makeRouteName(''), async (req, res) => {
        try {
            const {username, password } = req.query;
            const data = await UsersService.checkUserCredentials(username, password);
            res.send(data);
        } catch(e){
            console.error(e);
        }
      });
    }

}

module.exports = UsersController;