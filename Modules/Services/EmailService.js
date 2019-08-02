class CalculationsService {
    constructor(pool){
      this.pool = pool;
    }
  
    sendSLA(numOfInserts, month){
      // Return an object: { averageTemp: number, averageHum: number}
      const secondsIn30Days = 740571;
      var uptimePercentage =  numOfInserts[0].month / secondsIn30Days * 100;
      return (
        {
          month: month, 
          uptimePercentage: uptimePercentage,
        }
      );
    }
  
  }
  
  module.exports = CalculationsService;