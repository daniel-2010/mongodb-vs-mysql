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

console.log('-------- Iniciando Script ------------');

async  function mongodb_consult(){
    cliente_model.find().populate();
}

var tempoInicio = Date.now();

PromiseAll.all([mongodb_consult()]).then(function (){
    var tempoFim = Date.now();
    console.log(((tempoFim-tempoInicio)/1000)+' segundos ');
    console.log('-------- Script Finalizado -----------');
})
