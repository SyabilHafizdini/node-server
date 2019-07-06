class CalculationsService {
  constructor(pool){
    this.pool = pool;
  }

  getAverage(arrayofTempHumid){
    // Return an object: { averageTemp: number, averageHum: number}
    const {
      totalTemp,
      totalHum,
    } = arrayofTempHumid.reduce((acc, currentTempHumid) => {
      return {
        totalTemp: acc.totalTemp + currentTempHumid.temperature,
        totalHum: acc.totalHum + currentTempHumid.humidity
      }
    }, {
      totalTemp: 0,
      totalHum: 0
    });

    return (
      {
        averageTemp: Math.round(totalTemp / arrayofTempHumid.length * 10) / 10,
        averageHum: Math.round(totalHum / arrayofTempHumid.length * 10) / 10
      }
    )
  }

  getHighestTemperature(arrayofTempHumid){
    // Return an object: { averageTemp: number, averageHum: number}
    const {
      highestTemp,
    } = arrayofTempHumid.reduce((acc, currentTempHumid) => {
      return {
        highestTemp: acc.highestTemp > currentTempHumid.temperature ? acc.highestTemp : currentTempHumid.temperature,
      }
    }, {
      highestTemp: Number.MIN_SAFE_INTEGER,
    });

    return (
      {
        highestTemperature: highestTemp,
      }
    )
  }

    getHighestHumidity(arrayofTempHumid){
    // Return an object: { averageTemp: number, averageHum: number}
    const {
      highestHum,
    } = arrayofTempHumid.reduce((acc, currentTempHumid) => {
      return {
        highestHum: acc.highestHum > currentTempHumid.humidity ? acc.highestHum : currentTempHumid.humidity,
      }
    }, {
      highestHum: Number.MIN_SAFE_INTEGER,
    });

    return (
      {
        highestHumidity: highestHum,
      }
    )
  }

  getLowestTemperature(arrayofTempHumid){
    // Return an object: { averageTemp: number, averageHum: number}
    const {
      lowestTemp
    } = arrayofTempHumid.reduce((acc, currentTempHumid) => {
      return {
        lowestTemp: acc.lowestTemp < currentTempHumid.temperature ? acc.lowestTemp : currentTempHumid.temperature,
      }
    }, {
      lowestTemp: Number.MAX_SAFE_INTEGER
    });

    return (
      {
        lowestTemperature: lowestTemp,
      }
    )
  }
  
  getLowestHumidity(arrayofTempHumid){
    // Return an object: { averageTemp: number, averageHum: number}
    const {
      lowestHum
    } = arrayofTempHumid.reduce((acc, currentTempHumid) => {
      return {
        lowestHum: acc.lowestHum < currentTempHumid.humidity ? acc.lowestHum : currentTempHumid.humidity,
      }
    }, {
      lowestHum: Number.MAX_SAFE_INTEGER
    });

    return (
      {
        lowestHumdity: lowestHum,
      }
    )
  }

}

module.exports = CalculationsService;