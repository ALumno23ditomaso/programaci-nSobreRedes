import express, { Router } from 'express'; 
const app: express.Application = express();
import { persona } from './persona';
export  const MPersonas = Router()


let personas:Array<persona> = new Array<persona>
let juan : persona = new persona (123, "juan", 170, 80)
let luca : persona = new persona (124, "luca", 165, 89)
let tomas : persona = new persona (125, "tomas", 188, 92)
personas.push(tomas)
personas.push(luca)
personas.push(juan)


app.get("/personas", (_req,_res) => {
    _res.json(personas);
  })

  app.get("/personas/:id", (_req,_res) => {
    _res.json(personas.find(item => {
                  return item.id == Number(_req.params.id)
              }));
  
  })

  app.post("/personas", (_req,_res) => {
    const p = new persona(Number(_req.body.id), String(_req.body.nombre), Number(_req.body.altura), Number(_req.body.peso));
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
