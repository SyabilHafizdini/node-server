const DatesServiceClass = require('../Services/DatesService');

  class DatesController {
    makeRouteName(routeNameWithoutSlash){
      const prefix = '/api/dates';

      return `${prefix}/${routeNameWithoutSlash}`
    }

    async registerRoutes(expressAppInstance, dbConnection){
      const DatesService = new DatesServiceClass(dbConnection);

      expressAppInstance.get(this.makeRouteName(''), async (req, res) => {
        try {
            const data = await DatesService.getAllDates();
            res.send(data);
        } catch(e){
            console.error(e);
        }
      });

      expressAppInstance.get(this.makeRouteName('months'), async (req, res) => {
        const { year } = req.query;
        try {
            const data = await DatesService.getAllMonths(year);
            res.send(data);
        } catch(e){
            console.error(e);
        }
      });

      expressAppInstance.get(this.makeRouteName('days'), async (req, res) => {
        const { month } = req.query;
        try {
            const data = await DatesService.getAllDays(month);
            res.send(data);
        } catch(e){
            console.error(e);
        }
      });
    }    

}

module.exports = DatesController;