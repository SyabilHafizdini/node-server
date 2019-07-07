class CalculationsService {
  constructor(pool){
    this.pool = pool;
  }

  getAverage(arrayofTempHumid){
    // Return an object: { averageTemp: number, averageHum: number}
    const {
      totalTemp,
      totalHum,
      date,
    } = arrayofTempHumid.reduce((acc, currentTempHumid) => {
      return {
        date: currentTempHumid.datetime,
        totalTemp: acc.totalTemp + currentTempHumid.temperature,
        totalHum: acc.totalHum + currentTempHumid.humidity
      }
    }, {
      totalTemp: 0,
      totalHum: 0
    });

    return (
      {
        date: date.substring(0, 8),        
        averageTemp: Math.round(totalTemp / arrayofTempHumid.length * 10) / 10,
        averageHum: Math.round(totalHum / arrayofTempHumid.length * 10) / 10
      }
    )
  }

  getHighestTemperature(arrayofTempHumid){
    // Return an object: { averageTemp: number, averageHum: number}
    const {
      highestTemp,
      date
    } = arrayofTempHumid.reduce((acc, currentTempHumid) => {
      return {
        highestTemp: acc.highestTemp > currentTempHumid.temperature ? acc.highestTemp : currentTempHumid.temperature,
        date: currentTempHumid.datetime
      }
    }, {
      highestTemp: Number.MIN_SAFE_INTEGER,
    });

    return (
      {
        date: date.substring(0, 8),        
        highestTemperature: highestTemp,
      }
    )
  }

    getHighestHumidity(arrayofTempHumid){
    // Return an object: { averageTemp: number, averageHum: number}
    const {
      highestHum,
      date
    } = arrayofTempHumid.reduce((acc, currentTempHumid) => {
      return {
        highestHum: acc.highestHum > currentTempHumid.humidity ? acc.highestHum : currentTempHumid.humidity,
        date: currentTempHumid.datetime
      }
    }, {
      highestHum: Number.MIN_SAFE_INTEGER,
    });

    return (
      {
        date: date.substring(0, 8),        
        highestHumidity: highestHum,
      }
    )
  }

  getLowestTemperature(arrayofTempHumid){
    // Return an object: { averageTemp: number, averageHum: number}
    const {
      lowestTemp,
      date
    } = arrayofTempHumid.reduce((acc, currentTempHumid) => {
      return {
        lowestTemp: acc.lowestTemp < currentTempHumid.temperature ? acc.lowestTemp : currentTempHumid.temperature,
        date: currentTempHumid.datetime
      }
    }, {
      lowestTemp: Number.MAX_SAFE_INTEGER
    });

    return (
      {
        date: date.substring(0, 8),        
        lowestTemperature: lowestTemp,
      }
    )
  }
  
  getLowestHumidity(arrayofTempHumid){
    // Return an object: { averageTemp: number, averageHum: number}
    const {
      lowestHum,
      date
    } = arrayofTempHumid.reduce((acc, currentTempHumid) => {
      return {
        lowestHum: acc.lowestHum < currentTempHumid.humidity ? acc.lowestHum : currentTempHumid.humidity,
        date: currentTempHumid.datetime
      }
    }, {
      lowestHum: Number.MAX_SAFE_INTEGER
    });

    return (
      {
        date: date.substring(0, 8),        
        lowestHumdity: lowestHum,
      }
    )
  }

}

module.exports = CalculationsService;