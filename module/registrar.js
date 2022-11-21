const conn=require("../dbConnection/conection");
const UserModel= require("../models/user.model");



async function buscar (text) {
    try{
        await conn();
        const usuario= await UserModel.find({username:text});
        console.log(usuario.length)
        if (usuario.length>0){
            console.log("ya existe usuario")
            return true;
        }else{
            console.log("no existe usuario")
            return false;
        }

    }catch(err){
        console.log(err);
    }};

async function registrar(res={}){

    try{
    const user_buscado=  await buscar(res["username"]);
    if (user_buscado==true){
        console.log("usuario ya esta registrado")
        return "false";


    }else{
        await conn();
        await UserModel.collection.insertOne(res);
        console.log("registrado en funcion")
        return("true");

    };
    }catch(err){
        console.log(err);
    };

};

async function login(res={}){

    try{
        const user_buscado=  await buscar(res["username"]);
        console.log(typeof(user_buscado));
        if (user_buscado==true){
            console.log("usuario encontrado")
            await conn();
            let usuario= await UserModel.find({username:res["username"]});
            console.log(typeof(usuario), usuario[0]["pass"]);
            if (usuario[0]["pass"]==res["pass"]){
                console.log("coinciden")
                return true
            }else{
                console.log("no coinciden")
                return false
                
            }
    
        }else{
            console.log("no registrado")
            return false

            
    
        };
        }catch(err){
            console.log(err);
        };

};


//buscar("alex32api");

exports.registrar=registrar;
exports.login=login;


