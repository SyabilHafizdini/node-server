const CalculationsServiceClass = require('../Services/CalculationsService');
const ReadingsServiceClass = require('../Services/ReadingsService');

  class CalculationsController {
    
    makeRouteName(routeNameWithoutSlash){
      const prefix = '/api/calculations';

      return `${prefix}/${routeNameWithoutSlash}`
    }

    async registerRoutes(expressAppInstance, dbConnection){
        const CalculationsService = new CalculationsServiceClass(dbConnection);
        const ReadingsService = new ReadingsServiceClass(dbConnection);

        expressAppInstance.get(this.makeRouteName('average'), async (req, res) => {
            try {
                const { date } = req.query;
                const data = await CalculationsService.getAverage( await ReadingsService.getDataFromSpecificDate(date) );
                res.send(data);
            } catch(e){
                console.error(e);
            }
        });

        expressAppInstance.get(this.makeRouteName('highest'), async (req, res) => {
            try {
                const { date, type } = req.query;
                let data;
                switch (type) {
                    case 'temp':
                        data = await CalculationsService.getHighestTemperature( await ReadingsService.getDataFromSpecificDate(date) );
                        break;
                    case 'hum':
                        data = await CalculationsService.getHighestHumidity( await ReadingsService.getDataFromSpecificDate(date) );
                        break;
                    default:
                        data = "Please choose add '&type=(temp/hum)'";
                }
                res.send(data);
            } catch(e){
                console.error(e);
            }
        });

        expressAppInstance.get(this.makeRouteName('lowest'), async (req, res) => {
            try {
                const { date, type } = req.query;
                let data;
                switch (type) {
                    case 'temp':
                        data = await CalculationsService.getLowestTemperature( await ReadingsService.getDataFromSpecificDate(date) );
                        break;
                    case 'hum':
                        data = await CalculationsService.getLowestHumidity( await ReadingsService.getDataFromSpecificDate(date) );
                        break;
                    default:
                        data = "Please choose add '&type=(temp/hum)'";
                }
                res.send(data);
            } catch(e){
                console.error(e);
            }
        });

    }

}

module.exports = CalculationsController;