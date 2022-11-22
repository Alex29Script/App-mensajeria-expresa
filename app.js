"use strict";
const express=require("express");
const bodyParser=require("body-parser");
const conn=require("./dbConnection/conection")
const UserModel= require("./models/user.model")
const otromodel= require("./models/otro.model")
//funciones
const resgistrar=require("./module/registrar")

// creando app express
const app=express();
app.use(bodyParser.json());

//craedo la primera tuta express



app.get("/", async (req,res)=>{
    try{
        
        await conn();
        console.log("Conexion ok");
        const all_user= await UserModel.find();
        console.log (all_user);
        //res.send(all_user);
        console.log(typeof(all_user))
        
        res.contentType("application/json");
        const all_userJson=JSON.stringify(all_user);
        res.send(all_userJson)
    }
    catch(err){
        console.error(err);
    };

   /*  try{
        
        await conn();
        console.log("Conexion ok");
        const all_user= await UserModel.find({username:"alex32api"});
        console.log (all_user);
        //res.send(all_user);
        console.log(typeof(all_user))
        
    }
    catch(err){
        console.error(err);
    } */
  
});

app.post("/registrar", async (req, res)=>{

    const cabezera= req.headers;
    const respuesta = req.body;
    console.log( respuesta, respuesta["username"]);
    const respuestaP={
        mensaje:await resgistrar.registrar(respuesta),
    };
    const respuestaJSON=JSON.stringify(respuestaP);
    res.contentType("application/json");
    res.send(respuestaJSON);


});

app.post("/login", async (req,res)=>{

    const respuesta = req.body;
    const estado_loguin= await resgistrar.login(respuesta);
    console.log(estado_loguin);
    res.contentType("application/json");
    if(estado_loguin==true){
        const respuestaJson={
            mensaje:"autenticado",
            auth:true
        }
        res.send(respuestaJson);
    }else{
        const respuestaJson={
            mensaje:"no autenticado",
            auth:false
        }
        res.send(respuestaJson);
    };
});

app.get("/guias", async (req,res)=>{

    const usuer_body=req.body;
    const user_body=usuer_body["username"];
    console.log(usuer_body,user_body)



})


app.listen(8080, () => {
    console.log(`Server is running on port 8080.`);
});