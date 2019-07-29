class DatesService {
  constructor(pool){
    this.pool = pool;
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
  
   getAllMonths(year){
    return new Promise((resolve, reject) => {
      this.pool.query(`SELECT DISTINCT SUBSTR(datetime,4,2) AS months FROM temphumid WHERE SUBSTR(datetime,7,2) = "${year}" ORDER BY months`, function(err, results, rows) {
        if(err) {
          reject(err);
        }

        resolve(results);
      });
    })
  }

   getAllDays(month){
    return new Promise((resolve, reject) => {
      this.pool.query(`SELECT DISTINCT SUBSTR(datetime,1,2) as days FROM temphumid WHERE SUBSTR(datetime,4,2) = "${month}" ORDER BY days`, function(err, results, rows) {
        if(err) {
          reject(err);
        }

        resolve(results);
      });
    })
  }

   getAllHours(){
    return new Promise((resolve, reject) => {
      this.pool.query('SELECT DISTINCT SUBSTR(`datetime`,1,8) as date FROM `temphumid`', function(err, results, rows) {
        if(err) {
          reject(err);
        }

        resolve(results);
      });
    })
  }

}

module.exports = DatesService;