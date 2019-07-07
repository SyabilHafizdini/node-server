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

}

module.exports = DatesService;