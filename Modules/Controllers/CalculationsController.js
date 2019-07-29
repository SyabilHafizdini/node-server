const CalculationsServiceClass = require('../Services/CalculationsService');
const ReadingsServiceClass = require('../Services/ReadingsService');
const DatesServiceClass = require('../Services/DatesService');

  class CalculationsController {
    makeRouteName(routeNameWithoutSlash){
      const prefix = '/api/calculations';

      return `${prefix}/${routeNameWithoutSlash}`
    }

    async registerRoutes(expressAppInstance, dbConnection){
        const CalculationsService = new CalculationsServiceClass(dbConnection);
        const ReadingsService = new ReadingsServiceClass(dbConnection);
        const DatesService = new DatesServiceClass(dbConnection);

        expressAppInstance.get(this.makeRouteName('length'), async (req, res) => {
            try {
                const { month } = req.query;
                let data;
                data = await CalculationsService.calculateSLA(await ReadingsService.getReadingsFromMonth(month), month);
                res.send(data);
            } catch(e){
                console.error(e);
            }
        });

        expressAppInstance.get(this.makeRouteName('average'), async (req, res) => {
            var averageArray = [];
            let data, payload, datesArray;
            try {
                const { date, hour } = req.query;
                if (hour) {
                    data = await CalculationsService.getAverage( await ReadingsService.getReadingsFromSpecificDateAndHour(date, hour) );
                } else if (date){
                    data = await CalculationsService.getAverage( await ReadingsService.getReadingsFromSpecificDate(date) );                    
                } else {
                    datesArray =  await DatesService.getAllDates();
                    for (var i = 0; i < datesArray.length; i++) {
                        payload = await CalculationsService.getAverage(await ReadingsService.getReadingsFromSpecificDate(datesArray[i].date));
                        let obj = {
                            date: payload.date,
                            averageTemp: payload.averageTemp,
                            averageHum: payload.averageHum
                        };
                        averageArray.push(obj);
                    }
                    data = averageArray;                 
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

        expressAppInstance.get(this.makeRouteName('average/all'), async (req, res) => {
            try {
                const { date, type } = req.query;
                var averageArray = [];
                let data, payload, datesArray;

                datesArray =  DatesService.getAllDates();
                datesArray.forEach(function(item) {
                    payload = CalculationsService.getAverage(item.date);
                    averageArray.push({
                        date: payload.date,
                        averageTemp: payload.averageTemp,
                        averageHum: payload.averageHum
                    })
                })
                res.send(averageArray);
            } catch(e){
                console.error(e);
            }
        });        

    }

}

module.exports = CalculationsController;