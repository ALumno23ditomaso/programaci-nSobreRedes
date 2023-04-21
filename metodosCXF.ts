import express, { Router } from 'express'; 
export const MConsumoXFecha = Router()
import { consumoXFecha } from './consumoXFecha';
import { modeloConsumoXFecha } from './modelos/modeloConsumoXFecha';

MConsumoXFecha.get('/', async (req, res) => {
  const data = await modeloConsumoXFecha.find()  
  res.status(200).send(data)
})

MConsumoXFecha.post('/', async (req, res) => {
  console.log(req.body)
  const data = await modeloConsumoXFecha.create(req.body)
  res.status(200).send(data)  
})

MConsumoXFecha.patch('/', async (req, res) => {
  const data = await modeloConsumoXFecha.findOneAndUpdate({"dia": req.body.name}, {"calorias": req.body.nuevo_calorias})
  res.status(200).send(data)  
})

MConsumoXFecha.put('/', async (req, res) => {
  const data = await modeloConsumoXFecha.findOneAndReplace(
      {"dia": req.body.dia}, {"dia": req.body.nuevo_dia, "calorias": req.body.nuevo_altura})
  res.status(200).send(data)  
})

MConsumoXFecha.delete('/', async (req, res) => {
  const data = await modeloConsumoXFecha.findOneAndDelete({"dia": req.body.dia})
  res.status(200).send(data)
})


    //muestra los dias con determinadas calorias
    MConsumoXFecha.get("/consumoXFecha/calorias/:calorias", async (_req,_res) => {
      let aux = await modeloConsumoXFecha.find()
      let aux2:Array<consumoXFecha> = new Array<consumoXFecha>
      aux.forEach(consumoXFecha => {
      if(consumoXFecha.calorias == Number(_req.params.calorias)){
        aux.push(consumoXFecha);
        }
      });
      _res.json(aux2);
    })
  
