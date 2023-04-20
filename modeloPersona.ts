import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({
    "schemaOptions": {
        "collection": "persona"
    }
})
class Persona {
    @prop()
    name!: string

    @prop()
    altura!: number

    @prop()
    peso!: number
}

export const modeloPersona = getModelForClass(Persona)