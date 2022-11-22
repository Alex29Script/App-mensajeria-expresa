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

async function buscar_guia(id_guia=String, user=String){
        try{
            await conn();
            
            const guiaP=await guia.find({username:user,_id:id_guia})
            console.log(guiaP)
            if(guiaP.length>0){
                respuesta={
                    mensaje:"guía encontrada",
                    valor:true,
                    guias:{
                        user_guias: guiaP
                    }
                };
                return respuesta;
            }else{
                respuesta={
                    mensaje:"guía no encontrada",
                    valor:false,
                    guias:{
                        user_guias: null
                    }
                };
                return respuesta;
            };


        }catch(err){
            respuesta={
                mensaje:"error al encontrar una guía ",
                valor:false,
                guias:{
                    user_guias: null
                }
            
            };
            return respuesta;
        };
};

exports.guias_user=guias_user;
exports.buscar_guia=buscar_guia;