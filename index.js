
//importar express
const express = require('express');
//instanciar express en el objeto app
const app = express();
var personas = [];

app.get('/', (req, res) =>{
    res.status(200).send(`Hola mundo`);
});
app.post('/users', (req, res)=>{    
    const id = req.query.id;
    const nombre = req.query.nombre;
    const apellido = req.query.apellido;
    const edad = req.query.edad;
    const genero = req.query.genero;
    const altura = req.query.altura;
    const peso = req.query.peso; 
    const tel = req.query.tel;

    personas.push({identification:id,name:nombre,lastname:apellido,age:edad,gender:genero,height:altura,weight:peso,telephones:tel});
    const n=personas.length;
    //res.status(200).send(`Página de usuarios ${n}`);
    res.status(200).send({identification:id,name:nombre,lastname:apellido,age:edad,gender:genero,height:altura,weight:peso,telephones:tel});
});
app.get('/users', (req, res)=>{
    console.log("***********LISTA DE PERSONAS***********");
    personas.forEach(persona => console.log(persona));
    console.log("***********FIN LISTA DE PERSONAS***********");
    const n=personas.length;
        
    //res.status(200).send(`Total usuarios: ${n}`);
    res.status(200).send(personas);
});
app.get('/users/:id', (req, res)=>{
    const id = req.params.id;
    if(id!=null){
        res.status(200).send(personas[id]);
    }else{
        res.sendStatus(400);
    }
});
app.get('/users/lastname/:lastname', (req, res)=>{
    const ln = req.params.lastname;
    console.log(`***********LISTA DE APELLIDOS: ${ln}***********`);
    const personas_filtro = personas.filter(persona => persona.lastname==ln);
    personas_filtro.forEach(persona => console.log(persona));
    console.log("***********FIN LISTA DE APELLIDOS***********");
    const n=personas_filtro.length;
    res.status(200).send(personas_filtro);
});
app.get('/users/gender/:gender', (req, res)=>{
    const g = req.params.gender;
    console.log(`***********LISTA DE GENERO: ${g}***********`);
    const personas_filtro = personas.filter(persona => persona.gender==g);
    personas_filtro.forEach(persona => console.log(persona));
    console.log("***********FIN LISTA DE GENERO***********");
    const n=personas_filtro.length;
    res.status(200).send(personas_filtro);
});

app.get('/users/telephone', (req, res)=>{
    console.log("***********LISTA DE TELEFONO***********");
    const personas_filtro = personas.filter(persona => persona.telephones.length>0);
    personas_filtro.forEach(persona => console.log(persona));
    console.log("***********FIN LISTA DE TELEFONO***********");
    const n=personas_filtro.length;
    res.status(200).send(personas_filtro);
});
app.get('/users/bmi/:id', (req,res)=>{
    const id = req.params.id;
    
    const w = personas[id].weight;
    const h = personas[id].height;
    const bmi = (h === 0) ? "Error" : w/(h*h);

    res.status(200).send(`BMI : ${bmi}`);
});

app.get('/users/bmi', (req, res)=>{
    var w = 0;
    var h = 0;
    var bmi = 0;
    var IMC = [];
    personas.forEach(function(persona){
        if(persona.height>0 && persona.weight>0)
        {
            w = persona.weight;
            h = persona.height;
            bmi = w/(h*h);
            console.log(`Id: ${persona.identification} ,BMI : ${bmi}`);
            IMC.push({identification:persona.identification,name:persona.name,lastname:persona.lastname,BMI:bmi})
        }
    });
    res.status(200).send(IMC);
});

app.delete('/users/:id', (req, res)=>{
    const id = req.params.id;
    if(id!=null){
        personas.splice(id, 1);
        res.status(200).send("Eliminado");
    }else{
        res.sendStatus(400);
    }
});

app.listen(3000, () => {
 console.log("Servidor iniciado");
}); 