const conn=require("../dbConnection/conection");
const UserModel=require("../models/user.model");
const registrar=require("./registrar")

user={
    username:"Liam",
    pass:"12345"
}

async function actualizar_pass(user={}){
    try{
        await conn();
        await UserModel.updateOne({username:user["username"]},{pass:await registrar.encriptar(user["pass"])});
        console.log("contrasena encriptada correctamente")
    }catch{
        console.log("error al actualizar")
    }

}


actualizar_pass(user);





