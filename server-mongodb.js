const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const cliente_model = require("./model/clientes.model");
var PromiseAll = require('promises-all');


const app = express();
const port = process.env.PORT ||  4000;

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


app.use(cors());
app.use(cookieParser());
app.use(express.json());

async function mongodb_insert_client(){
    var array = [];
    for(i=100000;i<200000;i++){
        array.push({
            nome_cliente:'Cliente '+i,
            email_cliente:"cliente"+i+"@example.com.br",
            endereco_cliente:'Av. Santos Cruz - '+i,
            cep_cliente: '37.000-000',
            fone_cliente:'35 0000-0000',
            empresas_cod_empresa: '5e809b4a97c9dd2960486527',
        })
    }
    await cliente_model.insertMany(array);
}

//mongodb_insert_client()


console.log('-------- Iniciando Script ------------');

async  function mongodb_consult(){
    // await cliente_model.aggregate([
    //     {
    //         $lookup:{
    //             from: 'empresas',
    //             localField:'empresas_cod_empresa',
    //             foreignField:'_id',
    //             as: 'empresa'
    //         }
    //     },{
    //         $lookup:{
    //             from: 'cidades',
    //             localField:'empresa.cidades_cod_cidade',
    //             foreignField:'_id',
    //             as: 'cidade'
    //         }
    //     },{
    //         $lookup:{
    //             from: 'estados',
    //             localField:'cidade.estados_cod_estado',
    //             foreignField:'_id',
    //             as: 'estado'
    //         }
    //     },{
    //         $group:{
    //             _id:"$_id",
    //             nome_cliente: { $first: "$nome_cliente" },
    //             empresa: {$first: '$empresa.nome_empresa'},
    //             cidade: {$first: '$cidade.nome_cidade'},
    //             estado:{$first:'$estado.uf_estado'}
    //         }
    //     }
    // ]);
    cliente_model.find();
    // return data;
}

var tempoInicio = Date.now();

PromiseAll.all([mongodb_consult()]).then(function (){
    var tempoFim = Date.now();
    console.log(((tempoFim-tempoInicio)/1000)+' segundos ');
    console.log('-------- Script Finalizado -----------');
})


app.listen(port,function (){
    //console.log(`Server running on port ${port}`);
})