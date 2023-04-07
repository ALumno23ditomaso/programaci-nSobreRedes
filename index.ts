import express from 'express';
import * as swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger' 
const app: express.Application = express();

const port = 3001;

app.use(express.json());

import { persona } from './persona';
import { alimento } from './alimento';
import { consumoXFecha } from './consumoXFecha';
import { strict } from 'assert';


app.listen(3001,() => {

})
app.get('/', (_req , _res) => _res.send('Bienvenido a mi calendario!'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let personas:Array<persona> = new Array<persona>
let juan : persona = new persona (123, "juan", 170, 80)
let luca : persona = new persona (124, "luca", 165, 89)
let tomas : persona = new persona (125, "tomas", 188, 92)
personas.push(tomas)
personas.push(luca)
personas.push(juan)

let alimentos:Array<alimento> = new Array<alimento>
let pizza : alimento = new alimento ("pizza", 2500)
let turron : alimento = new alimento ("turron", 1500)
let hamburguesa : alimento = new alimento ("hamburguesa", 2800)
alimentos.push(pizza)
alimentos.push(turron)
alimentos.push(hamburguesa)

let listaconsumosXFecha:Array<consumoXFecha> = new Array<consumoXFecha>
let martes : consumoXFecha = new consumoXFecha (5, 8000)
let miercoles : consumoXFecha = new consumoXFecha (6, 3000)
let jueves : consumoXFecha = new consumoXFecha (7, 6000)
listaconsumosXFecha.push(martes)
listaconsumosXFecha.push(miercoles)
listaconsumosXFecha.push(jueves)

app.get("/personas", (_req,_res) => {
    _res.json(personas);
  })

  app.get("/personas/:id", (_req,_res) => {
    _res.json(personas.find(item => {
                  return item.id == Number(_req.params.id)
              }));
  
  })

  app.post("/personas/:id/:nombre/:altura/:peso", (_req,_res) => {
    const p = new persona(Number(_req.params.id), _req.params.nombre, Number(_req.params.altura), Number(_req.params.peso));
    personas.push(p);
    _res.json(p);   
  })
  

app.delete("/personas/:id", (_req,_res) => {
    const p = personas.find(item => {
        return item.id == Number(_req.params.id)
    })
    if (p){
      delete personas[personas.indexOf(p)]
    }
    _res.status(204).send()
  })

  app.put("/personas/:id", (_req,_res) => {
    const p = personas.find(item => {
                  return item.id == Number(_req.params.id)
              })
    if (p){
      p.name = _req.body.name
    }
    _res.json(p);   
  })

  app.patch('/personas/:id', (_req, _res) => {
    const persona = personas.find(p => p.id == Number(_req.params.id));
  
    if (persona) {
     
      if (_req.body.id) {
        persona.id=_req.body.id;
      }
      if (_req.body.peso) {
        persona.peso=_req.body.peso;
      }
    }
    return _res.status(204).send();
  });


  app.get("/alimentos", (_req,_res) => {
    _res.json(alimentos);
  })

  app.get("/alimentos/:name", (_req,_res) => {
    _res.json(alimentos.find(item => {
                  return item.name == String(_req.params.name)
              }));
  
  })


  app.post("/alimentos/:name/:calorias", (_req,_res) => {
    const p = new alimento(_req.params.name, Number(_req.params.calorias));
    alimentos.push(p);
    _res.json(p);   
  })
  

app.delete("/alimentos/:name", (_req,_res) => {
    const p = alimentos.find(item => {
        return item.name == String(_req.params.name)
    })
    if (p){
      delete alimentos[alimentos.indexOf(p)]
    }
    _res.status(204).send()
  })



  app.put("/alimentos/:name", (_req,_res) => {
    const p = alimentos.find(item => {
                  return item.name == String(_req.params.name)
              })
    if (p){
      p.name = _req.body.name
    }
    _res.json(p);   
  
  
  })
  app.patch('/alimentos/:name', (_req, _res) => {
    const alimento = alimentos.find(p => p.name == String(_req.params.name));
  
    if (alimento) {
     
      if (_req.body.calorias) {
        alimento.calorias=_req.body.calorias;
      }
      if (_req.body.name) {
        alimento.name=_req.body.name;
      }
    }
    return _res.status(204).send();
  });


app.get("/consumoXFecha", (_req,_res) => {
    _res.json(listaconsumosXFecha);
  })


  app.get("/consumoXFecha/:dia", (_req,_res) => {
    _res.json(listaconsumosXFecha.find(item => {
                  return item.dia == Number(_req.params.dia)
              }));
  
  })


  app.post("/consumoXFecha/:dia/:calorias", (_req,_res) => {
    const p = new consumoXFecha(Number(_req.params.dia), _req.body.calorias);
    listaconsumosXFecha.push(p);
    _res.json(p);   
  })
  

app.delete("/consumoXFecha/:dia", (_req,_res) => {
    const p = listaconsumosXFecha.find(item => {
        return item.dia == Number(_req.params.dia)
    })
    if (p){
      delete listaconsumosXFecha[listaconsumosXFecha.indexOf(p)]
    }
    _res.status(204).send()
  })


  app.put("/consumoXFecha/:dia", (_req,_res) => {
    const p = listaconsumosXFecha.find(item => {
                  return item.dia == Number(_req.params.dia)
              })
    if (p){
      p.dia = _req.body.dia
    }
    _res.json(p);   
  })

  app.patch('/consumoXFecha/:dia', (_req, _res) => {
    const consumoXFecha = listaconsumosXFecha.find(p => p.dia == Number(_req.params.dia));
  
    if (consumoXFecha) {
     
      if (_req.body.dia) {
        consumoXFecha.dia=_req.body.calorias;
      }
      if (_req.body.calorias) {
        consumoXFecha.calorias=_req.body.name;
      }
    }
    return _res.status(204).send();
  });

  

  //muestra las personas con determinado peso
  app.get("/personas/peso/:peso", (_req,_res) => {
    let aux:Array<persona> = new Array<persona>
  personas.forEach(persona => {
    if(persona.peso == Number(_req.params.peso)){
      aux.push(persona);
      }
    });
    _res.json(aux);
  })


//muestra los alimentos con determinadas calorias
  app.get("/alimentos/calorias/:calorias", (_req,_res) => {
    let aux:Array<alimento> = new Array<alimento>
    alimentos.forEach(alimento => {
    if(alimento.calorias == Number(_req.params.calorias)){
      aux.push(alimento);
      }
    });
    _res.json(aux);
  })


  //muestra los dias con determinadas calorias
  app.get("/consumoXFecha/calorias/:calorias", (_req,_res) => {
    let aux:Array<consumoXFecha> = new Array<consumoXFecha>
    listaconsumosXFecha.forEach(consumoXFecha => {
    if(consumoXFecha.calorias == Number(_req.params.calorias)){
      aux.push(consumoXFecha);
      }
    });
    _res.json(aux);
  })



