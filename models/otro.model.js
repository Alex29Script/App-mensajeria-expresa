const mongoose = require("mongoose");
const {Schema}= mongoose;

const otroSchema=new Schema({
        name: String

    });

const otroModel = mongoose.model("otro",otroSchema);
module.exports=otroModel;