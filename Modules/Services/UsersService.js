class UsersService {
  constructor(pool){
    this.pool = pool;
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

}

module.exports = UsersService;