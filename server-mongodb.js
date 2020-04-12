const mongoose = require('mongoose');
const cliente_model = require("./model/clientes.model");
var PromiseAll = require('promises-all');

mongoose.connect('mongodb://localhost:27017/mongodb-vs-mysql',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false
}, function(err){
    if(err){ console.log(err) }
});

// console.log('-------- Iniciando Script ------------');

async  function mongodb_consult(){
    cliente_model.find({});
}

var tempoInicio = Date.now();

PromiseAll.all([mongodb_consult()]).then(function (){
    var tempoFim = Date.now();
    var result = {
        Comando:'FIND',
        Banco:'MongoDB',
        Resultado: ((tempoFim-tempoInicio)/1000)+' s',
    }
    console.table(result);
    // console.log('-------- Script Finalizado -----------');
})
