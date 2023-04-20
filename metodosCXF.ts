import express, { Router } from 'express'; 
const app: express.Application = express();
export const MConsumoXFecha = Router()

import { consumoXFecha } from './consumoXFecha';

let listaconsumosXFecha:Array<consumoXFecha> = new Array<consumoXFecha>
let martes : consumoXFecha = new consumoXFecha (5, 8000)
let miercoles : consumoXFecha = new consumoXFecha (6, 3000)
let jueves : consumoXFecha = new consumoXFecha (7, 6000)
listaconsumosXFecha.push(martes)
listaconsumosXFecha.push(miercoles)
listaconsumosXFecha.push(jueves)

app.get("/consumoXFecha", (_req,_res) => {
    _res.json(listaconsumosXFecha);
  })


  app.get("/consumoXFecha/:dia", (_req,_res) => {
    _res.json(listaconsumosXFecha.find(item => {
                  return item.dia == Number(_req.params.dia)
              }));
  
  })


  app.post("/consumoXFecha/", (_req,_res) => {
    const p = new consumoXFecha(Number(_req.body.dia), _req.body.calorias);
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
  
