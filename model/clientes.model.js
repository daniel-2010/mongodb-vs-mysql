const mongoose = require('mongoose');
const DataSchema = new mongoose.Schema({
    nome_cliente:String,
    email_cliente:String,
    endereco_cliente:String,
    cep_cliente:String,
    fone_cliente:String,
    status_cliente:{type: Number, default: 1},
    empresas_cod_empresa: mongoose.Schema.Types.ObjectId
},{
    timestamps:true,
    toJSON:{
        virtuals:true,
    }
});

const clientes = mongoose.model('Clientes',DataSchema);
module.exports = clientes;
  