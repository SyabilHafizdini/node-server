class ReadingsService {
  constructor(pool){
    this.pool = pool;
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