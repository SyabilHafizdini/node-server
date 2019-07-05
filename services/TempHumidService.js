class TempHumidService {
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

  getHighest(arrayofTempHumid){
    // Return an object: { averageTemp: number, averageHum: number}
    const {
      highestDateTime,
      highestTemp,
      highestHum
    } = arrayofTempHumid.reduce((acc, currentTempHumid) => {
      return {
        highestTemp: acc.highestTemp > currentTempHumid.temperature ? acc.highestTemp : currentTempHumid.temperature,
        highestHum: acc.highestHum > currentTempHumid.humidity ? acc.highestHum : currentTempHumid.humidity,
      }
    }, {
      highestDateTime: "",
      highestTemp: Number.MIN_SAFE_INTEGER,
      highestHum: Number.MIN_SAFE_INTEGER
    });

    return (
      {
        highestTemp: highestTemp,
        highestHum: highestHum,
        highestDateTime: highestDateTime
      }
    )
  }

  getLowest(arrayofTempHumid){
    // Return an object: { averageTemp: number, averageHum: number}
    const {
      lowestDateTime,
      lowestTemp,
      lowestHum
    } = arrayofTempHumid.reduce((acc, currentTempHumid) => {
      return {
        lowestTemp: acc.lowestTemp < currentTempHumid.temperature ? acc.lowestTemp : currentTempHumid.temperature,
        lowestHum: acc.lowestHum < currentTempHumid.humidity ? acc.lowestHum : currentTempHumid.humidity,
      }
    }, {
      lowestDateTime: null,
      lowestTemp: Number.MAX_SAFE_INTEGER,
      lowestHum: Number.MAX_SAFE_INTEGER
    });

    return (
      {
        lowestTemp: lowestTemp,
        lowestHum: lowestHum,
        lowestDateTime: lowestDateTime
      }
    )
  }

  getAll(){
    return new Promise((resolve, reject) => {
      this.pool.query('SELECT * FROM `temphumid` ORDER BY `datetime` DESC LIMIT 1000', function(err, results, rows) {
        if(err) {
          reject(err);
        }

        resolve(results);
      });
    })
  }

  getAllDates(){
    return new Promise((resolve, reject) => {
      this.pool.query('SELECT DISTINCT SUBSTR(`datetime`,1,8) as date FROM `temphumid`', function(err, results, rows) {
        if(err) {
          reject(err);
        }

        resolve(results);
      });
    })
  }

  getDataFromSpecificDate(date){
    return new Promise((resolve, reject) => {
      this.pool.query(`SELECT * FROM temphumid WHERE SUBSTR(datetime,1,8) = "${date}"`, function(err, results, rows) {
        if(err) {
          reject(err);
        }

        resolve(results);
      });
    })
  }

  checkUserCredentials(username, password){
    return new Promise((resolve, reject) => {
      this.pool.query(`SELECT * FROM users WHERE username = "${username}" and password = "${password}"`, function(err, results, rows) {
        if(err) {
          reject(err);
        }

        resolve(results);
      });
    })
  }

  postTempHumidData(mysql, data){
    let insertQuery = 'INSERT INTO ?? (??,??,??) VALUES (?,?,?)';
    let query = mysql.format(insertQuery,
        ["temphumid", "datetime", "temperature", "humidity",
        data.datetime, data.temperature, data.humidity]);
    return new Promise((resolve, reject) => {
      this.pool.query(query, function(err, response) {
        if(err) {
          reject(err);
        }
        console.log("Saved: " + response.insertId);
        resolve(response);
      });
    })
  }

}

module.exports = TempHumidService;