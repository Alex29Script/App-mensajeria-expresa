const conn=require("../dbConnection/conection");
const guia=require("../models/guia.model")

async function guias_user(user=String){
    try{
        await conn();
        const user_guias=await guia.find({username:user});
        console.log(user_guias)
        if (user_guias.length>0){
            respuesta={
                mensaje:"guías encontradas",
                valor:true,
                guias:{
                    user_guias: user_guias
                }
            };
            return respuesta;
        }else{
            respuesta={
                mensaje:"el usuario no posee guías",
                valor:false,
                guias:{
                    user_guias: null
                }
            };
            return respuesta;
        }


    }catch(err){
        respuesta={
            mensaje:"error al buscar las guías",
            valor:false,
            guias:{
                user_guias: null
            }
        };
        return respuesta;
    }


};

exports.guias_user=guias_user