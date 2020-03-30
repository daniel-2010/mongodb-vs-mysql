const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome_empresa:String,
    descricao_empresa:String,
    endereco_empresa:String,
    fone_empresa:String,
    cep_empresa:String,
    status_empresa: {type: Number, default: 1},
    cidades_cod_cidade: mongoose.Schema.Types.ObjectId,
},{
    timestamps:true,
});

  
module.exports = mongoose.model('Empresa',DataSchema);