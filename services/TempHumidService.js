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
        averageTemp: totalTemp / arrayofTempHumid.length,
        averageHum: totalHum / arrayofTempHumid.length
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