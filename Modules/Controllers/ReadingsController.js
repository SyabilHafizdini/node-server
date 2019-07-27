const ReadingsServiceClass = require('../Services/ReadingsService');

  class ReadingsController {
    makeRouteName(routeNameWithoutSlash){
      const prefix = '/api/readings';

      return `${prefix}/${routeNameWithoutSlash}`
    }

    async registerRoutes(expressAppInstance, dbConnection, mysql){
      const ReadingsService = new ReadingsServiceClass(dbConnection);

      expressAppInstance.get(this.makeRouteName(''), async (req, res) => {
        const { date } = req.query;
        if (date){
          res.send(await ReadingsService.getReadingsFromSpecificDate(date))
        } else {
          res.send(await ReadingsService.getAll());
        }
      });

      expressAppInstance.post(this.makeRouteName(''), async (req, res) => {
        try {
            const post_result = await ReadingsService.postTempHumidData(mysql, req.body); 	
            console.log("Saved: " + post_result.insertId);
            res.sendStatus(201);
        } catch(e){
            console.error(e);
        }
      });

    }

}

module.exports = ReadingsController;