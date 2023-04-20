import express, { Router } from 'express'; 
const app: express.Application = express();
import { alimento } from './alimento';
export const MAalimentos = Router()

let alimentos:Array<alimento> = new Array<alimento>
let pizza : alimento = new alimento ("pizza", 2500)
let turron : alimento = new alimento ("turron", 1500)
let hamburguesa : alimento = new alimento ("hamburguesa", 2800)
alimentos.push(pizza)
alimentos.push(turron)
alimentos.push(hamburguesa)

app.get("/alimentos", (_req,_res) => {
    _res.json(alimentos);
  })

  app.get("/alimentos/:name", (_req,_res) => {
    _res.json(alimentos.find(item => {
                  return item.name == String(_req.params.name)
              }));
  
  })

  
  app.post("/alimentos/", (_req,_res) => {
    const p = new alimento(_req.body.name, Number(_req.body.calorias));
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
