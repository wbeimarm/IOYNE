const sql = require("mssql");
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')
const moment = require('moment')

const dbConfig = {
  user: process.env.user,
  password: process.env.password,
  server: process.env.server,
  database: process.env.database,
};

const Query = async (name, newConfig) => {
  return new Promise( (resolve, reject) => {
        let configConection = newConfig || dbConfig;
        const pool1 = new sql.ConnectionPool(configConection, err => {
          
          if(err){
            console.log('===================ERROR-CON=================');
            return reject([]);
          }
      
          var request = new sql.Request(pool1);
          request.query(`SELECT * FROM ${name}`, (errors, result) => {
    
            if(errors){
              console.log('================ERROR-QUERY====================');
              return reject([]);
            }
    
            if(result){
              return resolve(result['recordsets']);
            }else {
              return resolve([]);
            }
    
          });
      
        });
      
      });
}

  const Procedure = async (name, params, newConfig) => {
    let configConection = newConfig || dbConfig;

    return new Promise( (resolve, reject)  => {
      const pool2 = new sql.ConnectionPool(configConection, err => {
        if(err){
          console.log('===================ERROR-CON=================');
          reject([]);
        }

        var request = new sql.Request(pool2);

        for (var i in params) {
          if(typeof params[i] ==  'object'){
            request.input(i, params[i][0]);
          }else{
            request.input(i, params[i]);
          }
        }

        request.execute(name, (errors, result)=> {
          if(errors){
            console.log('================ERROR-PROCEDURE====================');
            console.log(name,errors);
            reject([]);
          }

          if(result){
            console.log("recordsets",result['recordsets']);
            resolve(result['recordsets']);
          }else {
            resolve([]);
          }
        });

      });
    });
  }

const singIn = async (req, res) => {
    return Procedure('loginUsuarios', { CodigoUsuario: req.body['usuario'] } )
    .then( response => {
        let responseData = []
        if( response[0][0] !== undefined ) {
            responseData = response[1]
            response = response[0]
        }
        if( response.length > 0 && response[0]['clave'] ) {

            let hash = response[0]['clave']
            let validPass = bcrypt.compareSync(req.body['clave'], hash)
            if (!validPass) {
                return {status: 401, message:'usuario o clave no valido'}
            }

            let token = encode(response[0])
            for (let i = 0; i < response.length; i++) {
                delete response[i]['clave']
                response[i]['token'] = token
            }

            response.push(responseData)
            return {response}

        } else {
            return {status: 401, message:'usuario o clave no valido'}
        }
    })
    .catch( error => {
        return {error: 500, mensaje:'Error autenticacion'}
    })
}

const encode = async (user) => {
    const payload = {
        sub: user.usuariosId,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
    }
    return jwt.encode(payload, process.env.pass);
}

module.exports = {
    Query,
    Procedure,
    singIn,
}
