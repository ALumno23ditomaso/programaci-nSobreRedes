import express, { Router } from 'express'; 
const app: express.Application = express();
import { alimento } from './alimento';
import { modeloAlimento } from './modelos/modeloAlimento';
export const MAlimentos = Router()


MAlimentos.get('/', async (req, res) => {
  const data = await modeloAlimento.find()  
  res.status(200).send(data)
})

MAlimentos.post('/', async (req, res) => {
  console.log(req.body)
  const data = await modeloAlimento.create(req.body)
  res.status(200).send(data)  
})

MAlimentos.patch('/', async (req, res) => {
  const data = await modeloAlimento.findOneAndUpdate({"name": req.body.name}, {"name": req.body.nuevo_name})
  res.status(200).send(data)  
})

MAlimentos.put('/', async (req, res) => {
  const data = await modeloAlimento.findOneAndReplace(
      {"name": req.body.name}, {"name": req.body.nuevo_name, "calorias": req.body.nuevo_calorias})
  res.status(200).send(data)  
})

MAlimentos.delete('/', async (req, res) => {
  const data = await modeloAlimento.findOneAndDelete({"name": req.body.name})
  res.status(200).send(data)
})

//muestra los alimentos con determinadas calorias
  MAlimentos.get("/calorias/:calorias", async (_req,_res) => {
    let aux = await modeloAlimento.find()
    let aux2:Array<alimento> = new Array<alimento>
    aux.forEach(alimento => {
    if(alimento.calorias == Number(_req.params.calorias)){
      aux2.push(alimento);
      }
    });
    _res.json(aux2);
  })