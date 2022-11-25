const conn=require("../dbConnection/conection");
const UserModel=require("../models/user.model");
const registrar=require("./registrar");
const GuiaModel=require("../models/guia.model");

const user={
    username:"Liam",
    pass:"12345"
}

const guia={
    _id:"637c182a574384689ace765c",
}



async function actualizar_pass(user={}){
    try{
        await conn();
        await UserModel.updateOne({username:user["username"]},{pass:await registrar.encriptar(user["pass"])});
        console.log("contrasena encriptada correctamente")
    }catch{
        console.log("error al actualizar")
    }

};

async function actualizar_estado_guias(){
    try{
        await conn();
        const guias=await GuiaModel.find();
        //console.log(guias, guias[0]["fecha"],typeof(guias));
        for (let i=0; i<guias.length; i++){
            //console.log(i,guias[i]);
            const date_guia= new Date(guias[i]["fecha"]);
            if((Date.now()-date_guia)>=1){
                await GuiaModel.updateOne({_id:guias[i]["_id"]},{estado:"Cumplido"});
            }
        }
        console.log("altualizador de guia terminado")

    }catch(err){
        console.error(err)
    }
}

async function actualizar_estado_guia(guia={}){
    try{
        await conn();
        const guias=await GuiaModel.findOne({_id:guia[0]["_id"]});
        const date_guia= new Date(guias["fecha"]);
        if((Date.now()-date_guia)>=1){
            await GuiaModel.updateOne({_id:guias["_id"]},{estado:"Cumplido"});
        }
        console.log("guia actualizada");
    }catch(err){
        console.error(err);
    }
}

//actualizar_estado_guia(guia)
//actualizar_pass(user);
//actualizar_estado_guias();


exports.actualizar_estado_guia=actualizar_estado_guia;
exports.actualizar_estado_guias=actualizar_estado_guias;





