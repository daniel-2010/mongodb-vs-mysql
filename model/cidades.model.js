const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome_cidade:String,
    estados_cod_estado: mongoose.Schema.Types.ObjectId,
},{
    timestamps:true,
});

  
module.exports = mongoose.model('Cidade',DataSchema);