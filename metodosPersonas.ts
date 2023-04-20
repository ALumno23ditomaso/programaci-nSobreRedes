import express, { Router } from 'express'; 
import { persona } from './persona';
import { modeloPersona } from './modelos/modeloPersona';
export  const MPersonas = Router()



MPersonas.get('/personas', async (req, res) => {
    const data = await modeloPersona.find()  
    res.status(200).send(data)
  })

MPersonas.post('/personas', async (req, res) => {
    console.log(req.body)
    const data = await modeloPersona.create(req.body)
    res.status(200).send(data)  
  })
  
  MPersonas.patch('/personas', async (req, res) => {
    const data = await modeloPersona.findOneAndUpdate({"name": req.body.name}, {"name": req.body.nuevo_name})
    res.status(200).send(data)  
  })

  MPersonas.put('/personas', async (req, res) => {
    const data = await modeloPersona.findOneAndReplace(
        {"name": req.body.name}, {"name": req.body.nuevo_name, "altura": req.body.nuevo_altura, "peso": req.body.nuevo_peso})
    res.status(200).send(data)  
  })

  MPersonas.delete('/personas', async (req, res) => {
    const data = await modeloPersona.findOneAndDelete({"name": req.body.name})
    res.status(200).send(data)
  })