import express from 'express';
import dotenv from 'dotenv';
import paciente from '../resources/routes/paciente.js';
import cita from '../resources/routes/citas.js';
import medico from '../resources/routes/medico.js';
import {JWT, JWTVerify, limitAPi } from "./controller/jwt.js";

dotenv.config();
let appExpress = express();

appExpress.use(express.json());

appExpress.use("/token", JWT);
appExpress.use("/paciente", JWTVerify, limitAPi(), paciente);
appExpress.use("/cita", JWTVerify, limitAPi(), cita);
appExpress.use("/medico", JWTVerify, limitAPi(), medico);

appExpress.use("/",(req,res)=>{
    res.json({status:"404",message:"Hola Crack, te cuento que no haz establecido una ruta valida."})
})

let config = JSON.parse(process.env.MY_SERVER)
appExpress.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`)
})