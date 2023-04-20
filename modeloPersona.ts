import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({
    "schemaOptions": {
        "collection": "personas"
    }
})
class Persona {
    @prop()
    id!: number

    @prop()
    name!: string

    @prop()
    altura!: number

    @prop()
    peso!: number
}

export const modeloPersona = getModelForClass(Persona)