import express, { Router } from 'express'; 
const app: express.Application = express();
import { alimento } from './alimento';
import { modeloAlimento } from './modelos/modeloAlimento';
export const MAlimentos = Router()


MAlimentos.get('/alimentos', async (req, res) => {
  const data = await modeloAlimento.find()  
  res.status(200).send(data)
})

MAlimentos.post('/alimentos', async (req, res) => {
  console.log(req.body)
  const data = await modeloAlimento.create(req.body)
  res.status(200).send(data)  
})

MAlimentos.patch('/alimentos', async (req, res) => {
  const data = await modeloAlimento.findOneAndUpdate({"name": req.body.name}, {"name": req.body.nuevo_name})
  res.status(200).send(data)  
})

MAlimentos.put('/alimentos', async (req, res) => {
  const data = await modeloAlimento.findOneAndReplace(
      {"name": req.body.name}, {"name": req.body.nuevo_name, "calorias": req.body.nuevo_calorias})
  res.status(200).send(data)  
})

MAlimentos.delete('/alimentos', async (req, res) => {
  const data = await modeloAlimento.findOneAndDelete({"name": req.body.name})
  res.status(200).send(data)
})
