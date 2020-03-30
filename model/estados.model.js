const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome_estado:String,
    uf_estado:String,
},{
    timestamps:true,
});

  
module.exports = mongoose.model('Estado',DataSchema);