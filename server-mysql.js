var PromiseAll = require('promises-all');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:'mongodb-vs-mysql'
  });
  
  con.connect(function(err) {if (err) throw err;});
// console.log('-------- Iniciando Script ------------');

async  function mysql_consult(){
        await con.query("SELECT * FROM clientes", function (err, result, fields) {if (err) throw err;});

      //await con.query("SELECT * FROM clientes INNER JOIN empresas e ON empresas_cod_empresa = e._id", function (err, result, fields) {if (err) throw err;});
}

var tempoInicio = Date.now();

PromiseAll.all([mysql_consult()]).then(function (){
    var tempoFim = Date.now();
    var result = {
        Comando:'SELECT',
        Banco:'MySQL',
        Resultado: ((tempoFim-tempoInicio)/1000)+' s',
    }
    console.table(result);

    // console.log('-------- Script Finalizado -----------');
})
