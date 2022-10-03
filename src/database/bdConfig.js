const SERVIDOR = process.env['NODE_MYSQL_SERVIDOR']
const USUARIO = process.env['NODE_MYSQL_USUARIO']
const SENHA = process.env['NODE_MYSQL_SENHA']
const BD = process.env['NODE_MYSQL_BD']

module.exports = {
    host: SERVIDOR,
    user: USUARIO,
    password: SENHA,
    database: BD
};
