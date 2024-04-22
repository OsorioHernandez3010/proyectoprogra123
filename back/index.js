const express=require('express');
const mysql=require('mysql');
const bodyParser=require('body-parser');
const cors=require('cors');

const server=express();

server.use(express.json());

server.use(cors({
    origin:'*',
    methods:'HEAD,GET,PUT,DELETE,POST,PATHC',
}));


//configuracion base de datos 
const configdb={
    host:'localhost',
    user:'root',
    passoword:'',
    database:'consultas'
};

const poolmysql=mysql.createPool(configdb);



server.post("/usuarios",(req,rep)=>{
    console.log(req);
    let nombre=req.body.nombre;
    let edad=req.body.edad;
    let fecha=req.body.fecha;
    const slq=`INSERT INTO datos (nombre, edad, fecha) VALUES ('${nombre}', '${edad}', '${fecha}')`;
    console.log(slq);
    poolmysql.query(slq,function(err,result){
    if(err) throw  rep.status(401).send(201);
    });
    rep.status(201).send(201);
    });
    


server.get("/produto",(req,resp)=>{
    const slq="select * from datos";
    poolmysql.query(slq,function(err,result){
        if(err) throw resp.end("error en base de datos");
        resp.json(result);
    });
});




server.get("/datos",(req,resp)=>{
    const slq="select * from datos";
    poolmysql.query(slq,function(err,result){
        if(err) throw resp.end("error en base de datos");
        resp.json(result);
    });
});

server.post("/datos",(req,rep)=>{
console.log(req);
let nombre=req.body.nombre;
let edad=req.body.edad;
let fecha=req.body.fecha;
const slq=`INSERT INTO datos (nombre, edad, fecha) VALUES ('${nombre}', '${edad}', '${fecha}')`;
poolmysql.query(slq,function(err,result){
if(err) throw  rep.status(201).send(201);
});
rep.status(201).send(201);
});




server.get("/datos/:id",(req,rep)=>{
let idc=req.params.id;
const slq="select * from datos where id=" + idc;
poolmysql.query(slq,function(err,result){
    if(err) throw rep.end("error en base de datos");
    rep.json(result);
});




});




server.delete("/datos",(req,rep)=>{
    let id=req.body.id;
    const slq=`delete from datos where id='${id}'`;
    poolmysql.query(slq,function(err,result){
    if(err) throw  rep.status(201).send(201);
    });
    rep.status(201).send(201);
    });
    

    server.put("/datos",(req,rep)=>{
        let nombre=req.body.nombre;
        let edad=req.body.edad;
        let fecha=req.body.fecha;
        let id=req.body.id;
        const slq=`update datos set nombre='${nombre}', edad='${edad}', fecha='${fecha}' where id=${id}`;
        poolmysql.query(slq,function(err,result){
        if(err) throw  rep.status(201).send(201);
        });
        rep.status(201).send(201);
        });



server.get("/",(req,res)=>{
    res.send("hola");
});

server.listen(5555,()=>{
    console.log('servidor en linea en el puerto 5555');
});
