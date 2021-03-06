class ReadingsService {
  constructor(pool){
    this.pool = pool;
  }

  getAll(){
    return new Promise((resolve, reject) => {
      this.pool.query('SELECT * FROM `temphumid` ORDER BY `datetime` DESC', function(err, results, rows) {
        if(err) {
          reject(err);
        }

        resolve(results);
      });
    })
  }

  getReadingsFromMonth(month){
    return new Promise((resolve, reject) => {
      this.pool.query(`SELECT COUNT(SUBSTR(datetime,4,2)) as month FROM temphumid WHERE SUBSTR(datetime,4,2) = ${month} `, function(err, results, rows) {
        if(err) {
          reject(err);
        }
        resolve(results);
      });
    })
  }

  getReadingsFromSpecificDate(date){
    return new Promise((resolve, reject) => {
      this.pool.query(`SELECT * FROM temphumid WHERE SUBSTR(datetime,1,8) = "${date}" LIMIT 1000`, function(err, results, rows) {
        if(err) {
          reject(err);
        }

        resolve(results);
      });
    })
  }

  getReadingsFromSpecificDateAndValue(date, type, value){
    return new Promise((resolve, reject) => {
      this.pool.query(`SELECT * FROM temphumid WHERE SUBSTR(datetime,1,8) = "${date}" AND ${type} = ${value}`, function(err, results, rows) {
        if(err) {
          reject(err);
        }
        resolve(results);
      });
    })
  }

  getReadingsFromSpecificDateAndHour(date, hour){
    return new Promise((resolve, reject) => {
      this.pool.query(`SELECT * FROM temphumid WHERE SUBSTR(datetime,1,8) = "${date}" AND SUBSTR(datetime,10,2) = ${hour}`, function(err, results, rows) {
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

module.exports = ReadingsService;