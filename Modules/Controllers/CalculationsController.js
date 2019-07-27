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
                const { date, hour } = req.query;
                let data;
                if (hour) {
                    data = await CalculationsService.getAverage( await ReadingsService.getReadingsFromSpecificDateAndHour(date, hour) );
                } else {
                    data = await CalculationsService.getAverage( await ReadingsService.getReadingsFromSpecificDate(date) );                    
                }
                res.send(data);
            } catch(e){
                console.error(e);
            }
        });

        expressAppInstance.get(this.makeRouteName('highest'), async (req, res) => {
            try {
                const { date, type } = req.query;
                let data, payload;
                switch (type) {
                    case 'temp':
                        payload = await CalculationsService.getHighestTemperature(await ReadingsService.getReadingsFromSpecificDate(date));
                        data = await ReadingsService.getReadingsFromSpecificDateAndValue(payload.date, payload.type, payload.value);
                        break;
                    case 'hum':
                        payload = await CalculationsService.getHighestHumidity(await ReadingsService.getReadingsFromSpecificDate(date));
                        data = await ReadingsService.getReadingsFromSpecificDateAndValue(payload.date, payload.type, payload.value);
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
                let data, payload;
                switch (type) {
                    case 'temp':
                        payload = await CalculationsService.getLowestTemperature(await ReadingsService.getReadingsFromSpecificDate(date));
                        data = await ReadingsService.getReadingsFromSpecificDateAndValue(payload.date, payload.type, payload.value);
                        break;
                    case 'hum':
                        payload = await CalculationsService.getLowestHumidity(await ReadingsService.getReadingsFromSpecificDate(date));
                        data = await ReadingsService.getReadingsFromSpecificDateAndValue(payload.date, payload.type, payload.value);
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