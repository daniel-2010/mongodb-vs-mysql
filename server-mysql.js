const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
var PromiseAll = require('promises-all');

const mongoose = require('mongoose');
var mysql = require('mysql');

const app = express();
const port = process.env.PORT ||  5000;


mongoose.connect('mongodb://localhost:27017/mongodb-vs-mysql',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false
}, function(err){
    if(err){
        console.log(err)
    }else{
        //console.log('Banco de Dados MongoDB CONECTADO com sucesso!')
    }
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:'mongodb-vs-mysql'
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


app.use(cors());
app.use(cookieParser());
app.use(express.json());



console.log('-------- Iniciando Script ------------');

async  function mysql_consult(){
      // await con.query("SELECT * FROM clientes", function (err, result, fields) {if (err) throw err;});
      await con.query("SELECT * FROM clientes INNER JOIN empresas e ON empresas_cod_empresa = e._id", function (err, result, fields) {if (err) throw err;});
    // console.log(data)
}

var tempoInicio = Date.now();

PromiseAll.all([mysql_consult()]).then(function (){
    var tempoFim = Date.now();
    console.log(((tempoFim-tempoInicio)/1000)+' segundos ');
    console.log('-------- Script Finalizado -----------');
})


app.listen(port,function (){
    //console.log(`Server running on port ${port}`);
})

