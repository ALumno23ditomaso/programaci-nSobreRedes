import express, { Router } from 'express'; 
import { persona } from './persona';
import { modeloPersona } from './modelos/modeloPersona';
export  const MPersonas = Router()



MPersonas.get('/', async (req, res) => {
    const data = await modeloPersona.find()  
    res.status(200).send(data)
  })

MPersonas.post('/', async (req, res) => {
    console.log(req.body)
    const data = await modeloPersona.create(req.body)
    res.status(200).send(data)  
  })
  
  MPersonas.patch('/', async (req, res) => {
    const data = await modeloPersona.findOneAndUpdate({"name": req.body.name}, {"name": req.body.nuevo_name})
    res.status(200).send(data)  
  })

  MPersonas.put('/', async (req, res) => {
    const data = await modeloPersona.findOneAndReplace(
        {"name": req.body.name}, {"name": req.body.nuevo_name, "altura": req.body.nuevo_altura, "peso": req.body.nuevo_peso})
    res.status(200).send(data)  
  })

  MPersonas.delete('/', async (req, res) => {
    const data = await modeloPersona.findOneAndDelete({"name": req.body.name})
    res.status(200).send(data)
  })

  //muestra las personas con determinado peso
  MPersonas.get("/peso/:peso", async (_req,_res) => {
    let aux = await modeloPersona.find()
    let aux2:Array<persona> = new Array<persona>
    aux.forEach(persona => {
    if(persona.peso == Number(_req.params.peso)){
      aux2.push(persona);
      }
    });
    _res.json(aux2);
  })